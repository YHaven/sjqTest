var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    currentPage:'firstpage',
    invitationId:'',
    musicOpen:false,
    showPage:['0']
  },
  onLoad: function (options) {
    var that = this;

    if (options.id) {
      that.setData({
        invitationId: options.id
      })
    }else{
      that.setData({
        invitationId: 11
      })
    }
    that.getUserType();//获取用户信息
    
    that.firstPageAnimation();
    
    
  },
  onShow: function () {
    var that = this;
    that.loadData();
  },
  swiperChange:function(e){
    var that = this;
    var current = e.detail.current;
    var oldShowPage = that.data.showPage;
    if (oldShowPage.indexOf(''+current)<0){
      oldShowPage.push('' + current);
      that.setData({
        showPage: oldShowPage
      });
      // console.log(current)
      if(current == 1){
        that.secondPageAnimation();
      }
      if (current == 2) {
        that.thirdPageAnimation();
      }
      if(current == 3){
        that.fourthPageAnimation();
      }
      if(current == 4){
        that.fifthPageAnimation();
      }
      if (current == 5) {
        that.sixthPageAnimation();
      }
    }
  },

  firstPageAnimation:function(){
    var that = this;
    util.animationFun.animationFun.rotatingAll.call(that, 'rotatingAllMusic', 1000);
    util.animationFun.animationFun.translateYAll.call(that, 'translateYAllUp', 1500,30);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd1', 1000, '-150%',1000);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd2', 1000, '150%',1000);
    util.animationFun.animationFun.opacityEnd.call(that, 'opacityEnd1', 1000, 0);
    util.animationFun.animationFun.opacityEnd.call(that, 'opacityEnd2', 1500, 0);
    util.animationFun.animationFun.opacityEnd.call(that, 'opacityEnd3', 1000, 0,2000);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd1', 500, '-150%',3000);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd2', 500, '-150%', 3200);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd3', 500, '-100%', 3800);
  },
  secondPageAnimation:function(){
      var that = this;
      util.animationFun.animationFun.rotatingEnd.call(that, 'rotatingEnd1',500,'', 90,1000);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_1', 1000, '150%', 0);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_2', 1000, '-150%', 0);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_3', 1000, '150%', 1000);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_4', 1000, '-150%', 1000);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_5', 1000, '150%', 0);
      util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_2_6', 1000, '-150%', 0);
      util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_2_1', 1000, 2, 0);
      util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_2_2', 1000, 2, 0);

  },
  thirdPageAnimation:function(){
    var that = this;
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_3_1', 1000, '150%', 0);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_3_2', 1000, '150%', 200);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_3_3', 1000, '150%', 400);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_3_4', 1000, '150%', 500);
    util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_3_1', 1000, 2, 1000);
    util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_3_2', 1000, 1, 800);
  },
  fourthPageAnimation: function () {
    var that = this;
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_4_1', 1000, '-150%', 0);
    util.animationFun.animationFun.translateXEnd.call(that, 'translateXEnd_4_2', 1000, '150%', 200);
    util.animationFun.animationFun.translateYEnd.call(that, 'translateYEnd_4_1', 1000, '-150%', 800);
    util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_4_1', 1000, 2, 0);
    util.animationFun.animationFun.scaleEnd.call(that, 'scaleEnd_4_2', 1000, 2, 0);
  },
  fifthPageAnimation: function () {
    var that = this;
    
  },
  sixthPageAnimation: function () {
    var that = this;
    
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
        }, 1000)
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
    that.setData({
      audioCtx: audioCtx,
      musicOpen:true
    })
  },
  musicControl:function(){
    var that = this;
    if(that.data.musicOpen){
      that.data.audioCtx.pause();
      that.setData({
        musicOpen: false
      })
    }else{
      that.data.audioCtx.play();
      that.setData({
        musicOpen: true
      })
    }
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
    var topicId = that.data.topicObj.id;
    var path = '/pages/my/invitationCardView/invitationCardView?id=' + data.id;
    if (topicId>=2){
      path = '/pages/my/invitationCardView_temp' + topicId + '/invitationCardView_temp' + topicId + '?id=' + data.id;
    }
    return {
      title: data.groom +'💕'+ data.bride+'结婚请柬',
      desc: data.groom + '💕' + data.bride + '结婚请柬',
      imageUrl: data.surfaceImg,
      path: path
    }
  }

})