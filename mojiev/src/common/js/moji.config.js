/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-01 14:02:24
 * @version $Id$
 */
var httpHost = 'http://'+window.location.host;
var isTest = false;
var indexAjax = {
	islogin:httpHost+'/mobile/index.php?r=site/index/islogin',
	usersignup:httpHost+'/mobile/index.php?r=site/index/UserSignUp', //注册
	userbind:httpHost+'/mobile/index.php?r=site/index/UserBind', //注册
	usersignin:httpHost+'/mobile/index.php?r=site/index/UserSignin',
	forgetpassword:httpHost+'/mobile/index.php?r=site/index/UserForgetPassword',
	validateforgetpassword:httpHost+'/mobile/index.php?r=site/index/ValidateForgetPassword',
	resetpassword:httpHost+'/mobile/index.php?r=site/index/UserResetPassword',
	connectsignin:httpHost+'/mobile/index.php?r=site/index/ConnectSignin',//三方登录
	validatebind:httpHost+'/mobile/index.php?r=site/index/ValidateBind',
	banner:httpHost+'/mobile/index.php?r=site/index/indexdata',
	timegroup:httpHost+'/mobile/index.php?r=site/index/GoodsTimegroup',
	sellerbest:httpHost+'/mobile/index.php?r=site/index/SellerBest',
	goodslist:httpHost+'/mobile/index.php?r=site/index/GoodsListAjax',
	goodsreportgoods:httpHost+'/mobile/index.php?r=site/index/GoodsReportGoods',
	goodsdetail:httpHost+'/mobile/index.php?r=site/index/GoodsDetail',
	sellerlist:httpHost+'/mobile/index.php?r=site/index/SellerListAjax',
	subweblist:httpHost+'/mobile/index.php?r=site/index/subweb',
	shopregionlist:httpHost+'/mobile/index.php?r=site/index/ShopRegion',
	goodsdesc:httpHost+'/mobile/index.php?r=site/index/GoodsDesc',
	goodscommontlist:httpHost+'/mobile/index.php?r=site/index/GoodsCommontList',
	goodscollect:httpHost+'/mobile/index.php?r=site/index/UserCollectCreate',
	goodsshippingfee:httpHost+'/mobile/index.php?r=site/index/GoodsShippingFee',
	cartcreate:httpHost+'/mobile/index.php?r=site/index/CartCreate',
	addresslist:httpHost+'/mobile/index.php?r=site/index/AddressList',
	flowcheckorder:httpHost+'/mobile/index.php?r=site/index/FlowCheckOrder',
	cartlist:httpHost+'/mobile/index.php?r=site/index/CartList',
	cartupdate:httpHost+'/mobile/index.php?r=site/index/CartUpdate',
	cartdelete:httpHost+'/mobile/index.php?r=site/index/CartDelete',
	flowdone:httpHost+'/mobile/index.php?r=site/index/FlowDone',
	orderdetail:httpHost+'/mobile/index.php?r=site/index/OrderDetail',
	goodslistcoupons:httpHost+'/mobile/index.php?r=site/index/GoodsListCoupons',
	goodscouponsreceive:httpHost+'/mobile/index.php?r=site/index/GoodsCouponsReceive',
	ordersubmitreturn:httpHost+'/mobile/index.php?r=site/index/OrderSubmitReturn',
	orderlistreturncause:httpHost+'/mobile/index.php?r=site/index/OrderListReturnCause',
	orderreturndetail:httpHost+'/mobile/index.php?r=site/index/OrderReturnDetail',
	orderreturninfo:httpHost+'/mobile/index.php?r=site/index/OrderInfo',
	orderpay:httpHost+'/mobile/index.php?r=site/index/OrderPay',
	orderaffirmreceived:httpHost+'/mobile/index.php?r=site/index/OrderAffirmReceived',
	ordercancel:httpHost+'/mobile/index.php?r=site/index/OrderCancel',
	ordersendcourier:httpHost+'/mobile/index.php?r=site/index/OrderSendCourier',
	ordershipping:httpHost+'/mobile/index.php?r=site/index/OrderShipping',
	orderreturnreveived:httpHost+'/mobile/index.php?r=site/index/OrderReturnReveived',
	inviteuser:httpHost+'/mobile/index.php?r=site/index/InviteUser',
	marketlist:httpHost+'/mobile/index.php?r=site/index/MarketList',
	marketprodstore:httpHost+'/mobile/index.php?r=site/index/SellerList',
	BonusPassword:httpHost+'/mobile/index.php?r=site/index/BonusPassword',
	redgift:httpHost+'/mobile/index.php?r=site/index/userBonus',
	usercoupon:httpHost+'/mobile/index.php?r=site/index/UserCoupon',
	timepanic:httpHost+'/index.php?url=home/timepanic',
	orderlist:httpHost+'/mobile/index.php?r=site/index/OrderList',
	OrderCancel:httpHost+'/mobile/index.php?r=site/index/OrderCancel',
	prodReturn:httpHost+'/mobile/index.php?r=site/index/OrderReturnList'
}

