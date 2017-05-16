var plana = require('../../comm/script/plana')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		dataList:[],
    confirmPay:0,
		hasMore: true,
		start:1,
		showLoading: true
	},
  onShow:function(){
    var that = this
    wx.showNavigationBarLoading()
      var params = {
        confirmPay: that.data.confirmPay
      }
    params.vt = 1;
    params.page = 1;
    that.setData({
      dataList: []
    })

    plana.getPersonalList.call(that, config.apiList.plana.getShowRentalList, params, function (res) {
      wx.hideNavigationBarLoading()
    });
  },
  onLoad: function (options) {
		var that = this
    if (options.confirmPay != '' && options.confirmPay != null) {
      that.setData({
        confirmPay: options.confirmPay
      })
    }
    
    
	},
	onPullDownRefresh: function() {
		var that = this
		
		that.onShow()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			var params = {
        vt:1,
        id: that.data.parentid,
				page:that.data.start
			}
      plana.getPersonalList.call(that, config.apiList.plana.getShowRentalList,params);
		}
	},
  showOpera:function(e){
		var data = e.currentTarget.dataset;
		this.hideOpera();
		var oldData = this.data.dataList;
		oldData[data.index].show = true;
		this.setData({
			dataList: oldData
		})
	},
	hideOpera:function(){
		var that = this;
		var oldData = that.data.dataList;
		for(var i=0;i<oldData.length;i++){
			oldData[i].show = false;
		}
		that.setData({
			dataList: oldData
		})
	},
	viewData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalRentalEdit/personalRentalEdit?id=" + data.id
		})
	},
  editData:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../personalRentalEdit/personalRentalEdit?id=" + data.id
		})
	},
	deleteData:function(e){
		var data = e.currentTarget.dataset;
		var that = this;
    
    var params = {
			id:data.id
		};
    params.vt = 1;
    var url = config.apiList.plana.getRentalInfoDelete

		wx.showModal({
			title: '提示',
			content: '确定删除？',
			success: function(res) {
				if (res.confirm) {
					plana.dataDelete.call(that,url,params,function(res){
						if(res.data.status){
							that.onShow();
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
    
		
	},
  confirmPay: function (e) {
    var data = e.currentTarget.dataset;
    var that = this;

    var params = {
      id: data.id
    };
    params.vt = 1;
    var url = config.apiList.plana.getRentalInfoConfirmPay

    wx.showModal({
      title: '提示',
      content: '确定收款？',
      success: function (res) {
        if (res.confirm) {
          plana.dataDelete.call(that, url, params, function (res) {
            if (res.data.status) {
              that.onShow();
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
	addData:function(){

	}
})