var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		shopName:'',
		alipayAccount:'',
		userInfo:{},
		allOrderAmount:0.00,
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onShow:function(){
		var that = this;
		that.getUserType();
		that.getUserInfo();
		// var oUserInfo = that.data.userInfo.oUserInfo;
		// that.setData({
		// 	shopName:oUserInfo.shopname,
		// 	alipayAccount:oUserInfo.alipayaccount,
		// 	allOrderAmount:oUserInfo.SellerAllOrderAmount
		// });

	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		
		
	},
	getUserInfo:function(){
		var that = this;
		var url = config.wxApi.getUserInfo;
		var params = {}
		params.uid = that.data.userInfo.userId;

		util.postData.call(that,url,params,function(res){
			console.log(res)
			if(res.data.err == 0){
				
				that.setData({
					shopName:res.data.data.shopname,
					alipayAccount:res.data.data.alipayaccount,
					allOrderAmount:res.data.data.SellerAllOrderAmount
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
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		//console.log(userInfo)
		that.setData({
			userInfo: userInfo
		});
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