var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
  data: {
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.setData({
			orderId:options.orderId
		})
		that.getUserType();
		that.getOrderInfo(options.orderId);
		
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
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		console.log(userInfo)
		that.setData({
			userInfo: userInfo
		});
	},
	toPay:function(){
		var that = this;
		var url = config.wxApi.wxPrePay;
		var params = {}
		params.orderId = that.data.orderInfo.orderInfo.id;
		
		util.postData.call(that,url,params,function(res){
			// console.log(res)
			if(res.data.err == 0){
				wx.requestPayment({
					'timeStamp': ''+res.data.data.timeStamp,
					'nonceStr': res.data.data.nonceStr,
					'package': 'prepay_id='+res.data.data.package,
					'signType': res.data.data.signType,
					'paySign': res.data.data.paySign,
					'success':function(res){
						that.getOrderInfo(params.orderId);
						wx.showModal({
							title: '提示',
							content: '支付成功。'
						})
					},
					'fail':function(res){
						wx.showModal({
							title: '提示',
							content: '支付失败。'
						})
					}
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
	onShareAppMessage: function () {
		return {
			title: config.title,
			desc: config.desc,
			path: config.wxpath
		}
	},
	chooseImg:function(){
		var that = this;
		util.uploadImg(config.path,{},function(res){
			console.log('图片上传'+res);
		})
    
    }
})