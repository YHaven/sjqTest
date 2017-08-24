var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		bannerList: [],
		newUnpay:{},
		newPayed:{},
		userInfo:{}
	},
	onLoad: function (options) {
		var that = this;
		
		that.getInviteCode(options);
		
	},
	onShow:function(){
		var that = this;
		that.getUserType();
		that.getUserAdds();
		if(that.data.userInfo.userType == '0'){
			//买家
			that.getBuyerData();
		}
		if(that.data.userInfo.userType == '1'){
			//卖家
			that.getSellerData();
		}
	},
	toPay:function(e){
		var data = e.currentTarget.dataset;
		var that = this;
		var url = config.wxApi.wxPrePay;
		var params = {}
		params.orderId = data.id;
		
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
	getBuyerData:function(){
		var that = this;
		var url = config.wxApi.buyerIndex;
		var params = {};
		params.openId = that.data.userInfo.openId;
		util.postData.call(that,url,params,function(res){
			//console.log(res);
			var newUnpay = {};
			var newPayed = {};
			if(res.data.err == 0){
				var resData = res.data.data;
				that.loadBanner(resData.banner);
				if(resData.newUnpay != null){
					newUnpay = resData.newUnpay;
				}
				if(resData.newPayed != null){
					newPayed = resData.newPayed;
				}
				that.setData({
					newUnpay: newUnpay,
					newPayed:newPayed,
				});
			}
			
		});

	},
	getSellerData:function(){
		var that = this;
		var url = config.wxApi.sellerIndex;
		var params = {};
		params.openId = that.data.userInfo.openId;
		util.postData.call(that,url,params,function(res){
			//console.log(res);
			var newUnpay = {};
			var newPayed = {};
			if(res.data.err == 0){
				var resData = res.data.data;
				that.loadBanner(resData.banner);
				if(resData.newUnpay != null){
					newUnpay = resData.newUnpay;
				}
				if(resData.newPayed != null){
					newPayed = resData.newPayed;
				}
				that.setData({
					newUnpay: newUnpay,
					newPayed:newPayed,
				});
			}
			
		});

	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
	getUserAdds:function(){
		var that = this;
		var params = {}
		params.uid = that.data.userInfo.userId;
		util.postData.call(that,config.wxApi.getUserAddr,params,function(res){
			// console.log(res)
			if(res.data.err == 0){
				that.setData({
					userAddress: res.data.data[0]
				});
			}
			
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
	loadBanner: function (banner) {
		// [{"img":"","title":"","url":""}]
		var that = this;
		var defaultBanner = {};
		defaultBanner.ad_img="../../../images/banner.jpg";
		// banner = [];
		var bannerArray = [];
		if(banner.length<=0){
			bannerArray.push(defaultBanner);
		}else{
			for(var i=0;i<banner.length;i++){
				bannerArray.push(banner[i])
			}
		}
		that.setData({
			bannerList: bannerArray
		});
	},
	viewBannerDetail:function(e){
		var that= this;
		var data = e.currentTarget.dataset;
		// console.log(data.url);
		if(data.url){
			wx.navigateTo({
				url: data.url
			})
		}
		
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
		if(data.url.indexOf('order/createOrder/createOrder')>0 && that.data.userInfo.userType != '1'){

			if(!that.data.userAddress){
				//去添加地址
				wx.showModal({
					title: '提示',
					content: '未添加收货地址,请先添加。',
					success: function(res) {
						if (res.confirm) {
							wx.navigateTo({
								url: '../../order/address/address?comeform=home'
							});
						} else if (res.cancel) {
							
						}
					}
				})
				
				return false;
			}
			
		}

		


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