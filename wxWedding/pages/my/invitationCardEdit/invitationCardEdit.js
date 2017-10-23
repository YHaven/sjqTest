var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    dataList: [],
    navActive:'favor',
    photos: ['https://www.zhencome.com/images/wxcbg/user_bg_1.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_2.jpg', 'https://www.zhencome.com/images/wxcbg/user_bg_3.jpg'],
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

  saveDataInfo: function () {
    var that = this;
    if (!that.data.checkPass) {
      return false;
    }
    var params = {};
    if (that.data.userInfo.userType == '0') {
      params.uid = that.data.userInfo.userId;
      params.sid = '';
    } else {
      params.uid = '';
      params.sid = that.data.userInfo.sid;
    }


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
  removeImg: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    var removeIndex = data.index;

    var newImgArray = that.data.images;
    var removeImg = newImgArray[removeIndex];
    var params = {}
    params.imgId = removeImg.imgId;
    util.postData.call(that, config.wxApi.deleImg, params, function (res) {
      console.log(res)
      if (res.data.err == 0) {
        newImgArray = newImgArray.slice(0, removeIndex).concat(newImgArray.slice(removeIndex + 1, newImgArray.length));
        that.setData({
          images: newImgArray
        })
      }

    });



    // this.slice(0,n).concat(this.slice(n+1,this.length))
  },
  chooseImg: function () {
    var that = this;
    var params = {};
    params.uid = that.data.userInfo.userId;
    //console.log(params);
    util.uploadImg(config.wxApi.uploadImg, params, function (res) {
      console.log(res);
      var data = JSON.parse(res.data);
      if (data.err == 0) {
        var imagesArray = that.data.images;
        var imageObj = {};
        imageObj.imgId = data.data.imgId;
        imageObj.savePath = data.data.savePath[0];
        imagesArray.push(imageObj);
        // console.log(imagesArray)
        that.setData({
          images: imagesArray
        })
      }
    })

  }

})