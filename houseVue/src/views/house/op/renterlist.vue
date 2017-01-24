<template>
<div class="container">
  <top-header path="/house/op/index" label="租客"></top-header>
  <div class="content profile fade-transition" distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>

    <div class="card-container" >
      <div class="list-title"><span>采荷新村</span><span class="count">租客:3 <i class="icon iconfont icon-fold" @click="narExt($event)"></i></span></div>
      <v-card-container v-for="task in tasks | orderBy 'created' 1">

        <div class="item-content" v-link="{path: '/house/lessor/rentaloper?id='+task.id, replace: true}">
          <p class="rental-title">{{task.rentalTime}}姓名</p>
          <p class="rental-value">
            <span style="color:red;">2017-01-24至2017-02-24</span>
            <span class="rental-money"><i class="icon iconfont icon-right"></i> </span>
          </p>
          <p class="rental-name">采荷-22</p>
        </div>

      </v-card-container>
    </div>

    <div class="card-container" >
      <div class="list-title"><span>其他村</span><span class="count">租客:1 <i class="icon iconfont icon-fold" @click="narExt($event)"></i></span></div>
      <v-card-container v-for="task in tasks | orderBy 'created' 1">

        <div class="item-content" v-link="{path: '/house/lessor/rentaloper?id='+task.id, replace: true}">
          <p class="rental-title">{{task.rentalTime}} 姓名</p>
          <p class="rental-value">
            <span style="color:red;">2017-01-24至2017-02-24</span>
            <span class="rental-money"> <i class="icon iconfont icon-right"></i> </span>
          </p>
          <p class="rental-name">采荷-22</p>
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
      var pId = planPro.fun.getQueryString('id');
      if(pId){
        return this.$http.get(planPro.ajaxUrl.rentallist+'?vt=1&id='+ pId,{},{credentials: true})
        .then(({data}) => {


          if(data.status){
            this.$set('tasks', data.datalist);
            this.$set('fdata', data.renter);
            this.page = this.page + 1;
          }else{
            this.$set('tasks', []);
            this.$set('fdata', {});
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
      }else{
        this.$set('tasks', []);
        this.$set('fdata', {});
      }
    }
  },
  ready () {
    $.init()
  },
  data () {
    return {
      fdata: {},
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
        this.$http.get(planPro.ajaxUrl.rentallist+'?vt=1'+page+'&id='+this.fdata.id,{},{credentials: true})
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
        this.page = this.page + 1
        var page = '&page='+ this.page
        this.$http.get(planPro.ajaxUrl.rentallist+'?vt=1'+page+'&id='+this.fdata.id,{},{credentials: true})
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
    },
    narExt(_this){
      var _thisObj = $(_this.target);

      if(_thisObj.attr('class').indexOf('icon-fold')>=0){
        _thisObj.closest('.card-container').find('.card').hide();
        _thisObj.removeClass('icon-fold');
        _thisObj.addClass('icon-unfold');
      }else{
        _thisObj.closest('.card-container').find('.card').show();
        _thisObj.removeClass('icon-unfold');
        _thisObj.addClass('icon-fold');
      }
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
.content{background-color: #929292;}
.pull-to-refresh-layer{background-color: #fff;}
.bar-col .bar-item{border-right: 0px;height: 1.5rem;}

.list-title{background-color: #fff;font-size: 0.5rem;padding: 0.5rem;color: #929292;margin-top: 0.3rem;border-bottom: 1px solid #929292;}
.list-title .count{float: right;}
.card{margin: 0px;border-radius:0px;padding: 0.5rem; border-bottom: 1px solid #929292;}
.item-content p{margin: 0px;font-size: 0.6rem;}
.item-content .rental-title{color: #000;font-weight: bold;font-size: 0.7rem;}
.item-content .rental-money{float: right;}

</style>
