var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		userInfo:{}
	},
	onShow:function(){
		var that = this;
		that.getUserType();
	},
	onLoad: function (options) {
		var that = this;
		var scene = decodeURIComponent(options.scene);
		console.log('scene:'+scene);
		// scene = '8-192';
		if(typeof scene !='undefined' && scene != '' && scene !='undefined'){
			that.updateOrderBuyer(scene.split('-')[1])
			// wx.navigateTo({
			// 	url: '../../my/orderDetail/orderDetail?orderId='+scene.split('-')[1]
			// })
		}

	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		//console.log(userInfo)
		that.setData({
			userInfo: userInfo
		});
	},
	updateOrderBuyer:function(orderId){
		var that = this;
		var url = config.wxApi.updateOrderBuyer;
		var params = {}
		params.orderId = orderId;
		var newUserInfo = that.data.userInfo;
		if(newUserInfo == null || newUserInfo == '' || !newUserInfo.openId){
			that.getUserType();
			newUserInfo = that.data.userInfo;
		}

		params.uid = newUserInfo.userId;
		util.postData.call(that,url,params,function(res){
			//console.log(res)
			if(res.data.err == 0){
				wx.navigateTo({
					url: '../../my/orderDetail/orderDetail?orderId='+orderId
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
	selectRole: function (e) {
		var that = this;
		var usertype = e.currentTarget.dataset.usertype;
		// console.log(usertype);
		var newUserInfo = that.data.userInfo;
		if(newUserInfo == null || newUserInfo == '' || !newUserInfo.openId){
			that.getUserType();
			newUserInfo = that.data.userInfo;
		}
		
		newUserInfo.userType = usertype;
		if(usertype == '1'){
			newUserInfo.sid = newUserInfo.userId;
		}else{
			newUserInfo.sid = '';
		}
		wx.setStorage({
			key: 'person_info',
			data: newUserInfo
		})
		//console.log(newUserInfo);
		wx.redirectTo({
			url: "../home/home"
		});
	},
	onShareAppMessage: function () {
		return {
			title: config.title,
			desc: config.desc,
			path: config.wxpath
		}
	}
})