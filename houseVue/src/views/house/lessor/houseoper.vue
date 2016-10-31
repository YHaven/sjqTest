<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <slider :banner="banner"></slider>
      <bar class="home-bar">
        <a class="tab-item " href="/home">
          <span class="icon iconfont icon-appreciatefill"></span>
          <span class="tab-label">推荐</span>
        </a>
        <a class="tab-item" href="/msg/house">
          <span class="icon iconfont icon-likefill"></span>
          <span class="tab-label">小房子</span>
        </a>
        <a class="tab-item active" href="/msg/topic">
          <span class="icon iconfont icon-comment"></span>
          <span class="tab-label">话题</span>
        </a>
        
      </bar>

    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        
        <div class="item-content" >
          <a href="javascript:;" class="head-img"><img src="{{task.headurl}}" alt=""></a>
          <div class="right">
            <div class="r-t">#夏末如何穿更显瘦#</div>
            <div class="r-c">专属女生的美丽选择，怎么能只穿春秋不顾秋冬呢？</div>
            <div class="r-h">人气:1000</div>
          </div>
          
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

.item-content{}
.item-content .head-img{width: 4rem;height: 4.75rem;display: block;float: left;}
.item-content .head-img img{height: 100%;width: 100%;}
.item-content .info-content{margin-left: 4.5rem;}
.info-content .info-author{color: #333;display: block;}
.info-author .author-role{margin-right: .3rem;margin-left: .3rem;background-color: #62ffc9;border-radius: 3px;color: #536160;font-size: 0.5rem;}
.info-author .iconfont{color: #ff3136;}
.info-content .info-title{color: #aaa;display: block;}

.item-content .right{margin-left: 4.375rem;height: 4.75rem;text-align: center;}
.item-content .right .r-t{font-size: .9rem;margin-top: .2rem;font-weight: 700;}
.item-content .right .r-c{font-size: .6rem;margin-top: .2rem;color: #aaa;}
.item-content .right .r-h{text-align: right;}

</style>
