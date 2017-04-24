var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		title: '文章详情',
		content:'',
		hasMore: true,
		showLoading: true
	},
	onLoad: function() {
		var that = this
		console.log(this.data.filmDetail.id);
		//wx.showNavigationBarLoading()
		//wx.hideNavigationBarLoading()
		var params = {id:1}
		plana.getMessageDetail.call(that,config.apiList.plana.getMessageDetail,params)
		// app.getCity(function(){
		// 	wx.hideNavigationBarLoading()
		// 	wx.setNavigationBarTitle({
		// 		title: '首页 - ' + config.city
		// 	})
		// 	plana.getMessageList.call(that, config.apiList.plana.getMessageList, that.data.start, that.data.msgResource)
		// })
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			hasMore: true,
			showLoading: true
		})
		this.onLoad()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			plana.getMessageList.call(that, config.apiList.plana.getMessageList, that.data.start, that.data.msgResource)
		}
	}
})