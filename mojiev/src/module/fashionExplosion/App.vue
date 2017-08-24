<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>时尚爆款</h2>
        </div>
        
        <new-pifa-banner :banner="banner"></new-pifa-banner>
        
        <ul class="wh-nav clearfix">
            <li class="active" cat_name=""><a href="javascript:;">全部</a></li>
            <li cat_name="10"><a href="javascript:;">满减</a></li>
            <li cat_name="2"><a href="javascript:;">包邮</a></li>
        </ul>

        <div class="mjProdSbox aa">
            <div class="prod" v-for="goods in goodsList">
                <a :href="'/mobile/index.php?r=goods&id='+goods.goods_id">
                    <img :src="goods.img.small" alt="">
                    <label>{{goods.name}}</label>
                    <span>{{goods.shop_price.substring(0,goods.shop_price.length-3)}}<em>.00</em></span>
                </a>
            </div>
        </div>

        <div class="selectProd" v-for="seller in sellerList">
            <div class="prodTopInfor">
                <a :href="'/mobile/index.php?r=store/index/shop_info&id='+seller.id" class="imgProd">
                    <img :src="seller.shop_logo" alt="" onerror="javascript:this.src='../static/images/default_store_logo.png';">
                    <div class="textBox">
                        <h3>{{seller.shop_name}}</h3>
                        <p>{{seller.coupon_str}}</p>
                    </div>
                </a>
                <span :class="'follow gaze'+seller.id " v-if="seller.is_fav === 0" @click="addgaze(seller.id)">关注</span>
                <span :class="'follow gaze'+seller.id " v-if="seller.is_fav === 1" @click="addgaze(seller.id)">已关注</span>
            </div>
            <div class="imgBox">
                <a :href="'/mobile/index.php?r=goods&id='+seller_good.goods_id" v-for="seller_good in seller.seller_goods">
                    <img :src="seller_good.img.small" alt="">
                    <span class="seller-good-price">{{seller_good.market_price}}</span>
                </a>
            </div>
            <p class="inforPro clearfix"><span>综合分值：{{seller.score}}</span><span>{{seller.buyer}}位采购商</span><span>共卖出{{seller.sale_num}}件商品</span></p>
        </div>


        </v-scroll>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import Layer from 'common/js/layer'          //layer
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import NewPifaBanner from 'components/NewPifaBanner'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        sellerList:[],
        goodsList:[],
        city:'hz',
        more:1,
        page:1,
        count:10
      }
    },
    mounted () {                     //页面完成加载
        var _this = this;
        _this.initCity();
        _this.initBanner();
        _this.initGoodsList(function(result){
            _this.goodsList = result.data;
           if(result.paginated.more === 1){
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
        });
        _this.initEvent();
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
        initEvent(){
            var _this = this;
            $('.wh-nav li').click(function(){
                var _thisDom = $(this);
                $('.wh-nav li').removeClass('active');
                _thisDom.addClass('active');
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
                    
                });
            })
        },
        initBanner(){
            var _this = this;
            _this.banner=[{
                imgUrl:_this.proPath+'/static/images/wanggong_banner.jpg',
                url:''
            }]
        },
        initGoodsList(cb){
            var _this = this;
            var cat_name = Number($('.wh-nav li.active').attr('cat_name'));
            var params = {
                filter:{
                    category_id:cat_name,
                    is_new:0 
                },
                device:{
                    city:_this.city
                },
                pagination:{
                    page: _this.page,
                    count: _this.count
                }
            };
            var paramsStr = JSON.stringify(params);
            MojiAjax.indexFuns.getGoodsList({json:paramsStr},cb)
        },
        refresh (done) {
            console.log('refresh')
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
            
            console.log('loadMore')
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
      NewPifaBanner
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
