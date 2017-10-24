var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    dataList: [],
    scrollTop: 0,
    navActive: 'favor',
    photos: ['https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg'],
    markers: [{
      // iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    animation: '',
    interval: '',
    checkPass: false,
    hasMore: true,
    start: 1,
    showLoading: true
  },
  onLoad: function (options) {
    var that = this;
    that.musicBox(8000);
    that.getUserType();//获取用户信息
    that.setPageTitle();
  },
  onShow: function () {
    var that = this;
    that.loadData();
  },
  getUserType: function () {
    var that = this;
    var userInfo = wx.getStorageSync('person_info');
    that.setData({
      userInfo: userInfo
    });
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.photos // 需要预览的图片http链接列表  
    })
  },

  musicBox: function (sleepTimer) {
    var that = this;
    that.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: sleepTimer,
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 0,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });
    that.rotate(sleepTimer);
    // setInterval(function(){
    //   console.log('2222')
    //   that.rotate();
    // }, sleepTimer);

  },
  rotate: function (sleepTimer) {
    //两个动画组 一定要以step()结尾
    /**
     * 动画顺序 顺时针旋转150度>x,y 放大二倍>x，y平移10px>x,y顺时针倾斜>改变样式和设置宽度宽度
     */
    var that = this;

    that.animation.rotate(180).step()
    that.setData({
      //输出动画
      animation: this.animation.export()
    })

    var i = 2;
    setInterval(function () {
      that.animation.rotate(180 * (i)).step()
      that.setData({
        //输出动画
        animation: this.animation.export()
      })
      i++;
      // console.log(i);
    }.bind(that), sleepTimer);

  },
  loadData: function () {
    var that = this;
    that.setData({
      dataList: [
        {
          id: '222',
          imgUrl: '../../../images/wedding-1.jpg',
          groom: 'LLLLL',
          bride: 'NNNNN',
          weddingDate: '2018年8月8日',
          weekDate: '星期三',
          isTop: 1
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
  viewInvitationNav: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    that.setData({
      navActive: data.navkey
    })
  },
  callPhone: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: data.phone //仅为示例，并非真实的电话号码
    })
  },
  openLocation: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    wx.openLocation({ //出发wx.openLocation API

      latitude: Number(data.latitude), //坐标纬度（从地图获取坐标）

      longitude: Number(data.longitude), //坐标经度（从地图获取坐标）

      name: data.name, //打开后显示的地址名称

      address: data.address //打开后显示的地址汉字

    })
  },
  setPageTitle: function () {
    wx.setNavigationBarTitle({
      title: '结婚请柬'
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    var that = this;
    if (e.detail.scrollTop + 550 >= e.detail.scrollHeight) {
      console.log(e);
      that.onReachBottom()
    }

  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 1
    })
    this.onLoad()
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      var params = {
        vt: '1',
        page: that.data.start,
        msgResource: that.data.msgResource,
        businessId: util.config.apiList.plana.business
      };
      util.postDataList.call(that, util.config.apiList.plana.getMessageList, params)
    }
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: util.config.title,
      desc: util.config.desc,
      imageUrl: util.config.imageUrl,
      path: util.config.wxpath
    }
  }

})