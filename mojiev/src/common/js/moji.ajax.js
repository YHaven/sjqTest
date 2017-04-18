/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-01 14:01:26
 * @version $Id$
 */
var config = require('./moji.config.js')
import $ from 'zepto'
//首页方法
var indexFuns = {
	//首页初始化
	propath:'..',
	indexData:null,
	init:function(){
		//加载banner
		this.banner();
	},
	islogin:function(param,cb){
		$.ajax({
			type:'POST',
			url:config.indexAjax.islogin,
			data:param,
			dataType: 'json',
			success:function(data){
				
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},
	getQueryString:function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	},
	dMessages:function(e, t) {
	    var i = '';
	    t = arguments[1] ? arguments[1] : 2,
	    1 == t && (i = 'border:none; background: rgba(0,0,0,.7); color:#fff; max-width:100%; top:0; position:fixed; left:0; right:0; border-radius:0;'),
	    2 == t && (i = 'border:none; background: rgba(0,0,0,.7); color:#fff; max-width:90%; min-width:0.5rem; margin:0 auto; border-radius:.4rem;'),
	    layer.open({
	        style: i,
	        type: 0,
	        anim: 3,
	        content: e,
	        shade: !1,
	        time: 2
	    })
	},
	//时间比较
	compareTime:function(date1,date2){
		var oDate1,oDate2;
		if(typeof date1 ==='string'){
			oDate1 = new Date(date1.replace(/\-/g, '\/'));
		}else{
			oDate1 = date1;
		}
		if(typeof date2 ==='string'){
			oDate2 = new Date(date2.replace(/\-/g, '\/'));
		}else{
			oDate2 = date2;
		}
		return oDate1.getTime() > oDate2.getTime();
	},
	// 时间加减天数
	addDate:function(dd,dadd){
		var a ;
		if(typeof dd === 'string'){
			a = new Date(dd.replace(/\-/g, '\/'))
		}else{
			a = dd
		}
		
		var t = a.getTime();
		t = t + dadd * 24 * 60 * 60 * 1000
		var td = new Date(t)
		return td.getFullYear() + '-' + (td.getMonth()+1) + '-' + td.getDate()
	},
	//banner获取
	banner:function(cb){
		var banner = new Array();
		$.ajax({
			type:'GET',
			url:config.indexAjax.banner,
			dataType: 'json',
			success:function(data){
				indexFuns.indexData = data.data;
				var bannerRes = data.data.player;
				for (var i = 0; i < bannerRes.length; i++) {
					var bannerObj = {};
					bannerObj.imgUrl = bannerRes[i].photo.small;
					bannerObj.url = bannerRes[i].url;
					// if(i === 0){
					// 	bannerObj.url = 'newPeopleVip.html';
					// }else{
					// 	var category_id = bannerRes[i].url.substring(bannerRes[i].url.indexOf('category_id')+12,bannerRes[i].url.length);
					// 	bannerObj.url = '/mobile/index.php?r=category/index/products&id='+category_id;
					// }
					
					banner.push(bannerObj);
				};
				if(typeof cb === 'function'){
					cb(banner);
				}
			},
			error:function(xhr, type){
				
			}
		})
		return banner;
	},
	//nav快速入口
	mobileMenu:function(){
		var mobileMenu = new Array();
		if(indexFuns.indexData != null){
			var mobile_menu = indexFuns.indexData.mobile_menu;
			for (var i = 0; i < mobile_menu.length; i++) {
				var mmObj = mobile_menu[i];
				mobileMenu.push(mmObj);
			};
		}

		// $.ajax({
		// 	type:'GET',
		// 	url:config.indexAjax.banner,
		// 	dataType: 'json',
		// 	success:function(data){
		// 		var mobile_menu = data.data.mobile_menu;
		// 		for (var i = 0; i < mobile_menu.length; i++) {
		// 			var mmObj = mobile_menu[i];
		// 			mobileMenu.push(mmObj);
		// 		};
		// 	},
		// 	error:function(xhr, type){
				
		// 	}
		// })
		return mobileMenu;
	},
	//限时抢批
	timePanic:function(){

	},
	//云市场
	yunMarket:function(){
		var result = new Array();

		if(indexFuns.indexData != null){
			var getArray = indexFuns.indexData.yun_market;
			for (var i = 0; i < getArray.length; i++) {
				var getObj = getArray[i];
				result.push(getObj);
			};
		}

		// $.ajax({
		// 	type:'GET',
		// 	url:config.indexAjax.banner,
		// 	dataType: 'json',
		// 	success:function(data){
		// 		var getArray = data.data.yun_market;
		// 		for (var i = 0; i < getArray.length; i++) {
		// 			var getObj = getArray[i];
		// 			result.push(getObj);
		// 		};
		// 	},
		// 	error:function(xhr, type){
				
		// 	}
		// })
		return result;
	},

	//限时团批
	timeGroup:function(cb){
		var result = new Array();

		if(indexFuns.indexData != null){
			var getArray = indexFuns.indexData.time_group;
			for (var i = 0; i < getArray.length; i++) {
				var getObj = getArray[i];
				var buy_num = getObj.buy_num;
				var groupRule = getObj.group_rule;
				var progressArray = [];
				// 我要一个已团百分比
				for (var j = 1; j < groupRule.length; j++) {
					var progressObj = {light:''};
					if(buy_num >= groupRule[j].num){
						progressObj.light = 'light';
					}
					progressArray.push(progressObj);
					
				};

				getObj.progress = progressArray;
				result.push(getObj);
			};
			if(typeof cb === 'function'){
				cb(result);
			}
		}

		// $.ajax({
		// 	type:'GET',
		// 	url:config.indexAjax.banner,
		// 	dataType: 'json',
		// 	success:function(data){
		// 		var getArray = data.data.time_group;
		// 		for (var i = 0; i < getArray.length; i++) {
		// 			var getObj = getArray[i];
		// 			var buy_num = getObj.buy_num;
		// 			var groupRule = getObj.group_rule;
		// 			var progressArray = [];
		// 			// 我要一个已团百分比
		// 			for (var j = 1; j < groupRule.length; j++) {
		// 				var progressObj = {light:''};
		// 				if(buy_num >= groupRule[j].num){
		// 					progressObj.light = 'light';
		// 				}
		// 				progressArray.push(progressObj);
						
		// 			};

		// 			getObj.progress = progressArray;
		// 			result.push(getObj);
		// 		};
		// 		if(typeof cb === 'function'){
		// 			cb(result);
		// 		}
		// 	},
		// 	error:function(xhr, type){
				
		// 	}
		// })
		return result;
	},
	//精选档口
	sellerBest:function(){
		var result = new Array();

		if(indexFuns.indexData != null){
			var getArray = indexFuns.indexData.seller_best;
			for (var i = 0; i < getArray.length; i++) {
				var getObj = getArray[i];
				//名字要有缩短
				for (var j = 0; j < getObj.seller_goods.length; j++) {
					var goodName = getObj.seller_goods[j].name;
					if(goodName.length>9){
						getObj.seller_goods[j].nameShort = goodName.substring(0,9)+'...';
					}else{
						getObj.seller_goods[j].nameShort = goodName;
					}
				};

				result.push(getObj);
			};
		}
		// $.ajax({
		// 	type:'GET',
		// 	url:config.indexAjax.banner,
		// 	dataType: 'json',
		// 	success:function(data){
		// 		var getArray = data.data.seller_best;
		// 		for (var i = 0; i < getArray.length; i++) {
		// 			var getObj = getArray[i];
		// 			//名字要有缩短
		// 			for (var j = 0; j < getObj.seller_goods.length; j++) {
		// 				var goodName = getObj.seller_goods[j].name;
		// 				if(goodName.length>9){
		// 					getObj.seller_goods[j].nameShort = goodName.substring(0,9)+'...';
		// 				}else{
		// 					getObj.seller_goods[j].nameShort = goodName;
		// 				}
		// 			};

		// 			result.push(getObj);
		// 		};
		// 	},
		// 	error:function(xhr, type){
				
		// 	}
		// })
		return result;
	},

	//获取文章详情
	getArticleDetail:function(cb){
		$.ajax({
			type:'GET',
			url:config.indexAjax.article+'&article_id=10',
			dataType: 'json',
			success:function(data){
				
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},
	//获取商品
	getGoodsList:function(param,cb){
		$.ajax({
			type:'POST',
			url:config.indexAjax.goodslist,
			data:param,
			dataType: 'json',
			success:function(data){
				
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},
	//店铺
	getSellerList:function(param,cb){
		$.ajax({
			type:'GET',
			url:config.indexAjax.sellerlist,
			data:param,
			dataType: 'json',
			success:function(data){
				
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},
	subwebList:function(param,cb){
		$.ajax({
			type:'GET',
			url:config.indexAjax.subweblist,
			data:param,
			dataType: 'json',
			success:function(data){
				
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	}
}

module.exports = {
  indexFuns: indexFuns
}

