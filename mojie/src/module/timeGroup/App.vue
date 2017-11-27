<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon"></i></li>
        <li class="header-middle text-c"><i>限时团批</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->

      <!-- banner -->
      <slider-banner :banner="banner"></slider-banner>
      <!-- banner -->

      <!-- 限时团批 -->
      <div class="content-block xstp">
        <div class="block-content" v-for="groupi in timeGroup">
          <div class="product-img clearfix">
            <img :src="groupi.img1" alt="" class="img-1">
            <img :src="groupi.img2" alt="" class="img-2">
            <img :src="groupi.img3" alt="" class="img-3">
          </div>
          <div class="product-info">
            <div class="timer timerNumber" :data-time="groupi.left_second">
                距离结束还有<i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒
            </div>
            <div class="product-name">{{groupi.name}}</div>
            <div class="product-group clearfix">
              <div class="group-progress" :progressnum="groupi.buy_num">
                <ul class="progress-price clearfix">
                  <li v-for="(group_rule, index) in groupi.group_rule"  :class="'step-'+(groupi.group_rule.length)">{{group_rule.price_str}}</li>
                </ul>
                <!-- <ul class="progress clearfix">
                    <li :class="'step-'+(index+1)" v-for="(group_rule, index) in groupi.group_rule"></li>
                </ul> -->
                <ul class="progress">
                  <li></li>
                  <li :class="'step-'+(groupi.progress.length)" v-for="(progress, index) in groupi.progress"></li>
                  <li></li>
                </ul> 
                
                <ul class="progress-number clearfix">
                  <li v-for="(group_rule, index) in groupi.group_rule" :class="'step-'+(groupi.group_rule.length)" :num="group_rule.num">{{group_rule.num_str}}</li>
                </ul>
              </div>
              <a class="goto-group-btn" :href="groupi.id">去参团></a>
            </div>
          </div>
        </div>
        
      </div>
      <!-- 限时团批 -->




    </v-scroll>
    
    <page-footer :active="1"></page-footer>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import ZpTimer from 'common/js/zepto.timer'        //倒计时
  import SliderBanner from 'components/SliderBanner'              //滑动banner
  import PageFooter from 'components/PageFooter'              //底部
  import VScroll from 'components/PullToRefreshLayer' //刷新加载


  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        yunMarket:[],
        timeGroup:[],
        sellerBest:[]
      }
    },
    mounted () {                        //页面完成加载
        this.initBanner();  //初始化banner
        this.initTimer();   //时间倒计时
        this.initTimeGroup();    //获取限时团批
    },
    methods: {                          //方法
      //设置倒计时
      initTimer(){
        //今天10点
        var nowDate = new Date();
        var nowTen = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate() + ' 10:00:00'
        if(MojiAjax.indexFuns.compareTime(new Date(),nowTen)){  //倒计时今天10点还是明天10点
          this.everyTenClock = MojiAjax.indexFuns.addDate(nowTen,1); //天数加1
        }

        setTimeout(function(){
          for (var i = 0; i < $('.timerStr').length; i++) {
            $($('.timerStr')[i]).yomi();
          };
          for (var i = 0; i < $('.timerNumber').length; i++) {
            $($('.timerNumber')[i]).yomiNumber();
          };
        },0);
        
      },
      //获取banner
      initBanner (){
        var bannerArray = MojiAjax.indexFuns.banner()
        this.banner = bannerArray
      },
      //获取限时团批
      initTimeGroup(cb){
        var timeGroup = MojiAjax.indexFuns.timeGroup(cb)
        this.timeGroup = timeGroup

                //进度条点亮
        
        setTimeout(function(){
         for (var i = 0; i < $('.group-progress').length; i++) {
            var $group_progress = $($('.group-progress')[i]);
            var progressnum = Number($group_progress.attr('progressnum'));
            //数量
            var $group_number = $group_progress.find('.progress-number li');
            //价格
            var $group_price = $group_progress.find('.progress-price li');
            //点
            var $progress = $group_progress.find('.progress li');
            for (var j = 0; j < $group_number.length; j++) {
              var _thisNumber = Number($($group_number[j]).attr('num'));
              // console.log(_thisNumber + '_thisNumber--------'+progressnum+'progressnum')
              if(progressnum >= _thisNumber){
                $($group_number[j]).addClass('light');
                $($group_price[j]).addClass('light');
                $($progress[(j+1)]).addClass('light');
              }
              
            };
          }
        },200)


      },
      refresh (done) {
        console.log('refresh')
        this.initTimeGroup(function(){
          done() // call done
        });    //获取限时团批
        

      },
      loadMore (done) {
        console.log('loadMore')
        // done() // finsh call done
      }
    },
    components: {
      VScroll,
      SliderBanner,
      PageFooter
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
