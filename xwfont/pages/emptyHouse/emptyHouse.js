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
	onShow:function(){
		var that = this
		wx.showNavigationBarLoading()
		var params = {
						page:1
					}
		that.setData({
			dataList: []
		})
		plana.getPersonalList.call(that,config.apiList.plana.getHouseList,params,function(res){
			wx.hideNavigationBarLoading()
		});
	},
	// onLoad: function() {
  //   var that = this
  //   wx.showNavigationBarLoading()
  //   var params = {
  //     page: 1
  //   }
  //   that.setData({
  //     dataList: []
  //   })
  //   plana.getPersonalList.call(that, config.apiList.plana.getHouseList, params, function (res) {
  //     wx.hideNavigationBarLoading()
  //   });
	// },
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
			url: "../emptyRoom/emptyRoom?parentid=" + data.id
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
		var that = this;
    
    var params = {
			id:data.id
		};
    params.vt = 1;
    var url = config.apiList.plana.getHouseInfoDelete

		wx.showModal({
			title: '提示',
			content: '确定删除？',
			success: function(res) {
				if (res.confirm) {
					plana.dataDelete.call(that,url,params,function(res){
						if(res.data.status){
							that.onShow();
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
    
		
	},

	addData:function(){

	}
})