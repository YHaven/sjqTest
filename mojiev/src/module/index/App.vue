<template>

  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><a href="changeCity.html"><span>杭州</span><i class="sjq-icon arrow-down-icon"></i></a></li>
        <li class="header-middle"><a href="/mobile/index.php?r=category"><span><i class="sjq-icon search-icon"></i>请输入您要找的商品或店铺</span></a></li>
        <li class="header-right" style="display:none;"><a href="/mobile/index.php?r=user/index/messagelist"><i class="sjq-icon msg-icon"></i></a></li>
      </ul>
      <!-- 头部 -->

      <!-- banner -->
      <slider-banner :banner="banner"></slider-banner>
      <!-- banner -->
      

      <!-- nav -->
      <ul class="nav-tab clearfix">
        <li class="nav-tab-item">
          <a href="fileSelection.html">
            <div class="tab-img"><i class="sjq-icon cx-icon"></i></div>
            <p>新批发</p>
          </a>
        </li>
        <li class="nav-tab-item">
          <a href="wanggong.html">
            <div class="tab-img"><i class="sjq-icon hh-icon"></i></div>
            <p>新网供</p>
          </a>
        </li>
        
        <li class="nav-tab-item">
          <a href="springNewProd.html">
            <div class="tab-img"><i class="sjq-icon tp-icon"></i></div>
            <p>新特卖</p>
          </a>
        </li>
        <li class="nav-tab-item">
          <a href="/mobile/index.php?r=user/index/affiliate">
            <div class="tab-img"><i class="sjq-icon tg-icon"></i></div>
            <p>推广</p>
          </a>
        </li>
      </ul>
      <!-- nav -->

      <a href="newPeopleVip.html" class="img-mod" v-if="islogin == false" style="display:none;">
        <img :src="proPath+'/static/images/active-reword.jpg'" alt="">
      </a>

      <!-- 限时抢批 -->
      <div class="xsqp clearfix">
        <div class="qp-product">
          <!-- <div class="qp-info">
            <span class="qp-title"><i class="sjq-icon timer-icon"></i>限时抢批</span>
            <span class="timer timerStr" :data-time="everyTenClock+' 10:00:00'"><i class="hours">00</i>:<i class="minutes">00</i>:<i class="seconds">00</i></span>
            <span>每天10：00开抢</span>
          </div> -->
          <a href="/topic.php?topic_id=5">
            <img :src="proPath+'/static/images/default-product-1.jpg'" alt="" style="width:100%;">
          </a>
        </div>
        <div class="o-product">
          <a href="/topic.php?topic_id=6">
            <img :src="proPath+'/static/images/nvnv.jpg'" alt="">
          </a>
          <a href="/topic.php?topic_id=7">
            <img :src="proPath+'/static/images/nan.png'" alt="">
          </a>
        </div>
      </div>
      <!-- 限时抢批 -->


      <!-- 限时团批 -->
      <div class="content-block xstp" style="display:none">
        <div class="block-title clearfix">
          <span class="m-title">限时团批</span>
          <span class="o-title">拼团数量越多，价格越便宜</span>
          <a class="more" href="">更多></a>
        </div>
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


      <!-- 实体市场 -->
      <div class="content-block stsc" style="display:none;">
        <div class="block-title clearfix">
          <span class="m-title">实体市场</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <a class="more" href="">更多></a>
        </div>
        
        <slider-market :yunMarket="yunMarket"></slider-market>
      </div>

      <!-- 实体市场 -->


      <!-- 精选档口 -->
      <div class="content-block jxdk">
        <div class="block-title clearfix">
          <span class="m-title">新批发</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <a class="more" href="fileSelection.html?type=pifa">更多></a>
        </div>
        <div v-for="sellerb in sellerBest">
          <a :href="'/mobile/index.php?r=store/index/shop_info&id='+sellerb.id">
          <div class="into-shop">
            <img :src="sellerb.shop_logo" alt="">
            <div class="shop-info">
              <span class="shop-a">{{sellerb.market_name}}</span>
              <!--
              <p class="shop-n">{{sellerb.shop_name}}</p>
              <p class="shop-b">{{sellerb.coupon_str}}</p>
              <a class="shop-btn" :href="sellerb.id">进入店铺</a>
            -->
            </div>
          </div>
          </a>
          <div class="block-content">
            <slider-dk :seller_goods="sellerb.seller_goods"></slider-dk>
          </div>
        </div>
        
      </div>

      <!-- 精选档口 -->

    </v-scroll>
    
    <div class="site-page goods-nav ts-3">
        <ul class="goods-nav-box">
          <!--<a href="{U('index/messagelist')}">
                <li><i class="iconfont icon-xiaoxi1"></i>消息</li>
         </a>-->
            <a href="http://test.sjq.cn/mobile" class="hz">
                <li>杭州</li>
            </a>
            <a href="http://xa.sjq.cn/mobile" class="xa">
                <li>西安</li>
            </a>
            <a href="http://test.sjqyc.cn/mobile" class="yc">
                <li>银川</li>
            </a>                               
            <a href="http://gd.sjq.cn/mobile" class="gd">
                <li>广州</li>
            </a>
        </ul>
    </div>

    <div class="app-download clearfix" id="J_download" style="display: block;" v-if="islogin == false">
        <a href="javascript:;" class="close" @click="hideDownload"></a>
        <span class="fl app-name"><img :src="proPath+'/static/images/footer-download-01.png'" ></span>
        <a href="http://mojie.sjq.cn/index.php?app=public&as=sjq" class="fr download"><img :src="proPath+'/static/images/footer-download-02.png'" ></a>
    </div>
    <page-footer :active="1"></page-footer>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import ZpTimer from 'common/js/zepto.timer'        //倒计时
  import SliderBanner from 'components/SliderBanner'              //滑动banner
  import SliderMarket from 'components/SliderMarket'              //滑动实体市场
  import SliderDk from 'components/SliderDk'              //滑动精选档口
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
        sellerBest:[],
        islogin:false
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
        _this.initBanner(function(data){
          
          _this.initYunMarket();//获取云市场
          _this.initTimeGroup();    //获取限时团批
          _this.initSellerBest();    //获取精选档口
        });  //初始化banner
        _this.initTimer();   //时间倒计时
        _this.initSite();//分站
        _this.getLogin();//判断登录
    },
    methods: {                          //方法
      hideDownload(){
        $('#J_download').hide();
      },
      getLogin(){
        var _this = this;
        MojiAjax.indexFuns.islogin({},function(result){
          if(result.is_login === 0){

          }else{
            _this.islogin = true;
          }
        });
      },
      initSite(){
        //分站
        if($('.site-page').length>0){
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
          $('.site-page a').show();
          $('.site-page .'+ hideAddress).hide();
          $('.header .header-left span').html(nowAddress);
        }

        $('.icon-13caidan').click(function () {
          return $('.goods-scoll-bg').addClass('active'),
          $('.goods-nav').hasClass('active') ? ($('.goods-nav').removeClass('active'), $('.goods-scoll-bg').removeClass('active'), !1)  : ($('.goods-nav').addClass('active'), $('.goods-scoll-bg').addClass('active'), !1)
        });

        $('body').click(function(){
          $('.site-page').removeClass('active');
        });
      },
      //设置倒计时
      initTimer(){
        //今天10点
        var nowDate = new Date();
        var nowTen = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate() + ' 10:00:00'
        if(MojiAjax.indexFuns.compareTime(new Date(),nowTen)){  //倒计时今天10点还是明天10点
          this.everyTenClock = MojiAjax.indexFuns.addDate(nowTen,1); //天数加1
        }

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
        
      },
      //获取banner
      initBanner (cb){
        var bannerArray = MojiAjax.indexFuns.banner(cb)
        this.banner = bannerArray
      },
      //获取云市场
      initYunMarket(){
        var yunMarket = MojiAjax.indexFuns.yunMarket()
        this.yunMarket = yunMarket
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
      initSellerBest(){
        var sellerBest = MojiAjax.indexFuns.sellerBest()
        this.sellerBest = sellerBest
      },
      refresh (done) {
        console.log('refresh')
        done() // call done
      },
      loadMore (done) {
        console.log('loadMore')
        $('.load-more span').text('没有更多数据了')
        // done() // finsh call done
      }
    },
    components: {
      VScroll,
      SliderBanner,
      SliderMarket,
      SliderDk,
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
