var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleImg: ['https://www.zhencome.com/files/weddingdefault/wedding_sign_bg.png', 'https://www.zhencome.com/files/weddingdefault/wedding_sign_button.png', 'https://www.zhencome.com/files/weddingdefault/wedding_sign_rule.jpg'],
    todaySign:false,
    hasMore: true,
    showLoading: true,
    start: 1,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getUserType();//获取用户信息
    // that.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.loadData();
  },
  loadData: function () {
    var that = this;

    wx.showNavigationBarLoading()
    var params = {
      page: 1,
      businessId: util.config.wxApi.business
    }
    that.setData({
      dataList: []
    })
    util.postDataList.call(that, util.config.wxApi.signInList, params, function (res) {
      wx.hideNavigationBarLoading()
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  signIn:function(){
    var that = this;
    if (that.data.todaySign){
      wx.showToast({
        title: '今天已签',
        icon: 'success',
        duration: 2000
      })

      return false;
    }

    wx.showNavigationBarLoading()
    var params = {
      businessId: util.config.wxApi.business
    }
    util.postData.call(that, util.config.wxApi.signIn, params, function (res) {
      if (res.data.status) {
        wx.showToast({
          title: '签到成功！',
          icon: 'success',
          duration: 2000
        })

        that.setData({
          todaySign:true
        })

      }else{
        wx.showToast({
          title: res.data.errorinfo,
          duration: 2000
        })
      }
      wx.hideNavigationBarLoading()
    });



    
    setTimeout(function () {
      that.onShow();
    }, 2000)
  },
  getUserType: function () {
    var that = this;
    var userInfo = wx.getStorageSync('person_info');

    that.setData({
      userInfo: userInfo
    });
  }
})