/*
*yhw add by 20161223 
*全局配置
*/
var planPro = planPro || {};
planPro.homePath = '';
//ajax地址
planPro.fun = {
	getQueryString : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return encodeURIComponent(r[2]);
	    }
	    return null;
	}
}