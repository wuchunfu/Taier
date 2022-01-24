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

import * as React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import { NotFound } from 'dt-react-component'
// 继承主应用的的公共View组件

import Container from './views'
import QueueManage from './views/queueManage'
import ResourceManage from './views/resourceManage'
import ClusterManage from './views/clusterManage'
import EditCluster from './views/clusterManage/newEdit'
import QueueManageDetail from './views/queueManage/taskDetail'
import AlarmChannel from './views/alarmChannel';
import AlarmRule from './views/alarmChannel/alarmRule'
import AlarmConfig from './views/alarmChannel/alarmConfig'

// 运维中心
import { isSelectedProject } from './interceptor'
import Operation from './views/operation/container'
import OpeOfflineTaskMana from './views/operation/offline/taskMana'
import OpeOfflineList from './views/operation/offline/taskOperation'
import OperationPatchData from './views/operation/offline/patchDataList'
import OperationPatchDataDetail from './views/operation/offline/patchDataDetail'

export default (
    <Route path="/" >
        <IndexRedirect to="/console-ui" />
        <Route path="/console-ui" component={ Container }>
            <IndexRoute component={ QueueManage } />
            <Route path="queueManage" component={QueueManage} />
            <Route path="queueManage/detail" component={QueueManageDetail} />
            <Route path="resourceManage" component={ResourceManage} />
            <Route path="clusterManage" component={ClusterManage} />
            <Route path="clusterManage/editCluster" component={EditCluster} />
            <Route path='alarmChannel' component={AlarmChannel} />
            <Route path='alarmChannel/alarmRule' component={AlarmRule} />
            <Route path='alarmChannel/AlarmConfig' component={AlarmConfig} />
        </Route>
        <Route path="/operation-ui" component={Operation} onEnter={isSelectedProject}>
            <IndexRoute component={OpeOfflineTaskMana} />
            <Route path="offline-management" component={OpeOfflineTaskMana} />
            <Route path="offline-operation" component={OpeOfflineList} />
            <Route path="task-patch-data" component={OperationPatchData} />
            <Route path="task-patch-data/detail" component={OperationPatchDataDetail} />
        </Route>
        <Route path="/*" component={NotFound} />
    </Route>
)