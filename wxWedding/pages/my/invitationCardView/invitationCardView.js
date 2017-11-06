var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    dataList: [],
    dataObj:{},
    invitationId:'',
    scrollTop: 0,
    navActive: 'favor',
    open:true,
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

    if (options.id) {
      that.setData({
        invitationId: options.id
      })
    }
    
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
      urls: this.data.dataObj.photos // 需要预览的图片http链接列表  
    })
  },
  slidethis: function (e) {
    console.log(e);
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    self.animationOpen = animation;
    self.animationOpen.translateY(-550).rotate(-10).translateX(0).step();
    // self.animationOpen.translateY(62).translateX(25).rotate(0).step();
    self.setData({
      animationOpenData: self.animationOpen.export()
    });
    setTimeout(function () {

      self.setData({
        animationOpenData: {},
        open:false
      });

    }, 350);
  },
  musicBox: function (sleepTimer) {
    var that = this;
    util.animationFun.animationFun.rotatingAll.call(that, 'animationR', sleepTimer);

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
    }, sleepTimer);

  },
  loadData: function () {
    var that = this;

   
    var invitationId = that.data.invitationId;
    // console.log(invitationId)
    if (invitationId) {
      var params = {
        id: invitationId
      }
    } else {
      var params = {}
    }
    wx.showNavigationBarLoading();
    util.postData.call(that, util.config.wxApi.invitationView, params,function(res){
      if (res.data.status) {
        var dataObj = res.data.invitation;
        var topicObj = res.data.invitationTopic;

        if (dataObj.photosIdArr.length>0){
          var photos = dataObj.photosIdArr.split(',');
          var photoArr = [];
          for (var p = 0; p < photos.length;p++){
            photoArr.push(photos[p].substring(photos[p].indexOf('http'), photos[p].length))
          }
          dataObj.photos = photoArr;
          // console.log(photoArr)
        }
        
        dataObj.groomMarkers = {
          iconPath: "../../../images/marker_red.png",
          latitude: dataObj.groomLat,
          longitude: dataObj.groomLng,
          name: dataObj.groomGPSAddress,
          desc: dataObj.groomAddress
        }
        dataObj.brideMarkers = {
          iconPath: "../../../images/marker_red.png",
          latitude: dataObj.brideLat,
          longitude: dataObj.brideLng,
          name: dataObj.brideGPSAddress,
          desc: dataObj.brideAddress
        }

        topicObj.styleImage = topicObj.styleImage.split(';');
        topicObj.music = {
          poster:'https://www.zhencome.com/files/weddingdefault/jiehun8.png',
          name:'咱们结婚吧',
          author:'齐晨',
          src:'https://www.zhencome.com/files/weddingdefault/jiehun8.mp3'
        }
        that.setData({
            dataObj: dataObj,
            topicObj: topicObj
        })
      }

      that.setPageTitle(dataObj.groom + '💕' + dataObj.bride +'结婚请柬');
      setTimeout(function () {
        that.createMusicAudio();
      }, 3000)

      wx.hideNavigationBarLoading()
    });


    // that.setData({
    //   dataObj:{
    //     id:'2222',
    //     surfaceImg: 'https://www.zhencome.com/files/weddingdefault/contact_bg_2.png',
    //     weddingDate:'2017年11月11日',
    //     dates: new Date('2017-11-11 00:00:00'),
    //     weekDate: '星期一',
    //     lunarDate: '二零一七年十一月十一日',
    //     time: '18:18',
    //     timeStr: '下午18:18',
    //     seatDesin: '开元名都大酒店',
    //     groom: '氨基酸',
    //     groomLat: 30.21338957234,
    //     groomLng: 120.30880009314,
    //     groomPhone:'18268826992',
    //     groomGPSAddress: '盛乐村',
    //     groomAddress: '萧山区盛乐村14组30号(导航到上市时间阿打卡机很多卡附近)',
    //     groomMarkers: [{
    //       latitude: 30.21338957234,
    //       longitude: 120.30880009314,
    //       name: '盛乐村',
    //       desc: '描述地址！'}],
    //     bride: '阿斯顿',
    //     brideLat: 30.21338957234,
    //     brideLng: 120.30880009314,
    //     bridePhone:'18817386792',
    //     brideGPSAddress:'盛乐村',
    //     brideAddress:'盛乐村14组30号',
    //     brideMarkers: [{
    //       latitude: 30.21338957234,
    //       longitude: 120.30880009314,
    //       name: '盛乐村',
    //       desc: '描述地址！'
    //     }],
    //     welcomeCode: '我们恭候您的光临！',
    //     photos: ['https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg', 'https://www.zhencome.com/files/weddingdefault/logoooo.png', 'https://www.zhencome.com/files/weddingdefault/needle.png']
    //   },
    //   topicObj: {
    //     id: '111',
    //     type: 1,
    //     showImage: 'https://www.zhencome.com/files/weddingdefault/topicdefault.jpg',
    //     price: 0.00,
    //     cprice: 0,
    //     styleImage: ['https://www.zhencome.com/files/weddingdefault/contact_bg_2.png', 'https://www.zhencome.com/files/weddingdefault/contact_bg_1.png', 'https://www.zhencome.com/files/weddingdefault/mail_bg_2.jpg','https://www.zhencome.com/files/weddingdefault/logoooo.png', 'https://www.zhencome.com/files/weddingdefault/needle.png'],
    //     music:{
    //       poster:'https://www.zhencome.com/files/weddingdefault/jiehun8.png',
    //       name:'咱们结婚吧',
    //       author:'齐晨',
    //       src:'https://www.zhencome.com/files/weddingdefault/jiehun8.mp3'
    //     }
    //   }
    // });


    
    // that.createMusicAudio();
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
  createMusicAudio: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    var that = this;
    // var audioCtx = wx.createInnerAudioContext('myAudio');
    // audioCtx.loop = true;
    // audioCtx.src = that.data.topicObj.music.src;
    // audioCtx.play();

    var audioCtx = wx.createAudioContext('myAudio')
    audioCtx.setSrc(that.data.topicObj.music.src)
    audioCtx.play()

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
      console.log('xxx')
      wx.redirectTo({
        url: data.url
      });
      return false;
    }
    wx.navigateTo({
      url: data.url
    })
  },
  //分享
  onShareAppMessage: function () {
    var that = this;
    var data = that.data.dataObj;
    return {
      title: data.groom +'💕'+ data.bride+'结婚请柬',
      desc: data.groom + '💕' + data.bride + '结婚请柬',
      imageUrl: data.surfaceImg,
      path: '/pages/my/invitationCardView/invitationCardView?id=' + data.id
    }
  }

})