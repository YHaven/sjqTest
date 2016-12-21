<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <slider :banner="banner"></slider>
      <bar class="home-bar">
        <a class="tab-item " v-link="{path: '/home'}">
          <span class="icon iconfont icon-appreciatefill"></span>
          <span class="tab-label">推荐</span>
        </a>
        <a class="tab-item active" v-link="{path: '/msg/house'}">
          <span class="icon iconfont icon-likefill"></span>
          <span class="tab-label">小房子</span>
        </a>
        <a class="tab-item " v-link="{path: '/msg/topic'}">
          <span class="icon iconfont icon-comment"></span>
          <span class="tab-label">话题</span>
        </a>
      </bar>

    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        
        <div class="item-content" >
          <img v-bind:src="task.detailLogo" alt="">
          <div class="nick">这是哪呢？<i class="icon iconfont icon-likefill" :style="{color: '1' === '1' ? 'red': 'gray'}"></i></div>
          <div class="size">空闲</div>
          
        </div>
      </v-card-container>
    </div>
  </div>
</div>
</template>

<script>
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
    $.init()
  },
  data () {
    return {
      banner: [],
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

.item-content{height:3rem; }
.item-content{margin: 0px;padding: .25rem;box-shadow:none;height: 11rem;}
.item-content img{height: 8.5rem;width: 100%;}
.item-content .nick,.item-content .size{color: #aaa;font-size: .1rem;}
.item-content .nick .icon{float: right;}

</style>
