"use strict";(self.webpackChunktaier_website=self.webpackChunktaier_website||[]).push([[3030],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(r),f=a,k=m["".concat(p,".").concat(f)]||m[f]||u[f]||i;return r?n.createElement(k,o(o({ref:t},l),{},{components:r})):n.createElement(k,o({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},848:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return l},default:function(){return m}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],c={title:"Spark-Thrift",sidebar_label:"Spark-Thrift"},p=void 0,s={unversionedId:"functions/component/spark-thrift",id:"functions/component/spark-thrift",title:"Spark-Thrift",description:"\u542f\u52a8Spark-Thrift",source:"@site/docs/functions/component/spark-thrift.md",sourceDirName:"functions/component",slug:"/functions/component/spark-thrift",permalink:"/Taier/docs/functions/component/spark-thrift",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/functions/component/spark-thrift.md",tags:[],version:"current",frontMatter:{title:"Spark-Thrift",sidebar_label:"Spark-Thrift"}},l=[{value:"\u542f\u52a8Spark-Thrift",id:"\u542f\u52a8spark-thrift",children:[],level:2},{value:"\u914d\u7f6eSpark-Thrift",id:"\u914d\u7f6espark-thrift",children:[],level:2}],u={toc:l};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u542f\u52a8spark-thrift"},"\u542f\u52a8Spark-Thrift"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u4e0b\u8f7d",(0,i.kt)("inlineCode",{parentName:"li"},"spark"),"\u5b89\u88c5\u5305\uff0c\u6211\u4eec\u9009\u62e9\u7684\u662f",(0,i.kt)("a",{parentName:"li",href:"https://archive.apache.org/dist/spark/spark-2.1.3/spark-2.1.3-bin-hadoop2.7.tgz"},"spark2.1.3b")),(0,i.kt)("li",{parentName:"ol"},"\u89e3\u538bspark-2.1.3-bin-hadoop2.7.tgz"),(0,i.kt)("li",{parentName:"ol"},"\u5c06core-site.xml\u3001hdfs-site.xml\u3001yarn-site.xml\u3001hive-site.xml\u62f7\u8d1d\u5230${SPARK_HOME}/conf\u76ee\u5f55\u4e0b"),(0,i.kt)("li",{parentName:"ol"},"\u542f\u52a8spark thriftserver:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$   cd ${SPARK_HOME}/sbin && sh start-thriftserver.sh\n")),(0,i.kt)("h2",{id:"\u914d\u7f6espark-thrift"},"\u914d\u7f6eSpark-Thrift"),(0,i.kt)("p",null,"\u5df2\u914d\u7f6e\u524d\u7f6e\u7ec4\u4ef6"),(0,i.kt)("ul",{className:"contains-task-list"},(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","SFTP"),(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","YARN"),(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","HDFS"),(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Spark")),(0,i.kt)("p",null,"\u9009\u62e9\u597d\u5bf9\u5e94\u7684\u7248\u672c \u586b\u5199\u76f8\u5173\u53c2\u6570\u4fe1\u606f\u5373\u53ef"),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"jdbc\u914d\u7f6e\u4e2d\u9700\u8981\u5e26\u4e0a%s \u5982: jdbc:hive2://172.16.85.248:10000/%s"))))}m.isMDXComponent=!0}}]);