<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c"><i>订单详情</i></li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->
    
    <!-- 订单状态 -->
    <div class="order-status">
      订单状态：{{dataDetail.label_order_status}}
      <div class="timer timerNumber" :data-time="dataDetail.out_time" v-if="dataDetail.out_time!=0">
          剩余<i class="days">00</i>天<i class="hours">00</i>时<i class="minutes">00</i>分<i class="seconds">00</i>秒自动关闭
      </div>
    </div>

    <!-- 地址 -->
    <div class="content-block order-address clearfix" style="margin-top:0rem;" @click="selectAddress" v-if="dataDetail.is_cac==0">
      <div class="address-info f-l">
        <p class="clearfix"><span class="f-l">{{dataDetail.consignee}}</span><span class="f-r">{{dataDetail.mobile}}</span></p>
        <p class="address-ot">{{dataDetail.cac_address}}{{dataDetail.city}}{{dataDetail.district}}{{dataDetail.address}}</p>
      </div>
      <div class="address-right clearfix"><i class="sjq-icon right-arrow-icon" style="margin-top:0.64rem;"></i></div>
    </div>
    <div class="content-block order-address clearfix" style="margin-top:0rem;" @click="selectAddress" v-if="dataDetail.is_cac==1">
      <div class="address-info f-l">
        <p class="clearfix"><span class="f-l">{{dataDetail.cac_user_name}}(自提联系人)</span><span class="f-r">{{dataDetail.cac_mobile}}</span></p>
        <p class="address-ot">{{dataDetail.cac_address}}</p>
      </div>
      <div class="address-right clearfix"><i class="sjq-icon right-arrow-icon" style="margin-top:0.64rem;"></i></div>
    </div>
    
    <!-- 店铺商品 -->
    <div class="content-block " v-if="typeof dataDetail.child_order == 'undefined'">
      
      <ul class="shop-list" >
        <li class="">
          <p class="shop-name">{{dataDetail.shop_name}} <span class="f-r">{{dataDetail.order_sn}}<i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;margin-left:0.2rem;"></i></span></p>
          <ul class="product-list">
            <li v-for="(goods, gindex) in dataDetail.goods_list">
              <div class="goods-info clearfix">
                <div class="goods-img"><img :src="goods.img.small" alt=""><i v-if="dataDetail.group_type == 1">团</i></div>
                <div class="goods-i">
                  <p class="goods-name">{{goods.name}}</p>
                  <p><span class="goods-attr">{{goods.goods_attr}}</span></p>
                </div>
                <div class="goods-o">
                  <p class="goods-price">￥{{goods.goods_price}}</p>
                  <a :href="'applyRefundProcess.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+dataDetail.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="goods-refund" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && dataDetail.ret_id != 0 && dataDetail.can_return == 0">查看售后</a>
                  <a :href="'applyRefund.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+dataDetail.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="goods-refund" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && dataDetail.ret_id == 0&& dataDetail.can_return == 1">申请售后</a>
                </div>
              </div>
            </li>
          </ul>
          
          

        </li>
      </ul>

      <div class="price-info" v-if="dataDetail.is_cac==1">
        <p>自提点：</p>
        <p>{{dataDetail.cac_user_name}}  {{dataDetail.cac_mobile}}</p>
      </div>

      <div class="price-info" v-if="dataDetail.group_type == 0">
          <p><label>商品金额</label><span>￥{{dataDetail.goods_amount}}</span></p>
          <p><label>运费金额</label><span>￥{{dataDetail.shipping_fee}}</span></p>
          <p><label>优惠金额</label><span>-￥{{dataDetail.discountall}}</span></p>    <!-- 满减+改价 -->
          <p class="all"><label>合计</label><span>￥{{(Number(dataDetail.goods_amount) + Number(dataDetail.shipping_fee) - Number(dataDetail.discountall)).toFixed(2)}}</span></p>
        </div>

        <div class="price-info" v-if="dataDetail.group_type == 1 && dataDetail.amount_paid == 0">
          <p><label>定金</label><span>{{dingjin == 0?'待确认':'￥'+dingjin.toFixed(2)}}</span></p>
          <p><label>最终单价</label><span>{{danjia == 0?'待确认':'￥'+danjia.toFixed(2)}}</span></p>
          <p><label>应付尾款</label><span>{{weikuan == 0?'待确认':'￥'+weikuan.toFixed(2)}}</span></p>    
          <p class="all"><label>定金合计</label><span>￥{{dingjinall.toFixed(2)}}</span></p>
        </div>
        <div class="price-info" v-if="dataDetail.group_type == 1 && dataDetail.amount_paid > 0">
          <p><label>定金总额</label><span>{{'￥'+dataDetail.amount_paid.toFixed(2)}}</span></p>
          <p><label>运费金额</label><span>￥{{dataDetail.shipping_fee}}</span></p>
          <p><label>最终单价</label><span>{{danjia == 0?'待确认':'￥'+danjia.toFixed(2)}}</span></p>
          <p><label>应付尾款</label><span>{{weikuan == 0?'待确认':'￥'+weikuan.toFixed(2)}}</span></p>    
          <p class="all"><label>尾款合计</label><span>￥{{dingjinall.toFixed(2)}}</span></p>
        </div>
    </div>
    

    
    <!-- 合并订单 -->
    <div v-if="typeof dataDetail.child_order != 'undefined'">
      <ul class="shop-list">
        <li class="content-block " v-for="(childorder, coindex) in dataDetail.child_order">
          <p class="shop-name">{{childorder.shop_name}} <span class="f-r">{{childorder.order_sn}}<i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;margin-left:0.2rem;"></i></span></p>
          <ul class="product-list">
            <li v-for="(goods, gindex) in childorder.goods_list">
              <div class="goods-info clearfix">
                <div class="goods-img"><img :src="goods.img.small" alt=""><i v-if="dataDetail.group_type == 1">团</i></div>
                <div class="goods-i">
                  <p class="goods-name">{{goods.name}}</p>
                  <p><span class="goods-attr">{{goods.goods_attr}}</span></p>
                </div>
                <div class="goods-o">
                  <p class="goods-price">￥{{goods.goods_price}}</p>
                </div>
              </div>
            </li>
          </ul>
          
        </li>
      </ul>

      <div class="price-info" v-if="dataDetail.is_cac==1">
        <p>自提点：xxx</p>
        <p>{{dataDetail.cac_user_name}}  {{dataDetail.cac_mobile}}</p>
      </div>

      <div class="price-info" v-if="dataDetail.group_type == 0">
        <p><label>商品金额</label><span>￥{{dataDetail.goods_amount}}</span></p>
        <p><label>运费金额</label><span>￥{{dataDetail.shipping_fee}}</span></p>
        <p><label>优惠金额</label><span>-￥{{dataDetail.discountall}}</span></p>    <!-- 满减+改价 -->
        <p class="all"><label>合计</label><span>￥{{(Number(dataDetail.goods_amount) + Number(dataDetail.shipping_fee) - Number(dataDetail.discountall)).toFixed(2)}}</span></p>
      </div>

      <div class="price-info" v-if="dataDetail.group_type == 1 && dataDetail.amount_paid == 0">
        <p><label>定金</label><span>{{dingjin == 0?'待确认':'￥'+dingjin.toFixed(2)}}</span></p>
        <p><label>最终单价</label><span>{{danjia == 0?'待确认':'￥'+danjia.toFixed(2)}}</span></p>
        <p><label>应付尾款</label><span>{{weikuan == 0?'待确认':'￥'+weikuan.toFixed(2)}}</span></p>    
        <p class="all"><label>定金合计</label><span>￥{{dingjinall.toFixed(2)}}</span></p>
      </div>
      <div class="price-info" v-if="dataDetail.group_type == 1 && dataDetail.amount_paid > 0">
        <p><label>定金总额</label><span>{{'￥'+dataDetail.amount_paid.toFixed(2)}}</span></p>
        <p><label>运费金额</label><span>￥{{dataDetail.shipping_fee}}</span></p>
        <p><label>最终单价</label><span>{{danjia == 0?'待确认':'￥'+danjia.toFixed(2)}}</span></p>
        <p><label>应付尾款</label><span>{{weikuan == 0?'待确认':'￥'+weikuan.toFixed(2)}}</span></p>    
        <p class="all"><label>尾款合计</label><span>￥{{dingjinall.toFixed(2)}}</span></p>
      </div>
    </div>
    
    
    <div class="order-total content-block">
      <p><label>订单编号</label><span>{{dataDetail.order_sn}}</span></p>
      <p><label>交易方式</label><span>{{dataDetail.pay_name}}</span></p>
      <p><label>下单时间</label><span>{{dataDetail.add_time}}</span></p>
      <p><label>付款时间</label><span>{{dataDetail.pay_time}}</span></p>
      
    </div>

    <div class="order-all-o" >
      <p class="all-price" v-if="dataDetail.status_code !='await_pay'">
        <label>实付款(含运费￥{{dataDetail.shipping_fee}})</label>
        <span>￥{{dataDetail.total_fee.toFixed(2)}}</span>
      </p>
      <p class="all-price" v-if="dataDetail.status_code =='await_pay'">
        <label v-if="dataDetail.group_type == 0">应付款(含运费￥{{dataDetail.shipping_fee}})</label>
        <label v-if="dataDetail.group_type == 1 && dataDetail.amount_paid == 0">应付款</label>
        <label v-if="dataDetail.group_type == 1 && dataDetail.amount_paid > 0">待支付尾款(含运费￥{{dataDetail.shipping_fee}})</label>
        <span>￥{{dataDetail.total_fee.toFixed(2)}}</span>
      </p>
      <p class="opration" v-if="dataDetail.status_code != 'canceled' && dataDetail.status_code != 'await_ship' && dataDetail.status_code != 'finished'">

        <a @click="orderCancel" class="search-shipping" v-if="dataDetail.status_code == 'await_pay' && dataDetail.group_type == 0">取消订单</a>
        <a @click="orderCancel" class="search-shipping" v-if="dataDetail.status_code == 'await_pay' && dataDetail.group_type == 1 && dataDetail.amount_paid == 0">取消订单</a>
        <!-- <a :href="'/mobile/index.php?r=user/order/detail&order_id='+order_id" class="confirm-get" v-if="dataDetail.status_code == 'await_pay'">立即付款</a> -->
        <a :href="'flowDone.html?order_id='+order_id" class="confirm-get" v-if="dataDetail.status_code == 'await_pay'">立即付款</a>
        
        <!-- <a href="" class="confirm-get" v-if="dataDetail.status_code == 'await_ship'">申请退款</a> -->
        <a :href="'http://wap.guoguo-app.com/wuliuDetail.htm?mailNo='+ dataDetail.order_sn" class="search-shipping" v-if="dataDetail.status_code == 'shipped'">查看物流</a>
        <a  class="confirm-get" v-if="dataDetail.status_code == 'shipped'" @click="orderAffirmReceived">确认收货</a>

        <a class="search-shipping" v-if="dataDetail.status_code == 'canceled'">已取消</a>
        <!-- <a href="" class="search-shipping" v-if="dataDetail.status_code == 'await_'">查看物流</a> -->
        <!-- <a :href="'applyRefundDetail.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+goods.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="search-shipping" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && goods.ret_id > 0">查看售后</a>
        <a :href="'applyRefund.html?status_code='+dataDetail.status_code+'&rec_id='+goods.rec_id+'&ret_id='+goods.ret_id+'&maxmoneyprice='+goods.ceiling+'&maxfeeprice='+goods.shipping_fee+'&maxnumber='+goods.goods_number+'&order_id='+order_id" class="search-shipping" v-if="dataDetail.status_code != 'await_pay' && dataDetail.status_code != 'canceled' && goods.ret_id == 0">申请售后</a> -->
      </p>
      <p class="opration" v-if="dataDetail.status_code == 'finished'">
        <a :href="'http://wap.guoguo-app.com/wuliuDetail.htm?mailNo='+ dataDetail.order_sn" class="search-shipping">查看物流</a>
      </p>

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
        order_id:'',
        dataDetail:{},
        dingjin:0.00,
        danjia:0.00,
        weikuan:0.00,
        dingjinall:0.00
      }
    },
    mounted () {                        //页面完成加载
      this.order_id = MojiAjax.indexFuns.getQueryString('order_id');
      this.getOrderDetail()
    },
    methods: {                          //方法
      //获取结算页面信息
      getOrderDetail(){
        var that = this;
        var url = config.indexAjax.orderdetail;
        if(that.order_id == '' || that.order_id == null){
          DialogLayer.open({
            content: '订单ID不存在'
            ,skin: 'msg'
            ,time:3
          });
          return false;
        }
        var params = {
          order_id:that.order_id,
          version:220
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.dataDetail = res.data;
            if(res.data.group_type === 1){
              if(res.data.amount_paid>0){
                that.danjia = Number(res.data.goods_list[0].goods_price);
                that.weikuan = Number(res.data.order_amount);
              }else{
                that.danjia = 0.00;
                that.dingjin = Number(res.data.order_amount);
              }
              
              console.log(that.danjia)
              
              that.dingjinall = that.dingjin+that.weikuan;
            }
            
            
            // if(res.data.out_time>0){
            //   MojiAjax.indexFuns.dateFomat();
            //   var dateTime = new Date(parseInt(res.data.out_time) * 1000);
            //   if(MojiAjax.indexFuns.compareTime(dateTime,new Date())){
            //     that.dataDetail.out_time = dateTime.format('yyyy-MM-dd hh:mm:ss');
            //   }else{
            //     that.dataDetail.out_time = 0;
            //   }
              
            // }else{
            //   that.dataDetail.out_time = 0;
            // }


            setTimeout(function(){
              for (var i = 0; i < $('.timerStr').length; i++) {
                $($('.timerStr')[i]).yomi();
              };
              for (var i = 0; i < $('.timerNumber').length; i++) {
                $($('.timerNumber')[i]).yomiNumber();
              };
            },200);


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
                ,time:3
              });
            }

            // window.location.href = 'login.html'
          }
        })
      },
      //取消订单
      orderCancel(){
          var that = this;
          var url = config.indexAjax.ordercancel;
          var params = {
            order_id:that.order_id
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
                  ,time:3
                });
              }

              // window.location.href = 'login.html'
            }
          })


      },
      //确认收货
      orderAffirmReceived(){
          var that = this;
          var url = config.indexAjax.orderaffirmreceived;
          var params = {
            order_id:that.order_id,
            version:260
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
                  ,time:3
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
  .order-status{padding: 1rem 0.5rem;color: #333;font-size: 0.8rem}
  .order-address{border-bottom: 1px solid #ddd;}
  .address-info{width: 13rem;}
  .address-info .address-ot{font-size: 0.512rem;color: #999;}
  .address-right{margin-left: 13rem;}
  
  .timer{font-size: 0.512rem;color: #999;}

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

  .goods-rule{margin-top: 0.512rem;background: #eaeaea;padding-bottom:0.512rem;font-size: 0.512rem;}
  .goods-rule table{width: 100%;text-align: center;}
  .goods-rule table thead tr{height: 1.2rem;}

  .post-type,.shop-coupons,.coupons,.red-bag{border-bottom: 1px solid #ddd;}
  .post-info{width: 14rem; float: left;margin-top: 0.512rem;}
  .shop-coupons,.coupons{padding: 0.254rem 0rem;}
  .shop-coupons p,.coupons p,.red-bag p{width: 14rem;float: left;}
  .t-count{font-size: 0.512rem; text-align: right;padding-top: 0.512rem;padding-right: 1rem;}
  .t-count span{color:#f5337d; }
  
  .order-total{font-size: 0.512rem;}
  .price-info,.order-total{margin-top: 0.3rem;color: #999;}
  .price-info span,.order-total span{float: right;}
  .price-info .all{color: #333;margin-top: 0.2rem;}


  .order-total p .price{float: right;color:#f5337d; }
  .order-total .total-count{text-align: right;border-bottom: 0px solid #ddd;font-size: 0.7rem;}
  .order-total .total-count span{color:#f5337d; }


  .submit-order{position: fixed;bottom: 0;background: #f5337d;color: #fff;width: 100%;height: 2rem;line-height: 2rem;text-align: center;}

  .order-all-o{position: fixed;bottom: 0;width: 100%;background-color: #fff;border-top: 1px solid #ddd;}
  .order-all-o .all-price{height: 1.8rem;line-height: 1.8rem;border-bottom: 1px solid #ddd;padding: 0rem 0.256rem;}
  .order-all-o .all-price span{float: right;color: #f5337d;}
  .order-all-o .opration{padding: 0.2rem 0.512rem;text-align: right;}
  .order-all-o a{color: #333;border: 1px solid #333;padding: 0.1rem 0.2rem;border-radius: 5px;display: inline-block;margin-left: 0.512rem;}
  .order-all-o a.confirm-get{color: #fff;background-color: #f5337d;border: 1px solid #f5337d;}
  /*.layui-m-layershade{background-color:rgba(0,0,0,.5) }*/
  .layui-m-layer .layui-m-layer-footer{width: 100%;bottom: 0px;background: #fff;}
  .layui-m-layer .layui-m-layercont{line-height: normal;padding: 0px;font-size: 0.64rem;}
  .layui-m-layercont .title{height: 1.5rem;line-height: 1.5rem;border-bottom: 1px solid #ddd;}
  .layui-m-layercont ul{padding: 0rem 0.512rem;margin-bottom: 2.5em;}
  .layui-m-layercont ul li{border-bottom: 1px solid #ddd;height: 1.5rem;line-height: 1.5rem;text-align: left;}
  .layui-m-layercont ul li i{margin-top: 0.512rem;}
  .layui-m-layercont .confirm-btn{background: #f5337d;text-align: center;color: #fff;height: 1.5rem;line-height: 1.5rem;}
  
  .layer-change-post .sjq-icon,.layer-shop-coupons .sjq-icon,.layer-coupons .sjq-icon{display: none;}
  .layer-change-post .sjq-icon.active,.layer-shop-coupons .sjq-icon.active,.layer-coupons .sjq-icon.active{display: inline-block;}

  .layer-red-bag .sjq-icon{display: none;}
  .layer-red-bag .sjq-icon.active{display: inline-block;}

</style>
