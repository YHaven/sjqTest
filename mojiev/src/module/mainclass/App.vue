<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon"></i></li>
        <li class="header-middle text-c"><i>主营类目</i></li>
        <li class="header-right" @click="finshSubmit()">完成</li>
      </ul>
      <!-- 头部 -->
      <ul class="class-list">
        <li class="selected" @click="selectClassNode($event)">女装<i class="sjq-icon selected-right-icon"></i></li>
        <li @click="selectClassNode($event)">男装<i class="sjq-icon selected-right-icon"></i></li>
        <li @click="selectClassNode($event)">童装<i class="sjq-icon selected-right-icon"></i></li>
        <li @click="selectClassNode($event)">其他<i class="sjq-icon selected-right-icon"></i></li>
      </ul>
      <p class="class-o">注：类目可多选</p>


    <page-footer :active="5"></page-footer>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import PageFooter from 'components/PageFooter'              //底部
  import VScroll from 'components/PullToRefreshLayer' //刷新加载

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath
      }
    },
    mounted () {                        //页面完成加载
       
    },
    methods: {                          //方法
      refresh (done) {
        console.log('refresh')
        done() // call done
      },
      loadMore (done) {
        console.log('loadMore')
        // done() // finsh call done
      },
      selectClassNode(el){
        $('.class-list li').removeClass('selected')
        $(el.target).addClass('selected')
      },
      finshSubmit(){
        console.log('finsh')
      }

    },
    components: {
      PageFooter,
      VScroll
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.64rem;
    margin-bottom: 3.5rem;
    background: #f8f8f8;
  }
  .content-block{background: #fff;}
</style>
