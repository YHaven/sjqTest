var util = require('../../../utils/util.js')
Page({
	data: {
    userInfo: {},
		bannerList: [],
    indicatorDots: false,
    hasMore: true,
    showLoading: true,
    start: 1,
		dataList:[]
	},
	onLoad: function (options) {
		var that = this;

		that.getInviteCode(options);//显示访客
    


	},
  onShow: function () {
    var that = this
    wx.showNavigationBarLoading()
    var params = {
      page: 1,
      businessId: util.config.wxApi.business
    }
    that.setData({
      dataList: []
    })
    setTimeout(function(){
      util.postDataList.call(that, util.config.wxApi.invitationList, params, function (res) {
        // console.log(res);
        that.loadData();
        that.loadBanner([]);//加载banner
        wx.hideNavigationBarLoading()
      });
    },3000);
    
  },
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
	getInviteCode: function (options) {
		if (options.uid != undefined) {
			wx.showToast({
				title: '来自用户:' + options.uid + '的分享',
				icon: 'success',
				duration: 2000
			})
		}
	},
	loadBanner: function (banner) {
		// [{"img":"","title":"","url":""}]
		var that = this;

    var params = {
      businessId: util.config.wxApi.business
    }

    util.postDataList.call(that, util.config.wxApi.siteInfo, params, function (res) {
      if (res.data.status) {
        
      }
      wx.hideNavigationBarLoading()
    });


		var defaultBanner = {};
    defaultBanner.ad_img ="../../../images/wedding-3.jpg";
		// banner = [];
		var bannerArray = [];
		if(banner.length<=0){
			bannerArray.push(defaultBanner);
		}else{
			for(var i=0;i<banner.length;i++){
				bannerArray.push(banner[i])
			}
		}
		that.setData({
			bannerList: bannerArray
		});
	},

  loadData:function(){
      var that = this;
      that.setData({
        dataList:[
          {
            id:'222',
            imgUrl:'../../../images/wedding-1.jpg',
            groom:'LLLLL',
            bride:'NNNNN',
            weddingDate:'2018年8月8日',
            weekDate:'星期三',
            isTop:1
          },
          {
            id: '222',
            imgUrl: '../../../images/wedding-2.jpg',
            groom: 'LLLLL',
            bride: 'NNNNN',
            weddingDate: '2018年8月9日',
            weekDate: '星期三',
            isTop: 0
          },
          {
            id: '222',
            imgUrl: '../../../images/wedding-2.jpg',
            groom: 'LLLLL',
            bride: 'NNNNN',
            weddingDate: '2018年8月6日',
            weekDate: '星期三',
            isTop: 0
          }
        ]
      });
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      dataList: [],
      hasMore: true,
      showLoading: true,
      start: 1
    })
    this.onShow()
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      var params = {
        vt: '1',
        page: that.data.start,
        msgResource: that.data.msgResource,
        businessId: config.apiList.plana.business
      };
      plana.getMessageList.call(that, config.apiList.plana.getMessageList, params)
    }
  },
	viewBannerDetail:function(e){
		var that= this;
		var data = e.currentTarget.dataset;
		// console.log(data.url);
		if(data.url){
			wx.navigateTo({
				url: data.url
			})
		}
		
	},

	viewNavDetail:function(e){
		var that= this;
		var data = e.currentTarget.dataset;
		if(data.url.indexOf('index/home/home')>0){
			wx.redirectTo({
				url: data.url
			});
			return false;
		}

		if(data.url.indexOf('my/my/my')>0){
			wx.redirectTo({
				url: data.url
			});
			return false;
		}
		wx.navigateTo({
			url: data.url
		})
	},
  
  //分享
	onShareAppMessage: function () {
		return {
			title: util.config.title,
			desc: util.config.desc,
      imageUrl: util.config.imageUrl,
			path: util.config.wxpath
		}
	}

})