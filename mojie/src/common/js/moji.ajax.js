/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-01 14:01:26
 * @version $Id$
 */


var config = require('./moji.config.js')
import $ from 'zepto'


function Base64() {  
   
    // private property  
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    var _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    var _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
}


var b = new Base64();

function getUrlKey (){
	var timestamp = Date.parse(new Date())/1000;
	var timestampB = b.encode(timestamp.toString())
	return timestampB;
} 


//首页方法
var indexFuns = {
	//首页初始化
	propath:'..',
	indexData:null,
	cookie:{
	    set:function(key,val,time){//设置cookie方法
	        var date=new Date(); //获取当前时间
	        var expiresDays=time;  //将date设置为n天以后的时间
	        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
	        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
	    },
	    get:function(key){//获取cookie方法
	        /*获取cookie参数*/
	        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
	        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
	        var tips;  //声明变量tips
	        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
	            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
	            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
	                tips=arr[1];   //将cookie的值赋给变量tips
	                break;   //终止for循环遍历
	            }
	       }
	       return tips;
	    },
	    delete:function(key){ //删除cookie方法
	         var date = new Date(); //获取当前时间
	         date.setTime(date.getTime()-10000); //将date设置为过去的时间
	         document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
	    }
	},
	init:function(){
		//加载banner
		this.banner();
	},
	islogin:function(param,cb){
		param.url_key = getUrlKey();
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
	    // if(r!=null)return  unescape(r[2]); return null;
	    if(r!=null)return  decodeURIComponent(r[2]); return null;
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
	dateFomat:function(){
		Date.prototype.format = function(format) {
		       var date = {
		              "M+": this.getMonth() + 1,
		              "d+": this.getDate(),
		              "h+": this.getHours(),
		              "m+": this.getMinutes(),
		              "s+": this.getSeconds(),
		              "q+": Math.floor((this.getMonth() + 3) / 3),
		              "S+": this.getMilliseconds()
		       };
		       if (/(y+)/i.test(format)) {
		              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		       }
		       for (var k in date) {
		              if (new RegExp("(" + k + ")").test(format)) {
		                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
		                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		              }
		       }
		       return format;
		}
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
		var _this = this;
		var param = {};
		var sessionObj = {}
        var mojie_session_sid = _this.cookie.get('mojie_session_sid');
        if(mojie_session_sid){
          sessionObj.uid = _this.cookie.get('mojie_session_uid');
          sessionObj.sid=mojie_session_sid;
        }
        
        var device = {
          client:'wap',
          udid:'wap',
          code:'wap'
        }
        var mojie_session_city = _this.cookie.get('mojie_session_city');
        if(mojie_session_city){
        	device.city = mojie_session_city;
        }

        param.session = sessionObj;
        param.device = device;
		param.version = 260;

        var paramsStr = JSON.stringify(param);

		$.ajax({
			type:'GET',
			url:config.indexAjax.banner,
			data:{json:paramsStr,url_key:getUrlKey()},
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
	//三栏
	activityTopic:function(){
		var activityTopic = new Array();
		if(indexFuns.indexData != null){
			var activity_topic = indexFuns.indexData.activity_topic;
			for (var i = 1; i < activity_topic.length; i++) {
				var mmObj = activity_topic[i];
				activityTopic.push(mmObj);
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
		return activityTopic;
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
	sellerBest:function(param,cb){
		var result = new Array();

		// if(indexFuns.indexData != null){
		// 	var getArray = indexFuns.indexData.seller_best;
		// 	for (var i = 0; i < getArray.length; i++) {
		// 		var getObj = getArray[i];
		// 		//名字要有缩短
		// 		for (var j = 0; j < getObj.seller_goods.length; j++) {
		// 			var goodName = getObj.seller_goods[j].name;
		// 			if(goodName.length>9){
		// 				getObj.seller_goods[j].nameShort = goodName.substring(0,9)+'...';
		// 			}else{
		// 				getObj.seller_goods[j].nameShort = goodName;
		// 			}
		// 		};

		// 		result.push(getObj);
		// 	};
		// }
		var _this = this;
		var sessionObj = {}
        var mojie_session_sid = _this.cookie.get('mojie_session_sid');
        if(mojie_session_sid){
          sessionObj.uid = _this.cookie.get('mojie_session_uid');
          sessionObj.sid=mojie_session_sid;
        }

        var device = {
          client:'wap',
          udid:'wap',
          code:'wap'
        }
        var mojie_session_city = _this.cookie.get('mojie_session_city');
        if(mojie_session_city){
        	device.city = mojie_session_city;
        }

        param.session = sessionObj;
        param.device = device;

        var paramsStr = JSON.stringify(param);

		$.ajax({
			type:'GET',
			url:config.indexAjax.sellerbest,
			data:{json:paramsStr,url_key:getUrlKey()},
			dataType: 'json',
			success:function(data){
				var getArray = data.data;
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
				if(typeof cb === 'function'){
					data.data = result;
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},

	//获取文章详情
	getArticleDetail:function(cb){
		$.ajax({
			type:'GET',
			url:config.indexAjax.article+'&article_id=10'+'&url_key='+getUrlKey(),
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
		param.url_key = getUrlKey();
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
	//市场
	marketlist:function(cb,param){
		if(typeof param == 'undefined') param = {};
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.marketlist,
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
		param.url_key = getUrlKey();
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
	//区域
	subwebList:function(param,cb){
		param.url_key = getUrlKey();
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
	},
	shopRegionList:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.shopregionlist,
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
	//商品详情
	goodsDetail:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.goodsdetail,
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
	goodsDesc:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.goodsdesc,
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
	goodsCommontList:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.goodscommontlist,
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
	//商品收藏
	goodsCollect:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.goodscollect,
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
	//快递费
	goodsShippingFee:function(param,cb){
		param.url_key = getUrlKey();
		$.ajax({
			type:'GET',
			url:config.indexAjax.goodsshippingfee,
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
	postAjax:function(url,param,cb,mtype){
		if(typeof mtype === 'undefined'){
        	mtype = 'POST';
        }
        param.url_key = getUrlKey();
		$.ajax({
			type:mtype,
			url:url,
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

	postJsonAjax:function(url,param,cb,mtype){
		var _this = this;
		var sessionObj = {}
        var mojie_session_sid = _this.cookie.get('mojie_session_sid');
        if(mojie_session_sid){
          sessionObj.uid = _this.cookie.get('mojie_session_uid');
          sessionObj.sid=mojie_session_sid;
        }
        
        var device = {
          client:'wap',
          udid:'wap',
          code:'wap'
        }
        var mojie_session_city = _this.cookie.get('mojie_session_city');
        if(mojie_session_city){
        	device.city = mojie_session_city;
        }

        param.session = sessionObj;
        param.device = device;

        var paramsStr = JSON.stringify(param);

        if(typeof mtype === 'undefined'){
        	mtype = 'GET';
        }
		$.ajax({
			type:mtype,
			url:url,
			data:{json:paramsStr,url_key:getUrlKey()},
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
	getRedGift:function(cb){
		$.ajax({
			type:'POST',
			url:config.indexAjax.redgift+'&url_key='+getUrlKey(),
			dataType: 'json',
			success:function(data){
				console.info(data)
				if(typeof cb === 'function'){
					cb(data);
				}
			},
			error:function(xhr, type){
				
			}
		})
	},
	orderList:function(cb){
		$.ajax({
			type:'GET',
			url:config.indexAjax.orderlist+'&url_key='+getUrlKey(),
			dataType: 'json',
			success:function(data){
				console.info(data)
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

