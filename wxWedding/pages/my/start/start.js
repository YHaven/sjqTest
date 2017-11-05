//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    animationData: {},
    cardInfoList: [{
      cardUrl: 'https://www.zhencome.com/files/weddingdefault/card3.jpg',
      cardInfo: {
        cardTitle: '你不知道的事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }, 
    // {
    //     cardUrl: 'https://www.zhencome.com/files/weddingdefault/card2.jpg',
    //   cardInfo: {
    //     cardTitle: '你不知道的花',
    //     cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
    //   }
    // }, 
    {
      cardUrl: 'https://www.zhencome.com/files/weddingdefault/card1.jpg',
      cardInfo: {
        cardTitle: '来结婚吧',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '客服电话', '18268826992']
      }
    }
    ]
  },
  //事件处理函数
  slidethis: function(e) {
    // console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    self.animation= animation;
    self.animation.translateY(-420).rotate(-5).translateX(0).step();
    self.animation.translateY(62).translateX(25).rotate(0).step();
    self.setData({
      animationData: self.animation.export()
    });
    setTimeout(function() {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  buythis: function(e) {
    // console.log(e);
    // app.buyDetail = this.data.cardInfoList[e.target.id];
    // wx.navigateTo({
    //   url: '../detail/detail'
    // });
  },
  onLoad: function () {
    // console.log('onLoad');
    var that = this;
  }
})
