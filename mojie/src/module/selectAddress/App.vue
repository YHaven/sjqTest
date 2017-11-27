<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>收货地址管理</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
        <!-- <li class="header-right" @click="cancel()">取消</li> -->
      </ul>
      <!-- 头部 -->
      <ul class="address-list">
        <li v-for="(address, index) in dataList" class="address-item clearfix" @click="selectAddress(address.id)">
          <div class="address-left">
            <p class="clearfix"><span>{{address.consignee}}</span><span style="margin-left:3rem;">{{address.mobile}}</span></p>
            <p class="address-detail"><span class="default-address" v-if="address.default_address == 1">默认</span>{{address.province_name}}{{address.city_name}}{{address.district_name}}{{address.address}}</p>
          </div>
          <!-- <div class="address-right">
            <i class="sjq-icon msg-icon"></i>
          </div> -->
        </li>
      </ul>

  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import VScroll from 'components/PullToRefreshLayer' //刷新加载
  import config from 'common/js/moji.config'

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        dataList:[]
      }
    },
    mounted () {                        //页面完成加载
       this.initDataList();          //获取
    },
    methods: {                          //方法\

      initDataList(){
        var that = this;
        var url = config.indexAjax.addresslist;
        
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){

            
            var addresslist = res.data;
            for (var i = 0; i < addresslist.length; i++) {
              if(addresslist[i].default_address === 1){
                var default_address_id = addresslist[i].id;
                //去结算
                
              }
            };
            that.dataList = addresslist;
            // that.dataList.push(addresslist[0])
          }else{
            DialogLayer.open({
              content: res.status.error_desc
              ,skin: 'msg'
            });

            // window.location.href = 'login.html'
          }
        })
      },
      selectAddress(addressid){
        var url = 'flowCheckOrder.html?address_id='+ addressid +'&rec_id='+MojiAjax.indexFuns.getQueryString('rec_id');
        var rec_type = MojiAjax.indexFuns.getQueryString('rec_type');
        if(rec_type) url += '&rec_type='+rec_type;
          window.location.href = url
      },
      refresh (done) {
        console.log('refresh')
        done() // call done
      },
      loadMore (done) {
        console.log('loadMore')
        // done() // finsh call done
      }
    },
    components: {
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
    background: #eaeaea;
  }
  .content-block{background: #fff;}

  .address-list{margin-top: 0.64rem;}
  .address-item{padding: 0.512rem;margin-top: 0.512rem;background: #fff;}
  .address-left{float: left;width: 13rem;}
  .address-detail{font-size: 0.512rem;margin-top: 0.2rem;}
  .default-address{background: #f5337d;color: #fff;border-radius: 5px;padding: 0.1rem;font-size: 0.46rem;margin-right: 0.2rem;}

  .address-right .sjq-icon{background-color: #f5337d;}
</style>
