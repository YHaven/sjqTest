<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="top-title">
      <i class="icon iconfont icon-creative cameralight"></i>
      <ul class="top-tab clearfix">
        <li v-link="{path: '/topic/index', replace: true}"><span>广场</span><span class="cl"></span></li>
        <li v-link="{path: '/topic/hot', replace: true}" ><span>热门</span><span class="cl"></span></li>
        <li v-link="{path: '/topic/concern', replace: true}" class="active"><span>关注</span><span class="cl"></span></li>
      </ul> 
      <i class="icon iconfont icon-search search"></i>
    </div>
    
    <div class="recommend-for">
      <p class="recommend-top"><span>为你推荐</span><i class="icon iconfont icon-close_light"></i></p>
      <ul class="clearfix">
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
        <li>
          <img src="/static/img/1.jpg" alt="">
          <div class="recommend-name">奥运xxx</div>
          <div class="recommend-real">认证:xxx达人</div>
        </li>
      </ul>
    </div>
    
    <div class="search-more-group"><i class="icon iconfont icon-friend"></i>查看更多小伙伴<i class="icon iconfont icon-right"></i></div>



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

.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;background-color: #f8f8f8;color: #929292;}


.recommend-for{font-size: 0.6rem;text-align: center;}
.recommend-top{text-align: left;padding:0rem 0.5rem;}
.recommend-top .icon{float: right;}
.recommend-for li{width:5.325rem;float: left;margin: 0.5rem 0rem;  }
.recommend-for li img{border-radius: 50%;width: 3.5rem;height: 3.5rem;}
.recommend-name{color: #333;}
.search-more-group{text-align: center;font-size: 0.8rem;margin: 0.3rem 0rem;}
.search-more-group i{font-size: 1rem;}

.art-edit{position:fixed;bottom: 3rem;right: 0.5rem;width: 2rem;height: 2rem;line-height: 2rem;border-radius: 50%;text-align: center;background-color: #f59e83;color: #fff;z-index: 2;}
.home { }
.home-bar {background: #fff;position: relative;/*box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);*/padding-bottom: .5rem;padding-top: .5rem;height: 4rem;}
.home-bar .icon{color:#f59e83;}
.home-bar .tab-item{border-right: 1px solid #ddd;}
.home-bar .tab-item:last-child{border-right: 0px;}

.recommend{margin-top: 0.4rem;height:2rem;padding-top: 0.45rem;background-color: #fff; font-size: 0.5rem;padding-left: .625rem;padding-right: .625rem;border-bottom: 1px solid #e2e2e2;}
.recommend .icon{float: right;margin-left: 1rem;}
.recommend .active{color: #f59e83;}


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
