<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <div class="mjHeader">
            <a class="mjBack">
            </a>
            <h2>新人专享</h2>
        </div>
        <a href="">
            <img src="/static/images/new01.png" alt="">
        </a>
        <div class="zc_hb">
            <a href="">
                <img src="/static/images/new02.png" alt="">
                <p>2188元大红包</p>
            </a>
            <a href="">
                <img src="/static/images/new03.png" alt="">
                <p>2188元大红包</p>
            </a>
            <span style="color:#fedc32;font-size:34px;" class="hb_song">注册即送2188元大红包</span>
            <p class="hb_see">注册成功后请到“我的-我的红包”里进行查看</p>
        </div>
        <div class="newProdBox">
            <h3></h3>
            <div class="mjProdSbox">
                <div class="prod">
                    <a href="">
                        <img src="" alt="">
                        <label>韩都衣舍韩版2015夏装新款女装欧根纱印花连衣裙JQ5001樰
                        </label>
                        <span>¥178<em>.00</em></span>
                    </a>
                </div>
                <div class="prod">
                    <a href="">
                        <img src="" alt="">
                        <label>韩都衣舍韩版2015夏装新款女装欧根纱印花连衣裙JQ5001樰
                        </label>
                        <span>¥178<em>.00</em></span>
                    </a>
                </div>
                <div class="prod">
                    <a href="">
                        <img src="" alt="">
                        <label>韩都衣舍韩版2015夏装新款女装欧根纱印花连衣裙JQ5001樰
                        </label>
                        <span>¥178<em>.00</em></span>
                    </a>
                </div>
                <div class="prod">
                    <a href="">
                        <img src="" alt="">
                        <label>韩都衣舍韩版2015夏装新款女装欧根纱印花连衣裙JQ5001樰
                        </label>
                        <span>¥178<em>.00</em></span>
                    </a>
                </div>
                <div class="prod">
                    <a href="">
                        <img src="" alt="">
                        <label>韩都衣舍韩版2015夏装新款女装欧根纱印花连衣裙JQ5001樰
                        </label>
                        <span>¥178<em>.00</em></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  
    import FontReset from 'common/js/font.reset'        //移动头部
    import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
    import ZpTimer from 'common/js/zepto.timer'        //倒计时
    import Slider from 'components/Slider'              //滑动
    import VScroll from 'components/PullToRefreshLayer' //刷新加载
    import $ from 'zepto'
    export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        everyTenClock:new Date().getFullYear(),
        banner: []
      }
    },
    mounted () {                        //页面完成加载
        // this.initBanner();
        // this.initTimer();
    },
    methods: {                          //方法
      
    },
    components: {
      VScroll,
      Slider
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
</style>
