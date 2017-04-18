<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>新人专享</h2>
        </div>
        <a href="/mobile/index.php?r=user">
            <img :src="proPath+'/static/images/new01.png'" alt="">
        </a>
        <div class="zc_hb">
            <a href="/mobile/index.php?r=user">
                <img :src="proPath+'/static/images/new02.png'" alt="">
                <p>2188元大红包</p>
            </a>
            <a href="/mobile/index.php?r=user">
                <img :src="proPath+'/static/images/new03.png'" alt="">
                <p>180元返购券</p>
            </a>
            <span style="color:#fedc32;font-size:34px;" class="hb_song">注册即送2188元大红包</span>
            <p class="hb_see">注册成功后请到“我的-我的红包”里进行查看</p>
        </div>
        <div class="newProdBox">
            <h3></h3>
            <div class="mjProdSbox">
                <div class="prod" v-for="goods in goodsList">
                    <a :href="'/mobile/index.php?r=goods&id='+goods.goods_id">
                        <img :src="goods.img.small" alt="">
                        <label>{{goods.name}}</label>
                        <span>{{goods.shop_price.substring(0,goods.shop_price.length-3)}}<em>.00</em></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import Slider from 'components/Slider'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        goodsList:[
        {
            "goods_id": "4658",
            "name": "2017夏季 韩江丽影 老奶奶图案时尚短袖T恤",
            "market_price": "¥0.00",
            "shop_price": "¥60.00",
            "promote_price": "",
            "img": {
                "thumb": "http://test.sjq.cn/images/shopfw/main/seller_id/48952/2017/04/13/goods_img/imgurl_G_93c2a37214ff4e059fbfafe4dd2f7498_main.jpg",
                "url": "http://test.sjq.cn/images/shopfw/main/seller_id/48952/2017/04/13/source_img/original_G_93c2a37214ff4e059fbfafe4dd2f7498_main.jpg",
                "small": "http://test.sjq.cn/images/201704/goods_img/4658_G_1492275106410.jpg"
            },
            "activity_type": "GENERAL_GOODS",
            "object_id": 0,
            "saving_price": 0,
            "formatted_saving_price": "已省0元"
        },
        {
            "goods_id": "4652",
            "name": "2017夏季 韩江丽影 美女图案短袖T恤",
            "market_price": "¥0.00",
            "shop_price": "¥60.00",
            "promote_price": "",
            "img": {
                "thumb": "http://test.sjq.cn/images/shopfw/main/seller_id/48952/2017/04/13/goods_img/imgurl_G_e8703c50ea204b8f932bcd7a96b4affa_main.jpg",
                "url": "http://test.sjq.cn/images/shopfw/main/seller_id/48952/2017/04/13/source_img/original_G_e8703c50ea204b8f932bcd7a96b4affa_main.jpg",
                "small": "http://test.sjq.cn/images/201704/goods_img/4652_G_1492219823223.jpg"
            },
            "activity_type": "GENERAL_GOODS",
            "object_id": 0,
            "saving_price": 0,
            "formatted_saving_price": "已省0元"
        },
        {
            "goods_id": "4239",
            "name": "2017新款 俏丫丫 纯色T背带裙两件套 636",
            "market_price": "¥57.60",
            "shop_price": "¥135.00",
            "promote_price": "",
            "img": {
                "thumb": "http://test.sjq.cn/images/shopfw/main/seller_id/7830/2017/04/14/goods_img/imgurl_G_39e0fed00f48421fb756d3862f25b6e7_main.jpg",
                "url": "http://test.sjq.cn/images/shopfw/main/seller_id/7830/2017/04/14/source_img/original_G_39e0fed00f48421fb756d3862f25b6e7_main.jpg",
                "small": "http://test.sjq.cn/images/201704/goods_img/4239_G_1492046246134.jpg"
            },
            "activity_type": "GENERAL_GOODS",
            "object_id": 0,
            "saving_price": 0,
            "formatted_saving_price": "已省0元"
        },
        {
            "goods_id": "1288",
            "name": "2017春夏新款中老年妈妈装套头衫印花羽毛衫时尚圆领纱T恤L156",
            "market_price": "¥0.00",
            "shop_price": "¥69.00",
            "promote_price": "",
            "img": {
                "thumb": "http://test.sjq.cn/images/201704/goods_img/4314_G_1492107691205.jpg",
                "url": "http://test.sjq.cn/images/201704/source_img/4314_G_1492107691647.jpg",
                "small": "http://test.sjq.cn/images/201703/goods_img/1288_P_1490919540522.jpg"
            },
            "activity_type": "GENERAL_GOODS",
            "object_id": 0,
            "saving_price": 0,
            "formatted_saving_price": "已省0元"
        }]
      }
    },
    mounted () {                        //页面完成加载
        this.initGoodsList();
    },
    methods: {                          //方法
      initGoodsList(){
        var _this = this;
        var cat_name = $('.wh-nav li.active').attr('cat_name');
        var params = {};
        // MojiAjax.indexFuns.getGoodsList(params,function(result){
         //   _this.goodsList = result.data;
        // })
      }
    },
    components: {
      VScroll,
      Slider
    }
  }
</script>

<style>
    body{
        background: #f8f8f8;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
