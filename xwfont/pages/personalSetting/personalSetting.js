var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
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
        var data = res.data.data;

        if (data.userType == 6){
          that.setData({
            serviceTypeMore: data.serviceTypeMore,
            userName: data.userName,
            userPhone: data.userPhone,
            serviceAddress: data.serviceAddress,
            userTypeIndex: data.userType,
            userType: that.data.userTypeArray[data.userType],
            serviceTypeIndex: data.serviceType,
            serviceType: that.data.serviceTypeArray[data.serviceType],
            remark: data.remark
          })
        }else{
          that.setData({
            userPhone: data.userPhone,
            userTypeIndex: data.userType,
            userType: that.data.userTypeArray[data.userType]
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
    return false;

    var params = data;
    params.vt = 1;
    var url = config.apiList.plana.addUserType
    plana.formSubmit.call(that,url,params,function(res){
      if(res.data.status){
        // wx.switchTab({
        //     url: '/pages/personalHouse/personalHouse'
        // })
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