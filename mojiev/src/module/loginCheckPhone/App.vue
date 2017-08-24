<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>{{step === 1?'验证手机号': (step===2?'填写验证码':'密码设置')}}</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      

      <form class="main-form check-phone-form" v-if="step === 1">
        <ul class="form-list content-block">
          <li class="list-item"><label>手机号</label><input type="text" name="phonenumber" value="" placeholder="请输入手机号" maxlength="11" minlength="11" @keyup="checkForm"></li>
        </ul>
      
        <input type="button" value="下一步" class="form-submit" v-if="checkPass" @click="checkPhone"/>
        <input type="button" value="下一步" class="form-submit diabled" v-if="!checkPass" />
    
      </form>

      
      <form class="main-form check-code-form" v-if="step === 2">
        <p class="alert-info">我们已经给您的手机号{{phonenumber}}发送了一条验 证码短信</p>
        <ul class="form-list content-block">
          
          <li class="list-item"><label>验证码</label><input style="display:none;" type="text" name="res" value="" placeholder=""><input style="width:7.613rem;" type="text" name="code" value="" placeholder="请输入短信验证码" minlength="4" maxlength="6" @keyup="checkForm"><span class="reset-time disable" v-if="resetCode === 1">重新发送(<i>{{resetTime}}</i>s)</span><span class="reset-time" v-if="resetCode === 0" @click="checkPhone">重新发送</span></li>

          <li class="list-item"><label>邀请码(选填)</label><input type="text" name="acode" value="" maxlength="6" minlength="6" placeholder="6位数字或字母"></li>
        </ul>
      
        <input type="button" value="下一步" class="form-submit" v-if="checkPass" @click="ValidateBind"/>
        <input type="button" value="下一步" class="form-submit diabled" v-if="!checkPass" />
    
      </form>
      

      <form class="main-form check-code-form" v-if="step === 3">
        <p class="alert-info">请设置摩街登录密码</p>
        <ul class="form-list content-block">
          <li class="list-item"><label for="shop_name">密码</label><input maxlength="20" minlength="6" type="password" name="password" value="" placeholder="请输入6-20位密码" @keyup="checkForm"></li>
        </ul>
        <p class="alert-info" style="margin-top:0.2rem;margin-bottom:0.8rem;font-size:0.512rem;">密码由6-20位英文字母、数字或符号组成</p>
        
    
        <input type="button" value="注册" class="form-submit" v-if="checkPass" @click="UserSignUp"/>
        <input type="button" value="注册" class="form-submit diabled" v-if="!checkPass" />
        
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
        step:1,
        checkPass:false,
        phonenumber:'',
        resetTime:60,
        resetCode:0
      }
    },
    mounted () {                        //页面完成加载
      // var index = DialogLayer.open({
      //   style:'width:75%',
      //   className: 'check-phone-form-dialog',
      //   content: '该手机号已经被注册，是否立即登录'
      //   ,btn: ['确定', '取消']
      //   ,yes: function(index){
      //     DialogLayer.close(index);
      //   }
      // });
    },
    methods: {                          //方法
      checkForm(){
        var that = this;
        var checkPass = true;
        if(that.step === 1){
          var phonenumber = $('input[name="phonenumber"]').val();
          that.phonenumber = phonenumber;
          if(phonenumber == '' || phonenumber.length<11){
            checkPass = false;
          }
          var myreg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0-9]{9}|14[579][0-9]{8}|17[0-9]{9}$/;
          if (!myreg.test(phonenumber) && phonenumber.length == 11) {
            var index = DialogLayer.open({
              style:'width:75%'
              ,className: 'check-phone-form-dialog'
              ,content: '请输入有效的手机号'
              ,btn: ['确定', '取消']
              ,yes: function(index){
                DialogLayer.close(index);
              }
            });
            checkPass = false;
          }

        }

        if(that.step === 2){
          var code = $('input[name="code"]').val();
          if(code == '' || code.length<4){
            checkPass = false;
          }

        }

        if(that.step === 3){
          var password = $('input[name="password"]').val();
          if(password == '' || password.length<6 || password.length>20){
            checkPass = false;
          }

        }
        that.checkPass = checkPass
      },


      checkPhone(){
        var that = this;
        var url = config.indexAjax.userbind;
        var phonenumber = that.phonenumber;
        var params = {
          value:phonenumber,
          type:'mobile'
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(result){
          if(result.status.succeed == 0){
            var index = DialogLayer.open({
              style:'width:75%'
              ,className: 'check-phone-form-dialog'
              ,content: result.status.error_desc
              ,btn: ['确定', '取消']
              ,yes: function(index){
                DialogLayer.close(index);
              }
            });
          }else{

            if(result.data.registered == 1){
              var index = DialogLayer.open({
                style:'width:75%'
                ,className: 'check-phone-form-dialog'
                ,content: '该手机号已经被注册，是否继续注册？'
                ,btn: ['确定', '取消']
                ,yes: function(index){
                  DialogLayer.close(index);
                  window.location.href = window.location.href;
                }
              });
            }else{
              that.step = 2;
              that.resetCode = 1;
              that.checkPass = false;
              that.initCodeTime();
            }
            
          }
        });
      },

      initCodeTime(){
        var that = this;
          
        var timer = setInterval(function(){
          var time = that.resetTime;
          // console.log(time);
          if (time == 0) {
              that.resetCode = 0;
              that.resetTime = 60;
              clearInterval(timer);
              return;
          }

          if (time != 0) {
              that.resetCode = 1;
              time--;
              that.resetTime = time;
          }
        },1000)
        
      },
      ValidateBind(){
        var that = this;
        var url = config.indexAjax.validatebind;
        var phonenumber = that.phonenumber;
        var code = $('input[name="code"]').val();
        var params = {
          value:phonenumber,
          type:'mobile',
          code:code
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(result){
          if(result.status.succeed == 0){
            var index = DialogLayer.open({
              style:'width:75%'
              ,className: 'check-phone-form-dialog'
              ,content: result.status.error_desc
              ,btn: ['确定', '取消']
              ,yes: function(index){
                DialogLayer.close(index);
              }
            });
          }else{
            that.step = 3;
            that.checkPass = false;
          }
        });
      },
      UserSignUp(){
        var that = this;
        var url = config.indexAjax.usersignup;
        var phonenumber = that.phonenumber;
        var password = $('input[name="password"]').val();
        var params = {
          name:phonenumber,
          password:password,
          mobile:phonenumber,
          email:'',
          invite_code:''
        };

        var qr_id = MojiAjax.indexFuns.getQueryString('qr_id');
        if(qr_id != null){
          params.qr_id = qr_id;
        }


        MojiAjax.indexFuns.postJsonAjax(url,params,function(result){
          if(result.status.succeed == 0){
            var index = DialogLayer.open({
              style:'width:75%'
              ,className: 'check-phone-form-dialog'
              ,content: result.status.error_desc
              ,btn: ['确定', '取消']
              ,yes: function(index){
                DialogLayer.close(index);
              }
            });
          }else{
            window.location.href="/mobile/index.php?r=user"
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
