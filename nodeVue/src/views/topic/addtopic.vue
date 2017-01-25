<template>
<div class="container">
  <div class="top-title bar bar-nav">
    <i class="icon iconfont icon-back_light left"></i>
      发帖
    <i class="icon iconfont icon-forward right" @click="sendTopic()">发送</i>
  </div>
  <div class="content home" >
    <form class="topic-form" id="topicForm">
      <input type="text" value="" name="title" id="title" placeholder="标题"/>
      <textarea name="artContent" id="artContent" cols="30" rows="10" class="topic-content" placeholder="内容"></textarea>
      <div class="imgDiv">
        <file-input></file-input>
      </div>
      
    </form>
    
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

import FileInput from '../../components/FileInput'

import {loader} from '../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      banner:[],
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
    sendTopic(){

      var _this = this;

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
      paramsJson.type = planPro.fun.getQueryString('type'); //（话题类型：不传表示首页，1表示时尚搭配，2表示减肥）
      var imgUrlArr = [];
      $('.camera-area .imgShow').find('li').each(function(){
        imgUrlArr.push($(this).find('input').val())
      })
      paramsJson.imgUrl = imgUrlArr.join(',');
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
    ShopList,
    FileInput
  }
}
</script>

<style scoped>
.art-edit{position:fixed;bottom: 3rem;right: 0.5rem;width: 2rem;height: 2rem;line-height: 2rem;border-radius: 50%;text-align: center;background-color: #f59e83;color: #fff;z-index: 2;}
.container {position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  overflow: auto;  -webkit-overflow-scrolling: touch;background-color: #f8f8f8;color: #929292;font-size: 0.5rem;}

.content{margin-bottom: 2.5rem;}

.topic-form{margin: 0.5rem;}
.topic-form input,.topic-form textarea{border: 0px;border-radius: 5px;width: 100%;margin-bottom: 0.5rem;}
.topic-form input{height: 1.5rem;}

.imgDiv .addImgBtn{border: 2px solid #ccc5c7;border-radius: 5px; width: 4.75rem;height: 4.75rem;line-height: 4.75rem;text-align: center;color: #ccc5c7;font-size: 2rem;}



.top-title{text-align: center;font-size: 1.2rem;padding-bottom: 0.25rem;border-bottom: 1px solid #000;position: relative;}
.top-title i{font-size: 1rem;}
.left{float: left;}
.right{float: right;}
.top-title i.right{font-size: 0.8rem;color: #d84141}
</style>
