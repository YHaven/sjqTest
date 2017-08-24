var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
Page({
	data: {
		selectAddress:false,
		userInfo:{},
		userAddress:{},
		provinceArray:[],
		comeform:'',
		consignee:'',
		mobile:'',
		address:'',
		regionName:'省、市、区',
		cityArray:[{name:'',value:''}],
		areaArray:[{name:'',value:''}],
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
		var that = this;
		that.getInviteCode(options);
		that.setData({
			comeform:options.comeform
		})
		that.getUserType();
		that.getUserAdds();
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
	bindConsigneeInput: function(e) {
		this.setData({
			consignee: e.detail.value
		})
	},
	bindMobileInput: function(e) {
		this.setData({
			mobile: e.detail.value
		})
	},
	bindAddressInput: function(e) {
		this.setData({
			address: e.detail.value
		})
	},
	getUserType:function(){
		var that = this;
		var userInfo =  wx.getStorageSync('person_info');
		that.setData({
			userInfo: userInfo
		});
	},
	getUserAdds:function(){
		var that = this;
		var params = {}
		params.uid = that.data.userInfo.userId;
		util.postData.call(that,config.wxApi.getUserAddr,params,function(res){
			console.log(res)
			if(res.data.err == 0){
				var addressObj = res.data.data[0];
				var noAddress = true;
				if(res.data.data.length>0){
					noAddress = false;
				}
				that.setData({
					userAddress: addressObj,
					noAddress:noAddress,
					consignee:addressObj.consignee,
					mobile:addressObj.mobile,
					address:addressObj.address,
					provinceId:addressObj.province,
					cityId:addressObj.city,
					areaId:addressObj.district,
					regionName:addressObj.regionName
				});
				
			}else{
				that.setData({
					noAddress:true,
				})
			}
			
		});
	},
	addUserAddr:function(){
		var that = this;
		var params = {}
		params.uid = that.data.userInfo.userId;
		params.consignee = that.data.consignee;
		params.mobile = that.data.mobile;
		params.province = that.data.provinceId;
		params.city = that.data.cityId;
		params.district = that.data.areaId;
		params.address = that.data.address;


		if(typeof params.consignee === 'undefined' || params.consignee.trim() === '' || params.consignee === null ){
			util.message.show.call(that,{
				content: '收货人未填写',
				icon: 'null',
				duration: 3000
			})

			return false;
		}

		if(typeof params.mobile === 'undefined' || params.mobile.trim() === '' || params.mobile === null ){
			
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(params.mobile))){ 
				util.message.show.call(that,{
					content: '手机号填写不正确',
					icon: 'null',
					duration: 3000
				})

				return false;
			} 
			
		}

		if(typeof params.district === 'undefined' || params.district.trim() === '' || params.district === null || params.district == 0){
			util.message.show.call(that,{
				content: '省市区未填写',
				icon: 'null',
				duration: 3000
			})

			return false;
		}

		if(typeof params.address === 'undefined' || params.address.trim() === '' || params.address === null ){
			util.message.show.call(that,{
				content: '详细地址未填写',
				icon: 'null',
				duration: 3000
			})

			return false;
		}



		var url = config.wxApi.editUserAddr;

		if(that.data.noAddress) url = config.wxApi.addUserAddr;
		util.postData.call(that,url,params,function(res){
			console.log(res)
			if(res.data.err == 0){
				that.setData({
					userAddress: res.data.data
				});
				if(that.comeform == 'home'){
					wx.navigateTo({
						url: '../createOrder/createOrder'
					})
				}else{
					wx.navigateBack()
				}
				// wx.showToast({
				// 	title: '保存成功！',
				// 	icon: 'success',
				// 	duration: 3000
				// })
			}else{
				util.message.show.call(that,{
					content: res.data.mes,
					icon: 'null',
					duration: 3000
				})
			}
			
		});
	},
	changeAddress:function(e){
		var that = this;
		const val = e.detail.value;
		var oldProvinceId = that.data.s_provinceId;
		var oldCityId = that.data.s_cityId;
		var oldAreaId = that.data.s_areaId;
		var nowProvinceId = ''|| that.data.provinceArray[val[0]].value ;
		var nowCityId =  ''||that.data.cityArray[val[1]].value ;

		// if(nowProvinceId == ''){
		// 	that.setData({
		// 		cityArray:[{name:'请选择',value:''}],
		// 		areaArray:[{name:'请选择',value:''}]
		// 	})
		// 	return;
		// }

		if(nowProvinceId != oldProvinceId){
			that.getRegion(nowProvinceId,function(res){
				// console.log(res);
				if(res.data.err == 0){
					var dataList = res.data.data.region_lsit;
					var dataArray = [{name:'请选择',value:''}];
					for(var i = 0;i<dataList.length;i++){
						var dataObj = {};
						dataObj.name = dataList[i].region_name;
						dataObj.value = dataList[i].region_id;
						dataArray.push(dataObj);
					}
					that.setData({
						selectAddress:true,
						cityArray:dataArray,
						areaArray:[],
						provinceId: nowProvinceId,
						s_provinceId: nowProvinceId,
						cityId: '',
						s_cityId: '',
						areaId: '',
						s_areaId: ''

					})
				}
				
			});
		}else if(nowCityId != oldCityId){

			if(nowCityId == ''){
				that.setData({
						selectAddress:true,
						areaArray:[],
						cityId: '',
						s_cityId: '',
						areaId: '',
						s_areaId: ''
					})
			}else{
				that.getRegion(nowCityId,function(res){
				if(res.data.err == 0){
						var dataList = res.data.data.region_lsit;
						var dataArray = [{name:'请选择',id:''}];
						for(var i = 0;i<dataList.length;i++){
							var dataObj = {};
							dataObj.name = dataList[i].region_name;
							dataObj.value = dataList[i].region_id;
							dataArray.push(dataObj);
						}
						that.setData({
							selectAddress:true,
							areaArray:dataArray,
							cityId: nowCityId,
							s_cityId: nowCityId,
							areaId: '',
							s_areaId: ''
						})
					}
					
				});
			}

			
		}else{
			
		var province = '' ;
		var provinceid = '';
		if( that.data.provinceArray.length>0){
			province = that.data.provinceArray[val[0]].name;
			provinceid = that.data.provinceArray[val[0]].value;
			// that.setData({
			// 	provinceId: provinceid,
			// 	s_provinceId: provinceid
			// })
		}
		// console.log('1111111')
		var city = '';
		var cityid = '' ;
		if(that.data.cityArray.length>0){
			city = that.data.cityArray[val[1]].name;
			cityid = that.data.cityArray[val[1]].value;
			if(typeof cityid == 'undefined' ||cityid == ''){
				city = '';
			}
			// that.setData({
			// 	cityId: cityid,
			// 	s_cityId: cityid
			// })
		}

		// console.log('2222222')
		var area = '';
		var areaid = '' ;
		if(that.data.areaArray.length>0){
			area = that.data.areaArray[val[2]].name;
			areaid = that.data.areaArray[val[2]].value;
			if(typeof areaid == 'undefined' ||areaid == '') area = '';
			that.setData({
				areaId: areaid,
				s_areaId: areaid
			})
		}
		// console.log('33333333')

		// console.log(province+city+area)
		that.setData({
				regionName:province+city+area
			})


		}

		// console.log('nowProvinceId'+nowProvinceId+'oldProvinceId'+oldProvinceId+'nowCityId'+nowCityId+'oldCityId'+oldCityId);

		
		
	},
	
	showAddress:function(){
		var that = this;
		if(that.data.provinceArray.length<=0){
			that.getRegion(1,function(res){
				//console.log(res);
				if(res.data.err == 0){
					var provinceData = res.data.data.region_lsit;
					var provinceArray = [];
					
					for(var i = 0;i<provinceData.length;i++){
						var provinceObj = {};
						provinceObj.name = provinceData[i].region_name;
						provinceObj.value = provinceData[i].region_id;
						provinceArray.push(provinceObj);
					}
					that.setData({
						selectAddress:true,
						provinceArray:provinceArray
					})

					//市
					// console.log(provinceArray[0].value)
					that.getRegion(provinceArray[0].value,function(res){
						//console.log(res);
						if(res.data.err == 0){
							var cityList = res.data.data.region_lsit;
							var cityArray = [{name:'请选择',value:''}];
							
							for(var i = 0;i<cityList.length;i++){
								var cityObj = {};
								cityObj.name = cityList[i].region_name;
								cityObj.value = cityList[i].region_id;
								cityArray.push(cityObj);
							}
							that.setData({
								cityArray:cityArray
							})
							//区
							// that.getRegion(cityArray[0].value,function(res){
							// 	//console.log(res);
							// 	if(res.data.err == 0){
							// 		var areaList = res.data.data.region_lsit;
							// 		var areaArray = [{name:'请选择',value:''}];
									
							// 		for(var i = 0;i<areaList.length;i++){
							// 			var areaObj = {};
							// 			areaObj.name = areaList[i].region_name;
							// 			areaObj.value = areaList[i].region_id;
							// 			areaArray.push(areaObj);
							// 		}
							// 		that.setData({
							// 			areaArray:areaArray
							// 		})

									
									
							// 	}
								
							// });
							
							
						}
						
					});
					
				}
				
			});
		}else{
			that.setData({
				selectAddress:true
			})
		}

		
	},
	closeAddress:function(){
		var that = this;
		// console.log(that.data.areaId)
		if(typeof that.data.areaId == 'undefined'||that.data.areaId == 0 ||that.data.areaId == ''){
			wx.showModal({
						title: '提示',
						content: '请选择省、市、区。'
					})
			return false;
		}
		that.setData({
			selectAddress:false
		})
	},
	viewNavDetail:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: data.url
		})
	},
	onShareAppMessage: function () {
		return {
			title: config.title,
			desc: config.desc,
			path: config.wxpath
		}
	},
	getRegion:function(regionId,cb){
		var that = this;
		var url = config.wxApi.region;
		var params = {};
		params.region_id = regionId;
		util.postData.call(that,url,params,cb);
	}
})