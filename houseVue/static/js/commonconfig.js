/*
*yhw add by 20161208 
*全局配置
*/
var planPro = planPro || {};
planPro.indexPath = '/home';
planPro.loginPath = '/login';
planPro.homePath = 'http://www.zhencome.com';
planPro.homePath = 'http://localhost:8080';
//ajax地址
planPro.ajaxUrl = {
    login : planPro.homePath + '/plana/index!alogin.action?vt=1',//登录
	fileUpload : planPro.homePath + '/plana/file!upfile.action',
	uploadImg : 'http://www.zhencome.com/plana/index!userProfile.action?vt=1',
    homeBT : '/static/data/bannertasks.json',//首页ajax   ///main/index
    //房屋
    houselist : '/static/data/houselist.json',
    // houseoper : '/static/data/houseoper.json', //get页面data
    houseoper : planPro.homePath + '/plana/house!modify.action', //get页面data
    posthouseoper : planPro.homePath + '/plana/house!add.action',
    posthouseopermodify : planPro.homePath + '/plana/house!modify.action',
    //房间
    roomlist : '/static/data/roomlist.json',
    roomoper : '/static/data/roomoper.json',  //get页面data
    postroomoper : planPro.homePath + '/plana/room!add.action',
    postroomopermodify : planPro.homePath + '/plana/room!modify.action',
    //租客
    renterlist : '/static/data/renterlist.json',
    renteroper : '/static/data/renteroper.json',  //get页面data
    postrenteroper : planPro.homePath + '/plana/renter!add.action',
    postrenteropermodify : planPro.homePath + '/plana/renter!modify.action',
    //租金
    rentallist: '/static/data/rentallist.json',
    rentaloper : '/static/data/rentaloper.json',  //get页面data
    postrentaloper : planPro.homePath + '/plana/rental!add.action',
    postrentalopermodify : planPro.homePath + '/plana/rental!modify.action'
}
