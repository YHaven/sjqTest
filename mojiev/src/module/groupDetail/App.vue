<template>

  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon"></i></li>
        <li class="header-middle">
          <ul>
            <li>商品</li>
            <li>详情</li>
            <li>评价</li>
          </ul>
        </li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->

      <!-- banner -->
      <detail-banner :banner="banner"></detail-banner>
      <!-- banner -->
      
      <div class="detail product-group clearfix">
          <div class="group-progress">
            <ul class="progress-price clearfix">
              <li class="step-3 light">￥100</li>
              <li class="step-3">￥50</li>
              <li class="step-3">￥30</li>
            </ul>
            <ul class="progress">
              <li class="light"></li>
              <li class="step-2"></li>
              <li class="step-2"></li>
              <li></li>
            </ul> 
            
            <ul class="progress-number clearfix">
              <li class="step-3" num="20">20件成团</li>
              <li class="step-3" num="50">50件</li>
              <li class="step-3" num="100">100件</li>
            </ul>
          </div>
          <div class="buy-number">
              <p>已团30件</p>
              <span class="start-number">10件起批</span>
          </div>
      </div>


      <div class="content-block" style="margin-top:0px;">
        
      
        <div class="product-name">秋冬潮女2015休闲小清新字母印花长袖圆领A字 黑色潮牌卫衣 宽松短款字母</div>
        <div class="group-price clearfix">
          <div class="p-price">
            <span class="money">￥19.90 </span>
            <span class="market-price">￥155.00</span>
            <div class="p-info">支付当前价格参团，最终根据实际价格返差价</div>
          </div>
          <div class="timer timerNumber" :data-time="123456">
              距离结束还有<div class="time-number"><i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒</div>
          </div>
        </div>

        <!-- 品质 -->
        <ul class="pz-l">
          <li>极速退货</li>
          <li>极速退款</li>
          <li>正品保障</li>
          <li>全网低价</li>
        </ul>

        
        <!-- 快递 -->
        <div class="d-li express">
          <span class="fee">运费￥6.00</span>
          <span class="to-address">快递&nbsp;至&nbsp;<i>浙江省杭州市</i></span>
        </div>
      
        <!-- 服务 -->
        <div class="d-li">
            服务：本商品有<a href="">四季青官方旗舰店</a>发货并提供售后服务
        </div>
      </div>
      
      <!-- 规格选择 -->
      <div class="">
          <span class="li-label">规格选择</span>
          <div class="li-value">
            <p><span class="lab">颜色</span><span class="lab-val">红色/黄色/绿色</span></p>
            <p><span class="lab">尺码</span><span class="lab-val">S/M/L</span></p>
          </div>
      </div>

      <!-- 买家评价 -->
      <div class="d-li">
          <span class="f-l">买家评价（30）</span><span class="f-r">好评率100%<i class="sjq-icon right-arrow-icon"></i></span>
      </div>

      <!-- 进入店铺 -->
      <div class="into-shop">
        <div class="shop-head-img"><img :src="proPath+'/static/images/new01.png'" alt=""></div>
        <div class="shop-s-info">
          <span class="shop-s-name">四季青官方旗舰店</span>
          <span class="shop-s-number">销量：20513</span>
        </div>
        <a href="">进店逛逛</a>
      </div>


      <!-- 商品详情 -->
      <div class="product-detail">产品信息</div>
      

      <!-- 详情底部 -->
      <div class="detail-footer">
        
      </div>
    
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import ZpTimer from 'common/js/zepto.timer'        //倒计时
  import DetailBanner from 'components/DetailBanner'              //滑动banner
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
        this.initTimeGroup();
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
      initTimeGroup(){
        var timeGroup = MojiAjax.indexFuns.timeGroup()
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
        done() // call done
      },
      loadMore (done) {
        console.log('loadMore')
        // done() // finsh call done
      }
    },
    components: {
      VScroll,
      DetailBanner,
      PageFooter
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.512rem;
    background: #f6f6f6;
  }
  /*团购详情页面*/
  .detail{/*height: 2.133rem;*/background: #f5337d;color: #fff}
  .detail .progress-price,.detail .progress-number{color: #ffaaca}
  .detail .progress{background-color: #ff639f;float: left;}
  .detail ul.progress li{background-color: #ff639f;}
  .detail ul.progress li:before{background-color: #ff639f;}
  .detail ul.progress li:first-child:before{background-color: #fff;}
  .detail .group-progress{padding-left: 1.237rem;padding-right: 1.237rem;}
  .detail .progress-price li.light{color: #fff;font-weight: normal;}
  .detail ul.progress li{height: 0.17rem;}
  .detail ul.progress{height: 0.17rem;margin: 0rem;margin-top: 0.05rem;}
  .detail .progress-number{margin-top: 0.4rem;}
  .detail .buy-number{font-size: 0.682rem;float: right;margin-right: 0.96rem;padding-top:0.1rem;}
  .detail .buy-number .start-number{font-size: 0.512rem;color: #ffaaca;border: 1px solid #ffaaca;padding:0rem 0.15rem;border-radius: 5px;}
  .product-name{font-size:0.704rem; text-align: left;margin:0rem 0.64rem;padding:0.4rem 0rem;border-bottom: 1px solid #eaeaea; }
  .group-price{margin:0rem 0.64rem; }
  .group-price .p-price{float: left;width: 8.533rem;}
  .group-price .money{color: #f5337d;font-size: 1.237rem}
  .group-price .market-price{color: #999;font-size:0.426rem;text-decoration: line-through;}
  .group-price .p-info{color: #999;font-size:0.426rem; }
  .group-price .timerNumber{font-size: 0.512rem;color: #f5337d;text-align: center;float: right;margin-top: 0.5rem;}
  .group-price .time-number{font-size: 0.426rem;}
  


  .pz-l{height: 0.96rem;line-height: 0.96rem;text-align: center;background: #f6f6f6;margin-top: 0.256rem;color: #999;font-size: 0.426rem;}
  .pz-l li{width: 25%;float: left;}
  .d-li{margin: 0rem 0.64rem;height: 1.45rem;}
  .express{font-size: 0.597rem;color: #333;float: left;width: 100%;}
  .express .fee{margin-right: 2.261rem;}
</style>
