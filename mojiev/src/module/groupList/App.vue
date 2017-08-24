<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>{{pageTitle}}</h2>
        </div>
        
        <new-pifa-banner :banner="banner"></new-pifa-banner>
        
        <!-- 限时团批 -->
        <div class="content-block xstp" style="display:-none">
            <div class="block-title clearfix" style="display:none">
              <span class="m-title">团批区</span>
              <span class="o-title">拼团数量越多，价格越便宜</span>
              <a class="more" href="">更多></a>
            </div>
            <div class="block-content" v-for="groupi in timeGroup">
              <a :href="'groupDetail.html?goodsid='+groupi.id+'&objectid='+groupi.objectId+'&rec_type=GROUPBUY_GOODS'">
                <div class="product-img clearfix">
                  <img :src="groupi.img1" alt="" class="img-1">
                  <img :src="groupi.img2" alt="" class="img-2">
                  <img :src="groupi.img3" alt="" class="img-3">
                </div>
              </a>

              <div class="product-info">
                <div class="timer timerNumber" :data-time="groupi.left_second">
                    距离结束还有<i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒
                </div>
                <div class="product-name">{{groupi.name}}</div>
                <div class="product-group clearfix">
                  <div class="group-progress" :progressnum="groupi.buy_num" style="margin-top:0.2rem;">
                    <ul class="progress-price clearfix">
                      <li v-for="(group_rule, index) in groupi.group_rule"  :class="'step-'+(groupi.group_rule.length)">{{group_rule.price_str}}</li>
                    </ul>
                    <!-- <ul class="progress clearfix">
                        <li :class="'step-'+(index+1)" v-for="(group_rule, index) in groupi.group_rule"></li>
                    </ul> -->
                    <div class="progress">
                      <div class="progress-ing"></div>
                      <ul class="progress-ponit">
                        <li></li>
                        <li :class="'step-'+(groupi.progress.length)" v-for="(progress, index) in groupi.progress" v-if="groupi.progress.length>0"></li>
                        <li style="float:right;"></li>
                      </ul> 
                    </div>
                    
                    
                    <ul class="progress-number clearfix" style="display:none;">
                      <li v-for="(group_rule, index) in groupi.group_rule" :class="'step-'+(groupi.group_rule.length)" :num="group_rule.num">{{group_rule.num_str}}</li>
                    </ul>
                  </div>
                  <a class="goto-group-btn" :href="'groupDetail.html?goodsid='+groupi.id+'&objectid='+groupi.objectId+'&rec_type=GROUPBUY_GOODS'">去参团></a>
                </div>
              </div>
            </div>
            
          </div>
          <!-- 限时团批 -->


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
        everyTenClock:new Date().getFullYear(),
        banner: [],
        sellerList:[],
        pageTitle:'团批区',
        timeGroup:[],
        city:'hz',
        more:1,
        page:1,
        count:10
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
        // _this.initBanner();
        _this.initSellerList(function(result){
            _this.banner=[{
                imgUrl:result.data.banner,
                url:''
            }]
            _this.timeGroup = result.data.goods;
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
        initTimer(){
            setTimeout(function(){
              for (var i = 0; i < $('.timerStr').length; i++) {
                $($('.timerStr')[i]).yomi();
              };
              for (var i = 0; i < $('.timerNumber').length; i++) {
                $($('.timerNumber')[i]).yomiNumber();
              };
            },200);
        },
        initEvent(){
            var _this = this;
            $('.wh-nav li').click(function(){
                var _thisDom = $(this);
                $('.wh-nav li').removeClass('active');
                _thisDom.addClass('active');
                _this.page = 1;
                _this.more = 1;
                _this.initSellerList(function(result){
                    _this.timeGroup = result.data.goods;
                    _this.initTimer();
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
                imgUrl:_this.proPath+'/static/images/pifa_banner.jpg',
                url:''
            }]
        },
        initSellerList(cb){
            var _this = this;
            var url = config.indexAjax.timegroup;
            var params = {
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            }
                        };
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
        },
        
        refresh (done) {
            console.log('refresh')
            var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initSellerList(function(result){
                _this.timeGroup = result.data.goods;
                _this.initTimer();
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
            _this.initSellerList(function(result){
                for (var i = 0; i < result.data.goods.length; i++) {
                    _this.timeGroup.push(result.data.goods[i]);
                };
                _this.initTimer();
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
    #app .content-block{
        background: #f8f8f8;
    }
    #app .content-block .block-content{
        background: #f8f8f8;
        margin-bottom: 0.512rem;
    }
    .product-info{background-color: #fff;}
    .xstp .goto-group-btn{text-align: center;}
    #app .xstp .product-group{padding: 0.426rem;border: 1px solid #ddd;}
    #app .xstp .product-info .product-name{border: 1px solid #ddd;}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
