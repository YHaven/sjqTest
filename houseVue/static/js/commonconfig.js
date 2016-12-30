/*
*yhw add by 20161208 
*全局配置
*/
var planPro = planPro || {};
planPro.homePath = 'http://localhost:8080';
//ajax地址
planPro.ajaxUrl = {
    login : planPro.homePath + '/plana/login',//登录
	fileUpload : planPro.homePath + '/plana/file!upfile.action',
	uploadImg : 'http://www.zhencome.com/plana/index!userProfile.action?vt=1',
    homeBT : '/static/data/bannertasks.json',//首页ajax   ///main/index
    houselist : '/static/data/houselist.json',
    houseoper : '/static/data/houseoper.json',
    posthouseoper : planPro.homePath + '/plana/house!add.action',
    posthouseopermodify : planPro.homePath + '/plana/house!modify.action',
    roomlist : '/static/data/roomlist.json',
    renterlist : '/static/data/renterlist.json',
    rentallist: '/static/data/rentallist.json'
}
