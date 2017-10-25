var util = require('../../../utils/util.js')
var lunarCalendar = require('../../../utils/lunarCalendar.js')
var bmap = require('../../../utils/bmap-wx.min.js')
var nowDate = new Date();
var BMap = new bmap.BMapWX({
  ak: util.config.bmapAK
}); 
Page({
  data: {
    userInfo: {},
    dataList: [],
    dataObj:{
      surfaceImg:'',
      weddingDate: nowDate.Format('yyyy年MM月dd日'),
      dates: nowDate.Format('yyyy-MM-dd 00:00:00'),
      weekDate: util.formatWeek(nowDate),
      lunarDate: lunarCalendar.calendar.solar2lunar(nowDate.Format('yyyy'), nowDate.Format('MM'), nowDate.Format('dd')).yearStr,
      time:'18:18',
      timeStr:'下午18:18',
      seatDesin:'',
      groom: '',
      groomLat:'',
      groomLng: '',
      bride: '',
      brideLat: '',
      brideLng: '',
      photos:[]
    },
    scrollTop: 0,
    navActive:'location',
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
    checkPass: true,
    hasMore: true,
    start: 1,
    showLoading: true
  },
  onLoad: function (options) {
    var that = this;
    that.musicBox(8000);
    that.getUserType();//获取用户信息
    that.setPageTitle();
    
    that.getCity();//获取地址信息
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
  getCity: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });

        that.getCityStr()

      },
      fail: function (res) {
        that.setData({
          latitude: 30.27,
          longitude: 120.155
        });
        // util.message.show.call(that, {
        //   content: "获取定位失败！",
        //   icon: 'offline',
        //   duration: 3000
        // });
        util.checkOpenSetting();//检查授权
      }
    })
  },

  // 获取地址
  getCityStr:function(){
    var that = this;
    // 发起regeocoding检索请求 

    // 获取中文详细地址
    var locationParam = that.data.latitude + ',' + that.data.longitude;
    wx.request({
      url: util.config.baiduMap,
      data: {
        ak: util.config.baiduAK,
        location: locationParam,
        output: 'json',
        pois: '1'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res)
        that.setData({
          markers: [{
            latitude: res.data.result.location.lat,
            longitude: res.data.result.location.lng,
            name: '我的位置',
            desc: res.data.result.formatted_address
          }],
          addressComponent: res.data.result.addressComponent,
          formatted_address: res.data.result.formatted_address
        })

      },
      fail: function () {
        
      }
    })
  },


  //选择设置封面图
  setSurfaceImg:function(e){
      var that = this;

      // that.chooseImg(function(res){

      //   var oldData = that.data.dataObj;
      //   oldData.surfaceImg = '../../../images/wedding_bg_1.jpg';
      //   that.setData({
      //     dataObj: oldData
      //   });
      // });

      var oldData = that.data.dataObj;
      oldData.surfaceImg = '../../../images/wedding_bg_1.jpg';
      that.setData({
        dataObj: oldData
      });
      
  },

  //封面图旋转效果
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

    // that.animation.rotate(180).step()
    // that.setData({
    //   //输出动画
    //   animation: this.animation.export()
    // })

    var i = 1;
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

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    var that = this;
    var selectDate = new Date(e.detail.value + ' 00:00:00');
    var lunarDate = lunarCalendar.calendar.solar2lunar(selectDate.Format('yyyy'), selectDate.Format('MM'), selectDate.Format('dd'));
    var oldData = that.data.dataObj;
    oldData.dates = selectDate.Format('yyyy-MM-dd 00:00:00');
    oldData.weddingDate = selectDate.Format('yyyy年MM月dd日');
    oldData.weekDate = util.formatWeek(selectDate);
    oldData.lunarDate = lunarDate.yearStr;
    // console.log(lunarDate);
    that.setData({
      dataObj: oldData
    });
  },

  //  点击日期组件确定事件  
  bindTimeChange: function (e) {
    // console.log(e.detail.value)
    var that = this;
    var oldData = that.data.dataObj;
    var time = e.detail.value;
    if (Number(time.split(':')[0])<12){
      oldData.timeStr = '上午' + time;
    }else{
      oldData.timeStr = '下午' + time;
    }
    oldData.time = time;
    that.setData({
      dataObj: oldData
    });
  },

  bindInputChange:function(e){
    var that = this;
    var oldData = that.data.dataObj;
    var dataKey = e.target.dataset.key;
    oldData[dataKey] = e.detail.value;
    that.setData({
      dataObj: oldData
    });
  },

  bindAddressChange:function(e) {
    var that = this;
    var oldData = that.data.dataObj;
    var dataKey = e.target.dataset.key;
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)
      var wxMarkerData = data.result;
      var groomMarkers = [];
      var brideMarkers = [];
      if (wxMarkerData.length>0){
        if (typeof wxMarkerData[0].location == 'undefined'){
          return false;
        }
        if (dataKey == 'groomGPSAddress') {
          oldData.groomLng = Number(wxMarkerData[0].location.lng);
          oldData.groomLat = Number(wxMarkerData[0].location.lat);
          var markers = [];
          // for (var i = 0; i < wxMarkerData.length; i++) {
          for (var i = 0; i < 1; i++) {
            var marker = {
              iconPath: "../../../images/marker_red.png",
              latitude: Number(wxMarkerData[i].location.lat),
              longitude: Number(wxMarkerData[i].location.lng),
              name: wxMarkerData[i].name,
              desc: wxMarkerData[i].name
            }
            markers.push(marker);
          }
          
          groomMarkers = markers;
        }
        if (dataKey == 'brideGPSAddress') {
          oldData.brideLng = Number(wxMarkerData[0].location.lng);
          oldData.brideLat = Number(wxMarkerData[0].location.lat);
          var markers = [];
          // for (var i = 0; i < wxMarkerData.length; i++) {
          for (var i = 0; i < 1; i++) {
            var marker = {
              iconPath: "../../../images/marker_red.png",
              latitude: Number(wxMarkerData[i].location.lat),
              longitude: Number(wxMarkerData[i].location.lng),
              name: wxMarkerData[i].name,
              desc: wxMarkerData[i].name
            }
            markers.push(marker);
          }

          brideMarkers = markers;
        }
      }
      oldData[dataKey] = e.detail.value;
      that.setData({
        dataObj: oldData,
        brideMarkers: brideMarkers,
        groomMarkers: groomMarkers

      });
      
    } 
    BMap.suggestion({
      query: e.detail.value,
      region: that.data.addressComponent.city||'杭州市',
      city_limit: false,
      fail: fail,
      success: success
    }); 

    // //发起POI检索请求 
    // BMap.search({
    //   query: e.detail.value,
    //   fail: fail,
    //   success: success
    // }); 

    
  },


  markerTap: function(e) {
    //console.log(e.markerId)
  },

  choosePhotoImg:function(){
    var that = this;
    var oldData = that.data.dataObj;

    var imagesArray = oldData.photos;
    var imageObj = {};
    imageObj.imgId = "222";
    imageObj.savePath = "https://www.zhencome.com/images/wxcbg/user_bg_1.jpg";
    imagesArray.push(imageObj);
    oldData.photos = imagesArray;
    that.setData({
      dataObj: oldData
    });
  },
  removeImg: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    var removeIndex = data.index;
    var oldData = that.data.dataObj;

    var newImgArray = oldData.photos;
    var removeImg = newImgArray[removeIndex];

    newImgArray = newImgArray.slice(0, removeIndex).concat(newImgArray.slice(removeIndex + 1, newImgArray.length));

    oldData.photos = newImgArray;

    that.setData({
      dataObj: oldData
    })
  },
  //相册预览
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.photos // 需要预览的图片http链接列表  
    })
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
  callPhone:function(e){
    var that = this;
    var data = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: data.phone //仅为示例，并非真实的电话号码
    })
  },
  setPageTitle:function(){
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
    if (e.detail.scrollTop + 550 >= e.detail.scrollHeight){
      // console.log(e);
      // that.onReachBottom()
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
  saveDataInfo: function () {
    var that = this;
    // if (!that.data.checkPass) {
    //   return false;
    // }

    var params = {};
    if (that.data.userInfo.userType == '0') {
      params.uid = that.data.userInfo.userId;
      params.sid = '';
    } else {
      params.uid = '';
      params.sid = that.data.userInfo.sid;
    }

    var nextActive = '';
    if (that.data.navActive == 'favor'){
      nextActive = 'pic';
    }

    if (that.data.navActive == 'pic'){
      nextActive = 'phone';
    }

    if (that.data.navActive == 'phone') {
      nextActive = 'location';
    }

    if (that.data.navActive == 'location') {
      wx.navigateTo({
        url: '../invitationCardView/invitationCardView'
      })
    }else{
      that.setData({
        navActive: nextActive
      });
    }

    

    
    //测试区
    return false;


    params.orderId = that.data.orderId;
    //console.log(params)
    var goodsImgId = [];
    var nowImages = that.data.images;
    for (var i = 0; i < nowImages.length; i++) {
      goodsImgId.push(nowImages[i].imgId);
    }
    if (goodsImgId.length > 0) {
      wx.showNavigationBarLoading()
      params.goodsImgList = goodsImgId.join(',');
      util.postData.call(that, config.wxApi.addOrder, params, function (res) {
        //console.log(res)
        wx.hideNavigationBarLoading()
        if (res.data.err == 0) {
          var orderId = res.data.data.id;
          var userInfo = that.data.userInfo;
          userInfo.sid = res.data.data.sid;   //绑定商家了？
          that.setData({
            orderId: orderId,
            userInfo: userInfo
          });

          wx.setStorage({
            key: 'person_info',
            data: userInfo
          })

          var toUrl = '../createOrderDetail/createOrderDetail?orderId=' + orderId;
          if (that.data.userInfo.userType == '1') {
            toUrl = '../createOrderSeller/createOrderSeller?orderId=' + orderId;
          }

          //console.log('orderId'+orderId)
          wx.navigateTo({
            url: toUrl
          })
        }

      });
    } else {
      // util.message.show.call(that,{
      // 	content: '请添加商品图片',
      // 	icon: 'null',
      // 	duration: 3000
      // })
    }

  },

  chooseImg: function (cb) {
    var that = this;
    var params = {};
    params.uid = that.data.userInfo.userId;
    //console.log(params);
    util.uploadImg(util.config.wxApi.uploadImg, params, function (res) {
      console.log(res);
      var data = JSON.parse(res.data);
      if (data.err == 0) {
        cb(data);
        // var imagesArray = that.data.images;
        // var imageObj = {};
        // imageObj.imgId = data.data.imgId;
        // imageObj.savePath = data.data.savePath[0];
        // imagesArray.push(imageObj);
        // // console.log(imagesArray)
        // that.setData({
        //   images: imagesArray
        // })
      }
    })

  }

})