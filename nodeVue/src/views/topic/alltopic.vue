<template>

<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="top-title">
      <i class="icon iconfont icon-back_light left"></i>
        全部话题
      <i class="icon iconfont icon-more right"></i>
    </div>
    <div class="card-container">
      <ul class="clearfix">
        <li class="item-content" v-for="task in tasks ">
          <img class="content-img" src="{{task.logoImg}}" alt="">
          <div class="tip-info">
            <p>#瘦到最后#</p>
            <p>49516人参加</p>
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
.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;background-color: #f8f8f8;color: #929292;font-size: 0.5rem;}
.home{background-color: #fff;}
.card-container{background-color: #f5f5f5;}



.item-content{position: relative; padding: 0rem 0.35rem; background-color: #fff;width:50%;float: left;}
.item-content .tip-info{position: absolute;width: 7.5rem;height:4.25rem;background: rgba(0,0,0,0.3);top: 0px;color: #fff;font-size: 0.8rem;text-align: center;}
.item-content .tip-info p{margin-bottom: 0px;margin-top: 0.5rem;}
.item-content img{width: 7.5rem;height:4.25rem;border-radius: 0.2rem; border: 0px;}


.fashion-title{font-size: 1rem;color: #333;}
.fashion-title .f-block{display: inline-block;height: 0.45rem;width: 0.225rem;background-color: #8b5ab6;}
.top-img img{width: 100%;}

.top-title{text-align: center;font-size: 1.2rem;padding-bottom: 0.25rem;position: relative;color: #fff;background-color: #4b4744;margin-bottom: 0.3rem;}
.top-title i{font-size: 1rem;}
.left{float: left;}
.right{float: right;}
</style>
