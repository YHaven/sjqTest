<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
        <div class="mjHeader">
            <a class="mjBack" href="javascript:history.go(-1);">
            </a>
            <h2>我要推广</h2>
        </div>
        
        <div class="qrcode">
          <img :src="sellerList.invite_qrcode_image" />
          <p>我的邀请码</p>
          <span>{{sellerList.invite_code}}</span>
        </div>
        <div style="font-size:0.512rem;padding:0.64rem">
          <p>邀请说明</p>
          <p>{{sellerList.invite_explain}}</p>

        </div>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import Layer from 'common/js/layer'          //layer
    import config from 'common/js/moji.config'
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: [],
        sellerList:{},
        city:'hz',
        url:config.indexAjax.inviteuser
      }
    },
    mounted () {                        //页面完成加载
        var _this = this;
        _this.initSellerList(function(result){
            
            if(result.status.succeed === 1){
              _this.sellerList = result.data;
            }else{
              Layer.open({
                content: result.status.error_desc
                ,skin: 'msg'
                ,time:3
              });
            }
        });
    },
    methods: {                          //方法
        initSellerList(cb){
            var _this = this;
            var params= {
                        };
            // var paramsStr = JSON.stringify(params);
            // MojiAjax.indexFuns.getSellerList({json:paramsStr},cb)
            MojiAjax.indexFuns.postJsonAjax(_this.url,params,cb);
            
        }
    },
    components: {
    }
  }
</script>

<style>
    body{
        background: #f8f8f8;

    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
     #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.64rem;
    margin-bottom: 3.5rem;
    background: #f8f8f8;
  }
  .content-block{background: #fff;}
  #stime{
      width: 80%;
  margin: 0 auto;
  display: flex;
  border: 1px solid #f82d7c;
  margin-top: 0.3rem;
  }
 .qrcode{
    width: 70%;
  margin: 0 auto;
  padding-top: 2rem;
  text-align: center;
 }
 .qrcode img{
 width:100%;
 }
 .qrcode p{
 font-size: 0.5rem;
  color: #999;
  padding: 1rem 0;
 }
 .qrcode span{
 width: 100%;
  height: 2rem;
  font-size: 1.5rem;
  display: inline-block;
  background-color: #fff;
  line-height: 2rem;
 }
</style>
