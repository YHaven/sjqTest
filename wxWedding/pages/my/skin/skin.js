var util = require('../../../utils/util.js')
Page({
  data:{
    skinList: util.config.skinList,
    nowSkin: ''
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            nowSkin: util.config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            nowSkin: res.data
          })
        }
      }
    })
  },
  chooseSkin: function(e) {
    var url = e.currentTarget.dataset.url
    wx.setStorage({
      key: 'skin',
      data: url,
      success: function(res){
        wx.navigateBack({
          delta: 1,
          success: function(res){
            //console.log('success')
          }
        })
      }
    })
  }
})