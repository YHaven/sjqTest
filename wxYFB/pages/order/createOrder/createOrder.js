var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		hasMore: true,
		start:1,
		showLoading: true,
		dataList:[],
		images:[],
		userInfo:{},
		orderId:'',
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	// onShow:function(){
	// 	var that = this
	// 	wx.showNavigationBarLoading()
	// 	var params = {
	// 					page:1
	// 				}
	// 	that.setData({
	// 		dataList: []
	// 	})
	// 	util.postData.call(that,config.homepath,params,function(res){
	// 		wx.hideNavigationBarLoading()
	// 	});
	// },
	onLoad: function (options) {
		var that = this;
		that.setData({
			dataList: []
		})
		that.getUserType();
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
	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
	removeSid:function(){
		var that = this;
		if(userInfo.userType == '0'){
			var newUserInfo = that.data.userInfo;
			newUserInfo.sid = '';
			that.setData({
				userInfo: newUserInfo
			});
		}
	},
	addOrderN:function(){
		var that = this;
		var goodsImgList = '';
		var goodsImgId = [];
		var nowImages = that.data.images;
		for(var i = 0;i<nowImages.length;i++){
			goodsImgId.push(nowImages[i].imgId);
		}
		if(goodsImgId.length>0){
			goodsImgList  = goodsImgId.join(',');
		}else{
			wx.showModal({
				title: '提示',
				content: '请上传图片。'
			})
			return false;
		}
		var toUrl = '../createOrderDetail/createOrderDetail?goodsImgList='+goodsImgList;
		if(that.data.userInfo.userType == '1'){
			toUrl = '../createOrderSeller/createOrderSeller?goodsImgList='+goodsImgList;
		}
		//console.log('orderId'+orderId)
		wx.navigateTo({
			url: toUrl
		})
	},
	addOrder:function(){
		var that = this;
		var params = {};
		if(that.data.userInfo.userType == '0'){
			params.uid  = that.data.userInfo.userId;
			params.sid  = '';
		}else{
			params.uid  = '';
			params.sid  = that.data.userInfo.sid;
		}
		
		
		params.orderId = that.data.orderId;
		//console.log(params)
		var goodsImgId = [];
		var nowImages = that.data.images;
		for(var i = 0;i<nowImages.length;i++){
			goodsImgId.push(nowImages[i].imgId);
		}
		if(goodsImgId.length>0){
			wx.showNavigationBarLoading()
			params.goodsImgList  = goodsImgId.join(',');
			util.postData.call(that,config.wxApi.addOrder,params,function(res){
				//console.log(res)
				wx.hideNavigationBarLoading()
				if(res.data.err == 0){
					var orderId = res.data.data.id;
					var userInfo = that.data.userInfo;
					userInfo.sid = res.data.data.sid;   //绑定商家了？
					that.setData({
						orderId:orderId,
						userInfo:userInfo
					});

					wx.setStorage({
						key: 'person_info',
						data: userInfo
					})
					
					var toUrl = '../createOrderDetail/createOrderDetail?orderId='+orderId;
					if(that.data.userInfo.userType == '1'){
						toUrl = '../createOrderSeller/createOrderSeller?orderId='+orderId;
					}

					//console.log('orderId'+orderId)
					wx.navigateTo({
						url: toUrl
					})
				}
				
			});
		}else{
			// util.message.show.call(that,{
			// 	content: '请添加商品图片',
			// 	icon: 'null',
			// 	duration: 3000
			// })
		}
		
	},
	removeImg:function(e){
		var that = this;
		var data = e.currentTarget.dataset;
		var removeIndex = data.index;
		
		var newImgArray = that.data.images;
		var removeImg = newImgArray[removeIndex];
		var params = {}
		params.imgId = removeImg.imgId;
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
		var params = {};
		params.uid = that.data.userInfo.userId;
		//console.log(params);
		util.uploadImg(config.wxApi.uploadImg,params,function(res){
			console.log(res);
			var data = JSON.parse(res.data);
			if(data.err == 0){
				var imagesArray = that.data.images;
				var imageObj = {};
				imageObj.imgId = data.data.imgId;
				imageObj.savePath = data.data.savePath[0];
				imagesArray.push(imageObj);
				// console.log(imagesArray)
				that.setData({
					images: imagesArray
				})
			}
		})
    
    }
})