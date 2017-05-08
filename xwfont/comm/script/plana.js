var config = require('./config.js')
var message = require('../../component/message/message') //dialog提示


// 获取消息信息
function getMessageList(url, params, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: params,
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        
        if(res.data.datalist.length === 0){
          console.log(res.data.datalist.length)
          that.setData({
            hasMore: false,
            showLoading: false
          })
        }else{
          that.setData({
            films: that.data.films.concat(res.data.datalist),
            start: that.data.start + 1,
            showLoading: false
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

//获取消息详情
function getMessageDetail(url, params, cb, fail_cb){
   var that = this
   message.hide.call(that)
   wx.request({
      url: url,
      data:params,
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.status === true){
          
          that.setData({
            id:res.data.id,
            datatime: res.data.timer,
            author:res.data.author,
            title: res.data.title,
            content: res.data.content,
            readnum: res.data.readnum,
            showLoading: false
          })
          var pageTitle = res.data.title;
          if(pageTitle.length>10){
            pageTitle = pageTitle.substring(0,10)+'...'
          }
          wx.setNavigationBarTitle({
            title: pageTitle
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
}

//获取个人房屋列表
function getPersonalList(url, params, cb, fail_cb){
   var that = this
   message.hide.call(that)
   wx.request({
      url: url,
      data:params,
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.status === true){
          if(res.data.datalist.length === 0){
            that.setData({
              hasMore: false,
            })
          }else{
            that.setData({
              dataList: that.data.dataList.concat(res.data.datalist),
              start: that.data.start + 1,
              showLoading: false
            })
            if(res.data.datalist.length<res.data.pagesize){
              that.setData({
                hasMore: false,
              })
            }
          }
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
}

//获取个人房屋信息
function getPersonalInfo(url, params, cb, fail_cb){
   var that = this
   message.hide.call(that)
   wx.request({
      url: url,
      data:params,
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.status === true){
            that.setData({
              dataInfo: res.data.data
            })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
}

module.exports = {
  getMessageList: getMessageList,
  getMessageDetail:getMessageDetail,
  getPersonalList:getPersonalList,
  getPersonalInfo:getPersonalInfo
}