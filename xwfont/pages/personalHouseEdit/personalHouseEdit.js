var util = require('../../util/util')
var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
Page({
  data:{
    uploadImg: '',
    houseName: '',
    houseType: 0,
    houseTypeArray: ['住宅', '仓库'],
    houseTypeIndex: 0,
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
    }else{
      var params = {}
    }
		
		plana.getPersonalInfo.call(that,config.apiList.plana.getHouseInfo,params,function(res){
      if (res.data.status){
        var data = res.data.data
        that.setData({
          uploadImg: data.uploadImg,
          houseName: data.houseName,
          houseType: data.houseType,
          remark: data.remark
        })
      }
     
			wx.hideNavigationBarLoading()
		});
  },
  savePersonInfo: function(e) {
    var data = e.detail.value
    console.log(data);
    // wx.setStorage({
    //   key: 'person_info',
    //   data: {
    //     name: data.name,
    //     nickName: data.nickName,
    //     gender: data.gender,
    //     age: data.age,
    //     birthday: data.birthday,
    //     constellation: data.constellation,
    //     company: data.company,
    //     school: data.school,
    //     tel: data.tel,
    //     email:data.email,
    //     intro: data.intro
    //   },
    //   success: function(res){
    //     wx.showToast({
    //       title: '修改成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     setTimeout(function(){
    //       wx.navigateTo({
    //         url: '../personInfo/personInfo'
    //       })
    //     },2000)
    //   }
    // })
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
  }
})