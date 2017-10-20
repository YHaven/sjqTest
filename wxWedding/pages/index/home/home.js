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
    that.isOpenSetting();//检查授权
    that.getUserType();//获取用户信息
		that.getInviteCode(options);//显示访客
    that.loadBanner([]);//加载banner
    that.loadData();


	},
	onShow:function(){
		var that = this;
	},
	isOpenSetting:function(){
    var that = this;

    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒

    wx.getSetting({

      success: function success(res) {

        // console.log(res.authSetting);

        var authSetting = res.authSetting;

        if (util.isEmptyObject(authSetting)) {

          //console.log('首次授权');

        } else {

          //console.log('不是第一次授权', authSetting);

          // 没有授权的提醒

          if (authSetting['scope.userInfo'] === false) {

            wx.showModal({

              title: '用户未授权',

              content: '如需正常使用阅读记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',

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
      films: [],
      hasMore: true,
      showLoading: true,
      start: 1
    })
    this.onLoad()
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