<template>
<div class="art-edit" @click="commentDialog"><i class="icon iconfont icon-write"></i></div>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="top-title">
      <i class="icon iconfont icon-creative cameralight"></i>
      <ul class="top-tab clearfix">
        <li v-link="{path: '/topic/index', replace: true}" ><span>广场</span><span class="cl"></span></li>
        <li v-link="{path: '/topic/hot', replace: true}" class="active"><span>热门</span><span class="cl"></span></li>
        <li v-link="{path: '/topic/concern', replace: true}"><span>关注</span><span class="cl"></span></li>
      </ul> 
      <i class="icon iconfont icon-search search"></i>
    </div>

    <div class="f-block">
      <img src="/static/img/1.jpg" alt="">
      <div class="msg-title">《明星》鹿晗年度封面大集合,哪款造型才是你的菜？</div>
      <div class="msg-view"><i class="icon iconfont icon-attentionfavor"></i>9527</div>
    </div>
    
    <ul class="s-block">
      <li>
        <img src="/static/img/1.jpg" alt="">
        <div class="msg-title">1/16 《美妆》如何在雾霾中提升能见度？化个美到发光的妆呗！</div>
        <div class="msg-view"><i class="icon iconfont icon-attentionfavor"></i>9527</div>
      </li>
      <li>
        <img src="/static/img/1.jpg" alt="">
        <div class="msg-title">1/16 《话题》关于萌宝，你比较喜欢女儿还是儿子？</div>
        <div class="msg-view"><i class="icon iconfont icon-attentionfavor"></i>9527</div>
      </li>
    </ul>

    <!--搭配方案  start -->
    <div class="d-block">
      <div class="msg-title">1/16 《崭新2017 塑造全新自我》</div>
      <img src="/static/img/1.jpg" alt="">
      <div class="msg-case">
        <ul class="msg-person">
          <li>
            <img src="/static/img/1.jpg" alt="">
          </li>
          <li>
            <img src="/static/img/1.jpg" alt="">
          </li>
          <li>
            <img src="/static/img/1.jpg" alt="">
          </li>
          <li>
            <img src="/static/img/1.jpg" alt="">
          </li>
        </ul>
        <div class="msg-count">9527人提供了搭配方案</div>
      </div>
    </div>
    <!--搭配方案  end -->
  
    <ul class="s-block">
      <li>
        <img src="/static/img/1.jpg" alt="">
        <div class="msg-title">1/16 《美妆》如何在雾霾中提升能见度？化个美到发光的妆呗！</div>
        <div class="msg-view"><i class="icon iconfont icon-attentionfavor"></i>9527</div>
      </li>
      <li>
        <img src="/static/img/1.jpg" alt="">
        <div class="msg-title">1/16 《话题》关于萌宝，你比较喜欢女儿还是儿子？</div>
        <div class="msg-view"><i class="icon iconfont icon-attentionfavor"></i>9527</div>
      </li>
    </ul>

    <div class="card-container">
      
      <ul >
        
        <li class="item-content" v-for="task in tasks ">
          <div class="head-img">
            <img src="{{task.logoImg}}" alt="">
            <span class="h-title">{{task.title}}</span>
            <span class="share"><i class="icon iconfont icon-more"></i>关注</span>
          </div>
          <div class="right">
            <p class="r-title" v-if="task.artContent.length<=9">{{task.artContent}}</p>
            <p class="r-title" v-if="task.artContent.length>9">{{task.artContent.substring(0,9)+'...'}}</p>
            <p class="r-tip"><span>#适应阶段#</span></p>
            <ul class="product-list clearfix" >
              <li v-for="product in task.imgUrlList ">
                  <img v-bind:src="product" alt="">
                  <!-- <div class="zs">￥{{product.price}}</div> -->
              </li>
            </ul>
            <div class="comment-block">
              <ul class="comment">
                <li>
                  <span class="username">粉粉逗88888:</span>
                  <span>我快不行了~</span>
                </li>
                <li>
                  <span class="username">妞妞</span>
                  <span>回复</span>
                  <span class="username">豆豆:</span>
                  <span>我快不行了~</span>
                </li>
              </ul>
              <div class="more-comment">查看7条评论</div>
            </div>
            
            <div class="my-comment">
              <span class="zan-comment"><i class="icon iconfont icon-appreciate"></i>15</span>
              <span class="input-comment">我也说一句...</span>
            </div>


          </div>
          
          
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import TopSearch from '../../components/TopSearch'
import Slider from '../../components/Slider'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Btn from '../../components/Button'
import Card from '../../components/CardItem'
import VContent from '../../components/Content'
import List from '../../components/List'
import Item from '../../components/ListItem'
import ShopList from '../../components/ShopList'

