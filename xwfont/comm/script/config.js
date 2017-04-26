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
            getMessageList:zhencomehost+'/plana/msg!list.action',
            getMessageDetail:zhencomehost+'/tempdata/messageDetail.json',
            getHouseList:zhencomehost+'/tempdata/houselist.json',
            getHouseInfo:zhencomehost+'/tempdata/houseoper.json',
            getRoomList:zhencomehost+'/tempdata/roomlist.json',
            getRoomInfo:zhencomehost+'/tempdata/roomoper.json'
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
        {type:'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg'}
    ],
    skinList: [
        {title: '公路', imgUrl: url + '/images/user_bg_1.jpg'},
        {title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg'},
        {title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg'},
        {title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg'},
        {title: '火山', imgUrl: url + '/images/user_bg_5.jpg'},
        {title: '科技', imgUrl: url + '/images/user_bg_6.jpg'},
        {title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg'},
        {title: '叶子', imgUrl: url + '/images/user_bg_8.jpg'},
        {title: '早餐', imgUrl: url + '/images/user_bg_9.jpg'},
        {title: '英伦骑车', imgUrl: url + '/images/user_bg_10.jpg'},
        {title: '草原', imgUrl: url + '/images/user_bg_11.jpg'},
        {title: '城市', imgUrl: url + '/images/user_bg_12.jpg'}
    ],
    shakeSound: {
        startUrl: url + '/sound/shake.mp3',
        start: '',
        completeUrl: url + '/sound/shakeComplete.wav',
        complete: ''
    },
    shakeWelcomeImg: url + '/images/shake_welcome.png'
}