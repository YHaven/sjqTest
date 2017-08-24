var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		userInfo:{},
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.getUserType();
		that.getWXAcodeUnLimit();
		
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
	getWXAcodeUnLimit:function(){
		// var access_token = util.getAccessToken();
		// console.log('access_token:'+access_token);

		var that = this;
		var url = config.wxApi.getERcode;
		var params = {}
		params.scene = "that.data.userInfo.userId";
		params.width="430";

		// util.postData.call(that,url,params,function(res){
		// 	console.log(res)
		// 	if(res.data.err == 0){
				
		// 		wx.showToast({
		// 			title: '获取成功！',
		// 			icon: 'success',
		// 			duration: 3000
		// 		})
		// 	}else{
		// 		util.message.show.call(that,{
		// 			content: res.data.mes,
		// 			icon: 'null',
		// 			duration: 3000
		// 		})
		// 	}
			
		// });

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