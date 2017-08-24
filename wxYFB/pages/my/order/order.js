var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}



Page({
	data: {
		years: years,
		year: date.getFullYear(),
		months: months,
		month: date.getMonth()<10?'0'+(date.getMonth()+1):date.getMonth(),
		value: [date.getFullYear(), date.getMonth()],
		selectDate:false,
		hasMore: true,
		start:1,
		showLoading: true,
		dataList:[],
		formatDataList:[],
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		// that.getInviteCode(options);
		that.getUserType();
	},
	onShow:function(){
		var that = this
		wx.showNavigationBarLoading()
		var params = {
						page:1
					}
		that.setData({
			dataList: [],
			formatDataList:[],
			start:1,
			hasMore:true
		})
		that.getOrderList(params,function(res){
			if(res.data.err ==0){
				that.setData({
					InAllAmount:res.data.data.InAllAmount,
					OutAllAmount:res.data.data.OutAllAmount
				})

				that.dataFormat();
			}
			
			wx.hideNavigationBarLoading();
		})
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
	dataFormat:function(){
		var that = this;
		var dataList = that.data.dataList;
		// console.log(dataList)
		var formatData = [];
		var itemData = [];
		var itemDate = '';
		var newData = {};
		if(dataList.length<=0){
			return;
		}
		for(var i = 0;i<dataList.length;i++){

			
			if(dataList[i].Day != itemDate && itemDate !=''){
				// console.log(itemDate);
				newData = {};
				newData.Day = itemDate;
				newData.itemData = itemData;
				formatData.push(newData);
				itemData = [];
			}
			
			itemData.push(dataList[i]);
			itemDate = dataList[i].Day;
			
		}
		newData = {};
		newData.Day = dataList[dataList.length-1].Day;
		newData.itemData = itemData;
		formatData.push(newData);

		that.setData({
			formatDataList:formatData
		})

		// console.log(formatData);
	},

	onPullDownRefresh: function() {
		var that = this
		
		that.onShow()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			var params = {
						page:that.data.start
					}
			that.getOrderList(params,function(res){

				that.dataFormat();
				wx.hideNavigationBarLoading();
			})
		}
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
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		console.log(userInfo)
		that.setData({
			userInfo: userInfo
		});
	},
	getOrderList:function(params,cb){
		var that = this;
		var url = config.wxApi.getOrderList;

		params.uid = that.data.userInfo.userId;
		params.startTime = that.data.year+'-'+that.data.month+'-01 00:00:00';
		params.endTime = util.getNextMonth(that.data.year+'-'+that.data.month+'-01')+' 00:00:00';
		util.postDataList.call(that,url,params,cb);
	},
	searchDateChange:function(e){
		const val = e.detail.value
		this.setData({
			year: this.data.years[val[0]],
			month: this.data.months[val[1]] <10?'0'+this.data.months[val[1]]:this.data.months[val[1]],
			value: [this.data.years[val[0]], this.data.months[val[1]]-1]
		})
	},
	showSelectDate:function(){
		var that = this;
		that.setData({
			selectDate:true
		})
	},
	closeDate:function(){
		var that = this;
        
		that.setData({
			selectDate:false
		})
		that.onShow();
	},
	onShareAppMessage: function () {
		return {
			title: config.title,
			desc: config.desc,
			path: config.wxpath
		}
	}
})