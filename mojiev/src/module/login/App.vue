<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>登录</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      <div class="login-img-header">
        <!-- <img :src="proPath+'/static/images/login-img-header.png'" alt=""> -->
      </div>
      

      <form class="main-form login-form">
        <ul class="form-list content-block">
          <li class="list-item"><label for="shop_name">账号</label><input type="text" name="username" v-model="username" placeholder="请输入手机号" @keyup="checkForm"></li>
          <li class="list-item"><label for="shop_name">密码</label><input type="password" name="password" v-model="password" placeholder="请输入密码" @keyup="checkForm"></li>
        </ul>
      
        <input type="button" value="登录" class="form-submit" v-if="checkPass == 1" @click="submitForm"/>
        <input type="button" value="登录" class="form-submit diabled" v-if="checkPass == 0"/>
        <div class="o-info clearfix">
          <!-- <a href="/mobile/index.php?r=user/login/register" class="f-l">手机注册</a> -->
          <a href="loginCheckPhone.html" class="f-l">注册</a>
          <a href="findPassword.html" class="f-r">忘记密码</a>
        </div>
        <!--
        <fieldset>
            <legend>或从以下方式登录</legend>
        </fieldset>
        
        <ul class="three-login clearfix">
          <li style="margin-left:5.5rem;" @click="ConnectSignin"> <i class="sjq-icon login-wx-icon"></i><p>微信</p> </li>
           <li style="text-align:center;width:8.746rem;"> <i class="sjq-icon login-qq-icon"></i><p style="width:100%;">QQ</p> </li>
          <li style="text-align:right"> <i class="sjq-icon login-tb-icon"></i><p>淘宝</p> </li> 
        </ul>
        -->
        
      </form>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import DialogLayer from 'common/js/layer'          //摩街数据方法类

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        checkPass:0,
        username:'',
        password:''
      }
    },
    mounted () {                        //页面完成加载
      var that = this
      setTimeout(function(){
        that.checkForm()
      },500)
      
    },
    methods: {                          //方法
      checkForm(){
        var that = this
        if(that.username!= '' && that.password!= ''){
          that.checkPass = 1;
        }else{
          that.checkPass = 0;
        }
      },
      submitForm(){
        var that = this;
        var url = config.indexAjax.usersignin;
        var params = {
            name:that.username,
            password:that.password
        };

        MojiAjax.indexFuns.postAjax(url,params,function(res){
          if(res.status.succeed === 1){
            MojiAjax.indexFuns.cookie.set('mojie_session_sid',res.data.session.sid,1);
            MojiAjax.indexFuns.cookie.set('mojie_session_uid',res.data.session.uid,1);
            var pcloginUrl = '/mobile/index.php?r=user/login';
            var pcParams = {
              username:that.username,
              password:that.password
            }
            MojiAjax.indexFuns.postAjax(pcloginUrl,pcParams,function(respc){
              if(respc.status === 'y'){
                window.location.href = respc.url
              }else{
                DialogLayer.open({
                content: respc.info
                ,skin: 'msg'
                ,time:3
              });
              }
            });

            
          }else{
            DialogLayer.open({
              content: res.status.error_desc
              ,skin: 'msg'
              ,time:3
            });
          }
        })
      },
      ConnectSignin(){
        var that = this;
        var url = config.indexAjax.connectsignin;
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(result){
          if(result.status == false){
            var index = DialogLayer.open({
              style:'width:75%'
              ,className: 'check-phone-form-dialog'
              ,content: result.errortext
              ,btn: ['确定', '取消']
              ,yes: function(index){
                DialogLayer.close(index);
              }
            });
          }else{
            window.location.href="lhLogin.html"
          }
        });
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
    background: #fff;
  }
  .content-block{background: #fff;}
</style>
