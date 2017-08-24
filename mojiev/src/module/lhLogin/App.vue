<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon"></i></li>
        <li class="header-middle text-c"><i>联合登录</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      <div class="login-img-header">
        <img :src="proPath+'/static/images/login-img-header.png'" alt="">
      </div>
      <div class="login-user-nick">
        <p>亲爱的微信用户：<span>标哥起飞了</span> </p>
        <p class="p-2">为了给您更好的服务，请绑定您的手机号码</p>
      </div>

      <form class="main-form login-form">
        <ul class="form-list content-block">
          <li class="list-item"><label for="shop_name">手机号</label><input style="width:8rem;" type="text" name="username" value="" placeholder="请输入手机号" ></li>
          <li class="list-item"><label for="shop_name">验证码</label><input style="width:5.3rem;" type="text" name="password" value="" placeholder="请输入短信验证码"><span class="reset-time" @click="getCode">获取验证码</span></li>
          <li class="list-item"><label for="shop_name">邀请码(选填)</label><input style="width:4.3rem;" type="text" name="invtCode" value="" placeholder="6位数字或字母"></li>
        </ul>
      
        <input type="submit" value="登录" class="form-submit" v-if="checkForm"/>
        <input type="button" value="登录" class="form-submit diabled" v-if="checkForm == false"/>
        
        
        
      </form>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import DialogLayer from 'common/js/layer'          //摩街数据方法类
  import PageFooter from 'components/PageFooter'              //底部
  import VScroll from 'components/PullToRefreshLayer' //刷新加载

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        isResetTime:false,
        checkForm:false
      }
    },
    mounted () {                        //页面完成加载
      var that = this
      $('.main-form .form-list').on('keyup','input',function(){
        that.checkFormFun()
      })
      DialogLayer.open({
        style: 'color:#fff;background:rgba(0,0,0,0.5)',
        type: 0,
        anim: 3,
        content: '账号密码错误',
        shade: false,
        time:3
      })
    },
    methods: {                          //方法
      getCode(){
        var that = this;
        var resetTime = 60;

        if(that.isResetTime) return false;
        var timer = setInterval(function(){
          that.isResetTime = true;
          $('.reset-time').text('重新获取('+resetTime+'s)');
          resetTime --;
          if(resetTime === 0){
            clearInterval(timer);
            that.isResetTime = false;
            $('.reset-time').text('重新获取')
          }
        },1000);
      },
      checkFormFun(){
        var that = this;
        var checkPass = true;
        $('.main-form .form-list').find('input').each(function(){
          var _this = $(this);
          if(_this.attr('name') === 'username'){
            if(_this.val() == ''){
              checkPass = false;
            }
          }
          if(_this.attr('name') === 'password'){
            if(_this.val() == ''){
              checkPass = false;
            }
          }
          if(_this.attr('name') === 'invtCode'){
            if(_this.val() == ''){
              checkPass = false;
            }
          }
        });
        if(checkPass){
          that.checkForm = true
        }else{
          that.checkForm = false
        }
      }
    },
    components: {
      PageFooter,
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
    background: #fff;
  }
  .content-block{background: #fff;}
</style>
