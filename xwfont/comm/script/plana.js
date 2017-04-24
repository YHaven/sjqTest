var config = require('./config.js')
var message = require('../../component/message/message') //dialog提示


// 获取消息信息
function getMessageList(url, start, msg_resource, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        vt:'1',
        page:start,
        msgResource:msg_resource
      },
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.datalist.length === 0){
          that.setData({
            hasMore: false,
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
            id:res.data.data.id,
            datatime:res.data.data.datatime,
            author:res.data.data.author,
            title: res.data.data.title,
            content: res.data.data.content,
            showLoading: false
          })
          var pageTitle = res.data.data.title;
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

module.exports = {
  getMessageList: getMessageList,
  getMessageDetail:getMessageDetail
}