/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.dtstack.engine.master.zookeeper;

import com.dtstack.engine.common.env.EnvironmentContext;
import com.dtstack.engine.master.server.FailoverStrategy;
import com.dtstack.engine.master.server.listener.HeartBeatCheckListener;
import com.dtstack.engine.master.server.listener.HeartBeatListener;
import com.dtstack.engine.master.server.listener.Listener;
import com.dtstack.engine.master.server.listener.MasterListener;
import com.dtstack.engine.master.zookeeper.data.BrokerHeartNode;
import com.dtstack.engine.master.zookeeper.data.BrokersNode;
import com.dtstack.engine.common.exception.RdosDefineException;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

/**
 * company: www.dtstack.com
 * author: toutian
 * create: 2019/10/22
 */
@Component
public class ZkService implements InitializingBean, DisposableBean {

    private static final Logger LOGGER = LoggerFactory.getLogger(ZkService.class);

    private final static String HEART_NODE = "heart";
    private final static String WORKER_NODE = "workers";

    private ZkConfig zkConfig;
    private String zkAddress;
    private String localAddress;
    private String distributeRootNode;
    private String brokersNode;
    private String localNode;
    private String workersNode;

    private CuratorFramework zkClient;
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * when normal stopped，need trigger Listener close();
     */
    private List<Listener> listeners = Lists.newArrayList();

    @Autowired
    private EnvironmentContext environmentContext;

    @Autowired
    private FailoverStrategy failoverStrategy;

    @Override
    public void afterPropertiesSet() throws Exception {
        LOGGER.info("Initializing " + this.getClass().getName());

        initConfig();
        checkDistributedConfig();
        initClient();
        zkRegistration();
    }

    private void initConfig() {
        ZkConfig zkConfig = new ZkConfig();
        zkConfig.setNodeZkAddress(environmentContext.getNodeZkAddress());
        zkConfig.setLocalAddress(environmentContext.getLocalAddress());
        zkConfig.setSecurity(environmentContext.getSecurity());
        this.zkConfig = zkConfig;
    }

    private void initClient() {
        this.zkClient = CuratorFrameworkFactory.builder()
                .connectString(this.zkAddress).retryPolicy(new ExponentialBackoffRetry(1000, 3))
                .connectionTimeoutMs(3000)
                .sessionTimeoutMs(30000).build();
        this.zkClient.start();
        LOGGER.warn("connector zk success...");
    }

    private void zkRegistration() throws Exception {
        createNodeIfNotExists(this.distributeRootNode, "");
        createNodeIfNotExists(this.brokersNode, BrokersNode.initBrokersNode());
        createNodeIfNotExists(this.localNode, "");
        createNodeIfNotExists(this.workersNode, new HashSet<>());
        createLocalBrokerHeartNode();
        initScheduledExecutorService();
        LOGGER.warn("init zk server success...");
    }

    private void initScheduledExecutorService() throws Exception {
        listeners.add(new HeartBeatListener(this));
        String latchPath = String.format("%s/%s", this.distributeRootNode, "masterLatchLock");
        MasterListener masterListener = new MasterListener(failoverStrategy, zkClient, latchPath, localAddress);
        listeners.add(masterListener);
        listeners.add(new HeartBeatCheckListener(masterListener, failoverStrategy, this));
    }

    private void createLocalBrokerHeartNode() throws Exception {
        String node = String.format("%s/%s", this.localNode, HEART_NODE);
        if (zkClient.checkExists().forPath(node) == null) {
            zkClient.create().forPath(node,
                    objectMapper.writeValueAsBytes(BrokerHeartNode.initBrokerHeartNode()));
        } else {
            updateSynchronizedLocalBrokerHeartNode(this.localAddress, BrokerHeartNode.initBrokerHeartNode(), true);
        }
    }

    public void updateSynchronizedLocalBrokerHeartNode(String localAddress, BrokerHeartNode source, boolean isCover) {
        String nodePath = String.format("%s/%s/%s", brokersNode, localAddress, HEART_NODE);
        try {
            BrokerHeartNode target = objectMapper.readValue(zkClient.getData().forPath(nodePath), BrokerHeartNode.class);
            BrokerHeartNode.copy(source, target, isCover);
            zkClient.setData().forPath(nodePath,
                    objectMapper.writeValueAsBytes(target));
        } catch (Exception e) {
            LOGGER.error("{}:updateSynchronizedBrokerHeartNode error:", nodePath, e);
        }
    }

