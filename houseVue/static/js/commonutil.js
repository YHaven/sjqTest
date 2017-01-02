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
	},
	serializeArrayToJson:function(a){
		// var a = searchForm.serializeArray();
        var o = {};
        var oStr = '';
        $.each(a, function () {
            if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
              }

              if(this.value !== '') oStr += ',' +this.value;
              o[this.name].push(this.value || '');
            } else {
              o[this.name] = this.value || '';
              if(this.value !== '') oStr += '&'+this.name +'=' +this.value;
            }
        });
        return o;
	}
}