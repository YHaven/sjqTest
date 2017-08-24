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
		var scene = decodeURIComponent(options.scene);
		that.setData({
			goodsImgList: options.goodsImgList
		})
		that.getInviteCode(options);
		// that.getUserType();
		// that.getUserAdds();
		// orderId = 14
	},
	onShow:function(){
		var that = this;
		that.getUserType();
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
		wx.scanCode({
			onlyFromCamera: false,
			success: (res) => {
				console.log(res)
				wx.showModal({
				title: '提示',
				content: res.result,
				success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
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
		console.log(params)
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
	submitForm:function(){
		var that = this;
		var params = {}
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
		// params.uid = that.data.userInfo.userId;
		params.sid = that.data.userInfo.sid;
		params.orderId = that.data.orderId;
		params.orderAmount = Number(that.data.orderAmount);
		params.goodsNumber = Number(that.data.goodsNumber);


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
			console.log(res)
			if(res.data.err == 0){
				wx.navigateTo({
					url: '../../order/gathering/gathering?orderId='+res.data.data.id
				})
				
			}
			
		});
	},
	bindorderAmountInput: function(e) {
		var that = this;
		
		that.setData({
			orderAmount: e.detail.value
		})
		that.checkForm();
	},
	bindgoodsNumberInput: function(e) {
		var that = this;
		
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