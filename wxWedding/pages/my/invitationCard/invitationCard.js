var util = require('../../../utils/util.js')
Page({
	data: {
    userInfo: {},
    dataList: [],
    hasMore: true,
    start: 1,
    showLoading: true
	},
	onLoad: function (options) {
		var that = this;
    that.getUserType();//获取用户信息
	},
  onShow: function () {
    var that = this
    wx.showNavigationBarLoading()
    var params = {
      page: 1,
      invitationType:1
    }
    that.setData({
      dataList: []
    })
    util.postDataList.call(that, util.config.wxApi.invitationList, params, function (res) {
      //console.log(res);
      wx.hideNavigationBarLoading()
    });
  },
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      dataList: [],
      hasMore: true,
      showLoading: true,
      start: 1
    })
    this.onShow()
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      wx.showNavigationBarLoading()
      var params = {
        page: that.data.start
      }
      util.postDataList.call(that, util.config.wxApi.invitationList, params, function (res) {
        //console.log(res);
        wx.hideNavigationBarLoading()
      });
    }
  },
  showOpera: function (e) {
    var data = e.currentTarget.dataset;
    var oldData = this.data.dataList;
    if (oldData[data.index].show){
      oldData[data.index].show = false;
    }else{
      oldData[data.index].show = true;
    }
    this.setData({
      dataList: oldData
    })
  },
  viewNavDetail: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    if (data.url.indexOf('index/home/home') > 0) {
      wx.redirectTo({
        url: data.url
      });
      return false;
    }

    if (data.url.indexOf('my/my/my') > 0) {
      wx.redirectTo({
        url: data.url
      });
      return false;
    }
    wx.navigateTo({
      url: data.url
    })
  },
  //预览
  viewData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../invitationCardView/invitationCardView?id='+data.id
    })
  },
  //编辑
  editData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../invitationCardEdit/invitationCardEdit?id=' + data.id
    })
  },
  //上下架
  checkData:function(e){
    var that= this;
    var data = e.currentTarget.dataset;
    var params = {};
    params.checkMark = data.checkmark;
    util.postData.call(that, util.config.wxApi.invitationCheck, params, function (res) {
      if (res.data.status) {
        that.onShow();
      }
    })
  },
  //添加
  addData: function () {

  }

})