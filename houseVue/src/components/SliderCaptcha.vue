<template>
  <div class="stage">
      <div class="slider" id="slider">
          <div class="label">向右滑动登录</div>
          <div class="track" id="track">
              <div class="bg-green">朕来了</div>
          </div>
          <div class="button" id="btn">
              <div class="icon" id="icon"></div>
              <div class="spinner" id="spinner">
                  <div class="spinner-container container1">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                  </div>
                  <div class="spinner-container container2">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                  </div>
                  <div class="spinner-container container3">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'zepto'
export default {
  methods: {
    submitForm(){
        var _this = this;
        // layer.open({
        //     title: [
        //       '我是标题',
        //       'background-color: #FF4351; color:#fff;'
        //     ]
        //     ,content: '标题风格任你定义。'
        // });
        
       //  layer.open({
       //      content: '您确定要进入主页？'
       //      ,btn: ['要', '不要']
       //      ,yes: function(index){
       //         _this.$route.router.go({path: '/home', replace: true});
       //         layer.close(index);
       //      }
       //  });
        
       // return false;

        var formParams = {
            username : $('input[name="username"]').val(),
            password : $('input[name="password"]').val()
        }
        // $('.loginForm').serialize()
        _this.$http.post(planPro.ajaxUrl.login, formParams,{credentials: true})
        .then(({data}) => {
            if(data.status){
                _this.$route.router.go({path: planPro.indexPath, replace: true})
            }else{
                layer.open({content: data.errorinfo,time:2});
                var oBtn = document.getElementById('btn');
                var oTrack=document.getElementById('track');
                oBtn.style.left = 0;
                oTrack.style.width= 0;
            }
            
        })
    }
  },
  ready () {
    // setTimeout(() => {
    //   this.$route.router.go({path: '/home', replace: true})
    // }, 1500)
    var _this = this; 
    var oBtn = document.getElementById('btn');
    var oW,oLeft;
    var oSlider=document.getElementById('slider');
    var oTrack=document.getElementById('track');
    var oIcon=document.getElementById('icon');
    var oSpinner=document.getElementById('spinner');
 
    oBtn.addEventListener('touchstart',function(e){
        var touches = e.touches[0];
        oW = touches.clientX - oBtn.offsetLeft;
        oBtn.className="button";
        oTrack.className="track";
        document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);
 
    oBtn.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        oLeft = touches.clientX - oW;
        if(oLeft < 0) {
            oLeft = 0;
        }else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-30) {
            oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
        }
        oBtn.style.left = oLeft + "px";
        oTrack.style.width=oLeft+ 'px';
    },false);
 
    oBtn.addEventListener("touchend",function() {
        if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth-2)){
            oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
            oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-30);
            oIcon.style.display='none';
            oSpinner.style.display='block';
            oBtn.className="button-on";
            oTrack.className="track-on";


            _this.submitForm();

        }else{
            oBtn.style.left = 0;
            oTrack.style.width= 0;
        }
        
        document.removeEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);
 
    function defaultEvent(e) {
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
/**
 * 开发时间：2016/5/24
 * 开发人员：boxUnll
 * 开发项目：移动端滑动验证代码
 */
.stage{position:relative;padding: 0 15px;height:55px;}
.slider{position:absolute;height:52px;box-shadow:0 0 3px #999;background-color:#ddd;left:15px;right:15px;}
.label {
    background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: slidetounlock 3s infinite;
    -webkit-text-size-adjust: none;
    line-height: 52px;
    height: 52px;
    text-align: center;
    font-size: 16px;
    width: 100%;
    color: #aaa;
}
@keyframes slidetounlock
{
    0%     {background-position:-200px 0;}
    100%   {background-position:200px 0;}
}
@-webkit-keyframes slidetounlock
{
    0%     {background-position:-200px 0;}
    100%   {background-position:200px 0;}
}
.button{
    position: absolute;
    left: 0;
    top: 0;
    width: 52px;
    height: 52px;
    background-color: #fff;
    transition: left 0s;
    -webkit-transition: left 0s;
}
.button-on{
    position: absolute;
    left: 0;
    top: 0;
    width: 52px;
    height: 52px;
    background-color: #fff;
    transition: left 1s;
    -webkit-transition: left .5s;
}
.track{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    overflow: hidden;
    transition: width 0s;
    -webkit-transition: width 0s;
}
.track-on{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    overflow: hidden;
    transition: width 1s;
    -webkit-transition: width .5s;
}
.icon  {
    width: 52px;
    height: 52px;
    position: relative;
    left:-16px;
    font-family: sans-serif;
}
.icon:before{
    content:'>>';
    color:#ccc;
    line-height:52px;
}
.spinner {
    margin: 16px auto;
    width: 20px;
    height: 20px;
    position: relative;
    display: none;
}
.container1 > div, .container2 > div, .container3 > div {
    width: 6px;
    height: 6px;
    background-color: #ccc;
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
}
.container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}
.container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
.container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}
.container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}
.container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}
.container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}
.container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
}
.container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}
.container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}
.container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}
.container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
}
.container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}
.container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
}
@-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
}
@keyframes bouncedelay {
    0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 40% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
      }
}
.bg-green {
    line-height: 52px;
    height: 52px;
    text-align: center;
    font-size: 16px;
    background-color: #78c430;
}
</style>
