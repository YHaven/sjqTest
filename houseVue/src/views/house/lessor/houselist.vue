<template>
<div class="container">
  <div class="content profile fade-transition home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <header class="bar bar-nav" >
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/entry', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title">我的房产</h1>
  </header>
    <div class="submit-button">
    <button class="button button-big button-fill" v-link="{path: '/house/lessor/houseoper', replace: true}">+添加房产</button>
  </div>
    <div class="card-container" >
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        
        <div class="item-content" >
          <a href="javascript:;" class="head-img"><img src="{{task.uploadImg}}" alt="房屋缩略图"></a>
          <a v-link="{path: '/house/lessor/roomlist?id='+task.id, replace: true}">
          <div class="right">
            <div class="r-t">{{task.houseName}}</div>
            <div class="r-c">住宅{{task.allCount}}套，空闲{{task.emptyCount}}套</div>
          </div>
          </a>
        </div>
      </v-card-container>
    </div>
  </div>
</div>
</template>

<script>
import Slider from '../../../components/Slider'
import Bar from '../../../components/Bar'
import BarItem from '../../../components/BarItem'
import VLayer from '../../../components/PullToRefreshLayer'
import VCardContainer from '../../../components/Card'
import Btn from '../../../components/Button'
import Card from '../../../components/CardItem'
import VContent from '../../../components/Content'
import List from '../../../components/List'
import Item from '../../../components/ListItem'
import ShopList from '../../../components/ShopList'

import {loader} from '../../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {
      return this.$http.get('/static/data/houselist.json')
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
        this.$http.get('/static/data/houselist.json?vt=2'+page)
        .then(({data: {status, page, datalist}}) => {
          this.$set('tasks', datalist);
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
        this.page = this.page + 1
        var page = '&page='+ this.page
        this.$http.get('/static/data/houselist.json?vt=2'+page)
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



.item-content{}
.item-content .head-img{width: 4rem;height: 4.75rem;display: block;float: left;}
.item-content .head-img img{height: 100%;width: 100%;}
.item-content .info-content{margin-left: 4.5rem;}
.info-content .info-author{color: #333;display: block;}
.info-author .author-role{margin-right: .3rem;margin-left: .3rem;background-color: #62ffc9;border-radius: 3px;color: #536160;font-size: 0.5rem;}
.info-author .iconfont{color: #ff3136;}
.info-content .info-title{color: #aaa;display: block;}

.item-content .right{margin-left: 4.375rem;height: 4.75rem;text-align: center;padding-top: 1rem;}
.item-content .right .r-t{font-size: .9rem;margin-top: .2rem;font-weight: 700;}
.item-content .right .r-c{font-size: .6rem;margin-top: .2rem;color: #aaa;}
.item-content .right .r-h{text-align: right;}

.profile .bar{position: relative;}
.profile .bar .title{font-weight: bold;}
.profile .submit-button {
  margin: 0 auto ;
  width: 100%;
  padding: 0 .45rem;
  margin-top: .45rem;
}
.profile .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 1.8rem !important;
  height: 1.8rem !important;
}


</style>
