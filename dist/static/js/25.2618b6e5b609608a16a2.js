webpackJsonp([25],{FMd3:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("HKgj"),r=i("cS4D"),a={components:{VeHistogram:i.n(r).a},data:function(){return{chartData:{},chartSettings:{},chartExtend:{}}},created:function(){var e=this;Object(n.c)().then(function(t){e.chartData=t.data.data,e.chartSettings={labelMap:{users:"用户增长数"}},e.chartExtend={xAxis:{boundaryGap:!0},series:{label:{show:!0,position:"top"}}}})}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app-container calendar-list-container"},[t("ve-histogram",{attrs:{extend:this.chartExtend,data:this.chartData,settings:this.chartSettings}})],1)},staticRenderFns:[]},s=i("VU/8")(a,o,!1,null,null,null);t.default=s.exports},cS4D:function(e,t,i){var n;n=function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;var t={categoryAxis:{axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!1}},valueAxis:{axisLine:{show:!1}},line:{smooth:!0},grid:{containLabel:!0,left:10,right:10}},i=["#19d4ae","#5ab1ef","#fa6e86","#ffb980","#0067a6","#c4b4e4","#d87a80","#9cbbff","#d9d0c7","#87a997","#d49ea2","#5b4947","#7ba3a8"],n=function(e){return['<span style="',"background-color:"+e+";","display: inline-block;","width: 10px;","height: 10px;","border-radius: 50%;","margin-right:2px;",'"></span>'].join("")},r=["initOptions","loading","dataEmpty","judgeWidth","widthChangeDelay"],a=["grid","dataZoom","visualMap","toolbox","title","legend","xAxis","yAxis","radar","tooltip","axisPointer","brush","geo","timeline","graphic","series","backgroundColor","textStyle"],o={th:3,mi:6,bi:9,tr:12},s={zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0,abbrLabel:{th:"k",mi:"m",bi:"b",tr:"t"}},l=1e12,c=1e9,h=1e6,u=1e3;function d(e,t,i,n){var r=e.toString().split("."),a=t-(n||0),o=2===r.length?Math.min(Math.max(r[1].length,a),t):a,s=Math.pow(10,o),l=(i(e+"e+"+o)/s).toFixed(o);if(n>t-o){var c=new RegExp("\\.?0{1,"+(n-(t-o))+"}$");l=l.replace(c,"")}return l}function f(e,t,i,n){var r=Math.abs(t),a=!1,s=!1,f="",p="",m=!1,b=void 0,y=void 0;i=i||"",t=t||0,~i.indexOf("(")?(a=!0,i=i.replace(/[(|)]/g,"")):(~i.indexOf("+")||~i.indexOf("-"))&&(y=~i.indexOf("+")?i.indexOf("+"):t<0?i.indexOf("-"):-1,i=i.replace(/[+|-]/g,"")),~i.indexOf("a")&&(b=!!(b=i.match(/a(k|m|b|t)?/))&&b[1],~i.indexOf(" a")&&(f=" "),i=i.replace(new RegExp(f+"a[kmbt]?"),""),r>=l&&!b||"t"===b?(f+=e.abbrLabel.tr,t/=l):r<l&&r>=c&&!b||"b"===b?(f+=e.abbrLabel.bi,t/=c):r<c&&r>=h&&!b||"m"===b?(f+=e.abbrLabel.mi,t/=h):(r<h&&r>=u&&!b||"k"===b)&&(f+=e.abbrLabel.th,t/=u)),~i.indexOf("[.]")&&(s=!0,i=i.replace("[.]","."));var g=t.toString().split(".")[0],v=i.split(".")[1],x=i.indexOf(","),O=(i.split(".")[0].split(",")[0].match(/0/g)||[]).length;if(v?(g=(p=~v.indexOf("[")?d(t,(v=(v=v.replace("]","")).split("["))[0].length+v[1].length,n,v[1].length):d(t,v.length,n)).split(".")[0],p=~p.indexOf(".")?"."+p.split(".")[1]:"",s&&0==+p.slice(1)&&(p="")):g=d(t,0,n),f&&!b&&+g>=1e3&&f!==o.trillion&&(g=""+ +g/1e3,f=o.million),~g.indexOf("-")&&(g=g.slice(1),m=!0),g.length<O)for(var j=O-g.length;j>0;j--)g="0"+g;x>-1&&(g=g.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")),i.indexOf(".")||(g="");var S=g+p+(f||"");return a?S=(a&&m?"(":"")+S+(a&&m?")":""):y>=0?S=0===y?(m?"-":"+")+S:S+(m?"-":"+"):m&&(S="-"+S),S}function p(e,t){Object.keys(t).forEach(function(i){e[i]=t[i]})}var m={},b={};function y(e,t,i){return function(e,t,i){t=t||m.defaultFormat,i=i||Math.round;var n=void 0,r=void 0;if(0===e&&null!==m.zeroFormat)n=m.zeroFormat;else if(null===e&&null!==m.nullFormat)n=m.nullFormat;else{for(var a in b)if(b[a]&&t.match(b[a].regexp)){r=b[a].format;break}n=(r=r||f.bind(null,m))(e,t,i,y)}return n}(0===e||void 0===e?0:null===e||function(e){return"number"==typeof e&&isNaN(e)}(e)?null:"string"==typeof e?m.zeroFormat&&e===m.zeroFormat?0:m.nullFormat&&e===m.nullFormat||!e.replace(/[^0-9]+/g,"").length?null:+e:+e||null,t,i)}p(m,s),y.options=m,y._numberToFormat=f.bind(null,m),y.register=function(e,t){b[e]=t},y.unregister=function(e){b[e]=null},y.setOptions=function(e){p(m,e)},y.reset=function(){p(m,s)},y.register("percentage",{regexp:/%/,format:function(e,t,i,n){var r=~t.indexOf(" %")?" ":"",a=void 0;return n.options.scalePercentBy100&&(e*=100),t=t.replace(/\s?%/,""),~(a=n._numberToFormat(e,t,i)).indexOf(")")?((a=a.split("")).splice(-1,0,r+"%"),a=a.join("")):a=a+r+"%",a}});var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e},x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function O(e,t){var i=null;return function(){var n=this,r=arguments;clearTimeout(i),i=setTimeout(function(){e.apply(n,r)},t)}}function j(e,t,i){if(t){var n=e,r=t.split(".");r.forEach(function(e,t){t===r.length-1?n[e]=i:(n[e]||(n[e]={}),n=n[e])})}}var S="function"==typeof Symbol&&"symbol"===g(Symbol.iterator)?function(e){return void 0===e?"undefined":g(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":g(e)};function A(e){return Object.prototype.toString.call(e)}function k(e){return void 0===e?"undefined":S(e)}function w(e){return"[object Object]"===A(e)}function z(e){return"[object Array]"===A(e)}function E(e){return JSON.parse(JSON.stringify(e))}function H(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var L=function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"-";if(isNaN(e))return n;if(!t)return e;if("[object Function]"===A(t))return t(e,y);i=isNaN(i)?0:++i;var r=".["+new Array(i).join(0)+"]",a=t;switch(t){case"KMB":a=i?"0,0"+r+"a":"0,0a";break;case"normal":a=i?"0,0"+r:"0,0";break;case"percent":a=i?"0,0"+r+"%":"0,0.[00]%"}return y(e,a)},C=function(e){var t={};return Object.keys(e).forEach(function(i){e[i].forEach(function(e){t[e]=i})}),t},F=.5;function _(e){var t=e.innerRows,i=e.dimAxisName,n=e.dimension,r=e.axisVisible,a=e.dimAxisType,o=e.dims;return n.map(function(e){return{type:"category",name:i,nameLocation:"middle",nameGap:22,data:"value"===a?function(e){for(var t=Math.max.apply(null,e),i=[],n=Math.min.apply(null,e);n<=t;n++)i.push(n);return i}(o):t.map(function(t){return t[e]}),axisLabel:{formatter:function(e){return String(e)}},show:r}})}function $(e){var t,i=e.innerRows,n=e.metrics,r=e.stack,a=e.axisSite,o=e.isHistogram,s=e.labelMap,l=e.itemStyle,c=e.label,h=e.showLine,u=void 0===h?[]:h,d=e.dimAxisType,f=e.barGap,p=e.opacity,m=e.dims,b={},y=o?a.right||[]:a.top||[],g=o?"yAxisIndex":"xAxisIndex",x=r&&C(r);return n.forEach(function(e){b[e]=[]}),i.forEach(function(e){n.forEach(function(t){b[t].push(e[t])})}),!!(t=Object.keys(b).map(function(e,t){var i="value"===d?function(e,t){for(var i=Math.max.apply(null,t),n=[],r=Math.min.apply(null,t);r<=i;r++){var a=t.indexOf(r);~a?n.push(e[a]):n.push(null)}return n}(b[e],m):b[e],n=v({name:null!=s[e]?s[e]:e,type:~u.indexOf(e)?"line":"bar",data:i},g,~y.indexOf(e)?"1":"0");r&&x[e]&&(n.stack=x[e]),c&&(n.label=c),l&&(n.itemStyle=l);var a=p||function(e,t,i){if(!t)return e;var n=e;return t.split(".").some(function(e,t){if(void 0===n[e])return n=i,!0;n=n[e]}),n}(n,"itemStyle.normal.opacity");return"value"===d&&(n.barGap=f,n.barCategoryGap="1%",null==a&&(a=F)),null!=a&&j(n,"itemStyle.normal.opacity",a),n})).length&&t}var N=function(e,t,i,r){var a=E(t),o=i.axisSite,s=void 0===o?{}:o,l=i.dimension,c=void 0===l?[e[0]]:l,h=i.stack,u=void 0===h?{}:h,d=i.axisVisible,f=void 0===d||d,p=i.digit,m=void 0===p?2:p,b=i.dataOrder,y=void 0!==b&&b,g=i.scale,v=void 0===g?[!1,!1]:g,O=i.min,j=void 0===O?[null,null]:O,S=i.max,A=void 0===S?[null,null]:S,k=i.labelMap,w=void 0===k?{}:k,z=i.legendName,H=void 0===z?{}:z,C=i.label,F=i.itemStyle,N=i.showLine,T=i.barGap,M=void 0===T?"-100%":T,R=i.opacity;if(y){var P=y.label,V=y.order;P&&V?a.sort(function(e,t){return"desc"===V?e[P]-t[P]:t[P]-e[P]}):console.warn("Need to provide name and order parameters")}var D=r.tooltipVisible,B=r.legendVisible,W=e.slice();s.left&&s.right?W=s.left.concat(s.right):s.left&&!s.right?W=s.left:i.metrics?W=i.metrics:W.splice(e.indexOf(c[0]),1);var G=i.yAxisType||["normal","normal"],U=i.xAxisType||"category",I=i.yAxisName||[],J=i.xAxisName||"",Z=function(e,t){return e.map(function(e){return e[t[0]]})}(a,c),K=B&&function(e){var t=e.metrics,i=e.labelMap,n=e.legendName;return n||i?{data:i?t.map(function(e){return null==i[e]?e:i[e]}):t,formatter:function(e){return null!=n[e]?n[e]:e}}:{data:t}}({metrics:W,labelMap:w,legendName:H}),q=_({innerRows:a,dimAxisName:J,dimension:c,axisVisible:f,dimAxisType:U,dims:Z});return{legend:K,yAxis:function(e){for(var t=e.meaAxisName,i=e.meaAxisType,n=e.axisVisible,r=e.digit,a=e.scale,o=e.min,s=e.max,l={type:"value",axisTick:{show:!1},show:n},c=[],h=function(e){i[e]?c[e]=x({},l,{axisLabel:{formatter:function(t){return L(t,i[e],r)}}}):c[e]=x({},l),c[e].name=t[e]||"",c[e].scale=a[e]||!1,c[e].min=o[e]||null,c[e].max=s[e]||null},u=0;u<2;u++)h(u);return c}({meaAxisName:I,meaAxisType:G,axisVisible:f,digit:m,scale:v,min:j,max:A}),series:$({innerRows:a,metrics:W,stack:u,axisSite:s,isHistogram:!0,labelMap:w,itemStyle:F,label:C,showLine:N,dimAxisType:U,dimension:c,barGap:M,opacity:R,dims:Z}),xAxis:q,tooltip:D&&function(e){var t=e.axisSite,i=e.isHistogram,r=e.meaAxisType,a=e.digit,o=e.labelMap,s=i?t.right||[]:t.top||[];return o&&(s=s.map(function(e){return void 0===o[e]?e:o[e]})),{trigger:"axis",formatter:function(e){var t=[];return t.push(e[0].name+"<br>"),e.forEach(function(e){var i=e.seriesName,o=~s.indexOf(i)?r[1]:r[0];t.push(n(e.color)),t.push(i+": "),t.push(L(e.value,o,a)),t.push("<br>")}),t.join("")}}}({axisSite:s,isHistogram:!0,meaAxisType:G,digit:m,labelMap:w})}},T={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"v-charts-component-loading"},[t("div",{staticClass:"loader"},[t("div",{staticClass:"loading-spinner"},[t("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[t("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])])])])},staticRenderFns:[]},M={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"v-charts-data-empty"},[this._v(" 暂无数据 ")])},staticRenderFns:[]};function R(e,t){Object.keys(t).forEach(function(i){t[i]&&(e[i]=t[i])})}var P={render:function(e){return e("div",{class:[(t=this.$options.name||this.$options._componentTag,t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())],style:this.canvasStyle},[e("div",{style:this.canvasStyle,class:{"v-charts-mask-status":this.dataEmpty||this.loading},ref:"canvas"}),e(M,{style:{display:this.dataEmpty?"":"none"}}),e(T,{style:{display:this.loading?"":"none"}}),this.$slots.default]);var t},props:{data:{type:[Object,Array],default:function(){return{}}},settings:{type:Object,default:function(){return{}}},width:{type:String,default:"auto"},height:{type:String,default:"400px"},beforeConfig:{type:Function},afterConfig:{type:Function},afterSetOption:{type:Function},afterSetOptionOnce:{type:Function},events:{type:Object},grid:{type:[Object,Array]},colors:{type:Array},tooltipVisible:{type:Boolean,default:!0},legendVisible:{type:Boolean,default:!0},legendPosition:{type:String},markLine:{type:Object},markArea:{type:Object},markPoint:{type:Object},visualMap:{type:[Object,Array]},dataZoom:{type:[Object,Array]},toolbox:{type:[Object,Array]},initOptions:{type:Object,default:function(){return{}}},title:[Object,Array],legend:[Object,Array],xAxis:[Object,Array],yAxis:[Object,Array],radar:Object,tooltip:Object,axisPointer:[Object,Array],brush:[Object,Array],geo:[Object,Array],timeline:[Object,Array],graphic:[Object,Array],series:[Object,Array],backgroundColor:[Object,String],textStyle:[Object,Array],animation:Object,theme:Object,themeName:String,loading:Boolean,dataEmpty:Boolean,extend:Object,judgeWidth:{type:Boolean,default:!1},widthChangeDelay:{type:Number,default:300},tooltipFormatter:{type:Function},resizeable:{type:Boolean,default:!0},resizeDelay:{type:Number,default:200},changeDelay:{type:Number,default:0},setOptionOpts:{type:[Boolean,Object],default:!0},cancelResizeCheck:Boolean,notSetUnchange:Array},watch:{data:{deep:!0,handler:function(e){e&&this.changeHandler()}},settings:{deep:!0,handler:function(e){e.type&&this.chartLib&&(this.chartHandler=this.chartLib[e.type]),this.changeHandler()}},width:"nextTickResize",height:"nextTickResize",events:{deep:!0,handler:"createEventProxy"},theme:{deep:!0,handler:"themeChange"},themeName:"themeChange",resizeable:"resizeableHandler"},computed:{canvasStyle:function(){return{width:this.width,height:this.height,position:"relative"}},chartColor:function(){return this.colors||this.theme&&this.theme.color||i}},methods:{dataHandler:function(){if(this.chartHandler){var e=this.data,t=e,i=t.columns,n=void 0===i?[]:i,r=t.rows,a=void 0===r?[]:r,o={tooltipVisible:this.tooltipVisible,legendVisible:this.legendVisible,echarts:this.echarts,color:this.chartColor,tooltipFormatter:this.tooltipFormatter,_once:this._once};this.beforeConfig&&(e=this.beforeConfig(e));var s=this.chartHandler(n,a,this.settings,o);s&&("function"==typeof s.then?s.then(this.optionsHandler):this.optionsHandler(s))}},nextTickResize:function(){this.$nextTick(this.resize)},resize:function(){this.cancelResizeCheck?this.echartsResize():this.$el&&this.$el.clientWidth&&this.$el.clientHeight&&this.echartsResize()},echartsResize:function(){this.echarts&&this.echarts.resize()},optionsHandler:function(t){var i=this;if(this.legendPosition&&t.legend&&(t.legend[this.legendPosition]=10,~["left","right"].indexOf(this.legendPosition)&&(t.legend.top="middle",t.legend.orient="vertical")),t.color=this.chartColor,a.forEach(function(e){i[e]&&(t[e]=i[e])}),this.animation&&function(e,t){Object.keys(t).forEach(function(i){e[i]=t[i]})}(t,this.animation),this.markArea||this.markLine||this.markPoint){var n={markArea:this.markArea,markLine:this.markLine,markPoint:this.markPoint},r=t.series;z(r)?r.forEach(function(e){R(e,n)}):w(r)&&R(r,n)}this.extend&&function(e,t){Object.keys(t).forEach(function(i){var n=t[i];~i.indexOf(".")?j(e,i,n):"function"==typeof n?e[i]=n(e[i]):z(e[i])&&w(e[i][0])?e[i].forEach(function(t,r){e[i][r]=x({},t,n)}):w(e[i])?e[i]=x({},e[i],n):e[i]=n})}(t,this.extend),this.afterConfig&&(t=this.afterConfig(t));var o=this.setOptionOpts;!this.settings.bmap&&!this.settings.amap||w(o)||(o=!1),this.notSetUnchange&&this.notSetUnchange.length&&(this.notSetUnchange.forEach(function(e){var n=t[e];n&&(!function e(t,i){if(t===i)return!0;if(null===t||null===i||"object"!==k(t)||"object"!==k(i))return t===i;for(var n in t)if(H(t,n)){var r=t[n],a=i[n],o=k(r);if("undefined"===k(a))return!1;if("object"===o){if(!e(r,a))return!1}else if(r!==a)return!1}for(var s in i)if(H(i,s)&&"undefined"===k(t)[s])return!1;return!0}(n,i._store[e])?i._store[e]=E(n):t[e]=void 0)}),w(o)?o.notMerge=!1:o=!1),this.echarts.setOption(t,o),this.$emit("ready",this.echarts,t,e),this._once["ready-once"]||(this._once["ready-once"]=!0,this.$emit("ready-once",this.echarts,t,e)),this.judgeWidth&&this.judgeWidthHandler(t),this.afterSetOption&&this.afterSetOption(this.echarts,t,e),this.afterSetOptionOnce&&!this._once.afterSetOptionOnce&&(this._once.afterSetOptionOnce=!0,this.afterSetOptionOnce(this.echarts,t,e))},judgeWidthHandler:function(e){var t=this,i=this.widthChangeDelay,n=this.resize;this.$el.clientWidth||this.$el.clientHeight?n():this.$nextTick(function(e){t.$el.clientWidth||t.$el.clientHeight?n():setTimeout(function(e){n(),t.$el.clientWidth&&t.$el.clientHeight||console.warn(" Can't get dom width or height ")},i)})},resizeableHandler:function(e){e&&!this._once.onresize&&this.addResizeListener(),!e&&this._once.onresize&&this.removeResizeListener()},init:function(){if(!this.echarts){var i=this.themeName||this.theme||t;this.echarts=e.init(this.$refs.canvas,i,this.initOptions),this.data&&this.changeHandler(),this.createEventProxy(),this.resizeable&&this.addResizeListener()}},addResizeListener:function(){window.addEventListener("resize",this.resizeHandler),this._once.onresize=!0},removeResizeListener:function(){window.removeEventListener("resize",this.resizeHandler),this._once.onresize=!1},addWatchToProps:function(){var e=this,t=this._watchers.map(function(e){return e.expression});Object.keys(this.$props).forEach(function(i){if(!~t.indexOf(i)&&!~r.indexOf(i)){var n={};~["[object Object]","[object Array]"].indexOf(A(e.$props[i]))&&(n.deep=!0),e.$watch(i,function(){e.changeHandler()},n)}})},createEventProxy:function(){var e=this,t=this,i=Object.keys(this.events||{});i.length&&i.forEach(function(i){-1===e.registeredEvents.indexOf(i)&&(e.registeredEvents.push(i),e.echarts.on(i,function(e){return function(){if(e in t.events){for(var i=arguments.length,n=Array(i),r=0;r<i;r++)n[r]=arguments[r];t.events[e].apply(null,n)}}}(i)))})},themeChange:function(e){this.clean(),this.echarts=null,this.init()},clean:function(){this.resizeable&&this.removeResizeListener(),this.echarts.dispose()}},created:function(){this.echarts=null,this.registeredEvents=[],this._once={},this._store={},this.resizeHandler=O(this.resize,this.resizeDelay),this.changeHandler=O(this.dataHandler,this.changeDelay),this.addWatchToProps()},mounted:function(){this.init()},beforeDestroy:function(){this.clean()},_numerify:y};return x({},P,{name:"VeHistogram",data:function(){return this.chartHandler=N,{}}})},e.exports=n(i("Icdr"),i("Oq2I"),i("80cc"),i("GbHy"))}});