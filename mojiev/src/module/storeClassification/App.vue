<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <div class="mjHeader">
            <a class="mjBack">
            </a>
            <h2>店铺分类</h2>
            <div class="mjInfor">
                <i></i>
                <div class="inforBox">
                    <span></span>
                    <div class="shouye">
                        <a href="">首页</a>
                    </div>
                    <div class="gouwu">
                        <a href="">购物车</a>
                    </div>
                    <div class="fenxi">
                        <a href="">分享店铺</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="storeCt">
            <div class="cTbox">
                <p class="tboxTit">
                    <label for="">2017春季上新</label>
                    <span class="seeAll">查看全部</span>
                </p>
                <div class="storeProdClass">
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                </div>
            </div>
            <div class="cTbox">
                <p class="tboxTit">
                    <label for="">2017春季上新</label>
                    <span class="seeAll">查看全部</span>
                </p>
                <div class="storeProdClass">
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                </div>
            </div>
            <div class="cTbox">
                <p class="tboxTit">
                    <label for="">2017春季上新</label>
                    <span class="seeAll">查看全部</span>
                </p>
                <div class="storeProdClass">
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
                    <p class="classProd">
                        <a href="">
                            <label for="">2017春季上新</label>
                            <span></span>
                        </a>
                    </p>
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
        this.qiehuan();
        // this.initTimer();
    },
    methods: {                          //方法
      qiehuan(){
        $(".seeAll").on("click",function(){
            var _this = $(this);
            _this.parents(".tboxTit").siblings(".storeProdClass").toggle();
        })
         $(".mjInfor i").on("click",function(){
            var _this = $(this);
            _this.siblings(".inforBox").toggle();
        })
      }
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
