var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    dataList: [],
    dataObj:{},
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
    console.log(options.id)
    that.musicBox(8000);
    that.getUserType();//获取用户信息
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
      dataObj:{
        id:'2222',
        surfaceImg: 'https://www.zhencome.com/files/weddingdefault/contact_bg_2.png',
        weddingDate:'2017年11月11日',
        dates: new Date('2017-11-11 00:00:00'),
        weekDate: '星期一',
        lunarDate: '二零一七年十一月十一日',
        time: '18:18',
        timeStr: '下午18:18',
        seatDesin: '开元名都大酒店',
        groom: '氨基酸',
        groomLat: 30.21338957234,
        groomLng: 120.30880009314,
        groomPhone:'18268826992',
        groomGPSAddress: '盛乐村',
        groomAddress: '萧山区盛乐村14组30号(导航到上市时间阿打卡机很多卡附近)',
        groomMarkers: [{
          latitude: 30.21338957234,
          longitude: 120.30880009314,
          name: '盛乐村',
          desc: '描述地址！'}],
        bride: '阿斯顿',
        brideLat: 30.21338957234,
        brideLng: 120.30880009314,
        bridePhone:'18817386792',
        brideGPSAddress:'盛乐村',
        brideAddress:'盛乐村14组30号',
        brideMarkers: [{
          latitude: 30.21338957234,
          longitude: 120.30880009314,
          name: '盛乐村',
          desc: '描述地址！'
        }],
        welcomeCode: '我们恭候您的光临！',
        photos: ['https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg']
      },
      topicObj: {
        id: '111',
        type: 1,
        showImage: 'https://www.zhencome.com/files/weddingdefault/topicdefault.jpg',
        price: 0.00,
        cprice: 0,
        styleImage: ['https://www.zhencome.com/files/weddingdefault/contact_bg_2.png', 'https://www.zhencome.com/files/weddingdefault/contact_bg_1.png', 'https://www.zhencome.com/files/weddingdefault/mail_bg_2.jpg']
      }
    });


    that.setPageTitle('氨基酸,阿斯顿结婚请柬');

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
  setPageTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
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
    var that = this;
    var data = that.data.dataObj;
    return {
      title: data.groom + data.bride+'结婚请柬',
      desc: data.groom + data.bride + '结婚请柬',
      imageUrl: data.surfaceImg,
      path: '/pages/my/invitationCardView/invitationCardView?id=' + data.id
    }
  }

})