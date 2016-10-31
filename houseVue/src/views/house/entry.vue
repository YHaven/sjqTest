<template>
<div class="container">
  <div class="content home" distance="55" >
    <v-layer></v-layer>
    <slider :banner="banner"></slider>
    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1"
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        

        <div class="item-content">
          <a href="/house/{{task.path}}">
            <img v-bind:src="task.imgurl" alt="">
          </a>
          
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
      var entryList = [];
      for (var i = 0; i < 2; i++) {
        var entryObj = {};
        entryObj.id = i+1
        if(i == 0) entryObj.path = 'lessor/houselist'
        if(i == 1) entryObj.path = 'lessee/houselist'
        entryObj.imgurl = '/static/img/sw'+ (i+1) +'.jpg'
        entryList.push(entryObj)
      };
    

      this.$set('tasks', entryList);
      
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      banner: [],
      tasks: [],
      loading: false
    }
  },
  computed: {
    length () {
      return this.tasks.length
    }
  },
  methods: {
    
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

</style>

<style scoped>
  .item-content{height:9rem; }
  .item-content{margin: 0px;padding: .25rem;box-shadow:none;}
  .item-content img{height: 8.5rem;width: 100%;}
  .item-content .nick,.item-content .size{color: #aaa;font-size: .1rem;}
  .item-content .nick .icon{float: right;}
  
</style>
