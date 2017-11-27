<template>

  <div id="app">
    
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle">
          <ul class="group-header clearfix">
            <li class="active" showcontent="content-detail"><a href="javascript:;">商品</a></li>
            <li showcontent="content-detail-page"><a href="javascript:;">详情</a></li>
            <li showcontent="content-common-page"><a href="javascript:;">评价</a></li>
          </ul>
        </li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      
      <div class="content-detail" style="display:-none;">


      <!-- banner -->
      <detail-banner :banner="banner" v-if="showmash"></detail-banner>
      <!-- banner -->
      <!-- 团批 -->
      <div class="detail product-group clearfix" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">
          <div class="group-progress" :progressnum="productDetail.valid_goods">
            <ul class="progress-price clearfix">
              <li v-for="(price_ladder, index) in productDetail.price_ladder"  :class="'step-'+(productDetail.price_ladder.length)">{{price_ladder.formated_price}}</li>
            </ul>
            <!-- <ul class="progress">
              <li class="light"></li>
              <li :class="'step-'+(productDetail.progress.length)" v-for="(progress, index) in productDetail.progress"></li>
              <li></li>
            </ul>  -->
            <div class="progress">
              <div class="progress-ing"></div>
              <ul class="progress-ponit">
                <li></li>
                <li :class="'step-'+(productDetail.progress.length)" v-for="(progress, index) in productDetail.progress" v-if="productDetail.progress.length>0"></li>
                <li style="float:right;"></li>
              </ul> 
            </div>
            <ul class="progress-number clearfix">
              <li v-for="(group_rule, index) in productDetail.price_ladder" :class="'step-'+(productDetail.price_ladder.length)" :num="group_rule.amount">{{group_rule.amount}}件</li>
            </ul>
          </div>
          <div class="buy-number">
              <p>已团{{productDetail.valid_goods}}件</p>
              <span class="start-number">{{productDetail.batch_amount?productDetail.batch_amount:'0'}}件起批</span>
          </div>
      </div>
      <!-- 团批 -->


      <!-- 抢批 -->
      <div class="detail clearfix fast-goods" v-if="productDetail.activity_type == 'RAB_GOODS'">
          <div class="fast-goods-price">
              <div class="good-price">
                {{productDetail.shop_price}}
              </div>
              <div class="other-price">
                <p><del>{{productDetail.shop_price}}</del></p>
                <p><span class="start-number">{{productDetail.batch_amount}}件起批</span></p>
              </div>
          </div>
          <div class="buy-number timerNumber" :data-time="productDetail.endtime">
              <p>距离活动结束还有</p>
              <div class="time-number"><i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒</div>
          </div>
      </div>
      <!-- 抢批 -->

      <!--  促销 -->
      <div class="detail clearfix fast-goods" v-if="productDetail.activity_type == 'PROMOTE_GOODS'">
          <div class="fast-goods-price">
              <div class="good-price">
                {{productDetail.formated_promote_price}}
              </div>
              <div class="other-price">
                <!-- <p><del>原价：{{productDetail.shop_price}}</del></p> -->
                <!-- <p><span class="start-number">{{productDetail.batch_amount}}件起批</span></p> -->
              </div>
          </div>
          <div class="buy-number timerNumber" :data-time="productDetail.endtime">
              <p>距离活动结束还有</p>
              <div class="time-number"><i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒</div>
          </div>
      </div>
      <!-- 促销 -->

      <div class="content-block clearfix" style="margin-top:0px;">
        
      
        <div class="product-name">
          <span class="fast-label" v-if="productDetail.activity_type == 'RAB_GOODS'">限时抢批</span>
          <span class="fast-label" v-if="productDetail.activity_type == 'PROMOTE_GOODS'">促销</span>
          {{productDetail.goods_name}}
        </div>
        
        <!-- 团批 -->
        <div class="group-price clearfix" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">
          <div class="p-price">
            <span class="money">￥{{productDetail.deposit}} </span>
            <!-- <span class="market-price">￥155.00</span> -->
            <span class="ding-price">定金</span>
            
          </div>
          <div class="timer timerNumber" :data-time="productDetail.endtime" v-if="productDetail.group_status == 1">
              距离结束还有
              <div class="time-number"><i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒</div>
          </div>
          <div class="timer timerNumber" :data-time="productDetail.starttime" v-if="productDetail.group_status == 0">
              距离开始还有
              <div class="time-number"><i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒</div>
          </div>
          <div class="timer timerNumber" :data-time="productDetail.endttime" v-if="productDetail.group_status == 2">
              活动已结束
          </div>

        </div>
        <div class="p-info" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'" >
          先支付定金，成团后补差价，团批活动结束后，定金不予退还！<i class="groupbuy-rlue-show">?</i>
          <div class="layui-m-layer layer-groupbuy-rlue" style="display:none;">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                    <div>
                      <div class="rlue-title">团批约定</div>
                      <div class="rlue-content">
                        <p>1.买家参与团批活动，默认以定金的方式与卖家签订团批协议，请遵守团批约定。</p>
                        <p>2. 商品总参团量达到最低团批量，商品即成团；总参团量达到各档团批数量，对应档团批价生效；总参团量达到团批商品的供货总量后，买家将不能再参团，该商品满团。商品满团或团批时间结束，则该商品团批结束，系统自动判断是否成团。届时可查看团批商品页面。</p>
                        <p>3. 参团方式：买家先支付定金，成团后，定金订单页面将跳转为支付尾款页面（定金抵充货款），买家需在72小时内补齐订单尾款。若买家未在规定时间内补齐尾款，定金不予退还；若活动未能成团，定金退回。</p>
                        <p>4. 定金=单件定金*参团商品数（参团期内，定金可申请退款）订单尾款=成团价*参团商品数－定金</p>
                      </div>
                    </div>
                    
                    <div class="product-prop-btn">
                      <a class="btn-buy" @click="cartCreate">确定</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 团批 -->  

      
        <!-- 普通商品价格 -->
        <div class="general-goods" v-if="productDetail.activity_type == 'GENERAL_GOODS'">
          <!-- 未登录 -->
          <div v-if="false">
            <div class="general-price">
              <span>{{productDetail.volume_price[0].format_price}}</span>{{productDetail.volume_price[0].number}}件起批
            </div>
            <a href="login.html" class="more-price">更多采购价</a>
          </div>
          <!-- 未登录 -->

          <!-- 登录 -->
          <div >
            <ul class="general-volume-price" >
              <li v-for="(volume_price, index) in productDetail.volume_price">
                <p class="volume-price">{{volume_price.format_price}}</p>
                <p class="volume-number">{{volume_price.number}}件起批</p>
              </li>
            </ul>
          </div>
          <!-- 登录 -->
        </div>
      



        <!-- 品质 -->
        <ul class="pz-l clearfix">
          <li v-for="(shop_services, index) in productDetail.shop_services">{{shop_services.service_name}}</li>
          <!-- <li>极速退款</li>
          <li>正品保障</li>
          <li>全网低价</li> -->
        </ul>
        

        <!-- 店铺优惠券 -->
        <div class="d-li dp-active clearfix" v-if="(rec_type == 'GENERAL_GOODS' || rec_type == '')&& productDetail.coupons.length>0" @click="showCoupons">
          <label>[店铺优惠券]</label><span>立即领取店铺优惠券<i class="sjq-icon right-arrow-icon" style="margin-right:0.65rem;margin-top:0.45rem"></i></span>
        </div>

        <div class="layui-m-layer layer-coupons" style="display:none;" v-if="(rec_type == 'GENERAL_GOODS' || rec_type == '')&& productDetail.coupons.length>0">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                      <div class="title clearfix">店铺优惠券</div>
                      <ul class="redbag-ul">
                        <li :class="coupons.can_receive == 0?'redbag-li useyes clearfix':'redbag-li useno clearfix'" v-for="(coupons, couponsindex) in productDetail.coupons" :couponsindex="couponsindex" >
                          <div class="redbag-m">
                            <p class="price">￥{{coupons.cou_money}}</p>
                            <p class="msg">满{{coupons.cou_man}}减{{coupons.cou_money}}</p>
                            <p class="time">{{coupons.cou_start_time}}--{{coupons.cou_end_time}}</p>
                          </div>
                          <div class="redbag-s" v-if="coupons.can_receive == 0" @click="goodsCouponsReceive(coupons.cou_id)">
                            领取
                          </div>
                          <div class="redbag-s" v-if="coupons.can_receive == 1">
                            已领取
                          </div>
                          <div class="redbag-s" v-if="coupons.can_receive == 2">
                            已领完
                          </div>
                        </li>

                      </ul>
                      <div class="confirm-btn" @click="selectCoupons()">确定</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        <!-- 店铺活动 -->
        <div class="d-li dp-active clearfix" v-if="(rec_type == 'GENERAL_GOODS' || rec_type == '')&& productDetail.favourable_list.length>0" @click="showFavourable">
          <label>[店铺活动]</label><span>{{productDetail.favourable_list[0].type_label}}-{{productDetail.favourable_list[0].name}}<i class="sjq-icon right-arrow-icon" style="margin-right:0.65rem;margin-top:0.45rem"></i></span>
        </div>

        <div class="layui-m-layer layer-active" style="display:none;" v-if="(rec_type == 'GENERAL_GOODS' || rec_type == '')&& productDetail.favourable_list.length>0">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                      <div class="title clearfix">店铺优惠</div>
                      <ul>
                        <li v-for="(favourable, favourableindex) in productDetail.favourable_list" :couponsindex="favourableindex" >
                          {{favourable.type_label +'-'+favourable.name}}
                          <i  :class=" productDetail.select_favourable === favourableindex ? 'sjq-icon right-arrow-icon active ' : 'sjq-icon right-arrow-icon'"></i>
                        </li>
                      </ul>
                      <div class="confirm-btn" @click="selectFavourable()">确定</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


        <!-- 快递 -->
        <div class="d-li express clearfix">
          <div class="fee">运费:{{is_shipping == 1?'包邮':'￥'+shipfee}}</div>
          <div class="to-address" @click="selectRegion()">送至:<span class="f-r"><i>{{regionsStr}}</i><i class="sjq-icon right-arrow-icon" style="margin-right:0.65rem;margin-top:0.45rem"></i></span></div>
        </div>
        <div class="clearfix" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">
          <p style="color: #999;margin: 0rem 0.64rem;">团批订单在成团后支付配送费用</p>
        </div>
      
        <!-- 服务 -->
        <div class="d-server clearfix" style="display:none" v-if="productDetail.server_desc != ''">
            
            <span class="m-l">服务：{{productDetail.server_desc}}</span>
            <!-- <span class="m-l">服务：本商品有<a href="">四季青官方旗舰店</a>发货并提供售后服务</span> -->
        </div>
      </div>
      
      <!-- 规格选择 -->
      <div class="d-size">
          <span class="li-label">规格选择</span>
          <div class="li-value">
            <p><span class="lab">颜色:</span><span class="lab-val" style="position:absolute;">{{cartGGStr}}</span></p>
            <p><span class="lab">数量:</span><span class="lab-val">{{cartNumber}}</span></p>
            <i class="sjq-icon right-arrow-icon" style="margin-top:-1rem;margin-right:0.65rem;"></i>
          </div>
      </div>

      <!-- 买家评价 -->
      <div class="d-li d-pingjia">
        <p><span class="f-l">评价晒单（{{productDetail.comment_count}}人评价）</span><span class="f-r"><em>{{productDetail.positive_rate}}</em>好评<i class="sjq-icon right-arrow-icon" style="margin-top:0.12rem"></i></span></p>
          
      </div>

      <!-- 进入店铺 -->
      <div class="into-shop">
        <div class="clearfix">
          <div class="shop-head-img"><img :src="productDetail.merchant_info.seller_logo" alt=""></div>
          <div class="shop-s-info">
            <p class="shop-s-name">{{productDetail.merchant_info.seller_name}}</p>
            <p class="shop-s-number">{{productDetail.merchant_info.follower}}人关注</p>
          </div>
          <a :href="'/mobile/index.php?r=store/index/shop_info&id='+productDetail.merchant_info.id" class="into-btn">进入店铺</a>
        </div>
        
        <div class="shop-s-pingjia">
          <span>商品评价: <i>{{productDetail.merchant_info.comment.comment_goods}}</i></span>
          <span>服务态度: <i>{{productDetail.merchant_info.comment.comment_server}}</i></span>
          <span>物流速度: <i>{{productDetail.merchant_info.comment.comment_delivery}}</i></span>
        </div>
      </div>

      <div class="your-block your-favorite" v-if="productDetail.related_goods.length>0">
        <p class="li-title">猜你喜欢</p>
        <ul class="clearfix">
          <li v-for="(goods, index) in productDetail.related_goods" v-if="index <6">
            <a :href="'/mobile/index.php?r=goods&id='+goods.goods_id"></a>
            <div class="pro-img"><img :src="goods.img.small" alt=""></div>
            <p class="pro-name">{{goods.name}}</p>
            <p class="pro-price">{{goods.shop_price}}</p>
          </li>
        </ul>
      </div>


      <div class="your-block your-history" style="display:none;">
        <p class="li-title">我的足迹</p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>


      <!-- 商品详情 -->
      <div class="product-detail"></div>
      
      

      <!-- 规格选择 -->
      <div class="layui-m-layer layer-size-change" style="display:none;">
        <div class="layui-m-layershade"></div>
        <div class="layui-m-layermain">
          <div class="layui-m-layersection">
            <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
              <div class="layui-m-layercont">
                <div class="product-s-i clearfix">
                  <div class="product-s-img">
                    <img :src="productDetail.img.small" alt="">
                  </div>
                  <div class="product-s-ii">
                    <p class="product-s-name">{{productDetail.goods_name}}</p>
                    <p class="product-s-price"><span v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">定金:￥{{productDetail.deposit}}</span><span v-if="productDetail.activity_type == 'GENERAL_GOODS'">￥{{productDetail.volume_price[0].price}}</span><span v-if="productDetail.activity_type == 'PROMOTE_GOODS'">{{productDetail.formated_promote_price}}</span></p>
                    
                  </div>
                  <i class="sjq-icon remove-icon">X</i>
                </div>
                <ul class="product-prop-tab clearfix">
                  <li :class="index === 0 ? 'active':''" :showtab="index" :specid="specolor.id" v-for="(specolor, index) in colorArr">{{specolor.label}}</li>
                </ul>
                <ul :class="'product-prop tab-'+cindex" v-for="(specolor, cindex) in colorArr" :style="cindex === 0 ?'':'display:none'">
                  <li v-for="(spesize, sindex) in sizeArr" class="clearfix"><span class="size-1">{{spesize.label}}</span><span class="size-num">{{spesize.product_number}}</span><span class="number"><i class="plus">+</i><input :productid="spesize.product_id" :spesid="spesize.id" :spes="spesize.label" :specid="specolor.id" :spec="specolor.label" :stock="spesize.product_number" readonly type="text" value="0" name="select_number"><i class="minus">-</i></span></li>
                  
                </ul>
                
                <p class="product-prop-count">共选择商品<i>{{productAllCount}}</i>件</p>
                <div class="product-prop-btn">
                  <a class="add-to-cart" :href="'/mobile/index.php?r=goods&id='+productDetail.id" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">单人购买</a>
                  <a class="add-to-cart" v-if="rec_type == 'GENERAL_GOODS' || rec_type == ''" @click="addToCart">加入购物车</a>
                  <a class="btn-buy" @click="cartCreate">立即购买</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      </div>  <!-- 详情结束 -->
      


      <div class="content-detail-page" style="margin-bottom:2.5rem;display:none">
        <ul class="select-tab clearfix">
          <li class="active" showtab="t">图文详情</li>
          <li class="" showtab="p">参数规格</li>
        </ul>
        <div class="detail-content tab-content tab-t"></div>
        <div class="tab-content tab-p" style="display:none"></div>
      </div>

      <div class="content-common-page" style="margin-bottom:2.5rem; display:none">
        <ul class="select-tab clearfix">
          <li class="active" showtab="all">
            <p>全部</p>
            <p>{{goodsCommont.comment_count}}</p>
          </li>
          <li class="" showtab="positive">
            <p>好评</p>
            <p>{{goodsCommont.comment_positive}}</p>
          </li>
          <li class="" showtab="moderate">
            <p>中评</p>
            <p>{{goodsCommont.comment_moderate}}</p>
          </li>
          <li class="" showtab="negative">
            <p> 差评</p>
            <p>{{goodsCommont.comment_negative}}</p>
          </li>
          <li class="" showtab="showorder">
            <p>晒图</p>
            <p>{{goodsCommont.comment_showorder}}</p>
          </li>
        </ul>
        <div class="common-content"></div>
      </div>



      <!-- 详情底部 -->
      <section class="filter-btn dis-box" style="display:none">
        <!--飞入购物车位置s-->
        <span class="quick_links" id="shopCart"></span>
        <!--飞入购物车位置e-->
        <a class="filter-btn-kefu filter-btn-a" href="http://wpa.qq.com/msgrd?v=3&amp;uin=&amp;site=qq&amp;menu=yes"><i class="iconfont icon-kefu"></i><em>客服</em></a>
        <a href="/mobile/index.php?r=cart" class="filter-btn-flow filter-btn-a"><i class="iconfont icon-gouwuche"></i><sup class="b-color cart-num">0</sup><em>购物车</em></a>
        <a class="filter-btn-shop filter-btn-a" href="/mobile/index.php?r=store/index/shop_info&amp;id=48316"><i class="iconfont icon-dianpu"></i><em>店铺</em></a>
        <a class="btn-disab box-flex quehuo" href="javascript:;" style="display:none">暂时缺货</a>
        <a class="btn-cart box-flex add-to-cart btnCart" href="javascript:;" onclick="addToCart_quick(1518)">加入购物车</a>
        <a class="btn-submit box-flex click-show-attr add-to-cart" href="javascript:;">立即购买</a>
      </section>

      <div class="detail-footer">
        <ul class="footer-l">
          <li>
            <a href="javascript:;" @click="goodsCollect">
              <i class="sjq-icon favorite-icon" v-if="productDetail.collected == 0"></i>
              <i class="sjq-icon favorite-icon active" v-if="productDetail.collected == 1"></i>
              <p>收藏</p>
            </a>
          </li>
          <li>
            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=&amp;site=qq&amp;menu=yes">
              <i class="sjq-icon ask-icon"></i>
              <p>询单</p>
            </a>
          </li>
          <li>
            <a href="cartList.html">
              <i class="sjq-icon cart-icon"></i>
              <p>购物车</p>
            </a>
          </li>
        </ul>

        <a class="btn-submit" @click="cartCreate">立即购买</a>
        <a class="add-to-cart" :href="'/mobile/index.php?r=goods&id='+productDetail.id" v-if="productDetail.activity_type == 'GROUPBUY_GOODS'">单人购买</a>
        <a class="add-to-cart" v-if="rec_type == 'GENERAL_GOODS' || rec_type == ''" @click="addToCart">加入购物车</a>
      </div>
    
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import DialogLayer from 'common/js/layer'          //摩街数据方法类
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
        objectid:'',
        rec_type:'GROUPBUY_GOODS',
        // rec_type:'GENERAL_GOODS',
        // rec_type:'RAB_GOODS',
        isLogin:false,
        showmash:true,
        banner: [],
        productDetail:{},
        colorArr:[],
        sizeArr:[],
        selectProduct:[],
        cartGGStr:'',
        cartNumber:'',
        regionsid:'',
        regionsStr:'',
        shipfee:0,
        is_shipping:0,
        productAllCount:0,
        goodsCommont:{}
      }
    },
    mounted () {                        //页面完成加载
        var that = this;
        var rec_type = MojiAjax.indexFuns.getQueryString('rec_type');
        if(rec_type != null){
          that.rec_type = rec_type;
        }else{
          that.rec_type = '';
        }
        var objectid = MojiAjax.indexFuns.getQueryString('objectid');
        if(objectid != null){
          that.objectid = objectid;
        }else{
          that.objectid = '';
        }
        that.initPropDetail();
        // that.isMojieApp();
        // that.initBanner();  //初始化banner
        

        // this.initTimeGroup();
        
        
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
        },200);
        
      },

      //摩街APP打开判断
      isMojieApp(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        // alert('我在调试进详情页浏览器：'+sUserAgent);
        var timer = new Date();     //时间间隔
        var preGoodId = "";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          if(sUserAgent.match(/MicroMessenger/i)!="micromessenger") {

            try{
                var goodId = MojiAjax.indexFuns.getQueryString('goodsid');
                if(bIsIpad || bIsIphoneOs){
                  //alert('xxxxx');
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
                            // Android.getGoodsDetail(goodId);
                            timer = timerNow;
                            preGoodId = goodId;

                        }
                    }
                }

             }catch(e){

             }

          }
        }
      },

      //图文详情
      initDetailContent(){
        var that = this;
        var params = {
          goods_id:MojiAjax.indexFuns.getQueryString('goodsid')
        }
        MojiAjax.indexFuns.goodsDesc(params,function(res){
          if(res.status.succeed === 1){
            var html = res.data;
            $('.content-detail-page .detail-content').html(html.substring(html.indexOf('<body>')+6,html.indexOf('</body>')))
          }
        })
      },
      //获取评论
      initGoodsCommont(){
        var that = this;
        var params = {
          goods_id:MojiAjax.indexFuns.getQueryString('goodsid'),
          type:$('.content-common-page .select-tab .active').attr('showtab')
        }
        MojiAjax.indexFuns.goodsCommontList(params,function(res){
          if(res.status.succeed === 1){
            that.goodsCommont = res.data;
          }
        })
      },
      //优惠券列表
      goodsListCoupons(){
           var that = this;
          var url = config.indexAjax.goodslistcoupons;
        var params = {
          goods_id:MojiAjax.indexFuns.getQueryString('goodsid')
        }
        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.productDetail.coupons = res.data;
          }else{
            that.productDetail.coupons = [];
          }
            
        })
      },
      //领取优惠券列表
      goodsCouponsReceive(cou_id){
           var that = this;
          var url = config.indexAjax.goodscouponsreceive;
        var params = {
          cou_id:cou_id
        }

        var fasList = DialogLayer.open({
          content: "是否领取优惠券"
          ,btn: ['确定', '取消'],
          yes: function(index){
            MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
              if(res.status.succeed === 1){

                  DialogLayer.close(fasList);
                  DialogLayer.open({
                    content: '领取成功'
                    ,skin: 'msg'
                    ,time:3
                  });
                  setTimeout(function(){
                    window.location.href = window.location.href;
                  },2000)
                  
              }else{
                
              }
                
            })
          }
        });
        
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
      //初始化操作
      initOperation(){
        var that = this;


        //顶部切换
        $('.group-header li').click(function(){
          var _this = $(this);
          $('.group-header li').removeClass('active');
          _this.addClass('active');
          var showId = _this.attr('showcontent');
          
          $('.content-detail').hide();
          $('.content-detail-page').hide();
          $('.content-common-page').hide();
          $('.'+showId).show();
          if(showId === 'content-detail-page'){
            that.initDetailContent();
          }
          if(showId === 'content-common-page'){
            that.initGoodsCommont();
          }


        })


        //详情切换
        $('.content-detail-page .select-tab').find('li').click(function(){
          var _this = $(this);
          $('.content-detail-page .select-tab').find('li').removeClass('active');
          _this.addClass('active');
          $('.content-detail-page .tab-content').hide();
          $('.content-detail-page .tab-'+_this.attr('showtab')).show();
        })


        //评价切换
        $('.content-common-page .select-tab').find('li').click(function(){
          var _this = $(this);
          $('.content-common-page .select-tab').find('li').removeClass('active');
          _this.addClass('active');
          that.initGoodsCommont();
        })

        $('.d-pingjia').click(function(){
          $('.group-header li[showcontent="content-common-page"]').click();
        })



        //初始化选择地区
        that.initUserAddress();
        // var regionsid = MojiAjax.indexFuns.getQueryString('regionsid');
        // var regionsStr = '';
        // var country = MojiAjax.indexFuns.getQueryString('country');
        // if(country) regionsStr += country;
        // var province = MojiAjax.indexFuns.getQueryString('province');
        // if(province) regionsStr += province;
        // var city = MojiAjax.indexFuns.getQueryString('city');
        // if(city) regionsStr += city;
        // var area = MojiAjax.indexFuns.getQueryString('area');
        // if(area) regionsStr += area;
        // if(regionsid) that.regionsid = regionsid;
        // that.regionsStr = regionsStr;

        // //初始化运费
        // that.goodsShippingFee()




        //进度条点亮
        if(that.rec_type == 'GROUPBUY_GOODS'){
            setTimeout(function(){
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
              // console.log(_thisNumber + '_thisNumber--------'+progressnum+'progressnum')

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
        },200)


          //选择关闭
          $('.layer-groupbuy-rlue .product-prop-btn').click(function(){
            $('.layer-groupbuy-rlue').hide();
          })
          $('.groupbuy-rlue-show').click(function(){
            $('.layer-groupbuy-rlue').show();
          })
          

        }



          // 尺码选择打开
          $('.d-size .li-value').click(function(){
            $('.layer-size-change').show();
          })

          //尺码选择关闭
          $('.layer-size-change .remove-icon').click(function(){
            $('.layer-size-change').hide();
          })


          //选择商品计算
          var totalCount = function(){
            var result = 0;
            var selectArr = [];
            $('.layer-size-change').find('input[name="select_number"]').each(function(){
              var _this = $(this);
              var _thisCount = Number(_this.val());
              
              if(_thisCount>0){
                result += _thisCount;
                var selectObj = {};
                selectObj.colorid = _this.attr('specid');
                selectObj.sizeid = _this.attr('spesid');
                selectObj.colorStr = _this.attr('spec');
                selectObj.sizeStr = _this.attr('spes');
                selectObj.number = _this.val();

                selectObj.product_id = _this.attr('productid');
                selectObj.goods_attr = _this.attr('specid') +'|' +_this.attr('spesid');
                selectObj.goods_attr_str = _this.attr('spec') +'|' +_this.attr('spes');
                selectObj.product_number = _this.val();
                selectArr.push(selectObj);
              }
            })
            that.selectProduct = selectArr;
            that.productAllCount = result;

            var selectProductArr = that.selectProduct;
            var ggArr = [];
            var total = 0;
            for (var i = 0; i < selectProductArr.length; i++) {
              var _thisCount = Number(selectProductArr[i].number);
              if(_thisCount>0){
                ggArr.push('['+ selectProductArr[i].colorStr +','+ selectProductArr[i].sizeStr +']');
                total += _thisCount;
              }
              
            };
            that.cartGGStr = ggArr.join('/');
            that.cartNumber = total;
          }

          



          //尺码选择加减
          $('.layer-size-change .product-prop .plus').click(function(){
            var numberInp = $(this).closest('.number').find('input');
            var result = Number(numberInp.val())+1;
            var stock = Number(numberInp.attr('stock'));
            if(result>stock) result = stock;
            numberInp.val(result);
            totalCount();
          });
          $('.layer-size-change .product-prop .minus').click(function(){
            var numberInp = $(this).closest('.number').find('input');
            var result = Number(numberInp.val())-1;
            if(result<0) result = 0;
            numberInp.val(result);
            totalCount();
          });

          //加入购入车
          $('.layer-size-change .add-to-cart').click(function(){
            
            $('.layer-size-change').hide();
          });


          //默认选择一个
          $('.layer-size-change .product-prop .plus')[0].click();

          //商品颜色切换
          $('.layer-size-change .product-prop-tab').find('li').click(function(){
            $('.layer-size-change .product-prop-tab').find('li').removeClass('active');
            $(this).addClass('active');
            $('.layer-size-change .product-prop').hide();
            $('.layer-size-change .tab-'+$(this).attr('showtab')).show();
          });


      },
      initPropDetail(){
        var that = this;
        var params = {
          goods_id:MojiAjax.indexFuns.getQueryString('goodsid'),
          object_id:that.objectid,
          rec_type: that.rec_type//活动类型 团购商品传：GROUPBUY_GOODS 普通商品：GENERAL_GOODS
        }
        MojiAjax.indexFuns.goodsDetail(params,function(res){
          if(res.status.succeed === 1){
            var productDetail = res.data;

            //团购状态

            if(that.rec_type == 'GROUPBUY_GOODS'){
              var progressArray = [];
              var groupRule = productDetail.price_ladder;
              var buy_num = productDetail.valid_goods;
              // 我要一个已团百分比
              for (var j = 1; j < groupRule.length; j++) {
                var progressObj = {light:''};
                if(buy_num >= groupRule[j].num){
                  progressObj.light = 'light';
                }
                progressArray.push(progressObj);
                
              };

              productDetail.progress = progressArray;

            }

            
            // 优惠券时间格式化


            // var couponslist = productDetail.coupons
            // var newCouponsArr = [];
            // if(couponslist){
            //   MojiAjax.indexFuns.dateFomat();
            //   for (var i = 0; i < couponslist.length; i++) {
            //     var newCouponsObj = couponslist[i];
            //     var newDate = new Date();
            //     newDate.setTime(Number(couponslist[i].cou_start_time) * 1000);
            //     newCouponsObj.cou_start_time_str = newDate.format('yyyy-MM-dd');
            //     newDate.setTime(Number(couponslist[i].cou_end_time) * 1000);
            //     newCouponsObj.cou_end_time_str = newDate.format('yyyy-MM-dd');
            //     newCouponsArr.push(newCouponsObj);
            //   };

            //   productDetail.coupons = newCouponsArr;
            // }

            


            that.productDetail = productDetail

            that.goodsListCoupons()


            var pictures = productDetail.pictures
            that.banner = []
            for (var i = 0; i < pictures.length; i++) {
              var bannerObj = {};
              bannerObj.imgUrl = pictures[i].url;
              bannerObj.url = pictures[i].url;
              that.banner.push(bannerObj);
            };



            //尺码颜色分类，重组
            var products = productDetail.products;
            var colorArray = [];
            var colorIdArr = [];
            var sizeArray = [];
            var sizeIdArr = [];
            for (var i = 0; i < products.length; i++) {
              var colorObj = {};
              colorObj.id = products[i].goods_attr.split('|')[0];
              colorObj.label = products[i].goods_attr_str.split(',')[0];
              if(colorIdArr.indexOf(colorObj.id)<0){
                colorIdArr.push(colorObj.id);
                colorArray.push(colorObj);
              }
              
              var sizeObj = {};
              sizeObj.id= products[i].goods_attr.split('|')[1];
              sizeObj.label= products[i].goods_attr_str.split(',')[1];
              sizeObj.product_id= products[i].product_id;
              sizeObj.product_number= products[i].product_number;
              if(sizeIdArr.indexOf(sizeObj.id)<0){
                sizeIdArr.push(sizeObj.id);
                sizeArray.push(sizeObj);
              }

              that.colorArr = colorArray;
              that.sizeArr = sizeArray;
            };


            setTimeout(function(){
              that.initOperation();
              that.initTimer();   //时间倒计时
            },200)

          }else{
            DialogLayer.open({
              content: res.status.error_desc
              ,skin: 'msg'
            });
          }
          
        });

      },
      selectRegion(){
        var that = this;
        var url = 'selectRegion.html?vt=1';
        var goodsid = MojiAjax.indexFuns.getQueryString('goodsid');
        var objectid = that.objectid;
        var rec_type = that.rec_type;
        if(goodsid) url += '&goodsid='+goodsid;
        if(objectid) url += '&objectid='+objectid;
        if(rec_type) url += '&rec_type='+rec_type;
        window.location.href = url
      },
      //商品收藏
      goodsCollect(){
        var that = this;
        var params = {
          goods_id:MojiAjax.indexFuns.getQueryString('goodsid')
        }
        MojiAjax.indexFuns.goodsCollect(params,function(res){
          if(res.status.succeed === 1){
            that.productDetail.collected = 1
            // $('.favorite-icon').addClass('active')
          }else{
            DialogLayer.open({
              content: res.status.error_desc
              ,skin: 'msg'
            });
          }
        })
      },
      //初始化运费
      goodsShippingFee(){
        var that = this;
        if(that.regionsid != '' && that.regionsid != null && that.regionsid != 0){
          var params = {
            goods_id:MojiAjax.indexFuns.getQueryString('goodsid'),
            area_id:that.regionsid
          }
          MojiAjax.indexFuns.goodsShippingFee(params,function(res){
            if(res.status.succeed === 1){
              
              that.is_shipping = res.data.is_shipping
              that.shipfee = res.data.shipping_fee
            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
              });
            }
          })
        }
        
      },

      //购物车
      cartCreate(){
        var that = this;
        var url = config.indexAjax.cartcreate;
        var params = {
            goods_id:MojiAjax.indexFuns.getQueryString('goodsid'),
            spec:that.selectProduct,
            object_id:that.objectid,
            rec_type:that.rec_type //购物车类型,抢批：RAB_GOODS: 团批:GROUPBUY_GOODS 不是活动：传空就行，参考以前app规则
        };

        if(!that.isLogin){
          DialogLayer.open({
            content: "用户未登录！"
            ,btn: '去登陆',
            yes: function(index){
              window.location.href="login.html"
            }
          });
          return false;
        }

        if(params.spec.length<=0){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '请选择商品规格'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }



        if(that.productAllCount < that.productDetail.batch_amount){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '所选商品数量必须大于起批量'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }

        if(that.productDetail.activity_type === 'GENERAL_GOODS' && that.productAllCount < Number(that.productDetail.volume_price[0].number)){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '所选商品数量必须大于起批量'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }



        var paramsStr = JSON.stringify(params);

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            
            that.goods_number = res.data.goods_number
            that.rec_id = res.data.rec_id

            // 获取用户地址列表  并去结算页面  
            // 收货地址列表  /mobile/index.php?r=flow/Index/address_list
            // 添加收货地址  /mobile/index.php?r=flow/index/add_address
            that.userAddress();
          }else{
            if(res.status.error_code ===100){
              that.isLogin = false;
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });

            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
                ,time:2
              });
            }
            // window.location.href = 'login.html'
          }
        })
      },
      //userAddress  用户地址
      initUserAddress(){
        var that = this;

        var regionsid = MojiAjax.indexFuns.getQueryString('regionsid');
        var regionsStr = '';


        if(regionsid == null){
          var url = config.indexAjax.addresslist;
          var params = {};
          MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
            if(res.status.succeed === 1){

              that.isLogin = true;
              var addresslist = res.data;
              for (var i = 0; i < addresslist.length; i++) {
                if(addresslist[i].default_address === 1){
                  var default_address_id = addresslist[i].id;
                  regionsid = default_address_id;
                  regionsStr = addresslist[i].country_name + addresslist[i].province_name + addresslist[i].city_name + addresslist[i].district_name ;

                  that.regionsid = regionsid;
                  that.regionsStr = regionsStr;
                  //初始化运费
                  that.goodsShippingFee()
                }
              };

            }else{
              if(res.status.error_code ===100){
                that.isLogin = false;
                // DialogLayer.open({
                //     content: res.status.error_desc
                //     ,btn: '去登陆',
                //     yes: function(index){
                //       window.location.href="login.html"
                //     }
                //   });
              }else{
                DialogLayer.open({
                  content: res.status.error_desc
                  ,skin: 'msg'
                  ,time:2
                });
              }
              
            }
          })

        }else{
          var country = MojiAjax.indexFuns.getQueryString('country');
          if(country) regionsStr += country;
          var province = MojiAjax.indexFuns.getQueryString('province');
          if(province) regionsStr += province;
          var city = MojiAjax.indexFuns.getQueryString('city');
          if(city) regionsStr += city;
          var area = MojiAjax.indexFuns.getQueryString('area');
          if(area) regionsStr += area;
          
          if(regionsid) that.regionsid = regionsid;
          that.regionsStr = regionsStr;
          //初始化运费
          that.goodsShippingFee()
        }

        

        


      },
      userAddress(){
        var that = this;
        var url = config.indexAjax.addresslist;
        
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){

            
            var addresslist = res.data;
            var hasDefault = false;
            for (var i = 0; i < addresslist.length; i++) {
              if(addresslist[i].default_address === 1){
                var default_address_id = addresslist[i].id;
                //去结算
                hasDefault = true;
                window.location.href = 'flowCheckOrder.html?rec_id='+that.rec_id+'&address_id='+default_address_id;
              }
            };


            if(!hasDefault){
              DialogLayer.open({
                content: '请设置默认地址'
                ,skin: 'msg'
              });
            }

          }else{
            if(res.status.error_code ===100){
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });
            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
              });
            }
          
            // window.location.href = 'login.html'
          }
        })
      },

      addToCart(){
        var that = this;
        var url = config.indexAjax.cartcreate;
        var params = {
            goods_id:MojiAjax.indexFuns.getQueryString('goodsid'),
            spec:that.selectProduct,
            object_id:that.objectid,
            rec_type:that.rec_type //购物车类型,抢批：RAB_GOODS: 团批:GROUPBUY_GOODS 不是活动：传空就行，参考以前app规则
        };

        if(!that.isLogin){
          DialogLayer.open({
            content: "用户未登录！"
            ,btn: '去登陆',
            yes: function(index){
              window.location.href="login.html"
            }
          });
          return false;
        }

        if(params.spec.length<=0){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '请选择商品规格'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }

        if(that.productAllCount < that.productDetail.batch_amount){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '所选商品数量必须大于起批量'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }

        if(that.productDetail.activity_type === 'GENERAL_GOODS' && that.productAllCount < Number(that.productDetail.volume_price[0].number)){
          $('.layer-size-change').show();
          DialogLayer.open({
            content: '所选商品数量必须大于起批量'
            ,skin: 'msg'
            ,time:2
          });
          return false;
        }



        var paramsStr = JSON.stringify(params);

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            
            that.goods_number = res.data.goods_number
            that.rec_id = res.data.rec_id

            DialogLayer.open({
                content: '商品已加入购物车'
                ,skin: 'msg'
                ,time:2
              });
          }else{
            if(res.status.error_code ===100){
              that.isLogin = false;
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });

            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
                ,time:2
              });
            }
            // window.location.href = 'login.html'
          }
        })
      },
      showFavourable(){
        var that = this;
        that.showmash = false;
        $('.layer-active').show()
      },
      selectFavourable(){
        var that = this;
        that.showmash = true;
        $('.layer-active').hide()
      },
      showCoupons(){
        var that = this;
        that.showmash = false;
        $('.layer-coupons').show()
      },
      selectCoupons(){
        var that = this;
        that.showmash = true;
        $('.layer-coupons').hide()
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
  /*.detail .progress li{background-color: #ff639f;}*/
  .detail .progress li.light:before{background-color: #fff;content: '';}
  .detail .progress li:before{background-color: #ff639f;}
  .detail .progress li:first-child:before{background-color: #fff;}
  .detail .group-progress{padding-left: 1.237rem;padding-right: 1.237rem;}
  .detail .progress-price li.light{color: #fff;font-weight: normal;}
  .detail .progress-ing{height: 0.17rem;margin: 0.17rem 0rem;background-color: #fff;position: absolute;left: 0px;top: -0.17rem}
  .detail .progress li{height: 0.17rem;}
  .detail .progress{height: 0.17rem;margin: 0rem;margin-top: 0.05rem;}
  .detail .progress-number{margin-top: 0.4rem;}
  .detail .buy-number{font-size: 0.682rem;float: right;margin-right: 0.96rem;padding-top:0.1rem;}
  .start-number{font-size: 0.512rem;color: #ffaaca;border: 1px solid #ffaaca;padding:0rem 0.15rem;border-radius: 5px;}
  .product-name{font-size:0.704rem; text-align: left;margin:0rem 0.64rem;padding:0.4rem 0rem;border-bottom: 1px solid #eaeaea; }
  .group-price{margin:0rem 0.64rem; }
  .group-price .p-price{float: left;width: 8.533rem;}
  .group-price .money{color: #f5337d;font-size: 1.237rem}
  .group-price .market-price{color: #999;font-size:0.426rem;text-decoration: line-through;}
  .p-info{color: #999;font-size:0.426rem;margin:0rem 0.64rem; }
  .group-price .timerNumber{font-size: 0.512rem;color: #f5337d;text-align: center;float: right;margin-top: 0.5rem;}
  .group-price .time-number{font-size: 0.426rem;}
  
  .layer-groupbuy-rlue .layui-m-layercont{background-color: #fff;padding:0rem;}
  .layer-groupbuy-rlue .rlue-title{font-size: 0.64rem;color: #000;padding: 0.5rem 0rem;}
  .layer-groupbuy-rlue .product-prop-btn{background-color: #f5337d;margin-top: 0.5rem;padding: 0.5rem 0rem;}
  .layer-groupbuy-rlue .rlue-content{text-align: left;padding: 0.5rem;height: 12rem;overflow-y:scroll;}
  .layer-groupbuy-rlue .rlue-content p{margin: 0.2rem 0rem;font-size: 0.3rem;}
  .layer-groupbuy-rlue .product-prop-btn a{color: #fff;}
  
  .fast-goods-price{float: left;}
  .fast-goods-price .good-price{float: left; font-size: 1.5rem;padding-left: 0.512rem;}
  .fast-goods-price .other-price{float: left;padding-top: 0.3rem;color: #ffaaca;}
  .fast-goods .buy-number{font-size: 0.426rem;color: #ffaaca;text-align: center;padding-top: 0.6rem}
  .fast-goods .buy-number i{margin: 0rem 0.1rem;}
  .fast-label{background-color: #f5337d;color: #fff;margin: 0rem 0.2rem;font-size: 0.426rem;padding:0.1rem 0.2rem;border-radius: 3px;}

  .general-goods{height: 2.133rem;}
  .general-goods .general-price{padding: 0rem 0.65rem;color: #999;font-size: 0.512rem;float: left;}
  .general-goods .general-price span{color: #f5337d;font-size: 1.28rem;}
  .general-goods .more-price{font-size: 0.512rem;color: #fff;background-color: #f5337d;float: right;padding: 0.256rem;border-radius: 3px;margin-top: 0.5rem;margin-right: 0.5rem;}
  

  .general-volume-price{font-size: 0.512rem;display: flex;color: #999;padding: 0rem 0.65rem;}
  .general-volume-price li{flex:1;border-right: 1px solid #ddd;padding-left: 0.64rem;}
  .general-volume-price li:last-child{border-right: 0px solid #ddd;}
  .general-volume-price .volume-price{font-size: 1.024rem;color:#f5337d; }


  .pz-l{height: 0.96rem;line-height: 0.96rem;text-align: center;background: #f6f6f6;margin-top: 0.256rem;color: #999;font-size: 0.426rem;}
  .pz-l li{width: 25%;float: left;}
  .d-li{height: 1.45rem;background: #fff;}
  .express{font-size: 0.597rem;color: #333;float: left;width: 100%;line-height: 1.45rem;}
  .express .fee{margin-right: 2.261rem;margin-left: 0.65rem;float: left;}
  .to-address{display: block;margin-left: 4rem;}
  .d-server{line-height: 1.45rem;border-bottom: 1px solid #ddd;}

  .dp-active{line-height: 1.45rem;border-bottom: 1px solid #ddd;padding-left: 0.65rem;}
  .dp-active label{color: #f5337d;margin-right: 0.8rem;font-size: 0.512rem;}
  .dp-active span{color: #999;font-size: 0.48rem;}

  .m-l{margin-left: 0.65rem;}
  .d-size{margin-top: 0.426rem;background: #fff;padding: 0.256rem 0rem;border-bottom: 1px solid #ddd;}
  .d-size .li-label{width: 3.52rem;float: left;height: 1.664rem;line-height: 1.664rem; border-right: 1px solid #ddd;text-align: center;}
  .d-size .li-value{margin-left:3.52rem; }
  .li-value .lab{width: 2.261rem;text-align: center;color: #999;display: inline-block;}
  .d-pingjia{margin-top: 0.426rem;}
  .d-pingjia p{padding: 0.256rem 0.65rem;}
  .d-pingjia em{color: #f5337d;}
  .into-shop{margin-top:0.426rem;padding: 0.512rem 0.682rem;background: #fff;position: relative; }
  .into-shop .shop-head-img{width: 2.133rem;height: 2.133rem; float: left;}
  .into-shop .shop-s-info{margin-left: 2.5rem;}
  .into-shop .shop-s-name{font-size: 0.768rem;}
  .into-shop .shop-s-number{font-size: 0.64rem;color: #999;}
  .into-shop .into-btn{position: absolute;right: 0.426rem;top: 1rem;height: 1.173rem;line-height: 1.173rem;width:3.242rem;display: inline-block;border: 0px solid #666;border-radius: 3px;text-align: center; font-size: 0.597rem;background: #f5337d;color: #fff;}
  .product-detail{text-align: center;margin-top: 0.426rem;background: #fff;margin-bottom:2.026rem; }
  
  .into-shop .shop-s-pingjia{margin-top: 0.512rem;}
  .into-shop .shop-s-pingjia span{margin-right: 1rem;}
  .into-shop .shop-s-pingjia span i{color: #f5337d;}

  
  .detail-footer{height:2.026rem;position: fixed;bottom: 0px;width: 100%; border-top: 1px solid #ddd;background: #fff;}
  .detail-footer .footer-l{width: 6.2rem;padding: 0.213rem 0px;float: left;}
  .detail-footer .footer-l li{float: left;width: 2rem;text-align: center;border-right: 1px solid #ddd;color: #999;font-size: 0.426rem;}
  
  .detail-footer i.sjq-icon{width: 0.832rem;height: 0.832rem;background-size: 100% 100%;}
  .detail-footer .add-to-cart,.detail-footer .btn-submit{float: right;height:2.026rem;line-height:2.026rem;width: 4.8rem;text-align: center;font-size: 0.64rem; }
  .detail-footer .btn-submit{color: #fff;background: #f5337d;font-size:0.768rem; }
  .group-header{margin: 0 auto;width: 8.1rem;}
  .group-header li{width: 33.3%;height: 1.8rem;}
  .group-header li a{color: #fff;}
  .group-header .active{border-bottom:3px solid #fff }
  .ding-price{background: #f5337d;color: #fff;padding:0.1rem 0.2rem;}

  .groupbuy-rlue-show{border-radius: 50%;background-color: #15a3f9;display: inline-block;width: 0.6rem;height: 0.6rem;text-align: center;color: #fff;}
  .pro-img{overflow: hidden;width: 4.7rem;height: 4.7rem;}

  .layer-size-change .layui-m-layer-footer{width: 100%;bottom: 0px;background: #fff;}
  .layer-size-change .layui-m-layercont{line-height: normal;padding-bottom: 0px;}
  .layer-size-change .product-s-i{position: relative;padding-bottom: 0.3rem;}
  .layer-size-change .product-s-img{width: 2rem;height: 2rem;float: left;}
  .layer-size-change .product-s-ii{margin-left: 2.5rem;text-align: left;font-size: 0.64rem;width: 60%;}
  .layer-size-change .product-s-price{color:#f5337d;font-size: 0.512rem; }
  .layer-size-change .product-prop-tab{border-bottom: 1px solid #ddd;border-top: 1px solid #ddd;}
  .layer-size-change .product-prop-tab li{float: left;width: 2rem;font-size: 0.512rem;height: 1rem;line-height: 1rem;}
  .layer-size-change .product-prop-tab li.active{color:#f5337d;border-bottom: 2px solid #f5337d; }
  .layer-size-change .product-prop{font-size: 0.512rem;text-align: left;min-height: 8rem;}
  .layer-size-change .product-prop li{padding: 0.2rem 0rem;}
  .layer-size-change .product-prop span{display: inline-block;width: 33%;text-align: center;float: left;height: 1rem;line-height: 1rem; }
  .layer-size-change .number{font-size: 0.64rem;}
  .layer-size-change .number i{border:1px solid #ddd;width: 1rem;height: 1rem;line-height: 1rem; display: inline-block;float: right;}
  .layer-size-change .number input{width: 1.2rem;border:1px solid #ddd;height: 1rem;float: right;text-align: center;font-size: 0.512rem;}
  .layer-size-change .product-prop-count{color: #999;font-size: 0.512rem;height: 1rem;}
  .layer-size-change .product-prop-count i{color:#f5337d; }
  .layer-size-change .product-prop-btn{font-size: 0.64rem;border-top: 1px solid #ddd;}
  .layer-size-change .product-prop-btn a{height: 1.5rem;line-height: 1.5rem;display: inline-block;padding:0rem 1.5rem; }
  .layer-size-change .product-prop-btn .add-to-cart{border-left: 1px solid #ddd;border-right: 1px solid #ddd;}
  .layer-size-change .product-prop-btn .btn-buy{background: #f5337d;color: #fff;}
  
  .your-block{margin-top:0.426rem;background: #fff;font-size: 0.426rem;}
  .your-block .li-title{padding:0.3rem 0.64rem;color:#f5337d;border-bottom: 1px solid #ddd;}
  .your-block ul{padding:0.3rem; }
  .your-block ul li{width: 4.7rem;float: left;padding: 0.2rem;}
  .your-block ul li .pro-name{height: 1.2rem;overflow: hidden;}
  .your-block ul li .pro-price{color: #f5337d;}


  .select-tab{padding: 0.2rem 0rem;display: flex;background: #fff;}
  .select-tab li{flex: 1;text-align: center;border-right: 1px solid #ddd;padding: 0.4rem 0rem;}
  .select-tab li:last-child{border-right: 0px;}
  .select-tab .active{color: #f5337d;}
  .content-common-page .select-tab li{border-right: 0px;padding: 0px;}
  .content-common-page .select-tab{border-bottom: 1px solid #ddd;}


  .layer-active.layui-m-layer .layui-m-layer-footer{width: 100%;bottom: 0px;background: #fff;}
  .layer-active.layui-m-layer .layui-m-layercont{line-height: normal;padding: 0px;font-size: 0.64rem;}
  .layer-active .layui-m-layercont .title{height: 1.5rem;line-height: 1.5rem;border-bottom: 1px solid #ddd;}
  .layer-active .layui-m-layercont ul{padding: 0rem 0.512rem;margin-bottom: 2.5em;}
  .layer-active .layui-m-layercont ul li{border-bottom: 1px solid #ddd;height: 1.5rem;line-height: 1.5rem;text-align: left;}
  .layer-active .layui-m-layercont ul li i{margin-top: 0.512rem;}
  .layer-active .layui-m-layercont .confirm-btn{background: #f5337d;text-align: center;color: #fff;height: 1.5rem;line-height: 1.5rem;}
  
  .layer-active .sjq-icon{display: none;}
  .layer-active .sjq-icon.active{display: inline-block;}

  .layer-coupons.layui-m-layer .layui-m-layer-footer{width: 100%;bottom: 0px;background: #fff;}
  .layer-coupons.layui-m-layer .layui-m-layercont{line-height: normal;padding: 0px;font-size: 0.64rem;}
  .layer-coupons .layui-m-layercont .title{height: 1.5rem;line-height: 1.5rem;border-bottom: 1px solid #ddd;}
  /*.layer-coupons .layui-m-layercont ul{padding: 0rem 0.512rem;margin-bottom: 2.5em;}
  .layer-coupons .layui-m-layercont ul li{border-bottom: 1px solid #ddd;height: 1.5rem;line-height: 1.5rem;text-align: left;}
  .layer-coupons .layui-m-layercont ul li i{margin-top: 0.512rem;}*/
  .layer-coupons .layui-m-layercont .confirm-btn{background: #f5337d;text-align: center;color: #fff;height: 1.5rem;line-height: 1.5rem;}
  
  .layer-coupons .sjq-icon{display: none;}
  .layer-coupons .sjq-icon.active{display: inline-block;}

  .redbag-li{margin: 0rem 0.64rem;color: #fff;margin-bottom: 0.426rem;}
  .redbag-li .redbag-m{text-align: left;width: 60%;margin-left: 2rem;padding: 0.512rem 0rem;font-size: 0.426rem;float: left;}
  .redbag-li .redbag-s{color: #999;padding-top:1rem;font-size: 1rem;text-align: center; }
  .redbag-m .price{font-size: 1.2rem;}
  
</style>
