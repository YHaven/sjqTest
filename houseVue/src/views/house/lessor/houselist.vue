<template>
<div class="container">
  <div class="content profile fade-transition home" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <top-header path="/house" label="我的房产"></top-header>
  </header>
    <div class="submit-button">
    <button class="button button-big button-fill" v-link="{path: '/house/lessor/houseoper', replace: true}">+添加房产</button>
  </div>
    <div class="card-container" >
      <v-card-container v-for="task in tasks 
      :style="{backgroundColor: task.status === '1' ? 'white': 'rgb(235, 235, 235)' }">
        
        <div class="item-content" >
          <a href="javascript:;" class="head-img"><img src="{{task.uploadImg}}" alt="房屋缩略图" onerror="javascript:this.src='/static/img/default-house.jpg';"></a>
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
import TopHeader from '../../../components/TopHeader'

import {loader} from '../../../util/util'
import $ from 'zepto'

export default {
  route: {
    data () {
      return this.$http.get(planPro.ajaxUrl.houselist,{'vt':'1'},{credentials: true})
      .then(({data}) => {

        if(data.status){
            this.$set('tasks', data.datalist);
            this.page = this.page + 1;
        }else{
          this.$set('tasks', []);
          if(!data.islogin){
            layer.open({
                  content: data.errorinfo
                  ,btn: ['去登录']
                  ,yes: function(index){
                    router.go({path: planPro.loginPath, replace: true});
                    layer.close(index);
                  }
              });
          }else{
            layer.open({content: data.errorinfo,time:2});
          }
          
        }


        
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
        this.$http.post(planPro.ajaxUrl.houselist+'?vt=1'+page,{},{credentials: true})
        .then(({data: {status, page, datalist}}) => {
          this.$set('tasks', datalist);
          this.page = this.page + 1;
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
        var page = '&page='+ this.page
        this.$http.post(planPro.ajaxUrl.houselist+'?vt=1'+page,{},{credentials: true})
          .then(({data: {status, page, datalist}}) => {
            if(datalist.length>0){
              for (var i = 0; i < datalist.length; i++) {
                this.tasks.push(datalist[i]);
              };
              this.page = this.page + 1
            }else{
              layer.open({content: "没有更多数据了",time:2});
            }
            
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
    ShopList,
    TopHeader
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
}
.profile .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 1.8rem !important;
  height: 1.8rem !important;
}


</style>
