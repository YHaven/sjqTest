<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
    
        <div class="content-block" style="margin-top:0;position:relative;">
            <i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);" style="position:absolute;left:1.2rem;"></i>
            <a href="" class="img-mod">
              <img :src="bannerImg" alt="" style="float:left;">
            </a>
        </div>
        <!-- 网红推荐 -->
          <div class="content-block wh-recommend" style="margin-top:0;">
            
            <div class="block-title clearfix">
              <span class="m-title">网红直播</span>
              <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
              <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
            </div>
            <ul class="wh-list clearfix">
              <li v-for="(video_i,index) in videoList">
                <i class="sjq-icon video-icon"></i>
                <a :href="'videoDetail.html?topic_id='+video_i.vid"><img class="wh-img" :src="video_i.video_img" alt=""></a>
                <p class="wh-title">{{video_i.title}}</p>
                <p class="wh-name"><img class="wh-header" :src="video_i.anchor_img" alt="" style="float:left;">{{video_i.anchor_name}}</p>
              </li>
            </ul>
          </div>

          <!-- 网红推荐 -->


          <!-- 网红单品 -->
          <div class="content-block sjtm-recommend">
            <div class="block-title clearfix">
              <span class="m-title">网红单品</span>
              <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
              <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
            </div>
            <ul class="sjtm-list clearfix">
                <li v-for="(goods_i,index) in goodsList">
                <a :href="'groupDetail.html?goodsid='+goods_i.goods_id">
                  <div class="clearfix">
                    <img class="sjtm-img " :src="goods_i.img.thumb" alt="">
                  </div>
                  
                  <div class="sjtm-info">
                    <p class="sjtm-name">{{goods_i.goods_name}}</p>
                    <p><span class="price">¥{{goods_i.goods_price}}</span></p>
                  </div>
                </a>
                </li>

            </ul>
          </div>
          <!-- 网红单品 -->



        </v-scroll>
        <back-top></back-top>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import config from 'common/js/moji.config'
    import Layer from 'common/js/layer'          //layer
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
        banner: [],
        bannerImg:MojiAjax.indexFuns.propath+'/static/images/active-reword-video.jpg',
        sellerList:[],
        videoList:[],
        goodsList:[],
        city:'hz',
        more:1,
        page:1,
        count:10
      }
    },
    mounted () {                     //页面完成加载
        var _this = this;
        // _this.initCity();
        _this.initBanner();
        _this.initGoodsList(function(result){
            _this.bannerImg = result.data.img;
            _this.videoList = result.data.video;
            _this.goodsList = result.data.goods_list;
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
                    _this.videoList = result.data.video;
                    _this.goodsList = result.data.goods_list;
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
                imgUrl:'http://www.topws.cn/images/star_recommend.jpg',
                url:''
            }]
        },
        initGoodsList(cb){
            var _this = this;
            var params = {
                pagination:{
                    page: _this.page,
                    count: _this.count
                }
            };
            // var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.goodsanchor;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
        },
        refresh (done) {
            console.log('refresh')
            var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initGoodsList(function(result){
                 _this.goodsList = result.data.goods_list;
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
                for (var i = 0; i < result.data.goods_list.length; i++) {
                        _this.goodsList.push(result.data.goods_list[i]);
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
