<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="top-title">
      <i class="icon iconfont icon-cameralight cameralight"></i>
       玩社区 
       <i class="icon iconfont icon-notification notification"></i>
       <i class="icon iconfont icon-more more"></i>
    </div>
    <bar class="home-bar clearfix">
      <a class="tab-item active" >
        <span class="wc-ylgb-in"></span>
      </a>
      <a class="tab-item">
        <span class="wc-jfjs-in"></span>
      </a>
      <a class="tab-item" >
        <span class="wc-sjz-in"></span>
      </a>
    </bar>
    <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
    <ul class="top-topic">
      <li><a href=""><span class="zd">置顶</span><span class="c-title">今天很高兴，减肥成功</span></a></li>
      <li><a href=""><span class="zd">置顶</span><span class="c-title">今天不高兴，减肥时报</span></a></li>
      <li><a href=""><span class="zd">置顶</span><span class="c-title">今天又要减肥成功</span></a></li>
    </ul>
   
    <div class="card-container">
      
      <ul >
        
        <li class="item-content" v-for="task in tasks ">
          <div class="head-img">
            <img src="{{task.logoImg}}" alt="">
          </div>
          <div class="right">
            <p class="r-name" >{{task.title}}</p>
            <p class="r-title" v-if="task.artContent.length<=9">{{task.artContent}}</p>
            <p class="r-title" v-if="task.artContent.length>9">{{task.artContent.substring(0,9)+'...'}}</p>
            <ul class="product-list clearfix" >
              <li v-for="product in task.imgUrlList ">
                  <img v-bind:src="product" alt="">
                  <!-- <div class="zs">￥{{product.price}}</div> -->
              </li>
            </ul>
            <p class="r-bottom"><span class="b-time">30分钟前</span><span class="b-count"><i class="icon iconfont icon-comment"></i>{{task.substituteType}}</span></p>
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
.top-title{text-align: center;font-size: 1.2rem;padding-top: 0.25rem;padding-bottom: 0.25rem;border-bottom: 2px solid #000;position: relative;}
.top-topic{border-top: 2px solid #aaa;margin: .25rem;}
.top-topic li{height: 1.5rem;line-height: 1.5rem;border-bottom: 2px solid #000;}
.top-topic .zd{background-color: #5fa92e;padding: 0.1rem 0.3rem;border-radius: 3px;margin-right: 1.5rem;color: #333;}
.top-topic a{color: #333;}
.cameralight{position: absolute;left:0.8rem;  font-size: 1.15rem;}
.notification{position: absolute; font-size: 1.15rem;right:2.2rem;}
.more{position: absolute; font-size: 1.15rem;right:0.8rem;}

.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;}
.home { }
.home-bar {background: #fff;position: relative;/*box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);*/margin-bottom: .5rem;margin-top: .5rem;height: 4rem;}

.item-content{height: 8.5rem;border-bottom: 2px solid #333;margin-bottom: .5rem;}
.item-content .head-img{width: 3.125rem;float: left;}
.item-content .head-img img{width: 1.75rem;height: 1.75rem;border-radius: 50%;margin-left:0.625rem; }

.item-content .right{margin-left: 3.125rem;}
.item-content .right p{margin: 0;margin-right: .5rem;}
.r-title{font-size: 1.05rem;}
.r-bottom{font-size: 0.6rem;}
.b-count{float: right;}

.product-list li{float: left; width: 4rem;height:4rem;border: 1px solid #ddd; }
.product-list li img{width: 100%;height: 100%;}
.product-list li .zs{position: absolute;bottom: 0px;background:rgba(255,255,255,0.7);width: 100%;color: #ef0005;font-size: .5rem;text-indent: .35rem;}

</style>
