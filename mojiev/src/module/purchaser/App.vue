<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon"></i></li>
        <li class="header-middle text-c"><i>采购商认证</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
      </ul>
      <!-- 头部 -->
      <form class="main-form">
        <ul class="form-list content-block">
          <li class="list-item"><label for="shop_name">店铺名称</label><input type="text" name="shop_name" value=""></li>
          <li class="list-item"><label for="shop_name">店铺地址</label><input type="text" name="shop_address" value="" placeholder="网店网址或实体店地址"></li>
          <li class="list-item"><label for="shop_name">店铺名称</label><input type="text" name="shop_name" value=""><i class="sjq-icon right-arrow-icon" style="margin-top:0.7rem"></i></li>
        </ul>

        <ul class="form-list content-block add-img">
          <li class="list-item">
            <span>身份证</span>
            <ul class="add-idfi">
              <li>
                <input type="hidden" value="" name="sfz_f">
                <span class="add-font add-sfz-f">
                  <input class="fileupload" type="file" @change="uploadFile" accept="image/gif, image/jpeg, image/png">
                  <i class="sjq-icon add-bg-icon"></i>
                </span>
                <div>正面</div>
              </li>
              <li>
                <input type="hidden" value="" name="sfz_b">
                <span class="add-back add-sfz-b">
                  <input class="fileupload" type="file" @change="uploadFile" accept="image/gif, image/jpeg, image/png">
                  <i class="sjq-icon add-bg-icon"></i>
                </span>
                <div>背面</div>
              </li>
            </ul>
          </li>
          <li class="list-item">
            <span>营业执照</span>
            <ul class="add-idfi">
              <li>
                <input type="hidden" value="" name="yyzz">
                <span class="add-font add-yyzz">
                  <input class="fileupload" type="file" @change="uploadFile" accept="image/gif, image/jpeg, image/png">
                  <i class="sjq-icon add-bg-icon"></i>
                </span>
              </li>
            </ul>
          </li>
        </ul>
        

        <input type="submit" value="提交" class="form-submit"/>
      </form>
     
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
      uploadFile(){
        console.log('uploadFile')
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
