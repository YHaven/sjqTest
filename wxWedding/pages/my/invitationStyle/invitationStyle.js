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

  loadData:function(){
      var that = this;
      that.setData({
        dataList:[
          {
            id:'222',
            imgUrl:'../../../images/wedding-1.jpg',
            groom:'LLLLL',
            bride:'NNNNN',
            weddingDate:'2018年8月8日',
            weekDate:'星期三',
            isTop:1
          },
          {
            id: '222',
            imgUrl: '../../../images/wedding-2.jpg',
            groom: 'LLLLL',
            bride: 'NNNNN',
            weddingDate: '2018年8月9日',
            weekDate: '星期三',
            isTop: 0
          },
          {
            id: '222',
            imgUrl: '../../../images/wedding-2.jpg',
            groom: 'LLLLL',
            bride: 'NNNNN',
            weddingDate: '2018年8月6日',
            weekDate: '星期三',
            isTop: 0
          }
        ]
      });

      // wx.showNavigationBarLoading()
      // var params = {
      //   page: 1
      // }
      // that.setData({
      //   dataList: []
      // })
      // plana.getPersonalList.call(that, config.apiList.plana.getHouseList, params, function (res) {
      //   wx.hideNavigationBarLoading()
      // });


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
    var url = '../invitationCardEdit/invitationCardEdit?topicid=' + data.id;
    wx.navigateTo({
      url: url
    })
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