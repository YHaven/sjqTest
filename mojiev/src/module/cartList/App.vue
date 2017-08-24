<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    
      <!-- 头部 -->
      <ul class="header">
        <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
        <li class="header-middle text-c"><i>购物车</i></li>
        <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
        <li class="header-right" @click="edit()" v-if="!isEdit">编辑</li>
        <li class="header-right" @click="finish()" v-if="isEdit">完成</li>
      </ul>
      <!-- 头部 -->
      
      <ul class="cart-shop-list">
        <li class="shop-item content-block" v-for="(shop, shopindex) in cartList" :shopid="shop.id">
          
          <div class="shop-title" :shopindex="shopindex" goodindex="">
            <span class="check-box checked" v-if="!isEdit && selectProduct[shopindex].shop"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box" v-if="!isEdit && !selectProduct[shopindex].shop"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box checked" v-if="isEdit && removeProduct[shopindex].shop"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box " v-if="isEdit && !removeProduct[shopindex].shop"><i class="sjq-icon check-right-icon"></i></span>
            <a :href="'/mobile/index.php?r=store/index/shop_info&id='+shop.id">
            <i class="sjq-icon shop-icon"></i>
            <span>{{shop.name}}</span>
            <i class="sjq-icon right-arrow-icon"></i>
            </a>
          </div>
          
          <ul class="goods-list">
            <li class="goods-item clearfix" v-for="(goods, goodindex) in shop.goods_list">
              <div class="check-div" :shopindex="shopindex" :goodindex="goodindex">
                <span class="check-box checked" v-if="!isEdit && selectProduct[shopindex].goodslist[goodindex].goods"><i class="sjq-icon check-right-icon"></i></span>
                <span class="check-box " v-if="!isEdit && !selectProduct[shopindex].goodslist[goodindex].goods"><i class="sjq-icon check-right-icon"></i></span>

                <span class="check-box checked" v-if="isEdit && removeProduct[shopindex].goodslist[goodindex].goods"><i class="sjq-icon check-right-icon"></i></span>
                <span class="check-box " v-if="isEdit && !removeProduct[shopindex].goodslist[goodindex].goods"><i class="sjq-icon check-right-icon"></i></span>
              </div>
              <div class="goods-img">
                <a :href="'groupDetail.html?goodsid='+goods.goods_id">
                <img :src="goods.img.small" alt="">
                </a>
              </div>
              <div class="goods-info">
                <p class="goods-name">{{goods.goods_name}}</p>
                <p class="goods-price"><span class="price">{{goods.formated_goods_price}}</span><nobr class="f-r size">[{{goods.attr}}]</nobr></p>
                <p class="goods-opra clearfix">
                  <span class="minus f-l">-</span>
                  <input type="number" :value="goods.goods_number" class="f-l" readonly :shopindex="shopindex" :goodindex="goodindex">
                  <span class="plus f-l">+</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <div class="all-total clearfix">
        <div class="check-div">
            <span class="check-box checked check-box-all" v-if="!isEdit && selectProductAll"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box check-box-all" v-if="!isEdit && !selectProductAll"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box checked check-box-all" v-if="isEdit && removeProductAll"><i class="sjq-icon check-right-icon"></i></span>
            <span class="check-box check-box-all" v-if="isEdit && !removeProductAll"><i class="sjq-icon check-right-icon"></i></span>
            全选
        </div>
        <div class="f-l" v-if="!isEdit">
          <p>总额：<span class="total-price">{{total.saving}}</span></p>
          <p>数量：{{total.virtual_goods_count}}</p>
        </div>
        <div class="f-r flow-done" v-if="!isEdit" @click="toFlow">去结算</div>
        <div class="f-r flow-done" v-if="isEdit" @click="toDeleteCart">删除</div>
      </div>

      <page-footer :active="4"></page-footer>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import DialogLayer from 'common/js/layer'          //摩街数据方法类
  import PageFooter from 'components/PageFooter'              //底部

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        cartList:[],
        relatedGoods:[],
        total:{},
        selectProduct:[],
        removeProduct:[],
        selectProductAll:true,
        removeProductAll:false,
        isEdit:false
      }
    },
    mounted () {                        //页面完成加载
       this.initDataList();          //获取
    },
    methods: {                          //方法\

      initSelect(shoplist){
        var that = this;
        var selectArr = [];
        var removeArr = [];
        for (var i = 0; i < shoplist.length; i++) {
            var selectObj = {
              shop:true
            };
            var removeObj = {
              shop:false
            };

            var goodslist = shoplist[i].goods_list;
            var selectGoodsArr = [];
            var removeGoodsArr = [];
            for (var j = 0; j < goodslist.length; j++) {
              var selectGoodsObj = {
                goods:true
              }
              var removeGoodsObj = {
                goods:false
              }
              selectGoodsArr.push(selectGoodsObj);
              removeGoodsArr.push(removeGoodsObj);
            };
            selectObj.goodslist = selectGoodsArr;
            selectArr.push(selectObj);
            removeObj.goodslist = removeGoodsArr;
            removeArr.push(removeObj);
          };
          that.selectProduct = selectArr;
          that.removeProduct = removeArr;

          that.selectProductAll = true;
          that.removeProductAll = false;
      },
      initAllSelect(checked){    //全选
        var that = this;
        if(that.isEdit){
          for (var i = 0; i < that.removeProduct.length; i++) {
            that.removeProduct[i].shop = checked;
            for (var j = 0; j < that.removeProduct[i].goodslist.length; j++) {
              that.removeProduct[i].goodslist[j].goods = checked;
            };
          };
          that.removeProductAll = checked;
        }else{
          for (var i = 0; i < that.selectProduct.length; i++) {
            that.selectProduct[i].shop = checked;
            for (var j = 0; j < that.selectProduct[i].goodslist.length; j++) {
              that.selectProduct[i].goodslist[j].goods = checked;
            };
          };
          that.selectProductAll = checked;
        }

        that.countAll(); 
          
      },
      checkUpSelect(shopindex,checked){    //判断checked 上级
        var that = this;
        if(!that.isEdit){
          var upchecked = true;
          for (var j = 0; j < that.selectProduct[shopindex].goodslist.length; j++) {
            if(that.selectProduct[shopindex].goodslist[j].goods !== checked){
              upchecked = false;
            }
          };
          if(upchecked && checked){
            that.selectProduct[shopindex].shop = true;
          }else{
            that.selectProduct[shopindex].shop = false;
          }

          var upallchecked = true;
          for (var i = 0; i < that.selectProduct.length; i++) {
            if(that.selectProduct[i].shop !== checked){
              upallchecked = false;
            }
          };
          if(upallchecked && checked){
            that.selectProductAll = true;
          }else{
            that.selectProductAll = false;
          }

        }else{
          var upchecked = true;
          for (var j = 0; j < that.removeProduct[shopindex].goodslist.length; j++) {
            if(that.removeProduct[shopindex].goodslist[j].goods !== checked){
              upchecked = false;
            }
          };
          if(upchecked && checked){
            that.removeProduct[shopindex].shop = true;
          }else{
            that.removeProduct[shopindex].shop = false;
          }

          var upallchecked = true;
          for (var i = 0; i < that.removeProduct.length; i++) {
            if(that.removeProduct[i].shop !== checked){
              upallchecked = false;
            }
          };
          if(upallchecked && checked){
            that.removeProductAll = true;
          }else{
            that.removeProductAll = false;
          }
        }
      },

      countAll(){     //计算选择总价和数量
        var that = this;
        var allPrice = 0.00;
        var allNum = 0;
        for (var i = 0; i < that.selectProduct.length; i++) {
          var goodslist = that.selectProduct[i].goodslist;
          for (var j = 0; j < goodslist.length; j++) {
            if(goodslist[j].goods){
              allPrice += parseFloat(that.cartList[i].goods_list[j].goods_price)*Number(that.cartList[i].goods_list[j].goods_number);
              allNum += Number(that.cartList[i].goods_list[j].goods_number);

            }
          };
        };
          that.total.saving = parseFloat(allPrice).toFixed(2);
          that.total.virtual_goods_count = allNum;
      },

      initOpra(){
        // checked
        var that = this;
        $('#app').unbind();
        $('#app').on('click','.check-box',function(){       //checkbox
          var _this = $(this);

          var shopindex = Number(_this.closest('div').attr('shopindex'));
          var goodindex = _this.closest('div').attr('goodindex');
          // console.log(shopindex+'------'+goodindex)
          
          if(_this.hasClass('checked')){

            if(_this.hasClass('check-box-all')){   //全选时
              that.initAllSelect(false);

              return;
            }
            if(that.isEdit){
              if(goodindex === ''){   //店铺
                that.removeProduct[shopindex].shop = false;
                for (var i = 0; i < that.removeProduct[shopindex].goodslist.length; i++) {
                  that.removeProduct[shopindex].goodslist[i].goods = false;
                };
              }else{                  //商品
                that.removeProduct[shopindex].goodslist[Number(goodindex)].goods = false;
              }

            }else{
              if(goodindex === ''){   //店铺
                that.selectProduct[shopindex].shop = false;
                for (var i = 0; i < that.selectProduct[shopindex].goodslist.length; i++) {
                  that.selectProduct[shopindex].goodslist[i].goods = false;
                };
              }else{                  //商品
                that.selectProduct[shopindex].goodslist[Number(goodindex)].goods = false;
              }

              
            }

            that.checkUpSelect(shopindex,false)  //判断上级

          }else{

            if(_this.hasClass('check-box-all')){   //全选时
              that.initAllSelect(true);
              return;
            }

            if(that.isEdit){
              if(goodindex === ''){   //店铺
                that.removeProduct[shopindex].shop = true;
                for (var i = 0; i < that.removeProduct[shopindex].goodslist.length; i++) {
                  that.removeProduct[shopindex].goodslist[i].goods = true;
                };
              }else{                  //商品
                that.removeProduct[shopindex].goodslist[Number(goodindex)].goods = true;
              }
            }else{
              if(goodindex === ''){   //店铺
                that.selectProduct[shopindex].shop = true;
                for (var i = 0; i < that.selectProduct[shopindex].goodslist.length; i++) {
                  that.selectProduct[shopindex].goodslist[i].goods = true;
                };
              }else{                  //商品
                that.selectProduct[shopindex].goodslist[Number(goodindex)].goods = true;
              }
            }

            that.checkUpSelect(shopindex,true)  //判断上级


          }


          that.countAll(); 

        });


        $('#app').on('click','.minus',function(){   //加减
          var _thisInput = $(this).closest('.goods-opra').find('input');
          var _thisNumber = Number(_thisInput.val());
          var shopindex = _thisInput.attr('shopindex');
          var goodindex = _thisInput.attr('goodindex');
          that.updateCart(shopindex,goodindex,_thisNumber-1);
        });  
        $('#app').on('click','.plus',function(){   //加减
          var _thisInput = $(this).closest('.goods-opra').find('input');
          var _thisNumber = Number(_thisInput.val());
          var shopindex = _thisInput.attr('shopindex');
          var goodindex = _thisInput.attr('goodindex');
          that.updateCart(shopindex,goodindex,_thisNumber+1);
        }); 

        $('#app').on('click','.goods-opra input',function(){
          var _thisInput = $(this);
          var shopindex = _thisInput.attr('shopindex');
          var goodindex = _thisInput.attr('goodindex');
          var _thisNumber = Number(_thisInput.val());
          DialogLayer.open({
            title:'输入购买数量'
            ,content: '<input type="number" value="'+ _thisNumber +'" id="editBuyNumber">'
            ,btn: ['确定','取消'],
            yes: function(index){
              var new_number = Number($('#editBuyNumber').val());
              that.updateCart(shopindex,goodindex,new_number);
            }
          });
        });


      },
      initDataList(){
        var that = this;
        // var url = config.indexAjax.orderdetail;
        var url = config.indexAjax.cartlist;
        
        var params = {};
        DialogLayer.closeAll();
        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.cartList = res.data.cart_list;
            that.relatedGoods = res.data.related_goods;
            that.total = res.data.total;
            that.isEdit = false;

            
            var shoplist = res.data.cart_list;
            that.initSelect(shoplist);
            that.initOpra();
            that.countAll();
          }else{
            if(res.status.error_code ===100){
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });
            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
              });
            }

            // window.location.href = 'login.html'
          }
        })
      },
      edit(){
        var that = this;
        that.isEdit = true;
      },
      finish(){
        var that = this;
        that.isEdit = false;
      }, 
      toDeleteCart(){
        var that = this;
        var rec_id_arr = [];
        for (var i = 0; i < that.removeProduct.length; i++) {
          var goodslist = that.removeProduct[i].goodslist;
          for (var j = 0; j < goodslist.length; j++) {
            if(goodslist[j].goods){
              rec_id_arr.push(that.cartList[i].goods_list[j].rec_id);
            }
          };
        };
        DialogLayer.open({
            title:'删除'
            ,content: "确认删除？"
            ,btn: ['确定','取消'],
            yes: function(index){
              that.deleteCart(rec_id_arr.join(','));
            }
          });
        
      },
      deleteCart(rec_id){                            //删除购物车
        var that = this;
        var url = config.indexAjax.cartdelete;
        var params = {
            rec_id:rec_id   //560,558,559
        };
        var paramsStr = JSON.stringify(params);

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.initDataList();          //获取
            DialogLayer.closeAll()
          }else{
            if(res.status.error_code ===100){
              that.isLogin = false;
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });

            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
                ,time:2
              });
            }
            // window.location.href = 'login.html'
          }
        })
      },
      toFlow(){
        var that = this;
        var url = config.indexAjax.addresslist;
        
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){

            
            var addresslist = res.data;
            var hasDefault = false;
            for (var i = 0; i < addresslist.length; i++) {
              if(addresslist[i].default_address === 1){
                var default_address_id = addresslist[i].id;
                //去结算
                hasDefault = true;

                var rec_id_arr = [];
                for (var i = 0; i < that.selectProduct.length; i++) {
                  var goodslist = that.selectProduct[i].goodslist;
                  for (var j = 0; j < goodslist.length; j++) {
                    if(goodslist[j].goods){
                      rec_id_arr.push(that.cartList[i].goods_list[j].rec_id);
                    }
                  };
                };

                window.location.href = 'flowCheckOrder.html?rec_id='+rec_id_arr.join(',')+'&address_id='+default_address_id;
              }
            };


            if(!hasDefault){
              DialogLayer.open({
                content: '请设置默认地址'
                ,skin: 'msg'
              });
            }

          }else{
            if(res.status.error_code ===100){
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });
            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
              });
            }
          
            // window.location.href = 'login.html'
          }
        })
      },
      updateCart(shopindex,goodindex,new_number){                          //更新购物车
        var that = this;
        var url = config.indexAjax.cartupdate;
        // console.log(shopindex+'----'+goodindex);
        var params = {
            rec_id:that.cartList[shopindex].goods_list[goodindex].rec_id,
            new_number:new_number
        };

        if(new_number<1){
          //判断是否删除该商品
          DialogLayer.open({
            title:'删除'
            ,content: "确认删除？"
            ,btn: ['确定','取消'],
            yes: function(index){
              that.deleteCart(params.rec_id);
            }
          });
          return false;

        }

        var paramsStr = JSON.stringify(params);

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            // that.cartList[shopindex].goods_list[goodindex].goods_number = new_number;
            // that.countAll();

            that.initDataList();          //获取

          }else{
            if(res.status.error_code ===100){
              that.isLogin = false;
              DialogLayer.open({
                  content: res.status.error_desc
                  ,btn: '去登陆',
                  yes: function(index){
                    window.location.href="login.html"
                  }
                });

            }else{
              DialogLayer.open({
                content: res.status.error_desc
                ,skin: 'msg'
                ,time:2
              });
            }
            // window.location.href = 'login.html'
          }
        })
      }
    },
    components: {
      PageFooter
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
    margin-bottom: 5rem;
    background: #eaeaea;
    height: 100%;
  }
  .content-block{background: #fff;margin-bottom: 0.64rem;}
  .shop-title{padding: 0.256rem;border-bottom: 1px solid #ddd;}
  .shop-title .right-arrow-icon{margin-top: 0.2rem;}
  

  .goods-item{height: 4rem;padding: 0.5rem 0rem;overflow: hidden;}
  .goods-item .check-div{float: left;width: 2rem;padding: 1.5rem 0rem;}
  .goods-item .goods-img{float: left;width: 4rem;height: 100%;}
  .goods-item .goods-info{margin-left: 6rem;height: 100%;padding:0rem 0.5rem;}
  
  .check-div .check-box{margin-left: 0.5rem;}
  .goods-info .goods-name{font-size: 0.512rem;height: 1.75rem;overflow: hidden;}
  .goods-price .price{color: #f5337d;}
  .goods-price .size{margin-right: 0.5rem;width: 4rem;overflow: hidden;text-overflow:ellipsis;}


  .goods-opra{margin-top: 0.4rem;}
  .goods-opra span{font-size: 0.8rem;border: 1px solid #ddd;width: 0.8rem;height: 0.8rem;display: inline-block;text-align: center;line-height: 0.8rem;}
  .goods-opra input{border: 1px solid #ddd;text-align: center;height: 0.8rem;line-height: 0.8rem;font-size: 0.256rem;}
  

  .all-total{padding: 0.256rem 0rem;background-color: #eaeaea;position: fixed;bottom: 2.453rem;width: 16rem;}
  .all-total .check-div{float: left;width: 3.5rem;padding: 0.5rem 0rem;}
  .all-total .check-div .check-box{margin-right: 0.3rem;}
  .all-total .flow-done{background-color: #f5337d;color: #fff;border-radius: 3px;padding: 0.1rem 0.5rem;margin-top: 0.4rem;margin-right: 0.5rem;}
  .all-total .total-price{color:#f5337d; }

</style>
