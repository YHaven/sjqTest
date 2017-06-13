var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 1,
		msgResource: 3,
		bannerList: config.bannerList,
		errImg:config.defaultImg.header
	},
	onLoad: function() {
		var that = this
		wx.showNavigationBarLoading()
		app.getCity(function(){
			wx.hideNavigationBarLoading()
			wx.setNavigationBarTitle({
				title: '首页 - ' + config.city
			})
			var params = {
				vt: '1',
				page: that.data.start,
				msgResource: that.data.msgResource,
				businessId: config.apiList.plana.business
				// businessId: 1
			};
			plana.getMessageList.call(that, config.apiList.plana.getMessageList, params)
		})
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
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
        vt: '1',
        page: that.data.start,
        msgResource: that.data.msgResource,
        businessId: config.apiList.plana.business
      };
      plana.getMessageList.call(that, config.apiList.plana.getMessageList, params)
		}
	},
	viewMessageDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../messageContent/messageContent?id=" + data.id
		})
	},
	viewNavDetail:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: data.url
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		// if (data.type == 'film') {
		// 	wx.navigateTo({
		// 		url: "../filmDetail/filmDetail?id=" + data.id
		// 	})
		// } else if (data.type == 'person') {
		// 	wx.navigateTo({
		// 		url: '../personDetail/personDetail?id=' + data.id
		// 	})
		// } else if (data.type == 'search') {
		// 	// stype(searchType) 0:关键词, 1:类型标签
		// 	var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
		// 	wx.navigateTo({
		// 		url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
		// 	})
		// }
	},
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
	}
})