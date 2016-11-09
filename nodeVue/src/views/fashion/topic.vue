<template>
<div class="container">
  <div class="content fashion" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <!-- <top-title v-bind:parent-apptitle="apptitle"></top-title> -->
    <top-search v-top-search="topSearch"></top-search>
    <div class="top-current">
        <bar v-if="isFashion">
          <bar-item path="/fashion/recommend" label="推荐" icon=""></bar-item>
          <!-- <bar-item path="/tasks" label="任务" icon="tasks"></bar-item> -->
          <bar-item path="/fashion/concern" label="朋友圈" icon=""></bar-item>
          <bar-item path="/fashion/topic" label="话题" icon=""></bar-item>
          <!-- <bar-item path="/more" label="更多" icon="more"></bar-item> -->
        </bar>
    </div>

    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1" class="cardTopicItem">
        <div class="item-content" >
          <img v-bind:src="task.detailLogo" alt="">
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
import TopSearch from '../../components/TopSearch'
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'


import {loader} from '../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {
      return this.$http.get('/static/data/bannertasks.json')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.productList);
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
      topBannerImg:'/static/img/s2.jpg',
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
        
      this.$http.get('/main/index')
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
        this.$http.get('/main/index')
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
    TopSearch,
    VLayer,
    VCardContainer,
    Bar,
    BarItem
  }
}
</script>

<style scoped>
.fashion {
  top: -2.2rem !important;
  margin-bottom: 2.2rem;
}
.top-current .bar{position: relative;}
.top-current .bar-tab .tab-item .icon ~ .tab-label{font-size: inherit;top:auto;display: inline;}
.top-banner img{max-width: 100%;}

.fashion .cardTopicItem{width:100%;height:4.75rem;margin: 0px;padding: .25rem;box-shadow:none;margin-bottom: .75rem;}
.fashion .cardTopicItem img{height: 4.75rem;width: 4.375rem;float: left;}
.fashion .cardTopicItem .right{margin-left: 4.375rem;height: 4.75rem;text-align: center;border-bottom: 1px solid #000;border-top: 1px solid #000;}
.fashion .cardTopicItem .right .r-t{font-size: .9rem;margin-top: .2rem;font-weight: 700;}
.fashion .cardTopicItem .right .r-c{font-size: .6rem;margin-top: .2rem;color: #aaa;}
.fashion .cardTopicItem .right .r-h{text-align: right;}

.webo-v img{width:100%;height:9rem}
.second-title{text-align: center;height: 2rem;line-height: 2rem;}
.shop-list{margin-bottom: 3rem;}

.item-content{max-height:6rem; }
.item-content img{max-width: 100%;}
</style>
