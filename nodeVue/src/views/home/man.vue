<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <!-- <top-title v-bind:parent-apptitle="apptitle"></top-title> -->
    <slider :banner="banner"></slider>
    <bar class="home-bar clearfix">
      <a class="tab-item active" v-link="{path:'/home/man'}">
        <span class="man-in"></span>
        <span class="tab-label">男士大码</span>
      </a>
      <a class="tab-item" v-link="{path: '/home/women'}">
        <span class="women-in"></span>
        <span class="tab-label">女士大码</span>
      </a>
      <a class="tab-item" v-link="{path: '/home/news'}">
        <span class="show-in"></span>
        <span class="tab-label">新品</span>
      </a>
    </bar>
    <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
    <div class="second-title">
     
    </div>
   
    <div class="card-container">
      
      <div v-for="task in tasks | orderBy 'created' 1">
        
        <div class="item-content" >
          <div class="shop-title">
            <img class="shop-name-icon" src="{{task.company.imgUrl}}" alt="">
            <div class="shop-name-info">
                <p class="shop-name">{{task.company.name}}</p>
                <p class="shop-sale">销量{{task.company.sellCount}} 共{{task.company.count}}件宝贝</p>
            </div>
          </div>
          <ul class="product-list">
            <li v-for="product in task.shopProduct | orderBy 'created' 1">
                <img v-bind:src="product.imgUrl" alt="">
                <div class="zs">￥{{product.price}}</div>
            </li>
          </ul>
          
        </div>
      </div>
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

      return this.$http.get(planPro.ajaxUrl.manBT+'?start=1')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.product);
        this.$set('banner', data.banner);
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
      this.$http.get(planPro.ajaxUrl.manBT+'?start='+this.pageIndex)
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.product);
        this.$set('banner', data.banner);
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
        this.$http.get(planPro.ajaxUrl.manBT+'?start='+this.pageIndex)
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
