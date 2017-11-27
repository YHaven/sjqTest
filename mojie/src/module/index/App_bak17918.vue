<template>

  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><a href="changeCity.html"><span>{{nowAddress}}</span><i class="sjq-icon arrow-down-icon"></i></a></li>
        <li class="header-middle"><a href="/mobile/index.php?r=category"><span><i class="sjq-icon search-icon"></i>请输入您要找的商品或店铺</span></a></li>
        <!-- <li class="header-right" style="display:none;"><a href="/mobile/index.php?r=user/index/messagelist"><i class="sjq-icon msg-icon"></i></a></li> -->
        <li class="header-right">
          <a href="/mobile/index.php?r=user" v-if="islogin == true"><i class="sjq-icon wode-icon"></i></a>
          <a href="/mobile/index.php?r=user" v-if="islogin == false">登录</a>
        </li>
        
      </ul>
      <!-- 头部 -->

      <!-- banner -->
      <slider-banner :banner="banner"></slider-banner>
      <!-- banner -->
      

      <!-- nav -->
      <ul class="nav-tab clearfix">
        <li class="nav-tab-item" v-for="(mobileMenu,index) in allData.mobile_menu" >
          <a :href="index == 3?'market.html?belong=hz':index == 4?'market.html?belong=gd':mobileMenu.url">
            <div class="tab-img"><i class="sjq-icon"><img :src="mobileMenu.image"></i></div>
            <p>{{mobileMenu.text}}</p>
          </a>
        </li>
        <!-- <li class="nav-tab-item">
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
          <a href="qrcode.html">
            <div class="tab-img"><i class="sjq-icon tg-icon"></i></div>
            <p>推广</p>
          </a>
        </li> -->
      </ul>
      <!-- nav -->

      <a href="newPeopleVip.html" class="img-mod" v-if="islogin == false" style="display:none;">
        <img :src="proPath+'/static/images/active-reword.jpg'" alt="">
      </a>

      <!-- 限时抢批 -->

      <div class="xsqp clearfix" v-if="activityTopic.length>0 && true">
        <div class="qp-product">
          <!-- <div class="qp-info">
            <span class="qp-title"><i class="sjq-icon timer-icon"></i>限时抢批</span>
            <span class="timer timerStr" :data-time="everyTenClock+' 10:00:00'"><i class="hours">00</i>:<i class="minutes">00</i>:<i class="seconds">00</i></span>
            <span>每天10：00开抢</span>
          </div> -->
          <a :href="activityTopic[0].url">
            <img :src="activityTopic[0].image" alt="" style="width:100%;">
          </a>
        </div>
        <div class="o-product">
          <a :href="activityTopic[1].url">
            <img :src="activityTopic[1].image" alt="">
          </a>
          <a :href="activityTopic[2].url">
            <img :src="activityTopic[2].image" alt="">
          </a>
        </div>
      </div>

      <!-- 限时抢批 -->


      <!-- 限时团批 -->
      <div class="content-block xstp" style="display:none">
        <div class="block-title clearfix">
          <span class="m-title">团批区</span>
          <span class="o-title">拼团数量越多，价格越便宜</span>
          <a class="more" href="groupList.html">更多></a>
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


      <!-- 实体市场 -->
      <div class="content-block stsc" style="display:none;">
        <div class="block-title clearfix">
          <span class="m-title">逛市场</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <a class="more" href="market.html">更多></a>
        </div>
        
        <slider-market :yunMarket="yunMarket"></slider-market>
      </div>

      <!-- 实体市场 -->


      <!-- 精选档口 -->
      <div class="content-block jxdk" style="display:none">
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
              <!-- <span class="shop-a">{{sellerb.market_name}}</span> -->
              <div class="shop-i">
                <p class="shop-name">{{sellerb.shop_name}}</p>
                <p>{{sellerb.coupon_str}}</p>
              </div>
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

      <!-- 买手推荐 -->
      <div class="content-block ms-recommend" >
        <div class="block-title clearfix">
          <span class="m-title">买手推荐</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多></a> -->
        </div>
        <ul class="recommend-goods">
          <li class="goods-item clearfix" v-for="(recommendGoods,index) in allData.recommend_goods" >
            <a :href="'groupDetail.html?goodsid='+recommendGoods.id">
            <div class="goods-img">
              <img class="" :src="recommendGoods.img.small"></img>
            </div>
            <div class="goods-info">
              <p class="goods-name">{{recommendGoods.goods_name}}</p>
              <p class="goods-shop">{{recommendGoods.shop_name}}</p>
              <p class="goods-op">
                  <span class="goods-price">¥{{recommendGoods.shop_price}}</span>
                  <span class="goods-btn" :src="recommendGoods.id">立即抢批</span>
              </p>
            </div>
            </a>
          </li>
        </ul>
        <!-- <slider-market :yunMarket="yunMarket"></slider-market> -->
      </div>
      <!-- 买手推荐 -->


      <!-- 品牌折扣 -->
      <div class="content-block pp-discount " >
        <div class="block-title clearfix">
          <span class="m-title">品牌折扣</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多></a> -->
        </div>
        <ul class="discount-list">
          <li class="discount-item" v-for="(brandShop,index) in allData.brand_shop" >
            <a :href="'/mobile/index.php?r=store/index/shop_info&id='+brandShop.id">
              <img :src="brandShop.shop_logo" >
            </a>
            
            <p class="clearfix">
              <span class="discount-name fl">{{brandShop.coupon_str}}</span>
              <span class="discount-shop fr">{{brandShop.shop_name}}</span>
            </p>
          </li>
        </ul>
        <!-- <slider-market :yunMarket="yunMarket"></slider-market> -->
      </div>
      <!-- 品牌折扣 -->

      <!-- 三栏 -->
      <div class="three-l" v-if="activityTopic.length>0 && true">
        <a class="l-item" href="http://www.sjqhz.cn/topic.php?topic_id=25"><img :src="activityTopic[4].image"> </a>
        <a class="l-item" href="http://www.sjqhz.cn/topic.php?topic_id=26"><img :src="activityTopic[5].image"> </a>
        <a class="l-item" href="http://www.sjqhz.cn/topic.php?topic_id=27"><img :src="activityTopic[6].image"> </a>
      </div>
      <!-- 三栏 -->


      <!-- 工厂专供 -->
      <div class="content-block factory-goods " >
        <div class="block-title clearfix">
          <span class="m-title">工厂专供</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多></a> -->
        </div>
        <ul class="factorygoods-list">
          <li class="factorygoods-item" v-for="(factoryGoods,index) in allData.factory_goods" >
            <a :href="'groupDetail.html?goodsid='+factoryGoods.id">
            <img :src="factoryGoods.img.small" >
            
            <p class="factory-name">{{factoryGoods.shop_name}}</p>
            <p class="factory-price">¥{{factoryGoods.shop_price}}<del>¥{{factoryGoods.shop_price}}</del></p>
            </a>
          </li>
        </ul>
        <!-- <slider-market :yunMarket="yunMarket"></slider-market> -->
      </div>
      <!-- 工厂专供 -->


      <!-- 四季青街 -->
      <div class="content-block pp-discount " >
        <div class="block-title clearfix">
          <span class="m-title">四季青街</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多></a> -->
        </div>
        <ul class="discount-list">
          <li class="discount-item" v-for="(yun_market,index) in allData.yun_market" v-if="yun_market.belong == 'hz'">
            <a :href="'marketprodstore.html?id='+ yun_market.id +'&marketname='+yun_market.name">
              <img :src="yun_market.image" >
            
            
            <p class="clearfix">
              <span class="discount-name fl">{{yun_market.name}}</span>
              <!-- <span class="discount-shop fr">{{yun_market.shop_name}}</span> -->
            </p>
            </a>
          </li>
        </ul>
        <!-- <slider-market :yunMarket="yunMarket"></slider-market> -->
      </div>
      <!-- 四季青街 -->


      <!-- 广州街 -->
      <div class="content-block pp-discount " >
        <div class="block-title clearfix">
          <span class="m-title">广州街</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <!-- <a class="more" href="market.html">更多></a> -->
        </div>
        <ul class="discount-list">
          <li class="discount-item" v-for="(yun_market,index) in allData.yun_market" v-if="yun_market.belong == 'gd'">
            <a :href="'marketprodstore.html?id='+ yun_market.id +'&marketname='+yun_market.name">
              <img :src="yun_market.image" >
            </a>
            
            <p class="clearfix">
              <span class="discount-name fl">{{yun_market.name}}</span>
              <!-- <span class="discount-shop fr">{{yun_market.shop_name}}</span> -->
            </p>
          </li>
        </ul>
        <!-- <slider-market :yunMarket="yunMarket"></slider-market> -->
      </div>
      <!-- 广州街 -->

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
    <div id="gotop" class="gotop">
        <a href="javascript:this.blur();" class="w_top">
            <img :src="proPath+'/static/images/ic_intop.png'" alt="" />
        </a>
    </div>
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
        allData:{},
        banner: [],
        yunMarket:[],
        timeGroup:[],
        sellerBest:[],
        activityTopic:[],
        islogin:false,
        more:1,
        page:1,
        count:3,
        nowAddress:'浙江'
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;

        _this.initSite();//分站

        _this.initBanner(function(data){
          _this.allData = MojiAjax.indexFuns.indexData;
          _this.initYunMarket();//获取云市场
          // _this.initTimeGroup();    //获取限时团批

          setTimeout(function(){
            _this.initActivityTopic();    //

            
          },500);
          
        });  //初始化banner



        _this.page = 1;
        _this.more = 1;

        _this.initSellerBest(function(result){
            _this.sellerBest = result.data;
            if(result.paginated.more === 1){
                
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
        });    //获取精选档口

        _this.initTimer();   //时间倒计时
        
        _this.getLogin();//判断登录
        //返回到顶部 js 2017-7-18 document.documentElement.clientHeight
        document.body.addEventListener('touchmove',function(event){
            if($(".yo-scroll").scrollTop() > 100){
                    document.getElementById('gotop').style.display = 'block';
            }else{
                    document.getElementById('gotop').style.display = 'none';
            }
        })
        $("#gotop").on("click",function(){
          console.info(1222)
            $(".yo-scroll").scrollTop(0);
             $("#gotop").hide();
            return false;
        })


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
        var _this = this;
        var nowAddress = '浙江';
        var hideAddress = 'hz';
        var l_host = window.location.host;
        if(l_host === 'www.sjqxa.cn'){
          nowAddress = '西安';
          hideAddress = 'xa';
        }
        if(l_host === 'www.sjqyc.cn'){
          nowAddress = '银川';
          hideAddress = 'yc';
        }
          
        if(l_host === 'www.sjqgd.cn'){
          nowAddress = '广州';
          hideAddress = 'gd';
        }

        MojiAjax.indexFuns.cookie.set('mojie_session_city',hideAddress,1);
        _this.nowAddress = nowAddress;

        if($('.site-page').length>0){
          
          $('.site-page a').show();
          $('.site-page .'+ hideAddress).hide();
          // $('.header .header-left span').html(nowAddress);
          
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
      initActivityTopic(){
        var activityTopicArr = MojiAjax.indexFuns.activityTopic()
        // console.log(activityTopicArr)
        this.activityTopic = activityTopicArr
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
          //console.log($('.group-progress').length);
         for (var i = 0; i < $('.group-progress').length; i++) {
            var progress_pre = 0;
            var $group_progress = $($('.group-progress')[i]);
            var progressnum = Number($group_progress.attr('progressnum'));
            //数量
            var $group_number = $group_progress.find('.progress-number li');
            //价格
            var $group_price = $group_progress.find('.progress-price li');
            //点
            var $progress = $group_progress.find('.progress li');
            var group_number_length = $group_number.length; 
            var temp_progressnum = progressnum;
            var temp_upNumber = 0;
            var df_pre = 1;
            for (var j = 0; j < $group_number.length; j++) {
              var _thisNumber = Number($($group_number[j]).attr('num'));
               //console.log(_thisNumber + '_thisNumber--------'+progressnum+'progressnum')

              if(progressnum >= _thisNumber){
                if(group_number_length == 1){
                  progress_pre += 1/group_number_length;
                  df_pre = 1/group_number_length;
                }else{
                  if(j>0){
                    progress_pre += 1/(group_number_length-1);
                    df_pre = 1/(group_number_length-1);
                  }
                }
                
                temp_progressnum =progressnum - _thisNumber;
                temp_upNumber = _thisNumber;
                $($group_number[j]).addClass('light');
                $($group_price[j]).addClass('light');
                $($progress[(j+1)]).addClass('light');
              }else{
                
                progress_pre += temp_progressnum/(_thisNumber-temp_upNumber) * df_pre;
              }
              
            };
            if(group_number_length > 1 && progressnum<Number($($group_number[0]).attr('num'))){
              progress_pre =0;
            }
            var progress_pre_str = progress_pre*100+'%';
            $group_progress.find('.progress-ing').css({'width':progress_pre_str});
          }
        },1000)


      },
      initSellerBest(cb){
        var _this = this;
        var params = {
            pagination:{
                page: _this.page,
                count: _this.count
            }
        };
        MojiAjax.indexFuns.sellerBest(params,cb)
        // var sellerBest = MojiAjax.indexFuns.sellerBest()
        // this.sellerBest = sellerBest
      },
      refresh (done) {
        console.log('refresh')
        var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initSellerBest(function(result){
                _this.sellerBest = result.data;
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
            _this.initSellerBest(function(result){
                for (var i = 0; i < result.data.length; i++) {
                    _this.sellerBest.push(result.data[i]);
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
  #app .sjq-icon.arrow-down-icon{position: relative;top: -0.1rem;margin-right: 0.16rem;}
  #app .header .header-middle span{background: rgba(255,255,255,1);color: #999;}
  #app .header .header-right a{color: #fff;}
  .gotop{
        position: fixed;
        z-index: 888;
        width: 30px;
        height: 30px;
        display: none;
        bottom: 2.453rem;
        right: 0.2rem;
        width: 2rem;
        height: 2rem;
    }
    .w_top{
        width: 2rem;
        height: 2rem;
    }
    .w_top img{
        width: 2rem;
    }
</style>
