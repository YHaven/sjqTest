/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'https://static.sesine.com/wechat-weapp-movie';
var zhencomehost = 'https://www.zhencome.com'
module.exports = {
    city: '',
    count: 20,
    baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
    apiList: {
        plana:{
            business:4,
            host:zhencomehost,
            fileUpload:zhencomehost+'/plana/file!upfile.action',
            login:zhencomehost+'/plana/index!alogin.action',
            // getMessageList:zhencomehost+'/plana/msg!list.action',
            getMessageList: zhencomehost + '/plana/msg!msglist.action',
            getMessageDetail: zhencomehost + '/plana/msg!msgview.action',
            // getMessageDetail:zhencomehost+'/tempdata/messageDetail.json',
            // getHouseList:zhencomehost+'/tempdata/houselist.json',
            getHouseList: zhencomehost + '/plana/house!list.action',
            getEmptyHouseList: zhencomehost + '/plana/house!emptyList.action',
            // getHouseInfo: zhencomehost + '/tempdata/houseoper.json',
            getHouseInfo: zhencomehost +'/plana/house!modify.action',
            getHouseInfoAdd: zhencomehost +'/plana/house!add.action',
            getHouseInfoDelete: zhencomehost +'/plana/house!delete.action',
            // getRoomList:zhencomehost+'/tempdata/roomlist.json',
            // getRoomInfo:zhencomehost+'/tempdata/roomoper.json',
            getRoomList: zhencomehost + '/plana/room!list.action',
            getRoomInfo: zhencomehost + '/plana/room!modify.action',
            getRoomInfoAdd: zhencomehost + '/plana/room!add.action',
            getRoomInfoDelete: zhencomehost +'/plana/room!delete.action',

            getRenterList: zhencomehost + '/plana/renter!list.action',
            getRenterInfo: zhencomehost + '/plana/renter!modify.action',
            getRenterInfoAdd: zhencomehost + '/plana/renter!add.action',
            getRenterInfoDelete: zhencomehost + '/plana/renter!delete.action',

            getRentalList: zhencomehost + '/plana/rental!list.action',
            getRentalInfo: zhencomehost + '/plana/rental!modify.action',
            getRentalInfoAdd: zhencomehost + '/plana/rental!add.action',
            getRentalInfoDelete: zhencomehost + '/plana/rental!delete.action',
            getRentalInfoConfirmPay: zhencomehost + '/plana/rental!confirmPay.action',
            getUserType: zhencomehost + '/plana/service!getUserType.action',
            addUserType: zhencomehost + '/plana/service!addUserType.action',
            getServiceList: zhencomehost + '/plana/service!list.action',
            getShowRentalList: zhencomehost + '/plana/rentalshow!list.action',
            getShowRentalAllCount: zhencomehost + '/plana/rentalshow!allCount.action',
            getShowRentalAddCash: zhencomehost + '/plana/rentalshow!addCash.action',
            getCashList: zhencomehost + '/plana/rentalshow!cashList.action'
            // getCashList: zhencomehost + '/plana/rentalshow!list.action'

        },
        popular: 'https://api.douban.com/v2/movie/in_theaters',
        coming: 'https://api.douban.com/v2/movie/coming_soon',
        top: 'https://api.douban.com/v2/movie/top250',
        search: {
            byKeyword: 'https://api.douban.com/v2/movie/search?q=', 
            byTag: 'https://api.douban.com/v2/movie/search?tag='
        },
        filmDetail: 'https://api.douban.com/v2/movie/subject/',
        personDetail: 'https://api.douban.com/v2/movie/celebrity/',
        baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
    },
    defaultImg:{
header:'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epBXIYAUnlcXcBzCFFiaGR3AzBezHic1RUSWf2zh7tkf8hTT8uRUQ9PR8jl9955xl7KOMG3L0btV5hw/0'
        },
    hotKeyword: ['杭州', '萧山', '盛达', '盛乐'],
    hotTag: ['热', '门', '标', '签'],
    bannerList: [
        {type:'headbanner', id: '', imgUrl: zhencomehost + '/images/index-banner.jpg'}
    ],
    skinList: [
        {title: '公路', imgUrl: zhencomehost + '/images/wxcbg/user_bg_1.jpg'},
        {title: '黑夜森林', imgUrl: zhencomehost + '/images/wxcbg/user_bg_2.jpg'},
        {title: '鱼与水', imgUrl: zhencomehost + '/images/wxcbg/user_bg_3.jpg'},
        {title: '山之剪影', imgUrl: zhencomehost + '/images/wxcbg/user_bg_4.jpg'},
        {title: '火山', imgUrl: zhencomehost + '/images/wxcbg/user_bg_5.jpg'},
        {title: '科技', imgUrl: zhencomehost + '/images/wxcbg/user_bg_6.jpg'},
        {title: '沙漠', imgUrl: zhencomehost + '/images/wxcbg/user_bg_7.jpg'},
        {title: '叶子', imgUrl: zhencomehost + '/images/wxcbg/user_bg_8.jpg'},
        {title: '早餐', imgUrl: zhencomehost + '/images/wxcbg/user_bg_9.jpg'},
        {title: '英伦骑车', imgUrl: zhencomehost + '/images/wxcbg/user_bg_10.jpg'},
        {title: '草原', imgUrl: zhencomehost + '/images/wxcbg/user_bg_11.jpg'},
        {title: '城市', imgUrl: zhencomehost + '/images/wxcbg/user_bg_12.jpg'}
    ],
    shakeSound: {
        startUrl: zhencomehost + '/images/wxcbg/shake.mp3',
        start: '',
        completeUrl: zhencomehost + '/images/wxcbg/shakeComplete.wav',
        complete: ''
    },
    shakeWelcomeImg: zhencomehost + '/images/wxcbg/shake_welcome.png'
}