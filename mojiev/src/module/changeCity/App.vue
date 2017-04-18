<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>更换城市</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      <div class="current-address">当前: <span>杭州站</span>   </div>
      <div class="select-address">
        <h5>可选城市</h5>
        <ul class="content-block market-list">
          <li v-for="subweb in subwebList" :alias="subweb.alias" @click="changeCity(subweb.alias)">
            <div class="market-img">
              <img :src="subweb.img" alt="">
            </div>
            <div class="market-info">
              <p class="market-name">{{subweb.name}}</p>
              <p class="market-content">{{subweb.des}}</p>
            </div>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import VScroll from 'components/PullToRefreshLayer' //刷新加载

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        subwebList:[]
      }
    },
    mounted () {                        //页面完成加载
       this.initSubwebList();          //获取
       this.initSite();                //分站
    },
    methods: {                          //方法\
      initSite(){
        //分站
        if($('.current-address').length>0){
          var nowAddress = '杭州';
          var hideAddress = 'hz';
          var l_host = window.location.host;
          if(l_host === 'xa.sjq.cn'){
            nowAddress = '西安';
            hideAddress = 'xa';
          }
          if(l_host === 'test.sjqyc.cn'){
            nowAddress = '银川';
            hideAddress = 'yc';
          }
            
          if(l_host === 'gd.sjq.cn'){
            nowAddress = '广州';
            hideAddress = 'gd';
          }
          $('.current-address span').html(nowAddress);
        }
      },
      changeCity(area){
        if(area === 'hz') window.location.href="http://test.sjq.cn/mobile";
        if(area === 'xa') window.location.href="http://xa.sjq.cn/mobile";
        if(area === 'gd') window.location.href="http://gd.sjq.cn/mobile";
        if(area === 'yc') window.location.href="http://test.sjqyc.cn/mobile";
      },
      initSubwebList(){
        var _this = this;
        var params = {};
        MojiAjax.indexFuns.subwebList(params,function(result){
          if(result.status.succeed === 1){
            _this.subwebList = result.data;
          }
        });
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

  /*实体市场*/
  .market-bg{width: 100%;height: 5.333rem;overflow: hidden;position: relative;}
  .market-o{position: absolute;bottom: 0px;color: #fff;font-size:0.469rem;padding: 0.32rem;text-indent: 1rem; }
  .market-number{height: 1rem;line-height: 1rem;background: #f8f8f8;padding-top: 0.4rem;padding-left: 1.237rem;}
  .market-number span{margin-right: 0.597rem;}
  .market-list li{border-bottom: 1px solid #eaeaea;padding: 0.64rem;height: 3.306rem;}
  .market-img{width: 4.48rem;height: 3.2rem;float: left;}
  .market-img img{height: 100%;}
  .market-info{margin-left:4.88rem;}
  .market-info .market-name{font-size:0.768rem;}
  .market-info .market-content{font-size: 0.512rem;color: #999;}
  .market-info .market-num{font-size: 0.554rem;}
  
  .current-address{padding: 0.5rem;font-size: 1rem;background: #fff}
  .current-address span{font-size: 1.2rem;}
  .select-address h5{font-size: 0.6rem;padding-left: 0.5rem;background: #fff;color: #999}
</style>
