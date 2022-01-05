/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","knockout","ojs/ojarraydataprovider","ojs/ojeventtarget","ojs/ojtreedataprovider"],function(e,t,r){"use strict";e.ArrayDataProvider;function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}var s=function(){function i(t,r,s){a(this,i),this.treeData=t,this.options=r,this._rootDataProvider=s,this.TreeAsyncIterator=function(){function e(t,r){a(this,e),this._parent=t,this._baseIterable=r}return n(e,[{key:"next",value:function(){var e=this;return this._baseIterable[Symbol.asyncIterator]().next().then(function(t){for(var r=t.value.metadata,a=0;a<r.length;a++)r[a]=e._parent._getNodeMetadata(t.value.data[a]);return t})}}]),e}(),this.TreeAsyncIterable=function(){return function e(t,r){a(this,e),this._parent=t,this._asyncIterator=r,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}}(),this._baseDataProvider=new e.ArrayDataProvider(t,r),this._mapKeyToNode=new Map,this._mapNodeToKey=new Map,this._mapArrayToSequenceNum=new Map,this._mapKoArrayToSubscriptions=new Map,null==s&&this._processTreeArray(t,[])}return n(i,[{key:"containsKeys",value:function(e){return this.fetchByKeys(e).then(function(t){var r=new Set;return e.keys.forEach(function(e){null!=t.results.get(e)&&r.add(e)}),Promise.resolve({containsParameters:e,results:r})})}},{key:"getCapability",value:function(e){return this._baseDataProvider.getCapability(e)}},{key:"getTotalSize",value:function(){return this._baseDataProvider.getTotalSize()}},{key:"isEmpty",value:function(){return this._baseDataProvider.isEmpty()}},{key:"getChildDataProvider",value:function(e,t){var r=this._getNodeForKey(e);if(r){var a=this._getChildren(r);if(a)return new i(a,this.options,this._getRootDataProvider())}return null}},{key:"fetchFirst",value:function(e){if(e&&e.filterCriterion){var r=t.extend({},e);r.filterCriterion=this._getLeafNodeFilter(r.filterCriterion),r.filterCriterion.filter=e.filterCriterion.filter,e=r}var a=this._baseDataProvider.fetchFirst(e);return new this.TreeAsyncIterable(this,new this.TreeAsyncIterator(this,a))}},{key:"fetchByOffset",value:function(e){var t=this._baseDataProvider.fetchByOffset(e),r=this;return t.then(function(e){for(var t=e.results,a=[],i=0;i<t.length;i++){var n=t[i].metadata,s=t[i].data;n=r._getNodeMetadata(s),a.push({data:s,metadata:n})}return{done:e.done,fetchParameters:e.fetchParameters,results:a}})}},{key:"fetchByKeys",value:function(e){var t=this,r=new Map;return e.keys.forEach(function(e){var a=t._getNodeForKey(e);a&&r.set(e,{metadata:{key:e},data:a})}),Promise.resolve({fetchParameters:e,results:r})}},{key:"_getChildren",value:function(e){var t=this.options&&this.options.childrenAttribute?this.options.childrenAttribute:"children";return this._getVal(e,t,!0)}},{key:"_getRootDataProvider",value:function(){return this._rootDataProvider?this._rootDataProvider:this}},{key:"_subscribeObservableArray",value:function(t,a){if(!r.isObservable(t)||void 0===t.destroyAll)throw new Error("Invalid data type. ArrayTreeDataProvider only supports Array or observableArray.");var i=this,n=null,s=new Array(2);s[0]=t.subscribe(function(r){var s,o,u,l=[],h=[],d=[],y=[],c=[],v=null,f=null,p=null,_=[];for(s=0;s<r.length;s++){u=r[s].index,status=r[s].status;var g=i._getId(r[s].value);if(g)for(o=0;o<r.length;o++)if(o!=s&&u===r[o].index&&status!==r[o].status&&c.indexOf(s)<0&&_.indexOf(s)<0){var b=i._getId(r[o].value);e.Object.compareValues(g,b)&&("deleted"===status?(_.push(s),c.push(o)):(_.push(o),c.push(s)))}}for(s=0;s<r.length;s++)if("deleted"===r[s].status&&c.indexOf(s)<0&&_.indexOf(s)<0){var k=r[s].value,m=i._getKeyForNode(k);h.push(m),l.push(k),d.push(r[s].index),i._releaseNode(k)}if(h.length>0){y=h.map(function(e){return{key:e}});var A=new Set;h.map(function(e){A.add(e)}),p={data:l,indexes:d,keys:A,metadata:y}}l=[],h=[],d=[],y=[];var N=t(),P=[],T=[],K=[],D=[];for(s=0;s<r.length;s++)if("added"===r[s].status&&_.indexOf(s)<0){var x=r[s].value,w=i._processNode(x,a,t);c.indexOf(s)<0?(h.push(w.key),l.push(x),d.push(r[s].index),y.push({key:w.key})):(P.push(w.key),T.push(x),K.push(r[s].index),D.push({key:w.key}))}if(h.length>0){var O=new Set;h.map(function(e){O.add(e)});var S,E=new Set,I=[],M=[];S=i.options&&i.options.keyAttributes&&"siblings"!==i.options.keyAttributesScope?a.length>0?a[a.length-1]:null:a.length>0?a:null,d.map(function(e){var t;t=e>=N.length-1?"":i._getKeyForNode(N[e+1]),E.add(t),I.push(t),M.push(S)}),f={afterKeys:E,addBeforeKeys:I,parentKeys:M,data:l,indexes:d,keys:O,metadata:y}}if(P.length>0){var j=new Set;P.map(function(e){j.add(e)}),v={data:T,indexes:K,keys:j,metadata:D}}n=new e.DataProviderMutationEvent({add:f,remove:p,update:v})},null,"arrayChange"),s[1]=t.subscribe(function(t){n?i.dispatchEvent(n):i.dispatchEvent(new e.DataProviderRefreshEvent),n=null},null,"change"),this._mapKoArrayToSubscriptions.set(t,s)}},{key:"_unsubscribeObservableArray",value:function(e){if(r.isObservable(e)&&void 0!==e.destroyAll){var t=this._mapKoArrayToSubscriptions.get(e);t&&(t[0].dispose(),t[1].dispose(),this._mapKoArrayToSubscriptions.delete(e))}}},{key:"_processTreeArray",value:function(e,t){var r,a=this;e instanceof Array?r=e:(this._subscribeObservableArray(e,t),r=e()),r.forEach(function(r,i){a._processNode(r,t,e)})}},{key:"_releaseTreeArray",value:function(e){var t,r=this;e instanceof Array?t=e:(this._unsubscribeObservableArray(e),t=e()),t.forEach(function(e,t){r._releaseNode(e)})}},{key:"_processNode",value:function(e,t,r){var a=this._createKeyObj(e,t,r);this._setMapEntry(a.key,e);var i=this._getChildren(e);return i&&this._processTreeArray(i,a.keyPath),a}},{key:"_releaseNode",value:function(e){var t=this._getKeyForNode(e);this._deleteMapEntry(t,e);var r=this._getChildren(e);r&&this._releaseTreeArray(r)}},{key:"_createKeyObj",value:function(e,t,r){var a=this._getId(e),i=t?t.slice():[];return null==a?(i.push(this._incrementSequenceNum(r)),a=i):(i.push(a),this.options&&"siblings"==this.options.keyAttributesScope&&(a=i)),{key:a,keyPath:i}}},{key:"_getId",value:function(e){var t,r=null!=this.options?this.options.keyAttributes:null;if(null!=r){var a;if(Array.isArray(r))for(t=[],a=0;a<r.length;a++)t[a]=this._getVal(e,r[a]);else t="@value"==r?this._getAllVals(e):this._getVal(e,r);return t}return null}},{key:"_getVal",value:function(e,t,r){if("string"==typeof t){var a=t.indexOf(".");if(a>0){var i=t.substring(0,a),n=t.substring(a+1),s=e[i];if(s)return this._getVal(s,n)}}return!0!==r&&"function"==typeof e[t]?e[t]():e[t]}},{key:"_getAllVals",value:function(e){var t=this;return Object.keys(e).map(function(r){return t._getVal(e,r)})}},{key:"_getNodeMetadata",value:function(e){return{key:this._getKeyForNode(e)}}},{key:"_getNodeForKey",value:function(e){return this._getRootDataProvider()._mapKeyToNode.get(JSON.stringify(e))}},{key:"_getKeyForNode",value:function(e){return this._getRootDataProvider()._mapNodeToKey.get(e)}},{key:"_setMapEntry",value:function(e,t){var r=this._getRootDataProvider();r._mapKeyToNode.set(JSON.stringify(e),t),r._mapNodeToKey.set(t,e)}},{key:"_deleteMapEntry",value:function(e,t){var r=this._getRootDataProvider();r._mapKeyToNode.delete(JSON.stringify(e)),r._mapNodeToKey.delete(t)}},{key:"_incrementSequenceNum",value:function(e){var t=this._getRootDataProvider(),r=t._mapArrayToSequenceNum.get(e)||0;return t._mapArrayToSequenceNum.set(e,r+1),r}},{key:"_getLeafNodeFilter",value:function(e){var t;e&&e.text?t={op:"$regex",attribute:"*",value:new RegExp(e.text,"i")}:t=e;var r=this.options&&this.options.childrenAttribute?this.options.childrenAttribute:"children";return{op:"$or",criteria:[t,{op:"$and",criteria:[{op:"$ne",attribute:r,value:null},{op:"$ne",attribute:r,value:void 0}]}]}}}]),i}();
/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
return e.ArrayTreeDataProvider=s,e.ArrayTreeDataProvider=s,e.EventTargetMixin.applyMixin(s),s});