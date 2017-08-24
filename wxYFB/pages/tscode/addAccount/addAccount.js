var config = require('../../../utils/config.js')
Page({
	data: {
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
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