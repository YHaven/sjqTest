var animationFun = {

  //一直旋转并缩放
  rotatingAndScaleAll: function (keyName, loopTimer, delayTime){
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].rotate(90).scale(1.5, 1.5).step();
    that[keyName].rotate(180).scale(1, 1).step();
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)
    var i = 3;
    setInterval(function () {
      console.log(i);
      that[keyName].rotate(90*i).scale(1.5, 1.5).step();
      that[keyName].rotate(90*(i+1)).scale(1, 1).step();
      exportObj = {};
      exportObj[keyName] = that[keyName].export()
      that.setData(exportObj)
      i = i+2;
    }, loopTimer*2)
    

  },

  //一直旋转
  rotatingAll: function (keyName, loopTimer, delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].rotate(180).step();
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)

    var i = 2;
    setInterval(function () {
      that[keyName].rotate(180 * i).step();
      exportObj = {};
      exportObj[keyName] = that[keyName].export()
      that.setData(exportObj)
      i++;
    }, loopTimer)


  },
  //缩放
  scaleEnd: function (keyName, loopTimer, scaleNumber, delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].scale(scaleNumber, scaleNumber).step();
    
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)
  },

  //上下平移加颜色变化
  translateYEnd: function (keyName, loopTimer, downNumber, delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'ease-in',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].opacity(1, 0).translateY(downNumber).step();
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)
  },
  //左右平移加颜色变化
  translateXEnd: function (keyName, loopTimer, downNumber,delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined'){
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'ease-in',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].opacity(1,0).translateX(downNumber).step();
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)
  },
  //从无到有
  opacityEnd: function (keyName, loopTimer,opacityType, delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'ease-in',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });
    if (opacityType == 0){
      that[keyName].opacity(1, 0).step();
    }else{
      that[keyName].opacity(0, 1).step();
    }
    
    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)
  },
  //缩放和颜色
  scaleAndOpacity: function (keyName, loopTimer, scaleNumber, delayTime) {
    var that = this;
    if (typeof delayTime == 'undefined') {
      delayTime = 0
    }
    that[keyName] = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: loopTimer,
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: delayTime,
      // transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    });

    that[keyName].opacity(0, 1).scale(scaleNumber, scaleNumber).step();
    that[keyName].opacity(1, 0).scale(scaleNumber / scaleNumber, scaleNumber / scaleNumber).step();

    var exportObj = {};
    exportObj[keyName] = that[keyName].export()
    that.setData(exportObj)

    var i = 2;
    setInterval(function () {
      that[keyName].opacity(0, 1).scale(scaleNumber, scaleNumber).step();
      that[keyName].opacity(1, 0).scale(scaleNumber / scaleNumber, scaleNumber / scaleNumber).step();
      exportObj[keyName] = that[keyName].export()
      that.setData(exportObj)
      i++;
    }, loopTimer)


  },
}


module.exports = {
  animationFun: animationFun,
    
}