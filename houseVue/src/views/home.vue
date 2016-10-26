<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <slider :banner="banner"></slider>
      <bar v-if="isFashion" class="home-bar">
        <bar-item path="/home" label="推荐" icon="appreciatefill"></bar-item>
        <!-- <bar-item path="/tasks" label="任务" icon="tasks"></bar-item> -->
        <bar-item path="/fashion/concern" label="小房子" icon="likefill"></bar-item>
        <bar-item path="/fashion/topic" label="话题" icon="comment"></bar-item>
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
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(224, 224, 224)' }">
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
          <img v-bind:src="task.detailLogo" alt="">
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

import {loader} from '../util/util'
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
      return this.$http.get('/static/data/bannertasks.json')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.productList);
        // this.$set('apptitle', data[0].title);
        // this.$set('apptitle', '解忧大码');
      })
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      banner: [],
      tasks: [],
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
        
      this.$http.get('/static/data/bannertasks.json')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.productList)
        // this.$set('apptitle', data[0].title);
        // this.$set('apptitle', '解忧大码');
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
        this.$http.get('/static/data/bannertasks.json')
          .then(({data: {success, info, data}}) => {
            var productList = data.productList
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

<style>
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





.webo-v img{width:100%;height:9rem}
.second-title{text-align: center;height: 2rem;line-height: 2rem;}
.shop-list{margin-bottom: 3rem;}

.item-content{max-height:6rem; }
.item-content img{max-width: 100%;}
</style>
