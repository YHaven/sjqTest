var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		images:[],
		orderId:'',
		goodsImgList:'',
		userInfo:{},
		checkForm:false,
		orderAmount:'',
		goodsNumber:'',
		userAddress:{}
	},
	onLoad: function (options) {
		var that = this;
		var scene = decodeURIComponent(options.goodsImgList);
		that.setData({
			goodsImgList: options.goodsImgList
		})
		that.getInviteCode(options);
		that.getUserType();
		// that.getUserAdds();
		// orderId = 14
	},
	onShow:function(){
		var that = this;
		
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
	viewNavDetail:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: data.url
		})
	},
	
	scanCode:function(){
		var that = this;
		wx.scanCode({
			onlyFromCamera: false,
			success: (res,scanType,charSet,path) => {
				var newUserInfo = that.data.userInfo;
				var getPath = res.path;
				var sid = getPath.substring(res.path.indexOf('?sid=')+5,res.path.length);

				if(that.data.userInfo.userId == sid){
					wx.showModal({
						title: '提示',
						content: '不能添加自己为商家。'
					})
					return false;
				}


				newUserInfo.sid = sid;
				wx.setStorage({
					key: 'person_info',
					data: newUserInfo
				})
				that.setData({
					userInfo: newUserInfo
				});

				that.getSIDInfo()
			}
		})
	},
	getSIDInfo:function(){
		var that = this;
		var params = {}
		params.uid = that.data.userInfo.sid;
		


		util.postData.call(that,config.wxApi.getUserInfo,params,function(res){
			// console.log(res)
			if(res.data.err == 0){
				var userInfo = that.data.userInfo;
				userInfo.oUserInfo = res.data.data;
				that.setData({
					userInfo: userInfo
				});
                // console.log(userInfo)
				that.checkForm();
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
	checkForm:function(){
		var that = this;
		var params = {}
		params.sid = that.data.userInfo.sid;
		params.orderId = that.data.orderId;
		params.orderAmount = Number(that.data.orderAmount);
		params.goodsNumber = Number(that.data.goodsNumber);




		that.setData({
			checkForm:false
		})

		if(params.sid == '' || params.sid == '0'){
			return;
		}

		if( isNaN(params.orderAmount)|| params.orderAmount == 0){
			return;
		}
		
		if(isNaN(params.goodsNumber) || params.goodsNumber == 0){
			return;
		}
		that.setData({
			checkForm:true
		})
		
	},
	toPay:function(orderId){
		// var data = e.currentTarget.dataset;
		var that = this;
		var url = config.wxApi.wxPrePay;
		var params = {}
		params.orderId = orderId;
		
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
	submitForm:function(){
		var that = this;
		var params = {};
		params.goodsImgList = that.data.goodsImgList;
		var orderImgList = '';
		var orderImgId = [];
		var nowImages = that.data.images;
		for(var i = 0;i<nowImages.length;i++){
			orderImgId.push(nowImages[i].imgId);
		}
		if(orderImgId.length>0){
			orderImgList  = orderImgId.join(',');
		}
		params.orderImgId = orderImgList;
		params.uid = that.data.userInfo.userId;
		params.sid = that.data.userInfo.sid;
		params.orderId = that.data.orderId;
		params.orderAmount = Number(that.data.orderAmount);
		params.goodsNumber = Number(that.data.goodsNumber);

		console.log(params)
		if(params.sid == '' || params.sid == '0'){
			util.message.show.call(that,{
				content: '该订单未绑定商家',
				icon: 'null',
				duration: 3000
			})
			return;
		}

		if( isNaN(params.orderAmount)|| params.orderAmount == 0){
			
			util.message.show.call(that,{
				content: '总金额需填写数字',
				icon: 'null',
				duration: 3000
			})
			return;
		}else if(!/^-?\d+\.?\d{0,2}$/.test(params.orderAmount)){
			util.message.show.call(that,{
				content: '总金额需填写数字',
				icon: 'null',
				duration: 3000
			})
			return;
		}

		if(isNaN(params.goodsNumber) || params.goodsNumber == 0){
			util.message.show.call(that,{
				content: '总件数需填写数字',
				icon: 'null',
				duration: 3000
			})
			return;
		}
		

		util.postData.call(that,config.wxApi.doneOrder,params,function(res){
			//console.log(res)
			if(res.data.err == 0){

				that.toPay(res.data.data.id);
				// wx.navigateTo({
				// 	url: '../../my/orderDetail/orderDetail?orderId='+that.data.orderId
				// })
				
			}
			
		});
	},
	bindorderAmountInput: function(e) {
		var that= this;
		
		that.setData({
			orderAmount: e.detail.value
		})
		that.checkForm();
	},
	bindgoodsNumberInput: function(e) {
		var that= this;
		
		that.setData({
			goodsNumber: e.detail.value
		})
		that.checkForm();
	},
	removeImg:function(e){
		var that = this;
		var data = e.currentTarget.dataset;
		var removeIndex = data.index;
		
		var newImgArray = that.data.images;
		var removeImg = newImgArray[removeIndex];
		var params = {}
		params.imgId = removeImg.imgId;
		params.upTypt = 1;
		params.orderId = that.data.orderId;
		util.postData.call(that,config.wxApi.deleImg,params,function(res){
			console.log(res)
			if(res.data.err == 0){
				newImgArray = newImgArray.slice(0,removeIndex).concat(newImgArray.slice(removeIndex+1,newImgArray.length));
				that.setData({
					images: newImgArray
				})
			}
			
		});


		
		// this.slice(0,n).concat(this.slice(n+1,this.length))
	},
	chooseImg:function(){
		var that = this;
		var url = config.wxApi.uploadImg;
		url += '&orderId='+that.data.orderId;
		url += '&upTypt=1';
		console.log('url'+url);
		util.uploadImg(url,{},function(res){
			// console.log(res);
			var data = JSON.parse(res.data);
			if(data.err == 0){
				var imagesArray = that.data.images;
				var imageObj = {};
				imageObj.imgId = data.data.imgId;
				imageObj.savePath = data.data.savePath[0];
				imagesArray.push(imageObj);

				console.log(imagesArray)
				that.setData({
					images: imagesArray
				})
			}
		})
    
    }
})