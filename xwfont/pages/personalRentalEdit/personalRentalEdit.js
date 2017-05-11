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
          // parentid:options.parentid
      parentid: 4
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
        // renterId: options.parentid
        renterId: 4
      }
    }
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getRentalInfo,params,function(res){
      if (res.data.status){
        that.setData({
          data:res.data.data,
          parentData:res.data.data.renter,
          parentid: res.data.data.renter.id,
          roomData: res.data.data.room
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
      if(res.data.status){
        wx.navigateTo({
          url: "../getRentalInfo/getRentalInfo?parentid=" + that.data.parentid
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
    var gascNow = 0;
    if (rantalData.gascNow) gascNow = Number(rantalData.gascNow)
    var gasResult = (gascNow - Number(rantalData.gasPre)) * roomData.gasPrice
    //总计
    var sdmCount = electricResult + waterResult + gasResult
    var allCount = sdmCount + rantalData.rental

    console.log('电费' + sdmCount + allCount)

    var newData = that.data.data
    console.log('s费' + electricResult)

    newData.sdmCount = sdmCount
    newData.allCount = allCount
    console.log(newData)
    that.setData({
      data: newData,
      electricResult: electricResult,
      waterResult: waterResult,
      gasResult: gasResult
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