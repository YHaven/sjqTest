<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c"><i>结算</i></li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->
    
    <!-- 地址 -->
    <div class="content-block order-address clearfix" style="margin-top:0rem;" @click="selectAddress">
      <div class="address-info f-l">
        <p class="clearfix"><span class="f-l">{{consignee.consignee}}</span><span class="f-r">{{consignee.mobile}}</span></p>
        <p>{{consignee.province_name}}{{consignee.city_name}}{{consignee.district_name}}{{consignee.address}}</p>
      </div>
      <div class="address-right clearfix"><i class="sjq-icon right-arrow-icon" style="margin-top:0.64rem;"></i></div>
    </div>

    <!-- 店铺商品 -->
    <ul class="shop-list">
      <li v-for="(shop, shop_index) in shop_list" class="content-block ">
        <p class="shop-name">{{shop.shop_name}}</p>
        <ul class="product-list">
          <li v-for="(goods, gindex) in shop.goods_list">
            <div class="goods-info clearfix">
              <div class="goods-img"><img :src="goods.goods_image" alt=""></div>
              <div class="goods-i">
                <p class="goods-name">{{goods.goods_name}}</p>
                <p><span class="goods-price">￥{{goods.goods_price}}</span><span class="goods-number">X{{goods.goods_number}}</span></p>
              </div>
            </div>
            <div class="goods-rule">
              <table>
                <thead>
                  <tr>
                    <td>颜色</td>
                    <td>尺寸</td>
                    <td>数量</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(spec, gindex) in goods.spec">
                    <td>{{spec.color}}</td>
                    <td>{{spec.size}}</td>
                    <td>{{spec.product_number}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
        
        <div class="post-type clearfix" v-if="order_type == 'GROUPBUY_GOODS'">
          <div class="post-info">
            <p class="clearfix"><span class="f-l">配送方式</span><span class="f-r">{{shop.shipping_list[shop.select_post].shipping_name}}</span></p>
            <p class="clearfix"><span class="f-l">运费</span><span class="f-r">团批订单在成团后支付配送费用</span></p>
          </div>
          <i class="sjq-icon right-arrow-icon" style="margin-top:1.2rem;"></i>
          
        </div>


        <div class="post-type clearfix" v-if="order_type != 'GROUPBUY_GOODS'">
          <div class="post-info" @click="changePost(shop.shop_id,shop_index,shop.select_post)">
            <p class="clearfix"><span class="f-l">配送方式</span><span class="f-r">{{shop.shipping_list[shop.select_post].shipping_name}}</span></p>
            <p class="clearfix"><span class="f-l">{{shop.shipping_list[shop.select_post].shipping_code == 'a_express' ? '运费' : '自提点'}}</span><span class="f-r">{{shop.shipping_list[shop.select_post].shipping_code == 'a_express' ? shop.shipping_list[shop.select_post].shipping_fee : shop.shipping_list[shop.select_post].cac_address}}</span></p>
            <p class="clearfix" v-if="shop.shipping_list[shop.select_post].shipping_code == 'cac'"><span class="f-l">自提日期</span><span class="f-r">{{shop.shipping_list[shop.select_post].cac_day}}</span></p>
            <p class="clearfix" v-if="shop.shipping_list[shop.select_post].shipping_code == 'cac'"><span class="f-l">自提时间</span><span class="f-r">{{shop.shipping_list[shop.select_post].cac_time}}</span></p>
            <p class="clearfix" v-if="shop.shipping_list[shop.select_post].shipping_code == 'cac'"><span class="f-l">自提重量</span><span class="f-r">{{shop.shipping_list[shop.select_post].cac_goods_weight}}</span></p>
          </div>
          <i class="sjq-icon right-arrow-icon" style="margin-top:1.2rem;"></i>
          
          <div :id="'change-post-'+shop.shop_id" class="layui-m-layer layer-change-post" style="display:none;">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                    <p class="title">配送方式</p>
                    <ul>
                      <li v-for="(shipping_list, shiplist_index) in shop.shipping_list" :shiplistindex="shiplist_index" >{{shipping_list.shipping_name}}<i :class=" shop.select_post == shiplist_index ? 'sjq-icon right-arrow-icon active ' : 'sjq-icon right-arrow-icon'"></i></li>
                    </ul>
                    <div class="confirm-btn" @click="selectPost(shop.shop_id)">确定</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="shop-coupons clearfix">
          <p v-if="shop.shop_favourable_list.length<=0 || shop.shop_favourable_list == null"><span>店铺优惠</span><span class="f-r">暂无店铺优惠</span></p>
          <p v-if="shop.shop_favourable_list.length> 0" @click="changeFavourable(shop.shop_id,shop_index,shop.select_favourable)">
            <span>店铺优惠</span>
            <span class="f-r" v-if="shop.select_favourable < 0">点击选择优惠</span>
            <span class="f-r" v-if="shop.select_favourable >= 0">{{shop.shop_favourable_list[shop.select_favourable].act_name}}</span>
          </p>
          <i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;"></i>
          
          <div :id="'change-favourable-'+shop.shop_id" class="layui-m-layer layer-shop-coupons" style="display:none;">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                    
                      <div class="title clearfix">店铺优惠选择</div>
                      <ul>
                        <li v-for="(favourable, favourableindex) in shop.shop_favourable_list" :favourableindex="favourableindex" >
                          {{favourable.act_name}}
                          <i  :class=" shop.select_favourable === favourableindex ? 'sjq-icon right-arrow-icon active ' : 'sjq-icon right-arrow-icon'"></i>
                        </li>
                      </ul>
                      <div class="confirm-btn" @click="selectFavourable(shop.shop_id)">确定</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div class="coupons clearfix">
          <p v-if="shop.coupons.length<=0"><span>优惠券</span><span class="f-r">暂无可用优惠券</span></p>
          <p v-if="shop.coupons.length> 0" @click="changeShopCoupons(shop.shop_id,shop_index,shop.select_coupons)">
            <span>优惠券</span>
            <span class="f-r" v-if="shop.select_coupons < 0">点击选择优惠券</span>
            <span class="f-r" v-if="shop.select_coupons >= 0">{{shop.coupons[shop.select_coupons].cou_name}}</span>
          </p>
          <i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;"></i>
        
          <div :id="'change-coupons-'+shop.shop_id" class="layui-m-layer layer-coupons" style="display:none;">
            <div class="layui-m-layershade"></div>
            <div class="layui-m-layermain">
              <div class="layui-m-layersection">
                <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
                  <div class="layui-m-layercont">
                      <div class="title clearfix">店铺优惠券选择</div>
                      <ul>
                        <li v-for="(coupons, couponsindex) in shop.coupons" :couponsindex="couponsindex" >
                          {{coupons.cou_name}}
                          <i  :class=" shop.select_coupons === couponsindex ? 'sjq-icon right-arrow-icon active ' : 'sjq-icon right-arrow-icon'"></i>
                        </li>
                      </ul>
                      <div class="confirm-btn" @click="selectShopCoupons(shop.shop_id)">确定</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div class="t-count">
          共{{shop.goods_total}}件商品小计(含运费):￥<span>{{shop.shop_money_all.toFixed(2)}}</span>
        </div>

      </li>
    </ul>
    
    <div class="red-bag content-block clearfix">
      <p v-if="bonus.length <= 0"><span>红包</span><span class="f-r">暂无可用红包</span></p>
      <p v-if="bonus.length >  0" @click="changeRedBag(select_bonus)">
        <span>红包</span>
        <span class="f-r" v-if="select_bonus < 0">点击选择红包</span>
        <span class="f-r" v-if="select_bonus >= 0">{{bonus[select_bonus].type_name}}</span>
      </p>
      <i class="sjq-icon right-arrow-icon" style="margin-top:0.2rem;"></i>
      
      <div class="layui-m-layer layer-red-bag" style="display:none;">
        <div class="layui-m-layershade"></div>
        <div class="layui-m-layermain">
          <div class="layui-m-layersection">
            <div class="layui-m-layerchild layui-m-layer-footer  layui-m-anim-up">
              <div class="layui-m-layercont">
                <div class="title clearfix">红包选择</div>
                  <ul>
                    <li v-for="(bonusitem, bonusindex) in bonus" :bonusindex="bonusindex" v-if="bonusitem.request_amount<=total_goods_money">
                      {{bonusitem.type_name}}
                      <i  :class=" select_bonus == bonusindex ? 'sjq-icon right-arrow-icon active ' : 'sjq-icon right-arrow-icon'"></i>
                    </li>
                  </ul>
                  <div class="confirm-btn" @click="selectBonus">确定</div>
              </div>
                
            </div>
          </div>
        </div>
      </div>

    </div>
    
    <div class="order-total content-block">
      <p><span>运费：</span><span class="price">{{total_shipping_fee.toFixed(2)}}</span></p>
      <p><span>商品金额：</span><span class="price">{{total_goods_money.toFixed(2)}}</span></p>
      <p class="total-count">共{{total_goods_num}}件商品小计(含运费):￥
        <span>{{total_order_money.toFixed(2)}}</span>
      </p>
    </div>

    <div class="submit-order" @click="flowDone">提交订单</div>

    


    


  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import DialogLayer from 'common/js/layer'          //摩街数据方法类

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        rec_id:'',
        address_id:'',
        consignee:{},
        shop_list:[],
        total_goods_num:0,
        total_goods_money:0,
        total_shipping_fee:0,
        total_order_money:0,
        allow_use_bonus:0,
        order_type:'',
        bonus:{},
        select_bonus:-1,
        pay_info:{},

        change_post:[],
        change_shop_coupons:[],
        change_coupons:[],
        change_red_bag:[],
        total_favourable_fee:0,   //所有店铺优惠总额
        total_coupons_fee:0       //所有店铺优惠券总额
      }
    },
    mounted () {                        //页面完成加载
        this.flowCheckOrder()
    },
    methods: {                          //方法
      //获取结算页面信息
      flowCheckOrder(){
        var that = this;
        var url = config.indexAjax.flowcheckorder;
        that.rec_id = MojiAjax.indexFuns.getQueryString('rec_id');
        that.address_id = MojiAjax.indexFuns.getQueryString('address_id');
        var params = {
          rec_id:that.rec_id,
          address_id:that.address_id
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.consignee = res.data.consignee;
            var shop_list = res.data.shop_list;
            var total_shipping_fee = 0;
            var total_order_money = 0;
            var total_goods_money = 0;
            for (var i = 0; i < shop_list.length; i++) {
              var shipping_list = shop_list[i].shipping_list;

              for (var j = 0; j < shipping_list.length; j++) {
                if(shipping_list[j].shipping_code === 'a_express'){
                  shop_list[i].select_post = j;
                  total_shipping_fee += shipping_list[j].shipping_fee;
                }
              };

              
              if(typeof shop_list[i].shop_favourable == 'object'){
                  var isEmpty = true;
                  for(var item in shop_list[i].shop_favourable){
                    isEmpty = false;
                  }

                  if(isEmpty){
                    shop_list[i].shop_favourable_list = [];
                  }else{
                    var temp = [];
                    temp.push(shop_list[i].shop_favourable);
                    shop_list[i].shop_favourable_list = temp;
                  }
                }else{
                  shop_list[i].shop_favourable_list = shop_list[i].shop_favourable;
                }
                
                shop_list[i].select_favourable =  -1;
                shop_list[i].select_coupons =  -1;
                shop_list[i].select_favourable_fee =  0;
                shop_list[i].select_coupons_fee =  0;

                // if(shop_list[i].coupons.length>0){
                //   shop_list[i].select_coupons =  0;

                // }
                if(shop_list[i].shop_favourable_list.length>0){
                  shop_list[i].select_favourable =  0;
                  
                }
                
                var shop_money_all = shop_list[i].shop_money*shop_list[i].goods_total;
                
                shop_money_all -= shop_list[i].select_favourable_fee;
                shop_money_all -= shop_list[i].select_coupons_fee;
                
                
                total_goods_money += shop_money_all;

                

                if(shop_list[i].select_post>=0){
                  var shipping_fee = shop_list[i].shipping_list[shop_list[i].select_post].shipping_fee;
                  shop_money_all += shipping_fee;
                }

                shop_list[i].shop_money_all = shop_money_all;
                




            };

            that.order_type = res.data.order_type;

            total_order_money = total_goods_money ;

            if(that.order_type != 'GROUPBUY_GOODS'){
              total_order_money += total_shipping_fee;
            }


            that.shop_list = shop_list;
            that.total_goods_num = res.data.total_goods_num;
            that.total_goods_money = total_goods_money;
            // that.total_shipping_fee = res.data.total_shipping_fee;
            that.total_shipping_fee = total_shipping_fee;
            that.total_order_money = total_order_money;
            that.allow_use_bonus = res.data.allow_use_bonus;
            that.bonus = res.data.bonus;
            that.pay_info = res.data.pay_info;
            

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
      countOrderMoney(){
        var that = this;
        var shop_list = that.shop_list;
        var total_shipping_fee = 0;
        var total_order_money = 0;
        var total_goods_money = 0;
        for (var i = 0; i < shop_list.length; i++) {
          var shop_money_all = shop_list[i].shop_money;
                
          shop_money_all -= shop_list[i].select_favourable_fee;
          shop_money_all -= shop_list[i].select_coupons_fee;
          
          total_goods_money += shop_money_all;
          
          if(shop_list[i].select_post>=0){
            var shipping_fee = shop_list[i].shipping_list[shop_list[i].select_post].shipping_fee;
            shop_money_all += shipping_fee;
            total_shipping_fee += shipping_fee;
          }

          
          shop_list[i].shop_money_all = shop_money_all;


        };

        that.shop_list = shop_list;


        that.total_goods_money = total_goods_money;
        that.total_shipping_fee = total_shipping_fee;

        total_order_money = total_goods_money ;

        if(that.order_type != 'GROUPBUY_GOODS'){
          total_order_money += total_shipping_fee;
        }

        if(that.select_bonus>=0){
          total_order_money -= that.bonus[that.select_bonus].type_money
        }
        
        that.total_order_money = total_order_money;


      },
      changePost(shop_id,shop_index,select_post_index){
        var that = this;
        var changepost = $('#change-post-'+shop_id);
        changepost.find('li[shiplistindex="'+ select_post_index +'"] .sjq-icon').addClass('active');
        changepost.find('ul').unbind().on('click','li',function(){
          var _this = $(this);
          changepost.find('ul li .sjq-icon').removeClass('active');
          _this.find('.sjq-icon').addClass('active');
          var shiplistindex = Number(_this.attr('shiplistindex'));
          that.shop_list[shop_index].select_post = shiplistindex;
          var total_shipping_fee = 0;
          var shop_list = that.shop_list
          for (var i = 0; i < shop_list.length; i++) {
            total_shipping_fee += shop_list[i].shipping_list[shop_list[i].select_post].shipping_fee;
          };
          that.total_shipping_fee = total_shipping_fee;

          that.countOrderMoney();
        });
        changepost.show();


      },
      selectPost(shop_id){
         var changepost = $('#change-post-'+shop_id);
         changepost.hide();
      },

      selectAddress(){
        var that = this;
        window.location.href = 'selectAddress.html?rec_id='+that.rec_id;
      },


      changeFavourable(shop_id,shop_index,select_favourable_index){
        var that = this;
        var changefavourable = $('#change-favourable-'+shop_id);
        changefavourable.find('li[favourableindex="'+ select_favourable_index +'"] .sjq-icon').addClass('active');
        // changefavourable.find('ul').unbind().on('click','li',function(){
        //   var _this = $(this);
        //   changefavourable.find('ul li .sjq-icon').removeClass('active');
        //   _this.find('.sjq-icon').addClass('active');
        //   var favourableindex = Number(_this.attr('favourableindex'));
        //   that.shop_list[shop_index].select_favourable = favourableindex;
        //   that.shop_list[shop_index].select_favourable_fee = Number(that.shop_list[shop_index].shop_favourable_list[favourableindex].save_money);
          
        //   var total_fee = 0;
        //   var shop_list = that.shop_list
        //   for (var i = 0; i < shop_list.length; i++) {
        //     if(shop_list[i].select_favourable >=0){
        //       total_fee += Number(shop_list[i].shop_favourable_list[shop_list[i].select_favourable].save_money);
        //     }
        //   };
        //   that.total_favourable_fee = total_fee;

        // });
        changefavourable.show();


      },
      selectFavourable(shop_id){
         var changefavourable = $('#change-favourable-'+shop_id);
         changefavourable.hide();
      },
      
      changeShopCoupons(shop_id,shop_index,select_coupons_index){
        var that = this;
        var changeObj = $('#change-coupons-'+shop_id);
        changeObj.find('li[couponsindex="'+ select_coupons_index +'"] .sjq-icon').addClass('active');
        changeObj.find('ul').unbind().on('click','li',function(){
          var _this = $(this);
          changeObj.find('ul li .sjq-icon').removeClass('active');
          _this.find('.sjq-icon').addClass('active');
          var couponsindex = Number(_this.attr('couponsindex'));
          that.shop_list[shop_index].select_coupons = couponsindex;
          that.shop_list[shop_index].select_coupons_fee = Number(that.shop_list[shop_index].coupons[couponsindex].cou_money);
          

          var total_fee = 0;
          var shop_list = that.shop_list
          for (var i = 0; i < shop_list.length; i++) {
            if(shop_list[i].select_coupons >=0){
              total_fee += Number(shop_list[i].coupons[shop_list[i].select_coupons].cou_money);
            }
          };
          that.total_coupons_fee = total_fee;

          that.select_bonus = -1;
          that.countOrderMoney();

        });
        changeObj.show();


      },
      selectShopCoupons(shop_id){
         var changeObj = $('#change-coupons-'+shop_id);
         changeObj.hide();
      },

      changeRedBag(select_bonus_index){
        var that = this;
        var changeredbag = $('.layer-red-bag');

        changeredbag.find('li[bonusindex="'+ select_bonus_index +'"] .sjq-icon').addClass('active');
        changeredbag.find('ul').unbind().on('click','li',function(){
          var _this = $(this);
          changeredbag.find('ul li .sjq-icon').removeClass('active');
          _this.find('.sjq-icon').addClass('active');
          var bonusindex = Number(_this.attr('bonusindex'));
          that.select_bonus = bonusindex;

          that.countOrderMoney();
        });

        changeredbag.show();
      },
      selectBonus(){
        var changeredbag = $('.layer-red-bag');
         changeredbag.hide();
      },


      flowDone(){
        var that = this;
        var url = config.indexAjax.flowdone;
        
        var params = {
          rec_id:that.rec_id, //购物车集合ID
          address_id:that.address_id,
          pay_id:17,   //app  17支付宝,wap 9支付宝
          // pay_id:9,
          version:220
        };
        if(that.select_bonus>=0){
          params.bonus_id = that.bonus[that.select_bonus].bonus_id;
        }

        
        var shop_use_condition = [];
        var shoplist = that.shop_list;
        for (var i = 0; i < shoplist.length; i++) {
          var shopObj = {};
          shopObj.shop_id = shoplist[i].shop_id;
          if(shoplist[i].select_coupons>=0){
            shopObj.cou_id = shoplist[i].coupons[shoplist[i].select_coupons].cou_id;
          }
          
          if(shoplist[i].select_favourable>=0){
            shopObj.act_id = shoplist[i].shop_favourable_list[shoplist[i].select_favourable].act_id;
          }
          
          shopObj.shipping_id = shoplist[i].shipping_list[shoplist[i].select_post].shipping_id;
          
          shop_use_condition.push(shopObj);
        };
        params.shop_use_condition = shop_use_condition;


        // return false;
        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            
            //跳转flowDone 带ID
            window.location.href = 'flowDone.html?order_id='+res.data.order_id;
            // window.location.href = '/mobile/index.php?r=user/order/detail&order_id='+res.data.order_id;
          }else{
            if(res.status.error_code ===100){
              DialogLayer.open({
                  content: data.status.error_desc
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
  .content-block{background: #fff;padding: 0.512rem}
  
  .order-address{border-bottom: 1px solid #ddd;}
  .address-info{width: 13rem;}
  .address-right{margin-left: 13rem;}

  .shop-name{border-bottom: 1px solid #ddd;height: 1.2rem;}
  .goods-info{padding-top: 0.64rem;}
  .goods-img{width: 3.413rem;height: 3.413rem;float: left;background: #eaeaea;}
  .goods-i{font-size: 0.512rem;margin-left: 4rem;}
  .goods-name{margin-bottom:2rem; }
  .goods-price{color: #f5337d;}
  .goods-number{margin-left: 2rem;}

  .goods-rule{margin-top: 0.512rem;background: #eaeaea;padding-bottom:0.512rem;font-size: 0.512rem;}
  .goods-rule table{width: 100%;text-align: center;}
  .goods-rule table thead tr{height: 1.2rem;}

  .post-type,.shop-coupons,.coupons,.red-bag{border-bottom: 1px solid #ddd;}
  .post-info{width: 14rem; float: left;margin-top: 0.512rem;}
  .shop-coupons,.coupons{padding: 0.254rem 0rem;}
  .shop-coupons p,.coupons p,.red-bag p{width: 14rem;float: left;}
  .t-count{font-size: 0.512rem; text-align: right;padding-top: 0.512rem;padding-right: 1rem;}
  .t-count span{color:#f5337d; }
  

  .order-total p{padding:0.254rem 0rem;border-bottom: 1px solid #ddd;}
  .order-total p .price{float: right;color:#f5337d; }
  .order-total .total-count{text-align: right;border-bottom: 0px solid #ddd;font-size: 0.7rem;}
  .order-total .total-count span{color:#f5337d; }


  .submit-order{position: fixed;bottom: 0;background: #f5337d;color: #fff;width: 100%;height: 2rem;line-height: 2rem;text-align: center;}

  
  /*.layui-m-layershade{background-color:rgba(0,0,0,.5) }*/
  .layui-m-layer .layui-m-layer-footer{width: 100%;bottom: 0px;background: #fff;}
  .layui-m-layer .layui-m-layercont{line-height: normal;padding: 0px;font-size: 0.64rem;}
  .layui-m-layercont .title{height: 1.5rem;line-height: 1.5rem;border-bottom: 1px solid #ddd;}
  .layui-m-layercont ul{padding: 0rem 0.512rem;margin-bottom: 2.5em;}
  .layui-m-layercont ul li{border-bottom: 1px solid #ddd;height: 1.5rem;line-height: 1.5rem;text-align: left;}
  .layui-m-layercont ul li i{margin-top: 0.512rem;}
  .layui-m-layercont .confirm-btn{background: #f5337d;text-align: center;color: #fff;height: 1.5rem;line-height: 1.5rem;}
  
  .layer-change-post .sjq-icon,.layer-shop-coupons .sjq-icon,.layer-coupons .sjq-icon{display: none;}
  .layer-change-post .sjq-icon.active,.layer-shop-coupons .sjq-icon.active,.layer-coupons .sjq-icon.active{display: inline-block;}

  .layer-red-bag .sjq-icon{display: none;}
  .layer-red-bag .sjq-icon.active{display: inline-block;}

</style>
