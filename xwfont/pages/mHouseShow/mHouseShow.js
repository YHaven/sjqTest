var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
    billData:{},
		showLoading: true
	},
	onShow:function(){
		var that = this
		wx.showNavigationBarLoading()
		var params = {
						page:1
					}
		that.setData({
      billData: {}
		})
    plana.getPersonalInfo.call(that,config.apiList.plana.getHouseList,params,function(res){
			wx.hideNavigationBarLoading()
		});
	},
  viewNavDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: data.url
    })
  }
})