/*
*yhw add by 20161208 
*全局配置
*/
var planPro = planPro || {};
planPro.isTest = false;
planPro.indexPath = '/home';
planPro.loginPath = '/login';
// planPro.homePath = 'http://www.zhencome.com';
planPro.homePath = 'http://localhost:8080';

//ajax地址
planPro.ajaxUrl = {
    login : planPro.homePath + '/plana/index!alogin.action?vt=1',//登录
	fileUpload : planPro.homePath + '/plana/file!upfile.action',
	uploadImg : planPro.homePath + '/plana/index!userProfile.action?vt=1',
    // homeBT : '/static/data/bannertasks.json',//首页ajax   ///main/index
    //房屋
    houselist : '/static/data/houselist.json',
    // houselist : planPro.homePath + '/plana/house!list.action',
    houseoper : '/static/data/houseoper.json', //get页面data
    // houseoper : planPro.homePath + '/plana/house!modify.action', //get页面data
    deletehouseoper : planPro.homePath + '/plana/house!delete.action',
    
    posthouseoper : planPro.homePath + '/plana/house!add.action',
    posthouseopermodify : planPro.homePath + '/plana/house!modify.action',
    //房间
    roomlist : planPro.homePath + '/plana/room!list.action',
    roomoper : planPro.homePath + '/plana/room!modify.action',
    deleteroomoper : planPro.homePath + '/plana/room!delete.action',

    postroomoper : planPro.homePath + '/plana/room!add.action',
    postroomopermodify : planPro.homePath + '/plana/room!modify.action',
    //租客
    renterlist : planPro.homePath + '/plana/renter!list.action',
    renteroper : planPro.homePath + '/plana/renter!modify.action',
    deleterenteroper : planPro.homePath + '/plana/renter!delete.action',
    postrenteroper : planPro.homePath + '/plana/renter!add.action',
    postrenteropermodify : planPro.homePath + '/plana/renter!modify.action',
    //租金
    rentallist: planPro.homePath + '/plana/rental!list.action',
    rentaloper : planPro.homePath + '/plana/rental!modify.action',
    deleterentaloper : planPro.homePath + '/plana/rental!delete.action',
    confirmpayrental : planPro.homePath + '/plana/rental!confirmPay.action',
    postrentaloper : planPro.homePath + '/plana/rental!add.action',
    postrentalopermodify : planPro.homePath + '/plana/rental!modify.action'
}

if(planPro.isTest){
    planPro.ajaxUrl = {
        login : planPro.homePath + '/plana/index!alogin.action?vt=1',//登录
        fileUpload : planPro.homePath + '/plana/file!upfile.action',
        uploadImg : 'http://www.zhencome.com/plana/index!userProfile.action?vt=1',
        homeBT : '/static/data/bannertasks.json',//首页ajax   ///main/index
        //房屋
        houselist : '/static/data/houselist.json',
        houseoper : '/static/data/houseoper.json'//get页面data
    }
}
