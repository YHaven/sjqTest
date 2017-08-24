var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
  data:{
    id:'',
    serviceTypeMore: '',
    userName: '',
    userPhone: '',
    serviceAddress: '',
    userType: 0,
    userTypeArray: ['租客', '房东','服务商'],
    userTypeIndex: 0,
    serviceType: 0,
    serviceTypeArray: ['维修','装修','其他'],
    serviceTypeIndex: 0,
    remark: ''
  },
  onLoad:function(options){
    var birthdayEndDate = util.getDate()
    var that = this
    wx.showNavigationBarLoading()
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
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getUserType,params,function(res){
      if (res.data.status){
        var data = res.data;
        var userType = 0;
        if (data.userType == 5) userType = 1;
        if (data.userType == 6) userType = 2;
        if (userType == 2){
          that.setData({
            serviceTypeMore: data.serviceTypeMore,
            userName: data.userName,
            userPhone: data.userPhone,
            serviceAddress: data.serviceAddress,
            userTypeIndex: userType,
            userType: that.data.userTypeArray[userType],
            serviceTypeIndex: data.serviceType,
            serviceType: that.data.serviceTypeArray[data.serviceType],
            remark: data.remark
          })
        }else{
          that.setData({
            userPhone: data.userPhone,
            userTypeIndex: userType,
            userType: that.data.userTypeArray[userType]
          })
        }
        
      }
     
			wx.hideNavigationBarLoading()
		});
  },
  savePersonInfo: function(e) {
    var that = this;
    var data = e.detail.value
    console.log(data);
    // return false;

    var params = data;
    params.vt = 1;
    if(typeof params.userPhone === 'undefined' || params.userPhone.trim() === '' || params.userPhone === null ){
      wx.showModal({
          title: '提示',
          content: '手机号码未填写。'
        })
      
      return false;
    }else{

      if(!(/^1(3|4|5|7|8)\d{9}$/.test(params.userPhone))){ 
        wx.showModal({
          title: '提示',
          content: '手机号码不正确。'
        })

        return false;
      } 
    }
    var url = config.apiList.plana.addUserType
    plana.formSubmit.call(that,url,params,function(res){
      if(res.data.status){
        // wx.switchTab({
        //     url: '/pages/personalHouse/personalHouse'
        // })
        app.getUserInfo()
        wx.navigateBack()
      }
		});
  },
  changeuserType: function(e) {
    var userTypeIndex = e.detail.value
    if (userTypeIndex != "null") {
      this.setData({
        userTypeIndex: userTypeIndex,
        userType: this.data.userTypeArray[this.data.userTypeIndex]
      })
    }
  },
  changeserviceType: function(e) {
    var serviceTypeIndex = e.detail.value
    if (serviceTypeIndex != "null") {
      this.setData({
        serviceTypeIndex: serviceTypeIndex,
        serviceType: this.data.serviceTypeArray[this.data.serviceTypeIndex]
      })
    }
  }
})