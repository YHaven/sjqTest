var homepath = "https://www.zhencome.com";

module.exports = {
    homepath:homepath,
    appId:"wxf384b1daab92204c",
    appKey:"a9197046b9b23c7e0dea7feb54b89389",
    bmapAK:'vvGuepnx8y6cv9DeunvaZxZQYuWmGYuk',
    baiduAK:'cG9lzE7YR4gGokie1OvLQhQ2',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/',
    wxApi:{
      business: 5,
      fileUpload: homepath + '/wedding/file!upfile.action',
      login: homepath + '/wedding/index!alogin.action',
      siteInfo: homepath + '/wedding/index!siteInfo.action',
      invitationList: homepath + '/wedding/index!invitationList.action',
      invitationView: homepath + '/wedding/index!invitationView.action',
      invitationModify: homepath + '/wedding/index!invitationModify.action',
      invitationTopic: homepath + '/wedding/index!invitationTopic.action',
      member:homepath+'/index.php?s=/Member/index', //用户信息
      getOpenId:homepath+'/index.php?s=/Member/get_openId', //用户信息
      getUserInfo:homepath+'/index.php?s=/member/getUserInfo' //用户信息

    },
    weixinApi:{
        getaccesstoken:'https://api.weixin.qq.com/cgi-bin/token',//获取access_token   ?grant_type=client_credential&appid=APPID&secret=APPSECRET {"access_token":"ACCESS_TOKEN","expires_in":7200}
        getwxacodeunlimit:'https://api.weixin.qq.com/wxa/getwxacodeunlimit'//获取小程序码-临时?access_token=ACCESS_TOKEN
    },
    skinList: [
      { title: '公路', imgUrl: homepath + '/images/wxcbg/user_bg_1.jpg' },
      { title: '黑夜森林', imgUrl: homepath + '/images/wxcbg/user_bg_2.jpg' },
      { title: '鱼与水', imgUrl: homepath + '/images/wxcbg/user_bg_3.jpg' },
      { title: '山之剪影', imgUrl: homepath + '/images/wxcbg/user_bg_4.jpg' },
      { title: '火山', imgUrl: homepath + '/images/wxcbg/user_bg_5.jpg' },
      { title: '科技', imgUrl: homepath + '/images/wxcbg/user_bg_6.jpg' },
      { title: '沙漠', imgUrl: homepath + '/images/wxcbg/user_bg_7.jpg' },
      { title: '叶子', imgUrl: homepath + '/images/wxcbg/user_bg_8.jpg' },
      { title: '早餐', imgUrl: homepath + '/images/wxcbg/user_bg_9.jpg' },
      { title: '英伦骑车', imgUrl: homepath + '/images/wxcbg/user_bg_10.jpg' },
      { title: '草原', imgUrl: homepath + '/images/wxcbg/user_bg_11.jpg' },
      { title: '城市', imgUrl: homepath + '/images/wxcbg/user_bg_12.jpg' }
    ],
    title: '来结婚吧',
    desc: '来结婚吧',
    wxpath:'/pages/index/home/home',
    imageUrl:'../../../images/wedding_logo.jpg'
}