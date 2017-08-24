<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <v-scroll :on-refresh="refresh" :on-infinite="loadMore">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>实体市场</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      <div class="market-top">
        <div class="market-bg">
          <img :src="proPath+'/static/images/market-default.jpg'" alt="">
          <div class="market-o">{{sellerBest.desc}}</div>
        </div>
      </div>
      
      <ul class="content-block market-list">
        <li v-for="item in sellerBest.maket">
          <a :href="'marketprodstore.html?id='+item.id+'&marketname='+item.name">
            <div class="market-img">
              <img :src="item.image" alt="">
            </div>
            <div class="market-info">
              <div class="market-name">
                <span>{{item.name}}</span>
              </div>
              <p class="market-content">{{item.name}}</p>
          </div>
          </a>
        </li>
      </ul>

    </v-scroll>
    <page-footer :active="1"></page-footer>
    <back-top></back-top>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import PageFooter from 'components/PageFooter'              //底部
  import VScroll from 'components/PullToRefreshLayer' //刷新加载
  import BackTop from 'components/BackTop' //返回顶部

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        sellerBest:[]
      }
    },
    mounted () {                        //页面完成加载
       var _this = this;
        _this.initBanner(function(data){
         _this.sellerBest = data.data;
        });  //初始化banner
    },
    methods: {                          //方法
      refresh (done) {
        console.log('refresh')
        done() // call done
      },
      loadMore (done) {
        console.log('loadMore')
        $('.load-more span').text('没有更多数据了')
        // done() // finsh call done
      },
      initBanner (cb){
        var param = {}
        var belong = MojiAjax.indexFuns.getQueryString('belong');
        if(belong != null) param.belong = belong;
        MojiAjax.indexFuns.marketlist(cb,param);
      }
    },
    components: {
      PageFooter,
      VScroll,
      BackTop
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
</style>
