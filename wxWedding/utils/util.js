var config = require('./config.js')
var message = require('../component/message/message') //dialog提示

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatWeek(d) {
  // var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  return weekday[d.getDay()];
}


//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss"); 
Date.prototype.Format = function(fmt){
  var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//getNextMonth("2014-12-25")
function getNextMonth(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 1;  
    if (month2 == 13) {  
        year2 = parseInt(year2) + 1;  
        month2 = 1;  
    }  
    var day2 = day;  
    var days2 = new Date(year2, month2, 0);  
    days2 = days2.getDate();  
    if (day2 > days2) {  
        day2 = days2;  
    }  
    if (month2 < 10) {  
        month2 = '0' + month2;  
    }  
  
    var t2 = year2 + '-' + month2 + '-' + day2;  
    return t2;  
}  


function getDate() {
  var time = new Date()
  var year = time.getFullYear()
  var month = time.getMonth()
  month = month < 10 ? '0' + month : month
  var day = time.getDay()
  day = day < 10 ? '0' + day : day
  return [year, month, day].join('-')
}

function getTime() {
  var time = new Date()
  var hours = time.getHours()
  hours = hours < 10 ? '0' + hours : hours
  var minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = time.getSeconds()
  second = second < 10 ? '0' + second : second
  return [hours, minute, second].join(':')
}

function getAccessToken(cb,fail_cb){
    var params = {}
    params.grant_type = 'client_credential';
    params.appid = config.appId;
    params.secret = config.appKey;
    wx.request({
      url: config.weixinApi.getaccesstoken,
      data:params,
      method: 'GET', 
      // header: {'content-type': 'application/json'},
      success: function(res){

        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res)
      },
      fail: function() {
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
}

function postData(url, params, cb, fail_cb){
   var that = this

   var header = { 'content-type': 'application/x-www-form-urlencoded' }
   var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
   if (session_id != "" && session_id != null) {
     header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + session_id }
   }

   wx.request({
      url: url,
      data:params,
      method: 'POST', 
      header: header,
      // header: {'content-type': 'application/json'},
      success: function(res){

        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res)
      },
      fail: function() {
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
}



function postDataList(url, params, cb, fail_cb){
   var that = this
   message.hide.call(that)
   var header = { 'content-type': 'application/x-www-form-urlencoded' }
   var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
   if (session_id != "" && session_id != null) {
     header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + session_id }
   }

   wx.request({
      url: url,
      data:params,
      method: 'POST', 
      header: header,
      success: function(res){
        // console.log(res)
        if (res.data.status){
          if (typeof res.data.data.dataList == 'undefined' || res.data.data.dataList.length === 0 ){
            that.setData({
              hasMore: false,
              showLoading: false
            })
          }else{
            that.setData({
              dataList: that.data.dataList.concat(res.data.data.dataList),
              start: that.data.start + 1,
              hasMore: false,  //现在必为空
              showLoading: false
            })
            if (res.data.data.dataList.length<10){
              that.setData({
                hasMore: false,
              })
            }
          }
        }else{
          that.setData({
            showLoading: false
          })
          message.show.call(that, {
            content: res.data.mes,
            icon: 'offline',
            duration: 3000
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


function uploadImg(url, params, cb, fail_cb){
    var that = this;
    // console.log(params)
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            var header = { 'content-type': 'application/x-www-form-urlencoded' }
            var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
            if (session_id != "" && session_id != null) {
              header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + session_id }
            }
            // var header = { 'content-type': 'multipart/form-data'     }
            wx.uploadFile({
                url: url,
                filePath: tempFilePaths[0],
                name: 'Filedata',
                header:header,
                formData:params,
                success: function(res){
                  // console.log(res)
                  typeof cb == 'function' && cb(res)
                }
            })
        }
    })
}

// 是否为空对象

function isEmptyObject(e) {

    var t;

    for (t in e)

        return !1;

    return !0

}


function checkOpenSetting() {

  // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒

  wx.getSetting({

    success: function success(res) {

      // console.log(res.authSetting);

      var authSetting = res.authSetting;

      if (isEmptyObject(authSetting)) {

        //console.log('首次授权');

      } else {

        //console.log('不是第一次授权', authSetting);

        // 没有授权的提醒

        if (authSetting['scope.userInfo'] === false || authSetting['scope.userLocation'] === false) {

          wx.showModal({

            title: '用户未授权',

            content: '如需正常使用该功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',

            showCancel: false,

            success: function (res) {

              if (res.confirm) {


                wx.openSetting({

                  success: function success(res) {

                    //console.log('openSetting success', res.authSetting);

                  }

                });

              }

            }

          })

        }

      }

    }

  });

}

module.exports = {
  formatTime: formatTime,
  formatWeek:formatWeek,
  getNextMonth:getNextMonth,
  getDate: getDate,
  getTime: getTime,
  postData:postData,
  postDataList:postDataList,
  uploadImg:uploadImg,
  getAccessToken:getAccessToken,
  isEmptyObject:isEmptyObject,
  message:message,
  checkOpenSetting: checkOpenSetting,
  config:config
}