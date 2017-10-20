var util = require('../../../utils/util.js')
Page({
	data: {
		bannerList: [],
		userInfo:{}
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);

		//检查授权
		that.isOpenSetting();
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
		defaultBanner.ad_img="../../../images/banner.jpg";
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
	onShareAppMessage: function () {
		return {
			title: util.config.title,
			desc: util.config.desc,
			path: util.config.wxpath
		}
	}
})