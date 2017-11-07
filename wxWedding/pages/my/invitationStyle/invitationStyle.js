var util = require('../../../utils/util.js')
Page({
	data: {
    userInfo: {},
    dataList: [],
    recommend:2,
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
    util.postDataList.call(that, util.config.wxApi.invitationTopic, params, function (res) {
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
      util.postDataList.call(that, util.config.wxApi.invitationTopic, params, function (res) {
        //console.log(res);
        wx.hideNavigationBarLoading()
      });
    }
  },
  selectTopic:function(e){
    var data = e.currentTarget.dataset;
    var id = data.id;
    var price = Number(data.price);
    var cprice = Number(data.cprice);
    var url = '../invitationCardEdit/invitationCardEdit?topicid=' + data.id;
    if (cprice>0){
      wx.showModal({
        title: '提示',
        content: '这是一个积分模板',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: url
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: url
      })
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
  //添加
  addData: function () {

  }

})