    public void createNodeIfNotExists(String node, Object obj) throws Exception {
        if (zkClient.checkExists().forPath(node) == null) {
            zkClient.create().forPath(node,
                    objectMapper.writeValueAsBytes(obj));
        }
    }

    private void checkDistributedConfig() throws Exception {
        if (StringUtils.isBlank(this.zkConfig.getNodeZkAddress())
                || this.zkConfig.getNodeZkAddress().split("/").length < 2) {
            throw new RdosDefineException("zkAddress is error");
        }
        String[] zks = this.zkConfig.getNodeZkAddress().split("/");
        this.zkAddress = zks[0].trim();
        this.distributeRootNode = String.format("/%s", zks[1].trim());
        this.localAddress = zkConfig.getLocalAddress();
        if (StringUtils.isBlank(this.localAddress) || this.localAddress.split(":").length < 2) {
            throw new RdosDefineException("localAddress is error");
        }
        this.brokersNode = String.format("%s/brokers", this.distributeRootNode);
        this.localNode = String.format("%s/%s", this.brokersNode, this.localAddress);
        this.workersNode = String.format("%s/%s", this.localNode, WORKER_NODE);
    }

    public BrokerHeartNode getBrokerHeartNode(String node) {
        try {
            String nodePath = String.format("%s/%s/%s", this.brokersNode, node, HEART_NODE);
            return objectMapper.readValue(zkClient.getData()
                    .forPath(nodePath), BrokerHeartNode.class);
        } catch (Exception e) {
            LOGGER.error("{}:getBrokerHeartNode error:", node, e);
        }
        return BrokerHeartNode.initNullBrokerHeartNode();
    }

    public List<String> getBrokersChildren() {
        try {
            return zkClient.getChildren().forPath(this.brokersNode);
        } catch (Exception e) {
            LOGGER.error("getBrokersChildren error:", e);
        }
        return Lists.newArrayList();
    }

    public List<String> getAliveBrokersChildren() {
        List<String> alives = Lists.newArrayList();
        try {
            if (null != zkClient) {
                List<String> brokers = zkClient.getChildren().forPath(this.brokersNode);
                for (String broker : brokers) {
                    BrokerHeartNode brokerHeartNode = getBrokerHeartNode(broker);
                    if (brokerHeartNode.getAlive()) {
                        alives.add(broker);
                    }
                }
            }

        } catch (Exception e) {
            LOGGER.error("getBrokersChildren error:", e);
        }
        return alives;
    }

    public List<Map<String, Object>> getAllBrokerWorkersNode() {
        List<Map<String, Object>> allWorkers = new ArrayList<>();
        List<String> children = this.getBrokersChildren();
        for (String address : children) {
            String nodePath = String.format("%s/%s/%s", this.brokersNode, address, WORKER_NODE);
            try {
                List<Map<String, Object>> workerNode = objectMapper.readValue(zkClient.getData().forPath(nodePath), ArrayList.class);
                allWorkers.addAll(workerNode);
            } catch (Exception e) {
                LOGGER.error("", e);
            }
        }
        return allWorkers;
    }

    public String getLocalAddress() {
        return localAddress;
    }

    public void disableBrokerHeartNode(String localAddress, boolean stopHealthCheck) {
        BrokerHeartNode disableBrokerHeartNode = BrokerHeartNode.initNullBrokerHeartNode();
        if (stopHealthCheck) {
            disableBrokerHeartNode.setSeq(HeartBeatCheckListener.getStopHealthCheckSeq());
        }
        this.updateSynchronizedLocalBrokerHeartNode(localAddress, disableBrokerHeartNode, true);
    }

    @Override
    public void destroy() throws Exception {
        disableBrokerHeartNode(this.localAddress, false);
        for (Listener listener : listeners) {
            try {
                listener.close();
                LOGGER.info("close {}", listener.getClass().getSimpleName());
            } catch (Exception e) {
                LOGGER.error("", e);
            }
        }
    }

    public void setEnvironmentContext(EnvironmentContext environmentContext) {
        this.environmentContext = environmentContext;
    }
}