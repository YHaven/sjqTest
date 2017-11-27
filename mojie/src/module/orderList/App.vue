<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>我的订单</h2>
        </div>
        
        <div class="swiper-container-market" style
        ="overflow:hidden;">
            <ul class="wh-nav clearfix swiper-wrapper">
                <li class="active swiper-slide" type_name=""><a href="orderList.html">全部</a></li>
                <li type_name="await_pay" class="swiper-slide"><a href="orderList.html?id=await_pay">待付款</a></li>
                <li type_name="await_groupbuy" class="swiper-slide"><a href="orderList.html?id=await_groupbuy">待成团</a></li>
                <li type_name="await_ship" class="swiper-slide"><a href="orderList.html?id=await_ship">待发货</a></li>
                <li type_name="shipped" class="swiper-slide"><a href="orderList.html?id=shipped">待收货</a></li>
                <li type_name="allow_comment" class="swiper-slide"><a href="orderList.html?id=allow_comment">待评价</a></li>
            </ul>
        </div>    

        
        <div class="storeList_order" v-for="item in sellerList">
            <div class="sListbox" v-if="item.child_orders != ''">
                <p class="storeinfo" :orderid="item.order_id">
                    <label>{{item.order_sn}}</label>
                    <a :href="'userOrderDetail.html?order_id='+ item.order_id">{{item.label_order_status}} ></a>
                </p>
                <div class="orderlistNum" v-for="order in item.child_orders">
                    <p class="storeinfo"><label for="">{{order.label_order_status}}</label><span>{{order.order_sn}}></span></p>
                      <div class="information" v-for="goods in order.goods_list">
                        <a :href="'userOrderDetail.html?order_id='+ item.order_id">
                            <div class="boxProd">
                                <img :src="goods.url" alt="">
                                <p class="box1">
                                    <label>{{goods.name}}</label>
                                    <span>{{goods.goods_attr}}</span>
                                </p>
                                <p class="box2">
                                    <label>{{goods.goods_price}}</label>
                                    <span>{{goods.goods_number}}</span>
                                </p>
                            </div>
                        </a>
                    </div>                  
                </div>
                <div class="prodprice">
                    共{{item.goods_number}}件商品，合计(含运费{{item.formated_shipping_fee}})  <span>{{item.total_fee}}</span>
                </div>
                <div class="btn_a">
                    <a :href="'http://wap.guoguo-app.com/wuliuDetail.htm?mailNo='+ item.order_sn" class="falseOrderlist" v-if="item.order_status_code ==='shipped'">查看物流</a>
                    <span class="falseOrderlist olistFalse" v-if="item.order_status_code ==='await_pay'" @click="olistFalse(item.order_id)">取消订单</span>
                    <a class="rightMonery rigMonery" v-if="item.order_status_code ==='await_pay'" :href="'flowDone.html?order_id='+item.order_id">立即付款</a>
                    <span class="rightMonery trueProd" v-if="item.order_status_code ==='shipped'"@click="trueProd(item.order_id)">确认收货</span>
                </div>
            </div>
            <div class="sListbox indd" v-if="item.child_orders == ''" >
                <p class="storeinfo" :orderid="item.order_id">
                    <label>{{item.order_sn}}</label>
                    <a :href="'userOrderDetail.html?order_id='+ item.order_id">{{item.label_order_status}} ></a>
                </p>
                <div class="information" v-for="order in item.goods_list">
                    <a :href="'userOrderDetail.html?order_id='+ item.order_id">
                        <div class="boxProd">
                            <img :src="order.img.url" alt="">
                            <p class="box1">
                                <label>{{order.name}}</label>
                                <span>{{order.goods_attr}}</span>
                            </p>
                            <p class="box2">
                                <label>{{order.goods_price}}</label>
                                <span>{{order.goods_number}}</span>
                            </p>
                        </div>
                    </a>
                </div>
                <div class="prodprice" v-if="item.order_status_code !== 'await_groupbuy'">
                    共{{item.goods_number}}件商品，合计(含运费{{item.formated_shipping_fee}})  <span> {{item.total_fee}}</span>
                </div>
                <div class="prodprice" v-if="item.order_status_code === 'await_groupbuy'">
                    共{{item.goods_number}}件商品，(已付定金){{item.total_fee}}</span>
                </div>
                <div class="btn_a">
                    <a :href="'http://wap.guoguo-app.com/wuliuDetail.htm?mailNo='+ item.order_sn" class="falseOrderlist" v-if="item.order_status_code ==='shipped'">查看物流</a>
                    <span class="falseOrderlist olistFalse" v-if="item.order_status_code ==='await_pay'" @click="olistFalse(item.order_id)">取消订单</span>
                    <a class="rightMonery rigMonery" v-if="item.order_status_code ==='await_pay'" :href="'flowDone.html?order_id='+item.order_id">立即付款</a>
                    <span class="rightMonery trueProd" v-if="item.order_status_code ==='shipped'"@click="trueProd(item.order_id)">确认收货</span>
                </div>
            </div>    
        </div>

        </v-scroll>
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
    import Swiper from 'common/js/swiper-3.4.2.jquery.min' //滑动
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        orderType:'',
        sellerList:[],
        pageTitle:'新批发',
        city:'hz',
        more:1,
        page:1,
        count:10,
        orderid:''
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
         _this.orderType = MojiAjax.indexFuns.getQueryString("id");
         if(_this.orderType !== '' && _this.orderType !== null){
            $('.wh-nav li').removeClass('active');
            $('.wh-nav li[type_name="'+ _this.orderType  +'"]').addClass('active');
         }
        // _this.initBanner();
        _this.initSellerList(function(result){
            if(result.status.error_code ===100){
              layer.open({
                  content: result.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });
            }
            _this.sellerList = result.data;
           if(result.paginated.more === 1){
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
            var t=setTimeout(_this.initEvent,1000);
        });
        new Swiper('.swiper-container-market', {
            slidesPerView: 5
        });

    },
    methods: {                          //方法
        initEvent(){
            console.info(123)
            var _this = this;
            $('.wh-nav li').click(function(){
                var _thisDom = $(this);
                _this.orderType = _thisDom.attr("type_name");
                $('.wh-nav li').removeClass('active');
                _thisDom.addClass('active');
                _this.page = 1;
                _this.more = 1;
                _this.initSellerList(function(result){
                    _this.sellerList = result.data;
                    if(result.paginated.more === 1){
                        
                        _this.page += 1;
                    }else{
                        _this.more = 0;
                        $('.load-more span').text('没有更多数据了')
                    }
                });
            });
            // $(".olistFalse").click(function(){
            //     _this.orderid = $(this).parents(".sListbox").find(".storeinfo").attr("orderid");
            //     var fasList =layer.open({
            //         content: '确定取消此订单',
            //         btn: ['确定', '取消'],
            //         shadeClose: false,
            //         yes: function () {
            //             _this.orderlistReturn(function(){
            //                 _this.initSellerList(function(result){
            //                         _this.sellerList = result.data;
            //                         if(result.paginated.more === 1){
            //                             _this.page += 1;
            //                         }else{
            //                             _this.more = 0;
            //                             $('.load-more span').text('没有更多数据了')
            //                         }
            //                 })
            //             });
            //             layer.close(fasList)
            //         },
            //         no: function () {
            //         }
            //     });
                
               
            // });
            // $(".trueProd").click(function(){
            //     _this.orderid = $(this).parents(".sListbox").find(".storeinfo").attr("orderid");
            //     var truList = layer.open({
            //         content: '确定收货',
            //         btn: ['确定', '取消'],
            //         shadeClose: false,
            //         yes: function () {
            //             _this.orderaffirmreceived(function(){
            //                 _this.initSellerList(function(result){
            //                         _this.sellerList = result.data;
            //                         if(result.paginated.more === 1){
            //                             _this.page += 1;
            //                         }else{
            //                             _this.more = 0;
            //                             $('.load-more span').text('没有更多数据了')
            //                         }
            //                 })
            //             });
            //             layer.close(truList)
            //         },
            //         no: function () {
            //         }
            //     });
                
               
            // });
        },
        // initBanner(){
        //     var _this = this;
        //     _this.banner=[{
        //         imgUrl:_this.proPath+'/static/images/pifa_banner.jpg',
        //         url:''
        //     }]
        // },
        olistFalse(id){
                var _this = this;
                _this.orderid = id;
                var fasList =layer.open({
                    content: '确定取消此订单',
                    btn: ['确定', '取消'],
                    shadeClose: false,
                    yes: function () {
                        _this.orderlistReturn(function(){
                            _this.initSellerList(function(result){
                                    _this.sellerList = result.data;
                                    if(result.paginated.more === 1){
                                        _this.page += 1;
                                    }else{
                                        _this.more = 0;
                                        $('.load-more span').text('没有更多数据了')
                                    }
                            })
                        });
                        layer.close(fasList)
                    },
                    no: function () {
                    }
                });
        },
        trueProd(id){
                var _this = this;
                _this.orderid = id;
                var truList = layer.open({
                    content: '确定收货',
                    btn: ['确定', '取消'],
                    shadeClose: false,
                    yes: function () {
                        _this.orderaffirmreceived(function(){
                            _this.initSellerList(function(result){
                                    _this.sellerList = result.data;
                                    if(result.paginated.more === 1){
                                        _this.page += 1;
                                    }else{
                                        _this.more = 0;
                                        $('.load-more span').text('没有更多数据了')
                                    }
                            })
                        });
                        layer.close(truList)
                    },
                    no: function () {
                    }
                });
        },
        initSellerList(cb){
            var _this = this;
           
            var params = {
                            type:_this.orderType,
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            },
                            version:"220"
                        };
            var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.orderlist;
            console.log(config.indexAjax.orderlist);
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
            // MojiAjax.indexFuns.orderList(cb)
        },
        orderlistReturn(cb){
            var _this = this;
            var type_name = $('.wh-nav li.active').attr('type_name');
            var params = {
                            type:type_name,
                            order_id:_this.orderid,
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            },
                            version:"220"
                        };
            var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.ordercancel;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
            // MojiAjax.indexFuns.orderList(cb)
        },
        orderaffirmreceived(cb){
            var _this = this;
            var type_name = $('.wh-nav li.active').attr('type_name');
            var params = {
                            type:type_name,
                            order_id:_this.orderid,
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            },
                             version:"260"               
                        };
            var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.orderaffirmreceived;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
            // MojiAjax.indexFuns.orderList(cb)
        },
        refresh (done) {
            console.log('refresh')
            var _this = this;
            _this.page = 1;
            _this.more = 1;
            _this.initSellerList(function(result){
                _this.sellerList = result.data;
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
                for (var i = 0; i < result.data.length; i++) {
                    _this.sellerList.push(result.data[i]);
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
    .wh-nav li {
        flex: none;
    }
    .storeList_order .sListbox{
        padding: 0 0.5rem;
    background: #fff;
    margin: 0.5rem 0;
    }
    .storeList_order .sListbox .storeinfo{
        border-bottom: 1px solid #eaeaea;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.7rem;
    position: relative;
    }
    .storeList_order .sListbox .storeinfo a{
        position: absolute;
    right: 0;
    color: #999;
    }
    .storeinfo span{
        position: absolute;
        right: 0;
    }
    .information{
        padding: 0.5rem 0;
    border-bottom: 1px solid #eaeaea;
    }
    .information .boxProd{
        position: relative;
    }
    .information .boxProd img{
        width: 3.5rem;
    height: 3.5rem;
    }
    .box1{
        position: absolute;
    top: 0.2rem;
    left: 3.7rem;
    font-size: 0.6rem;
    width:70%;
    }
    .box1 label{
    display:block;
    width: 70%;
    height: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap:break-word;
    word-break:break-all;
    }
    .box1 span{
            display: inline-block;
    color: #999;
    padding-right:0.3rem;
    }
    .box2{
            position: absolute;
    top: 0.7rem;
    right: 0;
    font-size: 0.6rem;
    }
    .box2 span{
        display: block;
    padding-top: 0.5rem;
    color: #999;
    }
    .prodprice{
        height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.5rem;
    text-align: right;
    border-bottom: 1px solid #eaeaea;
    }
    .prodprice span{
        color: #f82d7c;
    font-size: 0.7rem;
        font-weight: bold;
    }
    .btn_a{
        padding: 0.5rem 0;
    text-align: right;
    }
    .falseOrderlist{
        display: inline-block;
    padding: 0.3rem 0.9rem;
    font-size: 0.7rem;
    border: 1px solid #333;
    border-radius: 11px;
    }
    .rightMonery{
            display: inline-block;
    padding: 0.3rem 0.9rem;
    font-size: 0.7rem;
    border: 1px solid #f82d7c;
    border-radius: 11px;
    margin-left: 0.6rem;
    background: #f82d7c;
    color: #fff;
    }
</style>
