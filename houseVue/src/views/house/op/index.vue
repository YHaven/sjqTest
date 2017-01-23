<template>
<div class="container">
  <top-header path="/house" label="房屋首页" class="index-topheader" titleclass="color:#fff;" iconclass="color:#fff;"></top-header>
  <bar class="home-bar">
    <a class="tab-item" v-link="{path: '/house'}">
      <span class="icon iconfont icon-sort"></span>
      <span class="tab-label">未收账单</span>
    </a>
    <a class="tab-item " v-link="{path: '/msg/house'}">
      <span class="icon iconfont icon-remind"></span>
      <span class="tab-label">即将到期</span>
    </a>
  </bar>


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
import TopHeader from '../../../components/TopHeader'

import {loader} from '../../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {}
  },
  ready () {
    $.init()
  },
  data () {
    return {
      banner: [],
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
    refresh () {},
    loadMore () {}
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
    TopHeader
  }
}
</script>

<style scoped>

.index-topheader{
  background-color: #15a3f9;
}

.home-bar {
  background: #fff;
  position: relative;
  /*box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);*/
  padding-bottom: .5rem;
  margin-top: 2.2rem;
  background-color: #15a3f9;
  color: #fff;
}


.bar-tab .tab-item{
  color: #fff;
}



</style>
