var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
Page({
  data:{
    parentid:0,
    parentData:{},
    moneyType_: 0,
    moneyTypeArray: ['收入', '支出'],
    moneyTypeIndex: 0,
    id:0,
    data:{}
  },
  onLoad:function(options){
    var that = this
    // wx.showNavigationBarLoading()
    // that.setData({
    //       parentid:options.parentid
    //     })
    // if (options.id){
    //   var params = {
    //     id: options.id
    //   }
    //   that.setData({
    //      id:options.id
    //     })
    // }else{
    //   var params = {}
    // }
		
		// plana.getPersonalInfo.call(that,config.apiList.plana.getRoomInfo,params,function(res){
    //   if (res.data.status){
    //     that.setData({
    //       data:res.data.data,
    //       parentData:res.data.data.house,
    //       parentid:res.data.data.house.id
    //     })
    //   }
     
		// 	wx.hideNavigationBarLoading()
		// });
  },
  savePersonInfo: function(e) {
    var that = this;
    var data = e.detail.value
    
    var params = data;
    params.vt = 1;
    var url = config.apiList.plana.getShowRentalAddCash
    plana.formSubmit.call(that,url,params,function(res){
      if(res.data.status){
        // wx.navigateTo({
        //   url: "../personalRoom/personalRoom?parentid=" + that.data.parentid
        // })
        wx.navigateBack()
      }
		});
  },
  changemoneyType: function(e) {
    var moneyTypeIndex = e.detail.value
    if (moneyTypeIndex != "null") {
      var moneyType = 2; //2收入
      if (moneyTypeIndex == 1){
        
        moneyType = 1;//1支出
      }
      this.setData({
        moneyTypeIndex: moneyTypeIndex,
        moneyType_: moneyType
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