import {loader} from '../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {

      return this.$http.get(planPro.ajaxUrl.getcommunitynews+'?start=1')
      .then(({data: {success, info, data}}) => {

        for (var i = 0; i < data.news.length; i++) {
          var imgUrlStr = data.news[i].imgUrl;
          if(typeof imgUrlStr !== 'undefined'){
            data.news[i].imgUrlList = imgUrlStr.split(',');
          }
        };

        this.$set('tasks', data.news);
      })
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      banner:[{
                "bannerName": "测试banner1",
                "id": 3,
                "imgUrl": "/static/img/topic-img1.jpg",
                "startTime": 1420128300000,
                "url": "/video/list"
            }],
      tasks: [],
      isIndex:false,
      pageIndex : 0,
      loading: false
    }
  },
  computed: {
    length () {
      return this.tasks.length
    }
  },
  methods: {
    refresh () {
      setTimeout(function () {
        this.pageIndex = 1
      this.$http.get(planPro.ajaxUrl.getcommunitynews+'?start='+this.pageIndex)
      .then(({data: {success, info, data}}) => {
        
        for (var i = 0; i < data.news.length; i++) {
          var imgUrlStr = data.news[i].imgUrl;
          if(typeof imgUrlStr !== 'undefined'){
            data.news[i].imgUrlList = imgUrlStr.split(',');
          }
        };

        this.$set('tasks', data.news);
      })

        $.pullToRefreshDone('.pull-to-refresh-content')
      }.bind(this), 1500)
    },
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.content')
      loader.show()
      setTimeout(() => {
        this.pageIndex += 1;
        this.$http.get(planPro.ajaxUrl.getcommunitynews+'?start='+this.pageIndex)
          .then(({data: {success, info, data}}) => {

            for (var i = 0; i < data.news.length; i++) {
              var imgUrlStr = data.news[i].imgUrl;
              if(typeof imgUrlStr !== 'undefined'){
                data.news[i].imgUrlList = imgUrlStr.split(',');
              }
            };

            var productList = data.news
            for (var i = 0; i < productList.length; i++) {
              this.tasks.push(productList[i]);
            };
        })
      
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    topSearch(){
      alert('开发中...');
    },
    commentDialog(){
      layer.open({
        content: '我要发表评论了！',
        btn: ['发布', '取消'],
        skin: 'footer',
        shadeClose: false,
        yes: function(index){
          //
        }
      });
    }
  },
  components: {
    TopSearch,
    Slider,
    Bar,
    BarItem,
    VLayer,
    VCardContainer,
    Card,
    VContent,
    List,
    Item,
    Btn,
    ShopList
  }
}
</script>

<style scoped>
.top-title{background-color: #4b4744; text-align: center;position: relative;color: #fff;height: 1.8rem;padding-top: 0.375rem;}
.top-tab{width: 5.625rem;margin: 0 auto;}
.top-tab li{width: 1.875rem;float: left;text-align: center;font-size: 0.5rem;}
.top-tab li.active{color: #f59e83;}
.top-tab li.active .cl{display: block;}
.top-tab li .cl{border-radius: 50%;display: none;width: 0.15rem;height: 0.15rem;background-color: #f59e83;margin: 0 auto;}
.top-topic .zd{background-color: #5fa92e;padding: 0.1rem 0.3rem;border-radius: 3px;margin-right: 1.5rem;color: #333;}
.top-topic a{color: #333;}
.cameralight{position: absolute;left:0.4rem;  font-size: 0.65rem; top: 0.5rem; color: #f59e83;}
.search{position: absolute; font-size: 0.6rem;right:0.4rem;top: 0.5rem;color: #f59e83;}

.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;background-color: #f8f8f8;color: #929292;font-size: 0.5rem;}

.f-block{padding: 0.5rem;margin-bottom: 0.5rem;background-color: #fff;}
.f-block img{width: 100%;}
.f-block .msg-title{color: #333;}
.f-block .msg-view{text-align: right;}
.f-block .msg-view .icon{margin-right: 0.5rem;}

.s-block{}
.s-block li{margin-bottom: 0.5rem;padding: 0.5rem;background-color: #fff;}
.s-block img{width: 3.2rem;float: left;}
.s-block .msg-title{color: #333;margin-left: 3.5rem;}
.s-block .msg-view{text-align: right;}
.s-block .msg-view .icon{margin-right: 0.5rem;}

.d-block{padding: 0.5rem;margin-bottom: 0.5rem;background-color: #fff;}
.d-block img{width: 100%;}
.d-block .msg-title{color: #333;margin-bottom: 0.5rem;}
.d-block .msg-person{width: 9rem;float: left;}
.d-block .msg-person li{float: left;width: 1rem;height: 1rem;border-radius: 50%;overflow: hidden;margin: 0.2rem;}
.d-block .msg-person li img{width: 100%;}
.d-block .msg-count{text-align: center;font-size: 0.2rem;}


.item-content{margin-bottom: .5rem;padding: 0rem 0.625rem;background-color: #fff;}
.item-content .head-img{height: 2.25rem;padding-top: 0.5rem;font-size:0.45rem;color: #333; }

.head-img img{width: 1.375rem;height: 1.375rem;border-radius: 50%;float: left;}
.head-img .h-title{display: inline-block;margin-left: 0.5rem;padding-top: 0.2rem;}
.head-img .share{float: right;color: #929292;}
.head-img .share .icon{color: #f59e83;}

.item-content .right{color: #333;}
.item-content .right p{margin-bottom: 0px;}
.item-content .right .r-tip{color: #f59e83;margin: 0px;}
.r-title{font-size: 1.05rem;}
.r-bottom{font-size: 0.6rem;}
.b-count{float: right;}


.product-list li{border: 0px solid #ddd;display: table-cell;width: 1%; }
.product-list li img{width: 100%;}
.product-list li .zs{position: absolute;bottom: 0px;background:rgba(255,255,255,0.7);width: 100%;color: #ef0005;font-size: .5rem;text-indent: .35rem;}

.comment-block{background-color: #f8f8f8;margin:0.5rem 0rem;padding:0.5rem 0.5rem;font-size: 0.5rem;}
.comment-block .username{font-weight: bold; }
.comment-block .more-comment{margin-top: 0.5rem;color: #aaa;}
.my-comment{font-size: 0.5rem;padding-bottom: 0.5rem;}
.input-comment{border-radius: 0.5rem;background-color: #f8f8f8;display: inline-block;height:1.3rem;line-height: 1.3rem;width: 12rem; text-indent: 1rem;margin-left: 1rem;}
</style>
