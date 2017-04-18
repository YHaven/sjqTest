/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-01 14:02:24
 * @version $Id$
 */
var httpHost = 'http://'+window.location.host;
var indexAjax = {
	islogin:httpHost+'/mobile/index.php?r=site/index/islogin',
	banner:httpHost+'/mobile/index.php?r=site/index/indexdata',
	// banner:'/static/data/homedata.json',
	// timepanic:httpHost+'/index.php?url=home/timepanic'
	// timepanic:'/static/data/timepanic.json',
	// goodslist:'/mojivue/static/data/goodslist.json',
	// sellerlist:'/mojivue/static/data/sellerlist.json',
	// goodslist:'/static/data/goodslist.json',
	// sellerlist:'/static/data/sellerlist.json',
	goodslist:httpHost+'/mobile/index.php?r=site/index/GoodsListAjax',
	sellerlist:httpHost+'/mobile/index.php?r=site/index/SellerListAjax',
	// subweblist:'/static/data/subweblist.json',
	subweblist:httpHost+'/mobile/index.php?r=site/index/subweb',
	article:'/mojivue/static/data/articledata.json'
	// article:httpHost+'/index.php?url=article/detail'

}

module.exports = {
	indexAjax:indexAjax
}
