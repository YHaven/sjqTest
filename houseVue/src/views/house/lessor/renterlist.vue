<template>
<div class="container">
  <div class="content profile fade-transition home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <header class="bar bar-nav" >
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/lessor/roomlist', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title">租客</h1>
  </header>
    <div class="tph-info">
      <a href="javascript:;" class="head-img"><img src="{{roominfo.uploadImg}}" alt=""></a>
        <div class="right">
          <a href="/house/lessor/roomoper">
          <div class="r-t">{{roominfo.roomName}}</div>
          <div class="r-c">{{roominfo.houseName}}</div>
          </a>
        </div>
    </div>
    <div class="submit-button">
    <button class="button button-big button-fill" v-link="{path: '/house/lessor/renteroper', replace: true}">+添加租客</button>
  </div>
    <div class="card-container" >
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        
        <div class="item-content" >
          <a href="/house/lessor/rentallist">
          <div class="room-item">
            <div class="r-t"> {{task.renterName}}</div>
            <div class="r-c">{{task.renterPhone}}</div>
            <i class="icon icon-roundright"></i>
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
      return this.$http.get('/static/data/renterlist.json?vt=2')
      .then(({data: {status, page, roominfo, datalist}}) => {
        this.$set('tasks', datalist);
        this.$set('roominfo', roominfo);
      })
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      roominfo: {},
      tasks: [],
      page:1,
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
        this.$http.get('/static/data/renterlist.json?vt=2'+page)
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
        this.$http.get('/static/data/renterlist.json?vt=2'+page)
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



.item-content{}
.item-content .head-img{width: 4rem;height: 4.75rem;display: block;float: left;}
.item-content .head-img img{height: 100%;width: 100%;}
.item-content .info-content{margin-left: 4.5rem;}
.info-content .info-author{color: #333;display: block;}
.info-author .author-role{margin-right: .3rem;margin-left: .3rem;background-color: #62ffc9;border-radius: 3px;color: #536160;font-size: 0.5rem;}
.info-author .iconfont{color: #ff3136;}
.info-content .info-title{color: #aaa;display: block;}


.room-item {padding: .5rem; position: relative;}
.room-item .r-t{color: #333;font-weight: 700;}
.room-item .r-c{color: #999;font-size: .2rem;}
.room-item .icon{position: absolute;right: .5rem;top: .8rem;font-size: 1rem;}

.tph-info {margin: .5rem;box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3)}
.tph-info .head-img{width: 4rem;height: 4.75rem;display: block;float: left;}
.tph-info .head-img img{height: 100%;width: 100%;}
.tph-info .right{margin-left: 4.375rem;height: 4.75rem;text-align: center;padding-top: 1rem;}
.tph-info .right .r-t{font-size: .9rem;margin-top: .2rem;font-weight: 700;}
.tph-info .right .r-c{font-size: .6rem;margin-top: .2rem;color: #aaa;}
.tph-info .right .r-h{text-align: right;}


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
