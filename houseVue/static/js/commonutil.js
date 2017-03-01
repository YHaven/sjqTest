/*
*yhw add by 20161223 
*全局配置
*/
var planPro = planPro || {};

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

planPro.rentalFun = {
  //计算水电煤
  testSDMCount: function(){
    var d = Number($('#electricNow').val()) - Number($('.electricPre').text());
    var s = Number($('#waterNow').val()) - Number($('.waterPre').text());
    var m = Number($('#gasNow').val()) - Number($('.gasPre').text());
    var dp = d*Number($('.electricPre').attr('price'));
    if(d<0) dp = 0;
    var sp = s*Number($('.waterPre').attr('price'));
    if(s<0) sp = 0;
    var mp = m*Number($('.gasPre').attr('price'));
    if(m<0) mp = 0;
    console.log("dp:"+dp);
    $('.zs .d').text(dp.toFixed(2));
    $('.zs .s').text(sp.toFixed(2));
    $('.zs .m').text(mp.toFixed(2));
    var all = (dp+sp+mp).toFixed(2);
    $('#sdmCount').val(all);
    $('.all-count').text(all);
    var allCount = Number($('#rental').val())+Number($('#sdmCount').val());
    $('#allCount').val(allCount.toFixed(2));
  },
  //计算总价
  testAllCount:function(){
    var allCount = Number($('#rental').val())+Number($('#sdmCount').val());
    $('#allCount').val(allCount.toFixed(2));
  }
}