<template>
  <div class="container">
    <form class="loginForm">
      <input type="text" placeholder="手机/昵称/邮箱">
      <input type="text" placeholder="密码">
      <v-slider-captcha></v-slider-captcha>
      <div class="three-login clearfix">
        <h2>第三方帐号快速登录</h2>
        <ul class="clearfix">
          <li>QQ</li>
          <li>微信</li>
          <li>微博</li>
        </ul>
          
      </div>
      
    </form>
    
  </div>
</template>

<script>

import VSliderCaptcha from '../components/SliderCaptcha'

import {loader} from '../util/util'
import $ from 'zepto'


export default {
  ready () {
    // setTimeout(() => {
    //   this.$route.router.go({path: '/home', replace: true})
    // }, 1500)
  },
  components: {
    VSliderCaptcha
  }
}
</script>

<style scoped>
  .loginForm{padding-top: 1rem;}
  .loginForm input{border: 0px;border-bottom: 1px solid #ddd;height: 2rem;width: 100%;margin-bottom: 1rem;padding-left: 1rem;padding-right: 1rem;}
  .three-login {margin-top: 1rem;}
  .three-login h2{font-size: .7rem;font-weight: normal;text-align: center;}
  .three-login li{width: 30%;float: left;text-align: center;}
</style>
