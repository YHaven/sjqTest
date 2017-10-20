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
	onShow:function(){
		var that = this;
    that.loadData();
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
    var that = this;
    that.onShow();
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      var params = {
        page: that.data.start
      }
      plana.getPersonalList.call(that, config.apiList.plana.getHouseList, params);
    }
  },
  //预览
  viewData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: data.id
    })
  },
  //编辑
  editData: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: data.id
    })
  },
  //添加
  addData: function () {

  }

})