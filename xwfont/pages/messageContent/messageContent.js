var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		title: '文章详情',
		content:'',
		hasMore: true,
		start:1,
		showLoading: true,
		showBlock:true,
		tapContent:false
	},
	onLoad: function(options) {
		var that = this
		wx.showNavigationBarLoading()
		var params = {id:options.id}
		
		plana.getMessageDetail.call(that,config.apiList.plana.getMessageDetail,params,function(res){
			that.setData({
				messageDetailId: options.id
			})
			wx.hideNavigationBarLoading()
		});
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			hasMore: true,
			showLoading: true
		})
		var data = {
			id: this.data.messageDetailId
		}
		this.onLoad(data)
	},
	onReachBottom: function() {
		var that = this
	},
	onResponseMessage:function(){
		var that = this
		that.setData({
			showBlock: false
		})
	},
	cancelBlock:function(){
		var that = this
		that.setData({
			showBlock: true
		})
	},
	sendResponse:function(){
		console.log('xxsend')
	}
})