<template>
<div class="container">
  <home-btn></home-btn>
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>

    <slider :banner="banner"></slider>
      <bar class="home-bar">
        <a class="tab-item active" v-link="{path: '/home'}">
          <span class="icon iconfont icon-appreciatefill"></span>
          <span class="tab-label">推荐</span>
        </a>
        <a class="tab-item " v-link="{path: '/msg/house'}">
          <span class="icon iconfont icon-likefill"></span>
          <span class="tab-label">小房子</span>
        </a>
        <a class="tab-item " v-link="{path: '/msg/topic'}">
          <span class="icon iconfont icon-comment"></span>
          <span class="tab-label">话题</span>
        </a>
        <!-- <bar-item path="/more" label="更多" icon="more"></bar-item> -->
      </bar>
    <!-- <shop-list class="shop-list"></shop-list> -->
    <!-- <v-content type="block-title" style="margin: 0 0 0.4rem;
    -webkit-box-shadow: 0 .06rem 0 #ccc;box-shadow: 0 .06rem 0 #ccc;background-color: white;">
      <btn style="float:left;margin: .4rem 0 .3rem .6rem;border:0;color:#6d6d72;padding:0">
      任务推荐
      </btn>
      <btn types="link"
        style="float:right;margin: .4rem .6rem .3rem 0;border:0;border:0;padding:0"
        v-link="{path: '/tasks', replace: true}">
        更多任务
      </btn>
    </v-content> -->
    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        <!-- <card type="content">
          <list type="media">
              <li class="item-content">
                <item type="media">
                  <img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44">
                </item>
                <item type="inner">
                  <item type="title-row">
                    <item type="text">{{task.title}}</item>
                    <item type="text">{{task.created | date 2}}</item>
                  </item>
                </item>
              </li>
          </list>
        </card>
        <card type="footer" >
          <div style="color:gray">
          赞助商：{{task.advertiser}}
          <span style="margin-left: 1rem;padding: .1rem;border: 1px solid #929292;" :style="{color: task.status === '1' ? 'green': 'gray' }">{{task.status === '0' ? '结束' : '已领'}}</span>
          </div>
          <span :style="{color: task.status === '1' ? 'orange': 'gray',fontWeight:'bold'}">{{task.read_profit}} 积分</span>
        </card> -->
        <div class="item-content" >
          <a href="javascript:;" class="head-img"><img src="{{task.headurl}}" alt=""></a>
          <div class="info-content">
            <a href="" class="info-author">{{task.author}}<span class="author-role">{{task.authorrole === 1 ? '管理员' : task.authorrole === 2 ? '会员' : '其他'}}</span><i class="icon iconfont {{task.authorsex === 1? 'icon-male' : 'icon-female'}}"></i></a>
            <a href="" class="info-title">{{task.msginfo}}</a>
          </div>
          
        </div>
      </v-card-container>
    </div>
  </div>
</div>
</template>

<script>
import Slider from '../components/Slider'
import Bar from '../components/Bar'
import BarItem from '../components/BarItem'
import VLayer from '../components/PullToRefreshLayer'
import VCardContainer from '../components/Card'
import Btn from '../components/Button'
import Card from '../components/CardItem'
import VContent from '../components/Content'
import List from '../components/List'
import Item from '../components/ListItem'
import ShopList from '../components/ShopList'
import HomeBtn from '../components/HomeBtn'

import {loader} from '../util/util'
import * as commonUtil from '../util/commonUtil'
import $ from 'zepto'

export default {
  route: {
    data () {
      // return this.$http.get('/static/data/tasks.json')
      // .then(({data: {code, message, data}}) => {
      //   this.$set('tasks', data);
      //   // this.$set('apptitle', data[0].title);
      //   // this.$set('apptitle', '解忧大码');
      // })
      return this.$http.get('http://www.zhencome.com/plana/msg!list.action?vt=1&page=1&msgResource=3')
      .then(({data: {status, page, datalist}}) => {
        this.$set('tasks', datalist);
      })
    }
  },
  ready () {
    $.init();
    console.log(commonUtil.getQueryString("id"));
  },
  data () {
    return {
      banner: [
                {
                  "imgUrl": "/static/img/sw1.jpg",
                  "url": "/"
                },
                {
                  "imgUrl": "/static/img/sw2.jpg",
                  "url": "/"
                },
                {
                  "imgUrl": "/static/img/sw3.jpg",
                  "url": "/"
                }
            ],
      tasks: [],
      page:1,
      isFashion: true,
      apptitle: '解忧大码',
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
        this.page = 1
        var page = '&page='+ this.page
        this.$http.get('http://www.zhencome.com/plana/msg!list.action?vt=1&msgResource=3'+page)
      .then(({data: {status, page, datalist}}) => {
        this.$set('tasks', datalist);
      })

        // let num = this.length + 1
        // let title = `标题${num}`
        // let adv = `abc${num}`
        // let time = (new Date()).getTime() / 1000
        // let point = 100 + num - 1
        // this.tasks.push({
        //   id: num,
        //   title: title,
        //   advertiser: adv,
        //   status: '1',
        //   created: time,
        //   read_profit: point
        // })
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
        this.page = this.page + 1
        var page = '&page='+ this.page
        this.$http.get('http://www.zhencome.com/plana/msg!list.action?vt=1&msgResource=3'+page)
          .then(({data: {status, page, datalist}}) => {
            for (var i = 0; i < datalist.length; i++) {
              this.tasks.push(datalist[i]);
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
    HomeBtn
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.home {
  top: -2.2rem !important;
  margin-bottom: 2.2rem;
}
.home-bar {
  background: #fff;
  position: relative;
  /*box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);*/
  margin-bottom: .5rem;
  margin-top: .5rem;
}

.item-content{height:3rem; }
.item-content .head-img{width: 4rem;height: 3rem;display: block;float: left;}
.item-content .head-img img{height: 100%;width: 100%;}
.item-content .info-content{margin-left: 4.5rem;}
.info-content .info-author{color: #333;display: block;}
.info-author .author-role{margin-right: .3rem;margin-left: .3rem;background-color: #62ffc9;border-radius: 3px;color: #536160;font-size: 0.5rem;}
.info-author .iconfont{color: #ff3136;}
.info-content .info-title{color: #aaa;display: block;}

</style>