if(isTest){
	indexAjax = {
		islogin:httpHost+'/mobile/index.php?r=site/index/islogin',
		timepanic:'/static/data/timepanic.json',

		usersignin:'/static/data/usersignin.json',
		usersignup:'/static/data/usersignup.json',
		userbind:'/static/data/usersignup.json',
		forgetpassword:'/static/data/usersignup.json',
		validateforgetpassword:'/static/data/usersignup.json',
		resetpassword:'/static/data/usersignup.json',
		connectsignin:'/static/data/connectsignin.json',
		validatebind:'/static/data/validatebind.json',
		banner:'/static/data/homedata.json',
		timegroup:'/static/data/timegroup.json',
		sellerbest:'/static/data/sellerbest.json',
		goodslist:'/static/data/goodslist.json',
		sellerlist:'/static/data/sellerlist.json',
		subweblist:'/static/data/subweblist.json',
		shopregionlist:'/static/data/regionlist1.json',
		goodsdetail:'/static/data/goodsdetail.json',
		goodsdesc:'/static/data/goodsdesc.json',
		goodscommontlist:'/static/data/goodscommontlist.json',
		goodscollect:'/static/data/goodscollect.json',
		goodsshippingfee:'/static/data/goodsshippingfee.json',
		cartcreate:'/static/data/cartcreate.json',
		addresslist:'/static/data/addresslist.json',
		flowcheckorder:'/static/data/flowcheckorder.json',
		cartlist:'/static/data/cartlist.json',
		cartupdate:'/static/data/cartlist.json',
		cartdelete:'/static/data/cartlist.json',
		flowdone:'/static/data/flowdone.json',
		orderdetail:'/static/data/orderdetail.json',
		ordersubmitreturn:'/static/data/ordersubmitreturn.json',
		orderlistreturncause:'/static/data/orderlistreturncause.json',
		orderreturndetail:'/static/data/orderreturndetail.json',
		orderreturninfo:'/static/data/orderreturninfo.json',
		orderpay:'/static/data/orderpay.json',
		orderaffirmreceived:'/static/data/orderdetail.json',
		ordercancel:'/static/data/orderdetail.json',
		inviteuser:'/static/data/inviteuser.json',
		marketlist:'/static/data/marketlist.json',
		marketprodstore:'/static/data/marketprodstore.json',
		redgift:'/static/data/redgift.json',
		article:'/mojivue/static/data/articledata.json',
		article:httpHost+'/index.php?url=article/detail',
		usercoupon:'/static/data/redgift.json',
		orderlist:'/static/data/OrderList.json',
		prodReturn:'/static/data/prodReturn.json'
	}
}

module.exports = {
	indexAjax:indexAjax
}
