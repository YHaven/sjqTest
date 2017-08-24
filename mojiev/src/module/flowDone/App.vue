<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>支付中心</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
        <!-- <li class="header-right" @click="cancel()">取消</li> -->
      </ul>
      <!-- 头部 -->
      <div class="pay-info">
        <p class="pay-title">恭喜你,订单已生成！</p>
        <p>应付总额：<span class="pay-price">￥{{order_amount}}元</span></p>
      </div>
      <div class="pay-type"><span class="p-label">订单号</span><span class="p-value">{{order_sn}}</span></div>
      <div class="pay-type"><span class="p-label">支付方式</span><span class="p-value">支付宝</span></div>
      
      <a class="pay-btn" type="button">确认支付</a>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import VScroll from 'components/PullToRefreshLayer' //刷新加载
  import config from 'common/js/moji.config'
  import DialogLayer from 'common/js/layer'          //摩街数据方法类

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        order_id:'',
        order_sn:'',
        order_amount:''
      }
    },
    mounted () {                        //页面完成加载
       this.initDataList();          //获取
    },
    methods: {                          //方法\

      initDataList(){
        var that = this;
        // var url = config.indexAjax.orderdetail;
        var url = config.indexAjax.orderpay;
        
        var params = {
          order_id:MojiAjax.indexFuns.getQueryString('order_id')
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            
            that.order_id = res.data.payment.order_logid;
            that.order_sn = res.data.payment.order_sn;
            that.order_amount = res.data.payment.order_amount;
            $('.pay-btn').click(function(e){
              e.preventDefault();
              _AP.pay(res.data.payment.pay_online);
              return false;
            });
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
      VScroll
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.64rem;
    margin-bottom: 3.5rem;
    background: #eaeaea;
    height: 100%;
  }
  .content-block{background: #fff;}
  
  .pay-title{color: #999;font-size: 0.7rem;margin-bottom: 0.2rem;}
  .pay-price{color: #f5337d;}
  .pay-info{text-align: center;margin: 0.64rem 0rem;}
  .pay-type{margin: 0.2rem 0rem;padding: 0.4rem;background-color: #fff;}
  .p-value{float: right;color: #f5337d;}
  .pay-btn{display: block;margin: 0.512rem;background-color: #f5337d;color: #fff;text-align: center;padding: 0.4rem;border-radius: 5px;margin-bottom: 5rem;}
</style>
