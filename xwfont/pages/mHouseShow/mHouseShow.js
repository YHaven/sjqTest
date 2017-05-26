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
        var resData = res.data;
        if(resData.monthOut == '.00'){
          resData.monthOut = '0.00'
        }
        that.setData({
          billData: resData
        })
      }else{
        that.setData({
          billData: {
            monthIn:'0.00',
            monthOut:'0.00',
            yearIn:'0.00'
          }
        })
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
  },
  viewCashList:function(e){
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../cashList/cashList'
    })
  }

})