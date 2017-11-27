<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <!-- <v-scroll :on-refresh="refresh" :on-infinite="loadMore"> -->
    
      <!-- 头部 -->
      <div class="content-block" style="margin-top:0;position:relative;">
          <i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);" style="position:absolute;left:1.2rem;"></i>
          <a href="" class="img-mod">
            <img :src="bannerImg" alt="" style="float:left;">
          </a>
      </div>
      <!-- 头部 -->


      <!-- 限时抢批 -->

      <div class="content-block fast-buy" style="margin-top:0rem;">
        <div class="block-title clearfix">
          <span class="m-title">限时秒杀</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
        </div>

        <ul class="miaosha-step" style="display:none;">
          <li class="step" tapTo="am"><span class="active">上午场</span></li>
          <li class="step" tapTo="pm"><span class="">下午场</span></li>
        </ul>
        <ul class="miaosha-list am">
          <li class="miaosha-item clearfix" v-for="(goods_i,index) in amGoodsList">
            <div class="p-img">
              <a class="comm-action" :href="'groupDetail.html?goodsid='+goods_i.goods_id">
                <img :src="'http://www.sjq.cn/'+goods_i.goods_img">
              </a>
              <div class="stock-num">剩余{{goods_i.good_number}}件</div>
            </div>

            <div class="p-info">
              <div class="p-name">{{goods_i.goods_name}}</div>
              <div class="p-middle">
                  <i class="sjq-icon top-arrow"></i>
                  <i class="sjq-icon bottom-arrow"></i>
                  <div class="timer timerNumber" :data-time="goods_i.lastTamp">
                    <span style="display:none"><i class="days">00</i>天</span><i class="hours">01</i>:<i class="minutes">00</i>:<i class="seconds">00</i>
                  </div>
                  <p class="p-price">{{goods_i.new_promote_price!=''?goods_i.new_promote_price:goods_i.shop_price.toFixed(2)}}</p>
                  <del class="o-price">原价{{goods_i.shop_price.toFixed(2)}}</del>
              </div>
              <div v-if="goods_i.good_number>0">
                <a class="buy-btn buy-action" v-if="goods_i.timeStep == 2" :href="'groupDetail.html?goodsid='+goods_i.goods_id" >去抢购</a>
                <a class="buy-btn" v-if="goods_i.timeStep == 1">即将开始</a>
                <a class="buy-btn" v-if="goods_i.timeStep == 3">已结束</a>
              <!-- <a class="buy-btn buy-action" v-if="amLastTamp>0 && timeStep == 2" :href="'groupDetail.html?goodsid='+goods_i.goods_id" disabled="disabled">去抢购</a>
              <a class="buy-btn" v-if="timeStep == 1">即将开始</a>
              <a class="buy-btn" v-if="amLastTamp<=0 && timeStep > 2">已结束</a> -->
              </div>
              <a class="buy-btn" v-if="goods_i.good_number<=0">已售馨</a>
            </div>  

          </li>

        </ul>

        <ul class="miaosha-list pm" style="display:none;">
          <li class="miaosha-item clearfix" v-for="(goods_i,index) in pmGoodsList">
            <div class="p-img">
              <a class="comm-action" :href="'groupDetail.html?goodsid='+goods_i.goods_id">
              <img :src="'http://www.sjq.cn/'+goods_i.goods_img">
              </a>
              <div class="stock-num">剩余{{goods_i.good_number}}件</div>
            </div>

            <div class="p-info">
              <div class="p-name">{{goods_i.goods_name}}</div>
              <div class="p-middle">
                  <i class="sjq-icon top-arrow"></i>
                  <i class="sjq-icon bottom-arrow"></i>
                  <div class="timer timerNumber" :data-time="goods_i.lastTamp">
                    <span style="display:none"><i class="days">00</i>天</span><i class="hours">01</i>:<i class="minutes">00</i>:<i class="seconds">00</i>
                  </div>
                  <p class="p-price">{{goods_i.new_promote_price!=''?goods_i.new_promote_price:goods_i.shop_price.toFixed(2)}}</p>
                  <del class="o-price">原价{{goods_i.shop_price.toFixed(2)}}</del>
              </div>

              <div v-if="goods_i.good_number>0">
                <a class="buy-btn buy-action" v-if="goods_i.timeStep == 2" :href="'groupDetail.html?goodsid='+goods_i.goods_id" >去抢购</a>
                <a class="buy-btn" v-if="goods_i.timeStep == 1">即将开始</a>
                <a class="buy-btn" v-if="goods_i.timeStep == 3">已结束</a>

                <!-- <a class="buy-btn buy-action" v-if="pmLastTamp>0 && timeStep == 4" :href="'groupDetail.html?goodsid='+goods_i.goods_id" disabled="disabled">去抢购</a>
                <a class="buy-btn" v-if="timeStep < 4">即将开始</a>
                <a class="buy-btn" v-if="pmLastTamp<=0 && timeStep == 5">已结束</a> -->
              </div>

              <a class="buy-btn" v-if="goods_i.good_number<=0">已售馨</a>
            </div>  

          </li>

        </ul>
      </div>


      <!-- 限时抢批 -->

      <!-- 网红单品 -->
      <div class="content-block sjtm-recommend" v-if="goodsList.length>0">
        <div class="block-title clearfix" style="display:-none;">
          <span class="m-title">活动商品</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多<i class="sjq-icon right-rem-icon"></i></a> -->
        </div>
        <ul class="sjtm-list clearfix">
            <li v-for="(goods_i,index) in goodsList">
            <a :href="'groupDetail.html?goodsid='+goods_i.goods_id" class="comm-action">
              <div class="clearfix">
                <img class="sjtm-img " :src="'http://www.sjq.cn/'+goods_i.goods_img" alt="">
              </div>
              
              <div class="sjtm-info">
                <p class="sjtm-name">{{goods_i.goods_name}}</p>
                <p><span class="price">{{goods_i.shop_price}}</span></p>
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
        bannerImg:MojiAjax.indexFuns.propath+'/static/images/miaosha_banner2.jpg',
        sellerList:[],
        videoList:[],
        goodsList:[],
        amGoodsList:[],
        pmGoodsList:[],
        fastGoodsList:[],
        new_time:new Date().Format('yyyy-MM-dd hh:mm:ss'),
        city:'hz',
        priceRule:'',
        more:1,
        page:1,
        count:10
      }
    },
    mounted () {                     //页面完成加载
        var _this = this;
        

        _this.initGoodsList(function(result){


            if(result.error == 0){

              var sUserAgent = navigator.userAgent.toLowerCase();
              var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
              var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

              var sort_goods_arr = result.sort_goods_arr;
              var new_time = new Date(result.new_time);

              if (bIsIpad || bIsIphoneOs) {
                new_time = new Date(result.new_time.replace(/-/g, "/"));
              }
              var new_time_tamp = Date.parse(new_time)/1000;
              _this.new_time = new_time;


              var zDateTamp = Date.parse(new Date().Format('yyyy/MM/dd 00:00:00'))/1000;//0点
              var amStartDateTamp = Date.parse(new Date().Format('yyyy/MM/dd 00:00:01'))/1000;//10点
              var amDateTamp = Date.parse(new Date().Format('yyyy/MM/dd 11:59:59'))/1000;//11点
              var pmDateTamp = Date.parse(new Date().Format('yyyy/MM/dd 12:00:00'))/1000;//16点
              var pmEndDateTamp = Date.parse(new Date().Format('yyyy/MM/dd 23:59:59'))/1000;//17点
              
              var timeStep = 1;
              if(new_time_tamp>amStartDateTamp){
                timeStep = 2;
              }
              if(new_time_tamp>amDateTamp){
                timeStep = 3;
              }
              if(new_time_tamp>pmDateTamp){
                timeStep = 4;
              }
              if(new_time_tamp>pmEndDateTamp){
                timeStep = 5;
              }
              _this.timeStep = timeStep;


              var amLastTamp = amDateTamp-new_time_tamp;
              var pmLastTamp = pmEndDateTamp-new_time_tamp;

              if(amLastTamp>0){
                _this.amLastTamp = amLastTamp;
              }else{
                _this.amLastTamp = 0;
              }

              if(pmLastTamp>0){
                _this.pmLastTamp = pmLastTamp;
              }else{
                _this.pmLastTamp = 0;
              }
              

              for (var sort_goods in sort_goods_arr) {
                var goodsList = result.sort_goods_arr[sort_goods].goods;

                for (var i = 0; i < goodsList.length; i++) {
                    var promote_start_date = Number(goodsList[i].promote_start_date)+3600*8;
                    var promote_end_date = Number(goodsList[i].promote_end_date)+3600*8;
                    if(new_time_tamp < promote_start_date){
                      goodsList[i].lastTamp = promote_start_date - new_time_tamp;
                      goodsList[i].timeStep = 1;
                    }

                    if(new_time_tamp > promote_start_date && new_time_tamp < promote_end_date){
                      goodsList[i].lastTamp = promote_end_date - new_time_tamp;
                      goodsList[i].timeStep = 2;
                    }
                    if(new_time_tamp > promote_end_date){
                      goodsList[i].lastTamp = 0;
                      goodsList[i].timeStep = 3;
                    }
                    
                  };

                if(typeof goodsList != 'undefined' && sort_goods == 'am_miaosha'){
                  _this.amGoodsList = goodsList;
                }
                if(typeof goodsList != 'undefined' && sort_goods == 'pm_miaosha'){

                  _this.pmGoodsList = goodsList;
                }
                if(typeof goodsList != 'undefined' && sort_goods == 'my_favorite'){
                  _this.goodsList = goodsList;

                }
                
              };

              // console.log(_this.pmGoodsList)
              _this.initTimer();


              var timerStr = setInterval(function(){
                if($('.fast-buy').length>0){
                  _this.appDo();
                  clearInterval(timerStr);
                }
                
              },300)

              
              _this.tapToC();
            }

            


           // if(result.paginated.more === 1){
           //      _this.page += 1;
           //  }else{
           //      _this.more = 0;
           //      $('.load-more span').text('没有更多数据了')
           //  }
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
        getTimeStep(){
          var _this = this;
          // var new_time = new Date('2017-10-26 10:00:00');
          // var new_time_tamp = Date.parse(new_time)/1000;
          var new_time = new Date().Format('yyyy-MM-dd hh:mm:ss');
          if(new_time == new Date().Format('yyyy-MM-dd 10:00:00') || new_time == new Date().Format('yyyy-MM-dd 11:00:00')|| new_time == new Date().Format('yyyy-MM-dd 16:00:00') || new_time == new Date().Format('yyyy-MM-dd 17:00:00') || new_time == new Date().Format('yyyy-MM-dd 00:00:00')){
            console.log('xxxx')
          }

        },
        //设置倒计时
        initTimer(){
          //今天10点
          // var nowDate = new Date();
          // var nowTen = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate() + ' 10:00:00'
          // if(MojiAjax.indexFuns.compareTime(new Date(),nowTen)){  //倒计时今天10点还是明天10点
          //   this.everyTenClock = MojiAjax.indexFuns.addDate(nowTen,1); //天数加1
          // }
          var that = this;
          var timerStr = setInterval(function(){
            if($('.timerStr').length>0){
              for (var i = 0; i < $('.timerStr').length; i++) {
                $($('.timerStr')[i]).yomi();
              };
              clearInterval(timerStr);
            }
            
          },100)

          var timerNumber = setInterval(function(){
            if($('.timerNumber').length>0){
              for (var i = 0; i < $('.timerNumber').length; i++) {
                $($('.timerNumber')[i]).yomiNumber();
              };
              clearInterval(timerNumber);
            }
            
          },100)


          // var finshTimer = setInterval(function(){
          //   if($('.timer').length>0){
          //     that.getTimeStep();
          //     // clearInterval(finshTimer);
          //   }
            
          // },1000)

          
        },
        tapToC(){
          var _this = this;
            $('.miaosha-step .step').click(function(e){
                var that = $(this);
                var cid = that.attr('tapTo');
                $('.miaosha-list').hide();
                $('.miaosha-list.'+cid).show();
                $('.miaosha-step .step span').removeClass('active');
                that.find('span').addClass('active');
                
            });

            // if(Date.parse(_this.new_time)>Date.parse(new Date().Format('yyyy/MM/dd 12:00:00'))){
            //   $('.miaosha-step li[tapto="pm"]').click();
            // }
            
        },
        appDo(){
          var sUserAgent = navigator.userAgent.toLowerCase();
          var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
          var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
          var bIsMidp = sUserAgent.match(/midp/i) == "midp";
          var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
          var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
          var bIsAndroid = sUserAgent.match(/android/i) == "android";
          var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
          var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";


          var timer = new Date();     //时间间隔
          var preGoodId = "";
          if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

              if(sUserAgent.match(/MicroMessenger/i)!="micromessenger") {
                  // 如果不是微信，调用安卓和ios内部方法

                  // $('.shake').on('click',function(e){
                  //     e.preventDefault();
                  //     if(bIsIpad || bIsIphoneOs){
                  //         window.location.href='shakeclicked://'
                  //     }else{
                  //         Android.toShake();

                  //     }
                  // });

                  $('.buy-action,.comm-action').on('click',function(e){
                      e.preventDefault();
                      var url = $(this).attr('href'),
                          start = url.indexOf('id=')+3,
                          // end = url.indexOf('&u'),
                          goodId = url.substring(start);
                          
                      if(bIsIpad || bIsIphoneOs){
                          window.location.href='ecjiaopen://app?open_type=goods_detail&goods_id='+goodId;

                      }else{

                          if (preGoodId != goodId) {
                              window.location.href='ecjiaopen://app?open_type=goods_detail&goods_id='+goodId;
                              // Android.getGoodsDetail(goodId);
                              preGoodId = goodId;

                          }else{
                              var timerNow = new Date();
                              if ((timerNow.getTime() - timer.getTime())> 3000 ) {
                                  window.location.href='ecjiaopen://app?open_type=goods_detail&goods_id='+goodId;
                                  //Android.getGoodsDetail(goodId);
                                  timer = timerNow;
                                  preGoodId = goodId;

                              }
                          }
                      }
                      var _thisHref = $(this).attr('href');
                      setTimeout(function(){
                          window.location.href=_thisHref;
                      },100);
                  });

                  
                  
                  
              }
          }else{
              // if pc
              // $('.d-s-center').css({'width':'750px','margin':'0 auto'})
          }
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
            
            var params = {};
            // var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.getpctopic+'&topic_id='+MojiAjax.indexFuns.getQueryString('topic_id')+'&timer='+Date.parse(new Date().Format('yyyy/MM/dd hh:mm:ss'))/1000;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
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
