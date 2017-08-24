<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>{{title}}</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
        <li class="header-right" @click="cancel()">取消</li>
      </ul>
      <!-- 头部 -->
      <div class="current-address">已选择的区域: <span>{{country.name}}{{province.name}}{{city.name}}{{area.name}}</span>   </div>
      <div class="select-address">
        <!-- <h5>可选城市</h5> -->
        <ul class="content-block market-list">
          <li v-for="data in dataList" :dataid="data.id" :parentid="data.parent_id" @click="nextDataList(data.id,data.name,data.parent_id,data.level)">
            {{data.name}}
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import VScroll from 'components/PullToRefreshLayer' //刷新加载

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        dataList:[],
        level:0,
        country:{},
        province:{},
        city:{},
        area:{},
        parentid:"",
        title:'选择国家'
      }
    },
    mounted () {                        //页面完成加载
       this.initDataList();          //获取
    },
    methods: {                          //方法\

      initDataList(){
        var _this = this;
        var params = {
          parent_id : 0
        };
        MojiAjax.indexFuns.shopRegionList(params,function(result){
          if(result.status.succeed === 1){
            _this.dataList = result.data.regions;
          }
        });
      },
      nextDataList(id,name,parentid,level){
        var that = this;
        that.parentid = id;
        that.level = level;
        var obj = {
            id : id,
            name : name,
            parentid : parentid,
            level : level
          };
        if(level === "0"){
          that.country = obj
          that.title = "选择省份";
        }
        if(level === "1"){
          that.province = obj
          that.title = "选择市";
        }
        if(level === "2"){
          that.city = obj
          that.title = "选择区";
        }
        if(level === "3"){
          that.area = obj
        }
          
        var params = {
          parent_id : id
        };
        MojiAjax.indexFuns.shopRegionList(params,function(result){
          if(result.status.succeed === 1 ){
            if(result.data.more === 1){
              that.dataList = result.data.regions;
            }else{
              //到底了
              var url = 'groupDetail.html?regionsid='+parentid;
              if(that.country.name) url += '&country='+encodeURIComponent(that.country.name);
              if(that.province.name) url += '&province='+encodeURIComponent(that.province.name);
              if(that.city.name) url += '&city='+encodeURIComponent(that.city.name);
              if(that.area.name) url += '&area='+encodeURIComponent(that.area.name);
              var goodsid = MojiAjax.indexFuns.getQueryString('goodsid');
              var objectid = MojiAjax.indexFuns.getQueryString('objectid');
              if(goodsid) url += '&goodsid='+goodsid;
              if(objectid) url += '&objectid='+objectid;
              var rec_type = MojiAjax.indexFuns.getQueryString('rec_type');
              if(rec_type) url += '&rec_type='+rec_type;
              window.location.href = url
            }
            
          }
        });
      },
      cancel(){
        var that = this;
        if(that.level === 0){
          var url = 'groupDetail.html?vt=1';
          var goodsid = MojiAjax.indexFuns.getQueryString('goodsid');
          var objectid = MojiAjax.indexFuns.getQueryString('objectid');
          if(goodsid) url += '&goodsid='+goodsid;
          if(objectid) url += '&objectid='+objectid;
          var rec_type = MojiAjax.indexFuns.getQueryString('rec_type');
          if(rec_type) url += '&rec_type='+rec_type;
          window.location.href = url;
          return false;
        }
        that.parentid = "";
        that.level = "0";
        that.title = "选择国家";
        that.country = {};
        that.province = {};
        that.city = {};
        that.area = {};
        that.initDataList();   
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
    background: #fff;
  }
  .content-block{background: #fff;}

  /*实体市场*/
  .market-bg{width: 100%;height: 5.333rem;overflow: hidden;position: relative;}
  .market-o{position: absolute;bottom: 0px;color: #fff;font-size:0.469rem;padding: 0.32rem;text-indent: 1rem; }
  .market-number{height: 1rem;line-height: 1rem;background: #f8f8f8;padding-top: 0.4rem;padding-left: 1.237rem;}
  .market-number span{margin-right: 0.597rem;}
  .market-list li{border-bottom: 1px solid #eaeaea;padding: 0.64rem;height: 0.8rem;}
  .market-img{width: 4.48rem;height: 3.2rem;float: left;}
  .market-img img{height: 100%;}
  .market-info{margin-left:4.88rem;}
  .market-info .market-name{font-size:0.768rem;}
  .market-info .market-content{font-size: 0.512rem;color: #999;}
  .market-info .market-num{font-size: 0.554rem;}
  
  .current-address{padding: 0.5rem;font-size: 0.8rem;background: #fff}
  .current-address span{font-size: 1rem;}
  .select-address h5{font-size: 0.6rem;padding-left: 0.5rem;background: #fff;color: #999}
</style>
