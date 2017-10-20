var util = require('../../../utils/util.js')
Page({
	data: {
		userInfo:{},
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.getUserType()
		that.getUserAdds();
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
	selectRole: function () {
		var that = this;
		var newUserInfo = that.data.userInfo;
		// console.log(newUserInfo);
		if(newUserInfo.userType == '1'){
			newUserInfo.sid = '';
			newUserInfo.userType = '0';
		}else{
			newUserInfo.sid = newUserInfo.userId;
			newUserInfo.userType = '1';
		}
		wx.setStorage({
			key: 'person_info',
			data: newUserInfo
		});

		wx.redirectTo({
				url: '../../index/home/home'
			});
		// that.setData({
		// 	userInfo: newUserInfo
		// });
	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		// console.log(userInfo)
		that.setData({
			userInfo: userInfo
		});
	},
	getUserAdds:function(){
		var that = this;
		var params = {}
		params.uid = that.data.userInfo.userId;
    util.postData.call(that,util.config.wxApi.getUserAddr,params,function(res){
			// console.log(res)
			if(res.data.err == 0){
				that.setData({
					userAddress: res.data.data[0]
				});
			}
			
		});
	},
	viewNavDetail:function(e){
		var that= this;
		var data = e.currentTarget.dataset;

		if(data.url.indexOf('index/home/home')>0){
			wx.redirectTo({
				url: data.url
			});
			return false;
		}

		if(data.url.indexOf('my/my/my')>0){
			wx.redirectTo({
				url: data.url
			});
			return false;
		}

		


		wx.navigateTo({
			url: data.url
		})
	},
	onShareAppMessage: function () {
		return {
      title: util.config.title,
      desc: util.config.desc,
      path: util.config.wxpath
		}
	}
})