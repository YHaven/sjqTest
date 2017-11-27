<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
      <!-- 头部 -->
      
      <!-- 头部 -->
      <div class="top-user-info" :style="'background: rgba(0, 0, 0, 0) url(\''+ proPath +'/static/images/mine-bg.jpg\') no-repeat scroll 0 0;background-size: 100% 100%;'">
        <ul class="header" style="background:rgba(0, 0, 0, 0);">
          <li class="header-left"><i class="sjq-icon set-icon"></i></li>
          <!-- <li class="header-middle text-c"><i>限时团批</i></li> -->
          <li class="header-right"><i class="sjq-icon msg-icon"></i></li>
        </ul>
        <div class="user-head-img"><img :src="proPath +'/static/images/default-head-img.png'" alt=""></div>
        <div class="user-name">用户名</div>
        <div class="user-grate">非特殊等级</div>
      </div>

      <ul class="sc-nav clearfix">
        <li>
          <a href="">
            <p class="c-count">12</p>
            <p>商品收藏</p>
          </a>
        </li>
        <li>
          <a href="">
            <p class="c-count">20</p>
            <p>店铺收藏</p>
          </a>
        </li>
        <li>
          <a href="">
            <p class="c-count">52</p>
            <p>我的足迹</p>
          </a>
        </li>
      </ul>

      <div class="content-block my-order">
        <div class="block-title clearfix">
          <span class="m-title">我的订单</span>
          <!-- <span class="o-title">拼团数量越多，价格越便宜</span> -->
          <a class="more" href="" style="font-size:0.554rem;color:#999;">查看全部订单<i class="sjq-icon right-arrow-icon" style="float:right;margin-top:0.13rem;"></i></a>
        </div>
        <ul class="order-nav clearfix">
          <li>
            <a href="">
              <i class="sjq-icon will-pay-icon"></i>
              <p>待付款</p>
            </a>
          </li>
          <li>
            <a href="">
            <i class="sjq-icon will-group-icon"></i>
            <p>待成团</p>
            </a>
          </li>
          <li>
            <a href="">
            <i class="sjq-icon will-post-icon"></i>
            <p>待发货</p>
            </a>
          </li>
          <li>
            <a href="">
            <i class="sjq-icon will-get-icon"></i>
            <p>待收货</p>
            </a>
          </li>
          <li>
            <a href="">
            <i class="sjq-icon change-refund-icon"></i>
            <p>退货换货</p>
            </a>
          </li>
        </ul>
      </div>

      <div class="content-block mine-menu">
        <p><i class="sjq-icon cgs-icon"></i><span class="p-name">采购商认证</span> <span class="f-r">认证即可享受批发价<i class="sjq-icon right-arrow-icon"></i></span></p>
        <p><i class="sjq-icon coupon-icon"></i><span class="p-name">我的优惠券</span> <span class="f-r">1张优惠券<i class="sjq-icon right-arrow-icon"></i></span></p>
        <p><i class="sjq-icon address-icon"></i><span class="p-name">收货地址</span> <span><i class="sjq-icon right-arrow-icon"></i></span></p>
        <p><i class="sjq-icon lock-icon"></i><span class="p-name">修改密码</span> <span><i class="sjq-icon right-arrow-icon"></i></span></p>
      </div>
      <div class="content-block mine-menu">
        <p><i class="sjq-icon question-icon"></i><span class="p-name">帮助中心</span> <span><i class="sjq-icon right-arrow-icon"></i></span></p>
        <p><i class="sjq-icon kf-icon"></i><span class="p-name">官方客服</span> <span><i class="sjq-icon right-arrow-icon"></i></span></p>
      </div>

    
    <page-footer :active="5"></page-footer>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import PageFooter from 'components/PageFooter'              //底部


  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath
      }
    },
    mounted () {                        //页面完成加载
       
    },
    methods: {                          //方法
      
    },
    components: {
      PageFooter
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 0.64rem;
    margin-bottom: 2.453rem;
    background: #f8f8f8;
  }
  .content-block{background: #fff;}
</style>
