var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		dataList:[],
		hasMore: true,
		start:1,
		showLoading: true
	},
	onLoad: function() {
		var that = this
		wx.showNavigationBarLoading()
		var params = {
						page:that.data.start
					}
		plana.getPersonalList.call(that,config.apiList.plana.getHouseList,params,function(res){

			wx.hideNavigationBarLoading()
		});
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			dataList: [],
			hasMore: true,
			showLoading: true,
			start: 1
		})
		this.onLoad()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			var params = {
						page:that.data.start
					}
			plana.getPersonalList.call(that,config.apiList.plana.getHouseList,params);
		}
	},
	showOpera:function(e){
		var data = e.currentTarget.dataset;
		this.hideOpera();
		var oldData = this.data.dataList;
		oldData[data.index].show = true;
		this.setData({
			dataList: oldData
		})
	},
	hideOpera:function(){
		var that = this;
		var oldData = that.data.dataList;
		for(var i=0;i<oldData.length;i++){
			oldData[i].show = false;
		}
		that.setData({
			dataList: oldData
		})
	},
	viewData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalRoom/personalRoom?id=" + data.id
		})
	},
	editData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalHouseEdit/personalHouseEdit?id=" + data.id
		})
	},
	deleteData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalHouseEdit/personalHouseEdit?id=" + data.id
		})
	},
	addData:function(){

	}
})