<template>
    <div id="app">
        <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
        <div class="mjHeader">
            <a class="mjBack">
            </a>
            <h2>店铺介绍</h2>
        </div>
        <ul class="mjProdSort">
            <li>
                <p>
                  <a href="javascript:void(0)" class="curror">基本信息</a>  
                </p>
            </li>
            <li>
                <p>
                  <a href="javascript:void(0)">优惠活动</a>  
                </p>
            </li>
        </ul>
        <div class="mjProdSbox aa">
            <div class="inforSc">
                <p>
                    <label>商品评价</label>
                    <span>4.99</span>
                </p>
                <p>
                    <label>服务态度</label>
                    <span>4.99</span>
                </p>
                <p>
                    <label>物流速度</label>
                    <span>4.99</span>
                </p>
            </div>
            <div class="inforText">
                <div class="infList">
                    <label>基本概况</label>
                    <span>全部工厂自产自销，价格低廉，量大
                莱阳定时，可以一天出版全部工厂自产自销，价格低廉，量大
                莱阳定时，可以一天出版，，三天出货，
                速度快..</span>
                </div>
                <div class="infList">
                    <label>基本概况</label>
                    <span>全部工厂自产自销，价格低廉，量大
                莱阳定时，可以一天出版，全部工厂自产自销，价格低廉，量大
                莱阳定时，可以一天出版，三天出货，
                速度快..</span>
                </div>
            </div>
        </div>
        <div class="mjProdSbox bb">
            <div class="infor_yh">
                <p>1.全店满199减100，满499减300</p>
                <p>2.这里是活动内容，活动简介</p>
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
        $('.mjProdSort').find('a').on("click", function(){
            var _this = $(this),
                _index = _this.parents("li").index();
            _this.addClass('curror').parents("li").siblings('li').find("a").removeClass('curror');
            console.info(123)
            console.info(_index)
            $('.mjProdSbox').eq(_index).show().siblings(".mjProdSbox").hide();
            console.info(45)
        });
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
