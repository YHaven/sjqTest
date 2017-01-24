<template>
<div class="art-edit" v-link="{path: '/topic/addtopic?type=1', replace: true}"><i class="icon iconfont icon-write"></i></div>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="top-title">
      <i class="icon iconfont icon-back_light left"></i>
        时尚搭配
      <i class="icon iconfont icon-more right"></i>
    </div>
    <div class="fashion-title">
      <span class="f-block"></span>
      <span>时尚频道</span>
    </div>
    <div class="top-img">
      <img src="/static/img/fashion-img1.jpg" alt="">
    </div>
    <div class="top-img">
      <img src="/static/img/fashion-img2.jpg" alt="">
    </div>
    <div class="top-img">
      <img src="/static/img/fashion-img3.jpg" alt="">
    </div>

    <div class="card-container">
      <div class="top-img">
        <img src="/static/img/fashion-img4.jpg" alt="">
      </div>
      <ul class="clearfix">
        <li class="item-content" v-for="task in tasks ">
          <img class="content-img" src="{{task.logoImg}}" alt="">
          <div class="user-info clearfix">
            <img src="/static/img/1.jpg" alt="">
            <div class="user-name">
              <div class="nick">久呢</div>
              <!-- <div class="size">163cm,70kg</div> -->
            </div>
            <!-- <i class="icon iconfont icon-likefill" :style="{color: '1' === '1' ? 'red': 'gray'}"></i> -->
            
          </div>
          <div class="c-tips">
            <span>逛街</span><span>显瘦</span><span>显高</span>
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
      var _this = this;

      var topicHtml = '<form id="topicForm" class="dialogForm"><table>';
      topicHtml += '<tr><td style="width:2rem;">*标题:</td><td><input name="title" id="title" type="text" value=""/></td></tr>';
      topicHtml += '<tr><td>图片:</td><td><input name="imgUrl" id="imgUrl" type="text" value=""/></td></tr>';
      topicHtml += '<tr><td>内容:</td><td><textarea name="artContent" id="artContent" cols="30" rows="10"></textarea></td></tr>';
      topicHtml += '</table></form>';


      layer.open({
        content: topicHtml,
        btn: ['发布', '取消'],
        skin: 'footer',
        shadeClose: false,
        yes: function(index){
          //
          var params = $('#topicForm').serializeArray();
          var paramsJson = planPro.fun.serializeArrayToJson(params);
          if(paramsJson.title === ''){
            layer.open({content: '标题未填写！',skin: 'msg',time: 2});
            return false;
          }
          if(paramsJson.artContent === ''){
            layer.open({content: '内容不能为空！',skin: 'msg',time: 2});
            return false;
          }
          paramsJson.type = '1'; //（话题类型：不传表示首页，1表示时尚搭配，2表示减肥）
          if (_this.loading) return false

          _this.loading = true
          loader.show()
          _this.$http.post(planPro.ajaxUrl.addcommunitycomment,paramsJson)
          .then(({data}) => {
              console.log(data)
              _this.loading = false
              loader.hide()
          })


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
.art-edit{position:fixed;bottom: 3rem;right: 0.5rem;width: 2rem;height: 2rem;line-height: 2rem;border-radius: 50%;text-align: center;background-color: #f59e83;color: #fff;z-index: 2;}
.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;background-color: #f8f8f8;color: #929292;font-size: 0.5rem;}
.home{padding: 0.45rem;background-color: #fff;}
.card-container{background-color: #f5f5f5;}


.item-content{margin: 0rem 0.15rem; margin-bottom: .5rem;background-color: #fff;width:7.2rem;float: left;}
.item-content .content-img{height: 10.5rem;width:100%;border: 0px;}
.user-info img{width: 1.3rem;height: 1.3rem;border-radius: 50%;float: left;margin-left: 0.3rem;}
.user-name{width: 3rem;display: inline-block;margin-left: 0.25rem;font-size: 0.5rem;margin-top: 0.25rem;}
.user-info .icon{float: right;}
.c-tips{margin: 0.3rem;}
.c-tips span{display: inline-block;padding:0rem 0.3rem;border-right: 1px solid #ddd;}
.c-tips span:last-child{border-right: 0px;}

.fashion-title{font-size: 1rem;color: #333;}
.fashion-title .f-block{display: inline-block;height: 0.45rem;width: 0.225rem;background-color: #8b5ab6;}
.top-img img{width: 100%;}

.top-title{text-align: center;font-size: 1.2rem;padding-bottom: 0.25rem;border-bottom: 1px solid #000;position: relative;}
.top-title i{font-size: 1rem;}
.left{float: left;}
.right{float: right;}
</style>
