<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <!-- <v-scroll :on-refresh="refresh" :on-infinite="loadMore"> -->
    
        <div class="content-block video-detail" style="margin-top:0;position:relative;">
            <i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);" style="position:absolute;left:1.2rem;"></i>
            <a :href="allData.video_url" class="img-mod">
              <img :src="allData.video_img" alt="" >
              <div class="wh-info">
                <p class="wh-title">{{allData.title}}</p>
                <p class="wh-name"><img class="wh-header" :src="allData.anchor_img" alt="" style="float:left;">{{allData.anchor_name}}</p>
              </div>
              <i class="sjq-icon video-icon"></i>
            </a>
        </div>
        <!-- 网红推荐 -->
          <div class="content-block wh-recommend-product" style="margin-top:0;">
            
            <div class="block-title clearfix">
              <span class="m-title">推荐商品</span>
              <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
              <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
            </div>
            <ul class="wh-product-list clearfix">
              <li v-for="(goods_i,index) in goodsList">
                <img class="wh-img" :src="goods_i.img.thumb" alt="">
                <div class="pro-info">
                    <p class="pro-name">{{goods_i.goods_name}}</p>
                    <p class="pro-price">{{goods_i.shop_price}}</p>
                    <p class="pro-buy"><a :href="'groupDetail.html?goodsid='+goods_i.goods_id"><span>去购买</span></a> </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 网红推荐 -->


          <!-- 网红单品 -->
          <div class="content-block like-recommend" style="display:none;">
            <div class="block-title clearfix">
              <span class="m-title">猜你喜欢</span>
              <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
              <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
            </div>
            <ul class="like-list clearfix" >
                <li v-for="n in 6" >
                <a href="">
                  <div class="clearfix">
                    <img class="like-img " :src="proPath+'/static/images/wh-default.jpg'" alt="">
                  </div>
                  
                  <div class="like-info">
                    <p>条纹连衣裙裙…</p>
                    <p><span class="price">¥60.00</span></p>
                  </div>
                </a>
                </li>
            </ul>
          </div>
          <!-- 网红单品 -->



        <!-- </v-scroll> -->
        <back-top></back-top>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import config from 'common/js/moji.config'
    import DialogLayer from 'common/js/layer'          //摩街数据方法类
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import NewPifaBanner from 'components/NewPifaBanner'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import BackTop from 'components/BackTop' //返回顶部
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        topicId:'',
        banner: [],
        allData:{},
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
        _this.topicId = MojiAjax.indexFuns.getQueryString('topic_id');
        if(_this.topicId == null){


            DialogLayer.open({
                    content: '出错了，专题不存在！'
                    ,skin: 'msg'
                  });
            setTimeou(function(){
                history.go(-1);
            },3000);
            return false;
        }
        // _this.initCity();
        _this.initBanner();
        _this.initGoodsList(function(result){
            _this.allData = result.data;
            _this.goodsList = result.data.sub_goods;
           if(result.paginated.more === 1){
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
        });
        // _this.initEvent();
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
                    _this.goodsList = result.data.sub_goods;
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
                topic_id:_this.topicId,
                version:260,
                pagination:{
                    page: _this.page,
                    count: _this.count
                }
            };
            // var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.topicinfo;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
        },
        refresh (done) {
            console.log('refresh')
            var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initGoodsList(function(result){
                 _this.goodsList = result.data.sub_goods;
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
                for (var i = 0; i < result.data.sub_goods.length; i++) {
                        _this.goodsList.push(result.data.sub_goods[i]);
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
      NewPifaBanner,
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
