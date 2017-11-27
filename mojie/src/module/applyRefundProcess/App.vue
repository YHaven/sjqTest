<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c">
        <i>申请进度</i>
      </li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->

    <div class="refund-info">
      <p><label for="">订单编号:</label><span>{{dataDetail.return_sn}}</span></p>
      <p><label for="">申请时间:</label><span>{{dataDetail.apply_time}}</span></p>
    </div>
    
    <ul class="refund-status">
      <li v-for="(log, lindex) in dataDetail.log">
        <p class="status-name">{{log.return_status}}</p>
        <p class="status-reason">{{log.action_note}}</p>
        <p class="status-time">{{log.log_time}}</p>
      </li>
    </ul>
    
    <!-- <div class="refund-btn" v-if="dataDetail.return_status == 9">
      <a href="tel:">联系平台客服</a>
      <a :href="'applyRefund.html?status_code='+status_code+'&rec_id='+rec_id+'&ret_id='+ret_id+'&maxmoneyprice='+maxmoneyprice+'&maxfeeprice='+maxfeeprice+'&maxnumber='+maxnumber+'&order_id='+order_id" >重新申请</a>
    </div>
    <div class="refund-btn" v-if="dataDetail.return_status == 5 && dataDetail.return_type != 0">
      <a :href="'applyRefundShipping.html?status_code='+status_code+'&rec_id='+rec_id+'&ret_id='+ret_id+'&maxmoneyprice='+maxmoneyprice+'&maxfeeprice='+maxfeeprice+'&maxnumber='+maxnumber+'&order_id='+order_id">填写物流信息</a>
    </div>
    <div class="refund-btn" v-if="dataDetail.return_status == 3">
      <a @click="confirmShipping">确认收货</a>
    </div> -->

  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import ZpTimer from 'common/js/zepto.timer'        //倒计时
  import DialogLayer from 'common/js/layer'          //摩街数据方法类

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        step:1,
        refund_type:1,
        ret_id:'',
        rec_id:'',
        order_id:'',
        status_code:'',
        maxmoneyprice:0.00,
        maxfeeprice:0.00,
        maxnumber:0,
        dataDetail:{}
      }
    },
    mounted () {                        //页面完成加载
      var that = this;
        var status_code = MojiAjax.indexFuns.getQueryString('status_code');
        var ret_id = MojiAjax.indexFuns.getQueryString('ret_id');
        var rec_id = MojiAjax.indexFuns.getQueryString('rec_id');
        var address_id = MojiAjax.indexFuns.getQueryString('address_id');
        var maxmoneyprice = MojiAjax.indexFuns.getQueryString('maxmoneyprice');
        var maxfeeprice = MojiAjax.indexFuns.getQueryString('maxfeeprice');
        var maxnumber = MojiAjax.indexFuns.getQueryString('maxnumber');
        var order_id = MojiAjax.indexFuns.getQueryString('order_id');
        that.status_code = status_code;
        that.ret_id = ret_id;
        that.rec_id = rec_id;
        that.address_id = address_id;
        that.maxmoneyprice = maxmoneyprice;
        that.maxfeeprice = maxfeeprice;
        that.maxnumber = maxnumber;
        that.order_id = order_id;

        that.getOrderDetail()
    },
    methods: {                          //方法
      //获取结算页面信息
      getOrderDetail(){
        var that = this;
        var url = config.indexAjax.orderreturndetail;
        var params = {
          ret_id:that.ret_id
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.dataDetail = res.data;
            // if(res.data.apply_time != ''){
            //   MojiAjax.indexFuns.dateFomat();
            //   var dateTime = new Date(parseInt(res.data.apply_time) * 1000);
            //   that.dataDetail.apply_time_str = dateTime.format('yyyy-MM-dd hh:mm:ss');
            // }


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
      confirmShipping(){
        var that = this;
        var url = config.indexAjax.orderreturnreveived;
        
        var params = {
          ret_id:that.ret_id
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.getOrderDetail()
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
    background: #f8f8f8;
  }
  .content-block{background: #fff;padding: 0.512rem}
  
  .refund-info{padding: 0.64rem;border: 1px solid #ddd;}
  .refund-info p{font-size: 0.512rem;}
  .refund-info span{margin-left: 0.512rem;}
  
  .refund-status{padding:0rem 0.64rem;}
  .refund-status p{font-size: 0.64rem;height: 0.876rem;overflow: hidden;}
  .refund-status li{padding: 0.3rem 0rem;border-bottom: 1px solid #ddd;}
  .refund-status .status-name{color: #333;margin-bottom: 0.2rem;}
  .refund-status .status-reason,.refund-status .status-time{color: #999;font-size: 0.512rem;}


  .refund-btn{position: fixed;bottom: 0px;width: 100%;display: flex;border-top: 1px solid #ddd;}
  .refund-btn a{flex:1;text-align: center;color: #f5337d;display: block;padding: 0.3rem 0rem;border-right: 1px solid #ddd;}
  .refund-btn a:last-child{border-right: 0px solid #ddd;}
</style>
