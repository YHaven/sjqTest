<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <!-- <top-title v-bind:parent-apptitle="apptitle"></top-title> -->
    <slider :banner="banner"></slider>
    <bar class="home-bar clearfix">
      <a class="tab-item" v-link="{path:'/home/manlist'}">
        <span class="man-in"></span>
        <span class="tab-label">男士大码</span>
      </a>
      <a class="tab-item" v-link="{path: '/home/manlist'}">
        <span class="women-in"></span>
        <span class="tab-label">女士大码</span>
      </a>
      <a class="tab-item" v-link="{path: '/invite'}">
        <span class="show-in"></span>
        <span class="tab-label">中老年大码</span>
      </a>
      <a class="tab-item" v-link="{path: '/invite'}">
        <span class="show-in"></span>
        <span class="tab-label">设计师</span>
      </a>
    </bar>
    <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
    <div class="second-title">
      <img src="/static/img/home-title.jpg" alt="">
    </div>
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
      <!-- <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(224, 224, 224)' }"> -->
      <div v-for="task in tasks | orderBy 'created' 1">
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
          <div class="shop-title">
            <img class="shop-name-icon" src="/static/img/shop-name-icon.jpg" alt="">
            <div class="shop-name-info">
                <p class="shop-name">XX店铺</p>
                <p class="shop-sale">销量10000 共500件宝贝</p>
            </div>
          </div>
          <ul class="product-list">
            <li>
                <img v-bind:src="task.imgUrl" alt="">
                <div class="zs">￥123.00</div>
            </li>
            <li>
                <img v-bind:src="task.imgUrl" alt="">
                <div class="zs">￥123.00</div>
            </li>
            <li>
                <img v-bind:src="task.imgUrl" alt="">
                <div class="zs">￥123.00</div>
            </li>
          </ul>
          
        </div>
      </div>
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
      // return this.$http.get('/static/data/tasks.json')
      // .then(({data: {code, message, data}}) => {
      //   this.$set('tasks', data);
      //   // this.$set('apptitle', data[0].title);
      //   // this.$set('apptitle', '解忧大码');
      // })
      // return this.$http.get('/static/data/bannertasks.json')
      return this.$http.get(planPro.ajaxUrl.homeBT+'?start=1')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.product);
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
      baseHome:baseStaticPath,  //全局变量   /fat
      banner: [],
      tasks: [],
      pageIndex : 0,
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
        this.pageIndex = 1
      this.$http.get(planPro.ajaxUrl.homeBT+'?start='+this.pageIndex)
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.product)
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
        this.pageIndex += 1;
        this.$http.get(planPro.ajaxUrl.homeBT+'?start='+this.pageIndex)
          .then(({data: {success, info, data}}) => {
            var productList = data.product
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
  height: 3rem;
}

.webo-v img{width:100%;height:9rem}
.second-title{text-align: center;padding-top: 0.75rem;border-top: 1px solid #333;}
.second-title img{width: 100%;}
.shop-list{margin-bottom: 3rem;}

.item-content{height:8.2rem; border-bottom: 1px solid #333; }
.bar-tab .tab-label{display: block;font-weight: bold;font-size: 12px;}

.shop-title{height: 2.5rem;padding-top: .5rem;}
.shop-name-icon{height: 1.5rem;width: 1.5rem;float: left;margin-left: 0.675rem;}
.shop-name-info{margin-left: 3.75rem;font-weight: bold;}
.shop-name-info p{margin: 0px;}
.shop-name{font-size: .6rem;}
.shop-sale{font-size: .45rem;}
.product-list li{width: 5.2rem;height: 5.2rem;float: left;margin: 0rem 0.05rem;position: relative;}
.product-list li img{width: 100%;height: 100%;}
.product-list li .zs{position: absolute;bottom: 0px;background:rgba(255,255,255,0.7);width: 100%;color: #ef0005;font-size: .5rem;text-indent: .35rem;}
</style>
