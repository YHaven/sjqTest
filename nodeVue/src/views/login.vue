<template>
  <div class="container">
    <top-title v-bind:parent-apptitle="apptitle"></top-title>
    <form class="loginForm">
      <input type="text" placeholder="手机/昵称/邮箱" name="username" v-model="userName">
      <input type="text" placeholder="密码" name="password" v-model="password">
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
import TopTitle from '../components/TopTitle'

import {loader} from '../util/util'
import $ from 'zepto'


export default {
  ready () {
    // setTimeout(() => {
    //   this.$route.router.go({path: '/home', replace: true})
    // }, 1500)
    router.app.isIndex = false
  },
  data () {
    return {
      loginUrl : '',
      formParams: {},
      userName:'',
      password:'',
      apptitle: '登录'
    }
  },
  methods: {
    submitForm(){
      this.$http.post(this.loginUrl, this.formParams)
        .then((response) => {
          console.log(response)
        })
    }
  },
  components: {
    VSliderCaptcha,
    TopTitle
  }
}
</script>

<style >
  .loginForm{padding-top: 1rem;}
  .loginForm input{border: 0px;border-bottom: 1px solid #ddd;height: 2rem;width: 100%;margin-bottom: 1rem;padding-left: 1rem;padding-right: 1rem;}
  .three-login {margin-top: 1rem;}
  .three-login h2{font-size: .7rem;font-weight: normal;text-align: center;}
  .three-login li{width: 30%;float: left;text-align: center;}
</style>
