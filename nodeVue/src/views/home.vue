<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <!-- <top-title v-bind:parent-apptitle="apptitle"></top-title> -->
    <top-search></top-search>
    <slider :banner="banner"></slider>
    <bar class="home-bar">
      <bar-item path="/rank" label="男士入口" icon="clothesfill"></bar-item>
      <bar-item path="/user/tasks" label="女士入口" icon="goodsnewfill"></bar-item>
      <bar-item path="/invite" label="新品" icon="creativefill"></bar-item>
      <bar-item path="/invite" label="红人店" icon="medalfill"></bar-item>
    </bar>
    <div class="second-title"><i class="iconfont icon-time"></i>限时抢购</div>
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
        <card type="content">
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
        </card>
      </v-card-container>
    </div>
  </div>
</div>
</template>

<script>
import TopSearch from '../components/TopSearch'
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
      return this.$http.get('tasks.json')
      .then(({data: {code, message, data}}) => {
        this.$set('tasks', data);
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
        
        this.$http.get('tasks.json')
        .then(({data: {code, message, data}}) => {
          console.log(data);
          this.$set('tasks', data);
          // this.$set('apptitle', data[0].title);
          // this.$set('apptitle', '解忧大码');
        });
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
        let num = this.length + 1
        let title = `标题${num}`
        let adv = `abc${num}`
        let time = (new Date()).getTime() / 1000
        let point = 100 + num - 1
        this.tasks.push({
          id: num,
          title: title,
          advertiser: adv,
          status: '1',
          created: time,
          read_profit: point
        })
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
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
  background: #efeff4;
  height: 2.8rem;
  position: relative;
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.home-bar .tab-item {
  height: 2.8rem;
  background-color: white;
  color: #f7009d;
}

.webo-v img{width:100%;height:8rem}
.second-title{text-align: center;height: 2rem;line-height: 2rem;}
.shop-list{margin-bottom: 3rem;}
</style>
