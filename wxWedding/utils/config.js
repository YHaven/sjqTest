var homepath = "https://www.zhencome.com";

module.exports = {
    homepath:homepath,
    appId:"wxf384b1daab92204c",
    appKey:"a9197046b9b23c7e0dea7feb54b89389",
    wxApi:{
        member:homepath+'/index.php?s=/Member/index', //用户信息
        getOpenId:homepath+'/index.php?s=/Member/get_openId', //用户信息
        getUserInfo:homepath+'/index.php?s=/member/getUserInfo', //用户信息
        buyerIndex:homepath+'/index.php?s=/member/buyerIndex',//买家首页 参数 openId : oq9Lv0CTcytsS8omTy1SkGCzic5A
        sellerIndex:homepath+'/index.php?s=/member/sellerIndex',//卖家首页 参数 openId : oq9Lv0CTcytsS8omTy1SkGCzic5A
        uploadImg:homepath+'/index.php?s=/member/uploadImg',//上传图片
        deleImg:homepath+'/index.php?s=/member/deleImg',//删除图片 imgId
        addOrder:homepath+'/index.php?s=/member/addOrder',//添加商品uid : 用户id，sid : 商家id，goodsImgList : 商品图片id 字符串 : 1,2,3,4
        orderDone:homepath+'/index.php?s=/member/orderDone',//完成订单 参数 orderId=1&sid=2&orderAmount=74.45&goodsNumber=10
        doneOrder:homepath+'/index.php?s=/member/doneOrder',//完成订单 参数 
        updateOrderBuyer:homepath+'/index.php?s=/member/updateOrderBuyer',//完成订单 参数 
        getOrderList:homepath+'/index.php?s=/member/getOrderList',//订单列表 参数 uid=2&startTime=2017-07-01 00:00:00&endTime=2017-07-18 24:00:00
        getOrderInfo:homepath+'/index.php?s=/member/orderInfo',//订单列表 参数orderId
        wxPrePay:homepath+'/index.php?s=/member/wxPrePay',//支付 参数orderId
        editShopInfo:homepath+'/index.php?s=/member/editShopInfo',// 参数 uid=1&shopName=店名&alipayAccount=
        allOrderAmount:homepath+'/index.php?s=/member/allOrderAmount',// 参数
        getSellerERcode:homepath+'/index.php?s=/member/getSellerERcode',//获取商家小程序二维码 
        getERcode:homepath+'/index.php?s=/member/getERcode',//获取小程序二维码 参数 scene=必填项&width=430&auto_color=1&line_color 
        getUserAddr:homepath+'/index.php?s=/member/getUserAddr',//获取用户收货地址  uid=1
        addUserAddr:homepath+'/index.php?s=/member/addUserAddr',//添加用户收货地址  uid=1&consignee=姚&mobile=15155787789&province=1&city=12&district=336&address=杭州市
        editUserAddr:homepath+'/index.php?s=/member/editUserAddr',//编辑用户收货地址  uid=1&consignee=姚&mobile=15155787789&province=1&city=12&district=336&address=杭州市
        region:homepath+'/index.php?s=/member/get_region_list' //获取省份列表 region_id = 1

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
    title: '恭候您的光临！',
    desc: '来结婚吧',
    wxpath:'/pages/index/home/home',
    imageUrl:'../../../images/wedding-1.jpg'
}