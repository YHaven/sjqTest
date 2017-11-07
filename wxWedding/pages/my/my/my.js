var util = require('../../../utils/util.js')

var app = getApp();
Page({
  data:{
    gridList: [
      // {enName:'favorite', zhName:'我的操作'},
      // {enName:'history', zhName:'浏览记录'},
      // {enName:'read', zhName:'我的主题'},
      
      { enIcon: 'favor', zhName: '我的请柬', toPage: 'invitationCard'},
      { enIcon: 'read', zhName: '请柬模板', toPage: 'invitationStyle'},
      {enIcon: 'magic', zhName: '关于我们', toPage: 'start' }
      // {enName:'setting', zhName:'设置'}
    ],
    skin: ''
  },
  onLoad:function(cb){
    var that = this;
    that.getUserType();//获取用户信息
  },
  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        // console.log(res.data);
        if (res.data == "") {
          that.setData({
            skin: util.config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },

  getUserType: function () {
    var that = this;
    var userInfo = wx.getStorageSync('person_info');
    if (userInfo == ''){
      
      util.checkOpenSetting();//检查授权
    }
    var session_id = wx.getStorageSync('PHPSESSID');
    if (session_id == ''){
      app.getUserInfo();

    }
    
    
    that.setData({
      userInfo: userInfo
    });
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
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../" + data.url + '/' + data.url
    })
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  }
})