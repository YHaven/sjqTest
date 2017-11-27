<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>我的优惠券</h2>
        </div>
        <ul id="stime">
        <li class="activeTime" cat_name="allow_use">
         可使用
        </li>
        <li cat_name="is_used">
          已使用
        </li>
        <li cat_name="expired">
         已过期
        </li>
      </ul>
      <div class="redboxlist">
        <ul class="myRedbox">
           <li v-for="item in sellerList" :class="colorstatus? 'useyes':'useno'">
            <div class="bLf">
              <p class="price"><span>{{item.formatted_coupon_amount}}</span></p>
              <p class="messagePrice">{{item.bonus_name}}<label> 全场通用</label></p>
              <p class="data"><span>{{item.formatted_start_date}}</span>/<span>{{item.formatted_end_date}}</span></p>
            </div>
            <div class="brt">
              <span class="quan_mj">满减券</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import Layer from 'common/js/layer'          //layer
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import NewPifaBanner from 'components/NewPifaBanner'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import config from 'common/js/moji.config'
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        sellerList:[],
        city:'hz',
        more:1,
        page:1,
        count:10,
        url:config.indexAjax.usercoupon,
        colorstatus:true
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
        
        _this.initSellerList(function(result){
            _this.sellerList = result.data;

           if(result.paginated.more === 1){
                _this.page += 1;
            }else{
                _this.more = 0;
                $('.load-more span').text('没有更多数据了')
            }
            if(result.status.error_code ===100){
              layer.open({
                  content: result.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });
            }
        });
        _this.initEvent();
    },
    methods: {                          //方法
        initEvent(){
            var _this = this;
            $('#stime li').click(function(){
                var _thisDom = $(this);
                $('#stime li').removeClass('activeTime');
                _thisDom.addClass('activeTime');
                if($(".activeTime").attr("cat_name") == "allow_use"){
               _this.colorstatus = true
               }else{
                _this.colorstatus = false
               }
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
            })
        },
        initSellerList(cb){
            var _this = this;
            var cat_name = $('#stime li.activeTime').attr('cat_name');
            var params= {
                            coupon_type:cat_name,
                            pagination:{
                                page: _this.page,
                                count: _this.count
                            }
                        };
            // var paramsStr = JSON.stringify(params);
            // MojiAjax.indexFuns.getSellerList({json:paramsStr},cb)
            MojiAjax.indexFuns.postJsonAjax(_this.url,params,cb);
            if($(".activeTime").attr("cat_name") != "allow_use"){
                  $(".myRedbox li").removeClass("useyes").addClass("useno");
                }else{
                  $(".myRedbox li").removeClass("useno").addClass("useyes");
                }
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
     #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.64rem;
    margin-bottom: 3.5rem;
    background: #f8f8f8;
  }
  .content-block{background: #fff;}
  #stime{
      width: 80%;
  margin: 0 auto;
  display: flex;
  border: 1px solid #f82d7c;
  margin-top: 0.3rem;
  }
  #stime li{
    width:33.33%;
    display:inline-block;
    text-align:center;
    border-left:1px solid #f82d7c;
    color:#f82d7c;
  }
   #stime li.activeTime{
    background:#f82d7c;
    color:#fff;
   }
   .redboxlist{
      width: 75%;
  margin: 0 auto;
   }
   .myRedbox{
   margin: 0.3rem auto;
  padding: 5px;
   }
   .myRedbox li{
     width: 100%;
  display: inline-block;
  height: 4rem;
   }
   .myRedbox .bLf{
width: 70%;
  float: left;
  height: 4rem;
  color: #fff;
   }
    .myRedbox .bLf .data{
    font-size: 0.5rem;
  padding-left: 0.7rem;
    }
   .myRedbox .bLf .price{
padding: 0.7rem 0 0 0.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
   }
   .myRedbox .bLf .price label{
  font-size: 0.7rem;
   }
    .myRedbox .bLf .price span{
font-size: 1.5rem;
   }
   .messagePrice{
    font-size: 0.5rem;
  padding-left: 0.7rem;
   }
  
   .myRedbox .brt{
display: inline-block;
  width: 30%;
  float: left;
  height: 4rem;
   }
   .myRedbox .brt .quan_mj{
     display: inline-block;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 0.7rem;
   }
   .myRedbox .brt .time{
   font-size:0.4rem;
   font-family: "微软雅黑";
   }
   .myRedbox .brt label{
font-size: 0.6rem;
  display: block;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
   }
   .myRedbox .brt span{
     color: #333;
  display: block;
  font-size: 0.4rem;
  text-align: center;
   }
   .redKl{
     position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
   }
    .redKl p{
     width: 100%;
  padding: 0.3rem 0.5rem;
   }
   .redKl input{
   height: 1rem;
  width: 10rem;
  padding: 0.1rem 0.5rem;
  font-size: 0.5rem;
  margin-right: 0.5rem;
   }
   .redKl span{
     width: 3rem;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  background-color: #f82d7c;
  display: inline-block;
  color: #fff;
   }
</style>
