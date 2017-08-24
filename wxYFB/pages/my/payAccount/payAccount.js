var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		userInfo:{},
		shopName:'',
		alipayAccount:'',
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.getUserType();
		that.setData({
			shopName:options.shopName,
			alipayAccount:options.alipayAccount
		})
	},
	bindAlipayAccountInput:function(e){
		this.setData({
			alipayAccount: e.detail.value
		})
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
	saveInfo:function(){
		var that = this;
		var url = config.wxApi.editShopInfo;
		var params = {}
		params.uid = that.data.userInfo.userId;
		params.shopName = that.data.shopName;
		params.alipayAccount = that.data.alipayAccount;
		if(params.alipayAccount == ''){
			wx.showModal({
				title: '提示',
				content: '账号不能为空'
			})
			return false;
		}
		util.postData.call(that,url,params,function(res){
			// console.log(res)
			if(res.data.err == 0){
				var newUserInfo = that.data.userInfo;
				newUserInfo.oUserInfo.alipayaccount = that.data.alipayAccount,
				wx.setStorage({
					key: 'person_info',
					data: newUserInfo
				})
				wx.showToast({
					title: '保存成功！',
					icon: 'success',
					duration: 3000
				})
				wx.navigateBack({
					delta: 1
				})
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