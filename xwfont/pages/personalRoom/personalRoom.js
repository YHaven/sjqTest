var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		dataList:[],
		hasMore: true,
		start:1,
		showLoading: true
	},
	onShow: function() {
		var that = this
		wx.showNavigationBarLoading()
		var params = {
						page:1
					}
		that.setData({
			dataList: []
		})
		plana.getPersonalList.call(that,config.apiList.plana.getRoomList,params,function(res){
			wx.hideNavigationBarLoading()
		});
	},
	onPullDownRefresh: function() {
		var that = this
		
		that.onShow()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			var params = {
						page:that.data.start
					}
			plana.getPersonalList.call(that,config.apiList.plana.getRoomList,params);
		}
	},
	viewData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalHouseInfo/personalHouseInfo?id=" + data.id
		})
	},
	addData:function(){

	}
})