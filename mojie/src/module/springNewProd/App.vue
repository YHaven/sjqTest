<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>新特卖</h2>
            <div class="mjInfor" style="display:none">
                <i></i>
                <div class="inforBox">
                    <span></span>
                    <div class="shouye">
                        <a href="">首页</a>
                    </div>
                    <div class="gouwu">
                        <a href="">购物车</a>
                    </div>
                    <div class="fenxi">
                        <a href="">分享店铺</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="mjProdSbox aa">

            <div class="prod" v-for="goods in goodsList">
                <a :href="'/mobile/index.php?r=goods&id='+goods.goods_id">
                    <img :src="goods.img.small" alt="">
                    <label>{{goods.name}}</label>
                    <span>{{goods.shop_price.substring(0,goods.shop_price.length-3)}}<em>{{goods.shop_price.substring(goods.shop_price.length-3,goods.shop_price.length)}}</em></span>
                </a>
            </div>

        </div>
        </v-scroll>
        <back-top></back-top>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import config from 'common/js/moji.config'
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import Slider from 'components/Slider'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import BackTop from 'components/BackTop' //返回顶部
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        banner: [],
        goodsList:[],
        city:'hz',
        more:1,
        page:1,
        count:10
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
        // _this.initCity();
        // _this.qiehuan();
        _this.initGoodsList(function(result){
            _this.goodsList = result.data;
            if(result.paginated.more === 1){
                
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
        });
        // this.initTimer();
    },
    methods: {                          //方法
        initCity(){
            var nowAddress = '杭州';  
            var hideAddress = 'hz';
            var l_host = window.location.host; 
            if(l_host === 'xa.sjq.cn'){
                nowAddress = '西安';
                hideAddress = 'xa';
            }
            if(l_host === 'test.sjqyc.cn'){
                nowAddress = '银川';
                hideAddress = 'yc';
            }
            
            if(l_host === 'gd.sjq.cn'){
                nowAddress = '广州';
                hideAddress = 'gd';
            }
           this.city = hideAddress;
        },
      qiehuan(){
        $(".mjInfor i").on("click",function(){
            var _this = $(this);
            _this.siblings(".inforBox").toggle();
        })
      },
      initGoodsList(cb){
            var _this = this;
            var cat_name = '';//Number($('.wh-nav li.active').attr('cat_name'));
            var params = {
                // filter:{
                //     category_id:cat_name,
                //     is_new:1 
                // },
                goods_type: "1",   //加入提报活动的商品类型，1：新特卖 2.新人专享，暂时只有新特卖
                pagination:{
                    page: _this.page,
                    count: _this.count
                }
            };

            // var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.goodsreportgoods;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
        },
        refresh (done) {
            var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initGoodsList(function(result){
                _this.goodsList = result.data;
                if(result.paginated.more === 1){
                    
                    _this.page += 1;
                }else{
                    _this.more = 0;
                    $('.load-more span').text('没有更多数据了')
                }
                done() // call done
            });
            
        },
        loadMore (done) {
            
            var _this = this;
            if(_this.more === 0){
                done() // finsh call done
                return false;
            }
            _this.initGoodsList(function(result){
                for (var i = 0; i < result.data.length; i++) {
                        _this.goodsList.push(result.data[i]);
                    };
                if(result.paginated.more === 1){
                    
                    // _this.goodsList.push(result.data);
                    _this.page += 1;
                }else{
                    _this.more = 0;
                    $('.load-more span').text('没有更多数据了')
                }
                
                done() // finsh call done
            });
            
        }
    },
    components: {
      VScroll,
      Slider,
      BackTop
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
