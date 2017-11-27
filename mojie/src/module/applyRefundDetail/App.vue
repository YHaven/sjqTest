<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c">
        <i>售后详情</i>
      </li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->

    <div class="top-info clearfix">
      <p @click="toApplyRefundProcess"><span>{{dataDetail.ff_return_status}}<i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;margin-left:0.2rem;"></i></span></p>
      <ul>
        <li><i></i>如果您要拒绝退售后申请，请在与买家协商一致</li>
        <li><i></i>如果您未在规定时间内处理，将自动同意买家的请求</li>
      </ul>
      <a href="">联系客服</a>
    </div>


    <div class="content-block " v-if="typeof dataDetail.child_order == 'undefined'">
      
      <ul class="shop-list" >
        <li class="">
          <p class="shop-name">{{dataDetail.shop_name}} <span class="f-r">{{dataDetail.order_sn}}<i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;margin-left:0.2rem;"></i></span></p>
          <ul class="product-list">
            <li v-for="(goods, gindex) in dataDetail.goods_list">
              <div class="goods-info clearfix">
                <div class="goods-img"><img :src="goods.goods_thumb" alt=""><i v-if="dataDetail.group_type == 1">团</i></div>
                <div class="goods-i">
                  <p class="goods-name">{{goods.goods_name}}</p>
                  <p><span class="goods-attr">{{goods.goods_attr}}</span></p>
                </div>
                <div class="goods-o">
                  <p class="goods-price">{{goods.return_number}}</p>
                  <!-- <a :href="'applyRefundProcess.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+goods.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="goods-refund" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && goods.ret_id > 0">查看售后</a>
                  <a :href="'applyRefund.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+goods.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="goods-refund" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && goods.ret_id == 0">申请售后</a> -->
                </div>
              </div>
            </li>
          </ul>
          
          

        </li>
      </ul>
      <div class="price-info">
          <p><label>售后类型:</label><span>{{dataDetail.ff_return_type}}</span></p>
          <p><label>退款原因:</label><span>{{dataDetail.cause_name}}</span></p>
          <p><label>退款金额:</label><span>商品金额￥{{dataDetail.should_return}}+运费￥{{dataDetail.return_shipping_fee}}</span></p>
          <p><label>申请时间:</label><span>{{dataDetail.apply_time}}</span></p>
          <p><label>退款编号:</label><span>{{dataDetail.return_sn}}</span></p>
          <p><label>退货说明:</label><span>{{dataDetail.return_brief}}</span></p>
        </div>

    </div>
    
    <div class="refund-btn" v-if="dataDetail.return_status == 9">
      <a href="tel:">联系平台客服</a>
      <a :href="'applyRefund.html?status_code='+status_code+'&rec_id='+rec_id+'&ret_id='+ret_id+'&maxmoneyprice='+maxmoneyprice+'&maxfeeprice='+maxfeeprice+'&maxnumber='+maxnumber+'&order_id='+order_id" >重新申请</a>
    </div>
    <div class="refund-btn" v-if="dataDetail.return_status == 5 && dataDetail.return_type != 0">
      <a :href="'applyRefundShipping.html?status_code='+status_code+'&rec_id='+rec_id+'&ret_id='+ret_id+'&maxmoneyprice='+maxmoneyprice+'&maxfeeprice='+maxfeeprice+'&maxnumber='+maxnumber+'&order_id='+order_id">填写物流信息</a>
    </div>
    <div class="refund-btn" v-if="dataDetail.return_status == 3">
      <a @click="confirmShipping">确认收货</a>
    </div>

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
      toApplyRefundProcess(){
        window.location.href = 'applyRefundProcess.html'+window.location.search;
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

  .top-info{background: #fff;}
  .top-info p{border-bottom: 1px solid #ddd;padding: 0.512rem;}
  .top-info ul{padding: 0rem 0.512rem;font-size: 0.512rem;}
  .top-info ul{float: left;}
  .top-info ul i{display: inline-block;width: 0.512rem;height: 0.512rem;border-radius: 50%;background-color: #ddd;}
  .top-info a{border: 1px solid #333;display: inline-block;padding:0.124rem 0.512rem;border-radius: 3px;float: right;margin: 0.512rem;font-size: 0.512rem;}

  .product-list li{padding-bottom: 0.5rem;border-bottom: 1px solid #ddd;}
  .shop-name{border-bottom: 1px solid #ddd;height: 1.2rem;}
  .goods-info{padding-top: 0.3rem;}
  .goods-img{width: 3.413rem;height: 3.413rem;float: left;background: #eaeaea;position: relative;overflow: hidden;}
  .goods-img i{position: absolute;display: block;background-color: #f5337d;color: #fff;padding:0rem 0.1rem; top: 0rem;}
  .goods-i{font-size: 0.512rem;margin-left: 0.2rem;float: left;width: 6rem;}
  .goods-o{margin-left: 10rem;}
  .goods-name{height: 2rem; font-size: 0.64rem;overflow: hidden;text-overflow: ellipsis;word-wrap:break-word;word-break:break-all;}
  .goods-attr{color: #999;}
  .goods-o{text-align: right;font-size: 0.512rem;}
  .goods-price{color: #333;margin-top: 0.512rem;}
  .goods-refund{color: #333;border-radius: 3px;border: 1px solid #333;padding:0.1rem 0.2rem;margin-top: 0.5rem;display: block;float: right;}
  .goods-number{margin-left: 2rem;}


  .price-info p{padding: 0.1rem 0rem;border-bottom: 1px solid #ddd;}
  .price-info p label{color: #999;float: left;}
  .price-info p span{color: #333;margin-left: 1rem;font-size: 0.6rem;}
</style>
