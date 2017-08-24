<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <!-- <v-scroll :on-refresh="refresh" :on-infinite="loadMore"> -->
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>退换货</h2>
        </div>
        
        <div class="storeList_order" v-for="item in sellerList">
            <div class="sListbox" :ret_id="item.ret_id">
                <p class="storeinfo">
                    <label>{{item.shop_name}}</label>
                    <a :href="'userOrderDetail.html?order_id='+ item.order_id"> ></a>
                </p>
                <div class="orderlistNum">
                      <div class="information">
                        <a :href="'userOrderDetail.html?order_id='+ item.order_id">
                            <div class="boxProd">
                                <img :src="item.goods_thumb" alt="">
                                <p class="box1">
                                    <label>{{item.goods_name}}</label>
                                </p>
                                <p class="box2">
                                    <span>{{item.ff_return_status}}</span>
                                </p>
                            </div>
                        </a>
                    </div>                  
                </div>
                <div class="btn_a">
                    <a :href="'applyRefundProcess.html?status_code=' + item.status_code + '&rec_id=' + item.rec_id + '&ret_id=' + item.ret_id +'&order_id=' + item.order_id + '&maxmoneyprice=1&maxfeeprice=5&maxnumber=1'" class="falseOrderlist">查看详情</a>
                </div>
            </div>
        </div>

        <!-- </v-scroll> -->
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
        sellerList:[],
        pageTitle:'新批发',
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
            console.info(result)
           if(result.paginated.more === 1){
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
        });
    },
    methods: {                          //方法
        initSellerList(cb){
            var _this = this;
            var params = {
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            }
                        };
            var paramsStr = JSON.stringify(params);
            var url = config.indexAjax.prodReturn;
            MojiAjax.indexFuns.postJsonAjax(url,params,cb)
            // MojiAjax.indexFuns.prodReturn(cb)
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
        color: #333;
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
    }
    .box1 span{
            display: block;
    padding-top: 1rem;
    color: #999;
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
