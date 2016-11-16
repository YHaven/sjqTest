<template>
<div class="container">
  <div class="content fashion" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <div class="home-bar-container">
      <bar class="home-bar">
        <a class="tab-item">
          <img src="/static/img/man-img1.jpg" alt="">
        </a>
        <a class="tab-item">
          <img src="/static/img/man-img2.jpg" alt="">
        </a>
        <a class="tab-item" v-link="{path: '/invite'}">
          <img src="/static/img/man-img3.jpg" alt="">
        </a>
      </bar>
    </div>
    <ul class="man-class clearfix" >
      <li v-for="manitem in manclass">
        <img src="{{manitem.img}}" alt="">
        <div>
          <div class="man-en">{{manitem.en}}</div>
          <div class="man-cn">{{manitem.cn}}</div>
        </div>
      </li>
    </ul>
    <div class="card-container">
      <v-card-container v-for="task in tasks | orderBy 'created' 1" class="cardItem">
        <div class="item-content" >
          <img src="/static/img/man-img.jpg" alt="">
        </div>
      </v-card-container>
    </div>
  </div>
</div>
</template>

<script>
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Bar from '../../components/Bar'
import {loader} from '../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {
      this.manclass = [];
      for (var i = 0; i < 10; i++) {
        var manClassObj = {};
        manClassObj.en = 'man';
        manClassObj.cn = '男人';
        var img = '/static/img/man-img_0'+ (i+1) +'.jpg';
        if(i >= 9) img = '/static/img/man-img_'+ (i+1) +'.jpg';
        manClassObj.img = img;
        this.manclass.push(manClassObj);
      };


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
      tasks: [],
      manclass:[],
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
        
      this.$http.get('/static/data/bannertasks.json')
      .then(({data: {success, info, data}}) => {
        
        this.$set('tasks', data.productList)

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
        this.$http.get('/static/data/bannertasks.json')
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
    }
  },
  components: {
    VLayer,
    Bar,
    VCardContainer
  }
}
</script>


<style scoped>
  .home-bar-container{width: 80%;margin: 0 auto;height: 3.5rem;margin-bottom: .5rem;}
  .home-bar {
    background: #fff;
    position: relative;
    /*box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);*/
    margin-bottom: .5rem;
    margin-top: .5rem;
  }
  .home-bar img{width: 3.475rem;height: 3.475rem;}
  .man-class{width: 14.5rem;margin: 0 auto;}
  .man-class li{width: 1.7rem;float: left;margin: 0 .6rem;}
  .man-class li img{width: 1.7rem;height:1.7rem;}
  .man-class .man-en{font-size: .3rem;text-align: center;font-weight: bold;border-bottom: 1px solid #ddd}
  .man-class .man-cn{font-size: .1rem;text-align: center;}

  .card-container img{width: 100%;}
  .card-container .card{margin: 0rem;}
  .card-container{margin-top: .5rem;margin-bottom: 2.5rem;}
</style>
