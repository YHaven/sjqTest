/*
*yhw add by 20161208 
*全局配置
*/
var planPro = planPro || {};
planPro.homePath = '';

//ajax地址
planPro.ajaxUrl = {
    fileUpload : '/upload/uploadImg', //1，上传话题参数：fileBizType：11
    //homeBT :  '/static/data/mainbannerproducts.json'//首页ajax   ///main/index
    homeBT :  '/main/index',
    manBT : '/static/data/mainbannerproducts.json',
    womenBT : '/static/data/mainbannerproducts.json',
    newsBT : '/static/data/mainbannerproducts.json',

    //社区信息
    // getcommunitynews: '/static/data/getCommunityNews.json',
    getcommunitynews: '/community/getCommunityNews',

    //添加话题评论
    addcommunitycomment:'/community/addCommunityComment'
}
