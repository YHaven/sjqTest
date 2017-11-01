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
      myType:1
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
  //预览
  viewData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../invitationCardView/invitationCardView?dataid='+data.id
    })
  },
  //编辑
  editData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../invitationCardEdit/invitationCardEdit?dataid=' + data.id
    })
  },
  //添加
  addData: function () {

  }

})