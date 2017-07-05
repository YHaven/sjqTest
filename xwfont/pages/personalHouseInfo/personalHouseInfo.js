var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')

Page({
  data:{
    dataInfo:{}
  },
  onLoad:function(options){
    var that = this
    wx.showNavigationBarLoading()
    if (options.id){
      var params = {
        id: options.id
      }
      that.setData({
         id:options.id
        })
    }else{
      var params = {}
    }
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getRoomInfo,params,function(res){
      if (res.data.status){
        that.setData({
          dataInfo:res.data.data
        })
      }
     
			wx.hideNavigationBarLoading()
		});
  }
})