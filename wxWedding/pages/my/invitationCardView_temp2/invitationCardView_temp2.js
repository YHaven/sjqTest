var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    currentPage:'firstpage',
    invitationId:''
  },
  onLoad: function (options) {
    var that = this;

    if (options.id) {
      that.setData({
        invitationId: options.id
      })
    }else{
      that.setData({
        invitationId: 3
      })
    }
    that.getUserType();//获取用户信息
    
    that.firstPageAnimation();
    
    
  },
  onShow: function () {
    var that = this;
    that.loadData();
  },
  nextPage:function(e){
    var that = this;
    var data = e.currentTarget.dataset;
    var currentpage = data.currentpage;
    console.log(currentpage)
    
    var nextpage = 'secondpage';
    if(currentpage == 'firstpage'){
      nextpage = 'secondpage';
    }
    if (currentpage == 'secondpage') {
      nextpage = 'firstpage';
    }
    util.animationFun.animationFun.opacityEnd.call(that, currentpage, 1000, 1, 1000);
    util.animationFun.animationFun.opacityEnd.call(that, nextpage, 1000, 0, 1000);
    setTimeout(function(){
      that.setData({
        currentPage: nextpage
      })
    },2000);

  },

  firstPageAnimation:function(){
    var that = this;
    util.animationFun.animationFun.rotatingAll.call(that, 'rotatingAll', 5000);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd', 1000, -290);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd', 1000, -290);

    util.animationFun.animationFun.opacityEnd.call(that, 'opacityEnd', 1000, 0, 1000);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXTopLeftEnd', 1000, -126, 2000);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXTopRightEnd', 1000, 128, 2000);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXBottomLeftEnd', 1000, -126, 2000);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXBottomRightEnd', 1000, 128, 2000);
    util.animationFun.animationFun.scaleAndOpacity.call(that, 'scaleAndOpacity', 1000, 4, 'red');
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

        that.setPageTitle(dataObj.groom + '💕' + dataObj.bride + '结婚请柬');
        setTimeout(function () {
          that.createMusicAudio();
        }, 2000)
      }

      

      wx.hideNavigationBarLoading()
    });

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
  //分享
  onShareAppMessage: function () {
    var that = this;
    var data = that.data.dataObj;
    var path = '/pages/my/invitationCardView/invitationCardView?id=' + data.id;
    if (that.data.topicObj.id>=2){
      path = '/pages/my/invitationCardView_temp' + data.id + '/invitationCardView_temp' + data.id + '?id=' + data.id;
    }
    return {
      title: data.groom +'💕'+ data.bride+'结婚请柬',
      desc: data.groom + '💕' + data.bride + '结婚请柬',
      imageUrl: data.surfaceImg,
      path: path
    }
  }

})