var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    dataList: [],
    checkPass: false,
    hasMore: true,
    start: 1,
    showLoading: true
  },
  onLoad: function (options) {
    var that = this;
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
  saveDataInfo: function () {
    var that = this;
    if (!that.data.checkPass){
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