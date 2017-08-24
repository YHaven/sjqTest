var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.getUserType();
		if(typeof options.orderId != 'undefined' && options.orderId !='' ){
			that.getOrderInfo(options.orderId);
			that.getWXAcodeUnLimit(options.orderId);
		}
		
	},
	getInviteCode: function (options) {
		if (options.uid != undefined) {
			wx.showToast({
				title: '来自用户:' + options.uid + '的分享',
				icon: 'success',
				duration: 2000
			})
		}
	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
	getOrderInfo:function(orderId){
		var that = this;
		var url = config.wxApi.getOrderInfo;
		var params = {}
		params.orderId = orderId;
		util.postData.call(that,url,params,function(res){
			//console.log(res)
			if(res.data.err == 0){
				that.setData({
					orderInfo: res.data.data
				});
			}else{
				util.message.show.call(that,{
					content: res.data.mes,
					icon: 'null',
					duration: 3000
				})
			}
			
		});
	},
	//截屏保存
	captureScreen:function(){

		if (wx.captureScreen) {
			wx.captureScreen({
				success(res) {
					console.log(res.tempFilePath)
				},
				fail(res){
					wx.showModal({
						title: '提示',
						content: '截屏失败,请手动截屏。'
					})
				}
			})
		} else {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
		
	},
	getWXAcodeUnLimit:function(orderId){

		var that = this;
		var url = config.wxApi.getERcode;
		var params = {}
		params.sid = that.data.userInfo.sid;
		params.orderId = orderId;
		params.scene=that.data.userInfo.sid+'-'+orderId;
		util.postData.call(that,url,params,function(res){
			console.log(res)
			if(res.data.err == 0){
				that.setData({
					tcode: res.data.data
				});
			}else{
				util.message.show.call(that,{
					content: res.data.mes,
					icon: 'null',
					duration: 3000
				})
			}
			
		});

	},
	viewNavDetail:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: data.url
		})
	},
	onShareAppMessage: function () {
		return {
			title: config.title,
			desc: config.desc,
			path: config.wxpath
		}
	}
})