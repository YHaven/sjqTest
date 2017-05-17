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
		var params = {}
		that.setData({
      billData: {}
		})
    plana.getPersonalInfo.call(that, config.apiList.plana.getShowRentalAllCount,params,function(res){
      if (res.data.status){
        that.setData({
          billData: res.data
        })
      }else{

      }
      
      wx.hideNavigationBarLoading()
		});
	},
  setBill: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../cashEdit/cashEdit'
    })
  },
  viewNavDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: data.url
    })
  }
})