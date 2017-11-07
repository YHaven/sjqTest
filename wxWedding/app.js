var config = require('./utils/config.js')
var util = require('./utils/util.js')

// 授权登录
App({
  onLaunch: function () {
    var that = this;
    
    // 获取用户信息
    that.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this;
    wx.login({
      success: function (login_res) {
        if (login_res.code) {
          wx.getUserInfo({
            success: function (res) {
              //console.log(res)
              var userInfo = res.userInfo;

              that.initStorage(userInfo);

              that.toLoginWedding(login_res.code, res, function (t_res) {
                //console.log(t_res);
                // console.log(t_res.data.sessionId);
                wx.setStorageSync('PHPSESSID', t_res.data.sessionId);
                res.userInfo.userType = t_res.data.userType;
                
                res.userInfo.userPhone = t_res.data.userPhone;
                res.userInfo.creditPrice = t_res.data.creditPrice;
              })


              // that.getOpenId(login_res.code, res, function (o_res) {
              //   //console.log(t_res);
              //   if (o_res.data.err == 0) {
              //     var openId = o_res.data.data.openid;
              //     userInfo.openId = openId;
              //     //console.log(openId)
              //     that.toLogin(openId, res, function (t_res) {
              //       var userId = t_res.data.data.id;
              //       //console.log(userId)
              //       userInfo.userId = userId;
              //       userInfo.sid = '';

              //       that.getSysUserInfo(userId, function (s_res) {
              //         // console.log(s_res.data);
              //         if (s_res.data.err == 0) {
              //           userInfo.oUserInfo = s_res.data.data

              //           that.initStorage(userInfo);
              //         }
              //       });



              //     })
              //   }

              // })

            }
          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！' + login_res.errMsg,
            icon: 'loading',
            duration: 5000
          })
        }

      },
      fail: function (f_res) {
        wx.showToast({
          title: '获取用户登录态失败！' + f_res.errMsg,
          icon: 'loading',
          duration: 5000
        })
      }
    });


  },
  getSystemInfo() {
    // 设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.screenWidth = res.windowWidth;
        that.screenHeight = res.windowHeight;
        that.pixelRatio = res.pixelRatio;
      }
    });
  },
  getOpenId: function (code, userinfo, cb, fail_cb) {
    var that = this;
    var url = config.wxApi.getOpenId;
    var params = {};
    params.code = code;
    util.postData.call(that, url, params, cb, fail_cb);
  },
  toLogin: function (openId, userinfo, cb, fail_cb) {
    var that = this;
    var url = config.wxApi.member;
    var params = userinfo.userInfo;
    params.openId = openId;
    //params.rawData = userinfo.rawData;
    params.signature = userinfo.signature;
    params.encryptedData = userinfo.encryptedData;
    params.iv = userinfo.iv;
    util.postData.call(that, url, params, cb, fail_cb);
  },
  toLoginWedding: function (code, userinfo, cb, fail_cb) {
    var that = this;
    var url = util.config.wxApi.login;
    var params = userinfo.userInfo;
    params.vt = 1;
    params.type = 'wCode';
    params.wxCode = code;
    params.businessId = util.config.wxApi.business;
    //params.rawData = userinfo.rawData;
    params.signature = userinfo.signature;
    params.encryptedData = userinfo.encryptedData;
    params.iv = userinfo.iv;

    util.postData.call(that, url, params, cb, fail_cb);
  },
  getSysUserInfo: function (uid, cb, fail_cb) {
    var that = this;
    var url = config.wxApi.getUserInfo;
    var params = {};
    params.uid = uid;
    util.postData.call(that, url, params, cb, fail_cb);
  },
  initStorage: function (personInfo) {
    wx.getStorageInfo({
      success: function (res) {
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }

        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  }
})
