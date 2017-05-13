var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
Page({
  data:{
    parentid:0,
    parentData:{},
    id:0,
    data:{}
  },
  onLoad:function(options){
    var that = this
    wx.showNavigationBarLoading()
    that.setData({
          parentid:options.parentid
      // parentid: 4
        })
    if (options.id){
      var params = {
        id: options.id
      }
      that.setData({
         id:options.id
        })
    }else{
      var params = {
        renterId: options.parentid
        // renterId: 4
      }
    }
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getRentalInfo,params,function(res){
      if (res.data.status){
        var resData = res.data.data;
        if (!resData.electricNow) resData.electricNow = resData.electricPre
        if (!resData.waterNow) resData.waterNow = resData.waterPre
        if (!resData.gasNow) resData.gasNow = resData.gasPre
        that.setData({
          data: resData,
          parentData: resData.renter,
          parentid: resData.renter.id,
          roomData: resData.room
        })
      }
     
			wx.hideNavigationBarLoading()
		});
  },
  savePersonInfo: function(e) {
    var that = this;
    var data = e.detail.value
    
    var params = data;
    params.vt = 1;
    var rentalTime = that.data.data.rentalTime;
    if(rentalTime) params.rentalTime = rentalTime + ' 00:00:00';
    var url = config.apiList.plana.getRentalInfoAdd
    if (params.id != "" && params.id != null && params.id != 0) {
      url = config.apiList.plana.getRentalInfo
    }
    plana.formSubmit.call(that,url,params,function(res){
      if (res.status||res.data.status){
        // wx.navigateTo({
        //   url: "../personalRental/personalRental?parentid=" + that.data.parentid
        // })
        wx.navigateBack()
        
      }else{
        wx.showToast({
          title: res.data.errorinfo,
          icon:'loading',
          duration: 2000
        })
      }
		});
  },
  changeRentalTime: function(e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.rentalTime = rval
      that.setData(
        {data: thatData}
      )
    }
  },
  changeRental: function (e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.rental = Number(rval)
      that.setData(
        { data: thatData }
      )
      that.sdmAllCount()
    }
  },
  changeElectric: function (e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.electricNow = Number(rval)
      that.setData(
        { data: thatData }
      )
      that.sdmAllCount()
    }
  },
  changeWater: function (e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.waterNow = Number(rval)
      that.setData(
        { data: thatData }
      )
      that.sdmAllCount()
    }
  },
  changeGas: function (e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.gasNow = Number(rval)
      that.setData(
        { data: thatData }
      )
      that.sdmAllCount()
    }
  },
  changeOtherPrice: function (e) {
    var rval = e.detail.value
    var that = this
    if (rval != "null") {
      var thatData = that.data.data
      thatData.otherPrice = Number(rval)
      that.setData(
        { data: thatData }
      )
      that.sdmAllCount()
    }
  },
  //计算水电煤
  sdmAllCount: function () {
    var that = this
    var rantalData = that.data.data
    var roomData = that.data.roomData
    //电费
    var electricNow = 0;
    if (rantalData.electricNow) electricNow = Number(rantalData.electricNow)
    var electricResult = (electricNow - Number(rantalData.electricPre)) * roomData.electricPrice
    //水费
    var waterNow = 0;
    if (rantalData.waterNow) waterNow = Number(rantalData.waterNow)
    var waterResult = (waterNow - Number(rantalData.waterPre)) * roomData.waterPrice
    //燃气费
    var gasNow = 0;
    if (rantalData.gasNow) gasNow = Number(rantalData.gasNow)
    var gasResult = (gasNow - Number(rantalData.gasPre)) * roomData.gasPrice
    //总计
    var sdmCount = electricResult + waterResult + gasResult
    var allCount = sdmCount + Number(rantalData.rental)
    if(rantalData.otherPrice){
      allCount += Number(rantalData.otherPrice)
    }

    
    var newData = that.data.data

    newData.sdmCount = sdmCount.toFixed(2)
    newData.allCount = allCount.toFixed(2)
    console.log(newData)
    that.setData({
      data: newData,
      electricResult: electricResult.toFixed(2),
      waterResult: waterResult.toFixed(2),
      gasResult: gasResult.toFixed(2)
    })
  },
  chooseImg:function(){
      var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
                if (session_id != "" && session_id != null) {
                  var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + session_id }
                } else {
                  var header = { 'content-type': 'application/x-www-form-urlencoded'     }
                }  
                wx.uploadFile({
                    url: config.apiList.plana.fileUpload,
                    filePath: tempFilePaths[0],
                    name: 'Filedata',
                    header:header,
                    formData:{
                        'user': 'test'
                    },
                    success: function(res){
                      console.log(res);
                        var data = JSON.parse(res.data)
                        // console.log(data.status)
                        if(data.status){
                          // console.log(data.imgurl)
                          that.setData({
                            uploadImg: data.imgid,
                            uploadImgUrl:data.imgurl,
                          })
                        }
                    }
                })
            }
        })
    }
})