var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
Page({
  data:{
    parentid:0,
    parentData:{},
    id:0,
    dataImg: '',
    dataImgUrl:'',
    data:{}
  },
  onLoad:function(options){
    var birthdayEndDate = util.getDate()
    var that = this
    wx.showNavigationBarLoading()
    that.setData({
          parentid:options.parentid
        })
    if (options.id){
      var params = {
        id: options.id
      }
      that.setData({
         id:options.id
        })
    }else{
      var params = {}
    }
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getRoomInfo,params,function(res){
      if (res.data.status){
        that.setData({
          data:res.data.data,
          dataImg: res.data.data.dataImgId,
          dataImgUrl:res.data.data.dataImg,
          parentData:res.data.data.house,
          parentid:res.data.data.house.id
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
    var url = config.apiList.plana.getRoomInfoAdd
    if (params.id != "" && params.id != null && params.id != 0) {
      url = config.apiList.plana.getRoomInfo
    }
    plana.formSubmit.call(that,url,params,function(res){
      if(res.data.status){
        // wx.navigateTo({
        //   url: "../personalRoom/personalRoom?parentid=" + that.data.parentid
        // })
        wx.navigateBack()
      }
		});
  },
  changehouseType: function(e) {
    var houseTypeIndex = e.detail.value
    if (houseTypeIndex != "null") {
      this.setData({
        houseTypeIndex: houseTypeIndex,
        houseType: this.data.houseTypeArray[this.data.houseTypeIndex]
      })
    }
  },
  changeGender: function(e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: this.data.genderArray[this.data.genderIndex]
      })
    }
  },
  changeBirthday: function(e) {
    var birthday = e.detail.value
    if (birthday != "null") {
      this.setData(
        {birthday: birthday}
      )
    }
  },
  changeConstellation: function(e) {
    var constellationIndex = e.detail.value
    if (constellationIndex != "null") {
      this.setData({
        constellationIndex: constellationIndex,
        constellation: this.data.constellationArray[this.data.constellationIndex]
      })
    }
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
                      // console.log(res);
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
    },
    chooseDataImg:function(){
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
                      // console.log(res);
                        var data = JSON.parse(res.data)
                        // console.log(data.status)
                        if(data.status){
                          // console.log(data.imgurl)
                          that.setData({
                            dataImg: data.imgid,
                            dataImgUrl:config.apiList.plana.host+data.imgurlsmall,
                          })
                        }
                    }
                })
            }
        })
    }
})