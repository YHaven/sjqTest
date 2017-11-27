<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c">
        <i v-if="step == 1">申请售后</i>
        <i v-if="step != 1 && refund_type == 0">仅退款</i>
        <i v-if="step != 1 && refund_type == 1">退货退款</i>
        <i v-if="step != 1 && refund_type == 2">换货</i>
      </li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->
    
    <ul v-if="step == 1" class="refund-type">
      <li @click="selectRefundType(1)" v-if="status_code == 'shipped'">
        <p>退货退款</p>
        <p class="zs">已收到货,需要退还已收到的货物</p>
      </li>
      <li @click="selectRefundType(0)" v-if="status_code == 'await_ship' || status_code == 'shipped'">
        <p>仅退款</p>
        <p class="zs">未收到货,或者与卖家协商同意提前下申请</p>
      </li>
      <li @click="selectRefundType(2)" v-if="status_code == 'shipped' || status_code == 'finished'">
        <p>换货</p>
        <p class="zs">对已收到的货物不满意，联系卖家协商换货</p>
      </li>
    </ul>
    <!-- 地址 -->
    <div class="content-block order-address clearfix" style="margin-top:0rem;" @click="selectAddress" v-if="step == 2 && refund_type == 3">
      <div class="address-info f-l">
        <p class="clearfix"><span class="f-l">{{consignee.consignee}}</span><span class="f-r">{{consignee.mobile}}</span></p>
        <p>{{consignee.province_name}}{{consignee.city_name}}{{consignee.district_name}}{{consignee.address}}</p>
      </div>
      <div class="address-right clearfix"><i class="sjq-icon right-arrow-icon" style="margin-top:0.64rem;"></i></div>
    </div>

    <form class="refund-form" v-if="step == 2">

      <p>
        <label for="">退货原因</label>
        <span>
          <select name="refund_reason" id="">
            <option value="1">质量问题，做工材质面料差</option>
            <option value="2">发错了，款式/尺码/数量不对</option>
            <option value="3">包装/商品破损/污渍等</option>
            <option value="4">未按约定时间发货</option>
            <option value="5">其他</option>
          </select>
        </span>
        
      </p>
      <p v-if="refund_type != 0 && false">
        <label for="">退货数量</label>
        <span class="refund-number"><i class="minus">-</i><em minnum="1" :maxnum="maxnumber" >{{refund_number}}</em><i class="plus">+</i></span>
        <input type="hidden" name="refund_number" :value="refund_number">
      </p>
      <p v-if="true">
        <label for="" style="width:100%;">选择退货商品</label>
        <ul class="goods-list">
            <li class="goods-item clearfix" v-for="goods in goods_list">
              <!-- <div class="check-div" >
                <span class="check-box checked"><i class="sjq-icon check-right-icon"></i></span>
              </div> -->
              <div class="goods-img">
                <a >
                <img :src="goods.img.small" alt="">
                </a>
              </div>
              <div class="goods-info">
                <p class="goods-name">{{goods.name}}</p>
                <p class="goods-price">实际单价:<span class="price">¥{{goods.goods_price}}</span><!-- <nobr class="f-r size">[xxx]</nobr> --></p>
              </div>
              <div class="goods-opra">
                <span class="refund-number"><i class="minus">-</i><em minnum="0" :goodsid="goods.goods_id" :goodsprice="goods.goods_price" :maxnum="goods.goods_number" :rec_id="goods.rec_id">{{goods.goods_number}}</em><i class="plus">+</i></span>
                <!-- <input type="hidden" name="refund_number" :value="goods.refund_number"> -->
              </div>
            </li>
          </ul>
        </li>
      </ul>
      </p>
      <p v-if="refund_type != 2">
        <label for="">退货金额</label>
        <span>
          <input name="refund_money" type="number" :value="refundmoney" readonly :placeholder="'最多可申请金额:'+maxmoneyprice" :maxprice="maxmoneyprice">
        </span>
      </p>
      <p v-if="refund_type != 2">
        <label for="">退运费金额</label>
        <span>
          <input name="refund_fee" type="number"  :placeholder="'最多可申请金额:'+maxfeeprice" :maxprice="maxfeeprice">
        </span>
      </p>
      <p>
        <label for="">退货说明</label>
        <textarea name="refund_remark" id="" cols="30" rows="10" placeholder="请填写"></textarea>
      </p>
        
      <div class="photo-p" v-if="refund_type != 2">
        <div class="img-show"></div>
        <label for="" class="upload-photo">
          +<input class="fileupload" type="file" name="fileupload" id="fileupload" @change="uploadFile()" accept="image/*">
        </label>
        
        <div>上传凭证(最多三张)</div>
      </div>

      <div class="submit-btn" @click="submitForm">提交</div>
    </form>
  </div>
</template>

<script>
  
  import FontReset from 'common/js/font.reset'        //移动头部
  import MojiAjax from 'common/js/moji.ajax'          //摩街数据方法类
  import config from 'common/js/moji.config'
  import ZpTimer from 'common/js/zepto.timer'        //倒计时
  import DialogLayer from 'common/js/layer'          //摩街数据方法类

  import $ from 'zepto'

  export default {
    name: 'app',
    data (){
      return {
        proPath:MojiAjax.indexFuns.propath,
        order_id:'',
        ret_id:'',
        rec_id:'',
        order_id:'',
        status_code:'',
        step:1,
        refund_type:1,
        refund_number:1,
        dataDetail:{},
        goods_list:[],
        refundmoney:0,
        maxmoneyprice:0.00,
        maxfeeprice:0.00,
        maxnumber:0,
        address_id:'',
        addressData:{}
      }
    },
    mounted () {                        //页面完成加载
        var that = this;
        var status_code = MojiAjax.indexFuns.getQueryString('status_code');
        var ret_id = MojiAjax.indexFuns.getQueryString('ret_id');
        var rec_id = MojiAjax.indexFuns.getQueryString('rec_id');
        var address_id = MojiAjax.indexFuns.getQueryString('address_id');
        var maxmoneyprice = MojiAjax.indexFuns.getQueryString('maxmoneyprice');
        var maxfeeprice = MojiAjax.indexFuns.getQueryString('maxfeeprice');
        var maxnumber = MojiAjax.indexFuns.getQueryString('maxnumber');
        var order_id = MojiAjax.indexFuns.getQueryString('order_id');
        that.status_code = status_code;
        that.ret_id = ret_id;
        that.rec_id = rec_id;
        that.address_id = address_id;
        that.maxmoneyprice = maxmoneyprice;
        that.maxfeeprice = maxfeeprice;
        that.maxnumber = maxnumber;
        that.order_id = order_id;

        that.refundmoney = maxmoneyprice,
        // that.userAddress();
        
        that.getOrderDetail()
        
    },
    methods: {                          //方法
      countMoney(){
        var that = this;
        var nowRefundMoney = 0;
        var maxMoney = that.maxmoneyprice;
  
        $('.goods-list').find('.goods-item').each(function(index){
          var _this = $(this);
          var em = _this.find('.refund-number').find('em');
          var goodsprice = Number(em.attr('goodsprice'));
          var nowNum = Number(em.text());

          nowRefundMoney = nowRefundMoney + goodsprice*nowNum;
        });
        if(nowRefundMoney<0){
          that.refundmoney = 0.00;
        }else if(nowRefundMoney>maxMoney){
          that.refundmoney = maxMoney;
        }else{
          that.refundmoney = nowRefundMoney;
        }
      },
      initOpration(){
        var that = this;
        $('.refund-number').on('click','i',function(){
          var _this = $(this);
          var em = _this.closest('.refund-number').find('em');
          var goodsprice = Number(em.attr('goodsprice'));
          var nowNum = Number(em.text());
          var minnum = Number(em.attr('minnum'));
          var maxnum = Number(em.attr('maxnum'));
          if(_this.hasClass('minus')){
            if((nowNum-1)<minnum){
              // DialogLayer.open({
              //   content: '最小数量不能小于'+minnum
              //   ,skin: 'msg'
              //   ,time:3
              // });
              return false;
            }else{
              em.text(nowNum - 1);
              that.countMoney();
            }
          }else{
            if((nowNum+1)>maxnum){
              // DialogLayer.open({
              //   content: '已经超过最大数量'
              //   ,skin: 'msg'
              //   ,time:3
              // });
              return false;
            }else{
              em.text(nowNum + 1);
              that.countMoney();
            }
          }
        });
      },
      selectRefundType(refund_type){
        var that = this;
        that.step = 2;
        that.refund_type = refund_type;
        setTimeout(function(){
          that.initOpration();
        },500);
        
      },
      uploadFile(fileDomStr){
        if($('.img-show').find('img').length == 3){
          DialogLayer.open({
            content: '最多上传3张凭证'
            ,skin: 'msg'
            ,time:3
          });
          return false;
        }

        if ( typeof(FileReader) === 'undefined' ){ 
            DialogLayer.open({
              content: '抱歉，你的浏览器不支持 FileReader'
              ,skin: 'msg'
              ,time:3
            });

            return false;
        }
        var file = $('#fileupload')[0].files[0];
        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
        if(!/image\/\w+/.test(file.type)){ 
                alert("请确保文件为图像类型");
                return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
              var newimg = $('<span><i>x</i><img src="'+this.result+'" alt="" imgpath="'+ this.result +'"/></span>');
              $('.img-show').append(newimg);
              $('.img-show').unbind().on('click','i',function(){
                $(this).closest('span').remove();
              })
                //result.innerHTML = '<img src="'+this.result+'" alt=""/>';
                //img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>';
        }



      },
      submitForm(){
        var that = this;
        var url = config.indexAjax.ordersubmitreturn;
        var params = {};
        var refund_money = Number($('input[name="refund_money"]').val());
        var moneymaxprice = Number($('input[name="refund_money"]').attr('maxprice'));
        var refund_fee = Number($('input[name="refund_fee"]').val());
        var feemaxprice = Number($('input[name="refund_fee"]').attr('maxprice'));
        if(!isNaN(refund_money)){
          if(refund_money<=moneymaxprice){
            params.should_return = refund_money;
          }else{
            DialogLayer.open({
              content: '超过最多可申请金额:'+moneymaxprice
              ,skin: 'msg'
              ,time:3
            });
            return false;
          }
        }

        if(!isNaN(refund_fee)){
          if(refund_fee<=feemaxprice){
            params.return_shipping_fee = refund_fee;
          }else{
            DialogLayer.open({
              content: '超过最多可申请金额:'+feemaxprice
              ,skin: 'msg'
              ,time:3
            });
            return false;
          }
          
        }


        // params.rec_id = that.rec_id;
        params.order_id = that.order_id;
        params.version = 230;

        params.cause_id = $('select[name="refund_reason"] option').not(function(){ return !this.selected }).val();       //(退换原因,此处传ID而非文本)
        var rec_info_arr = [];
        $('.goods-list').find('.goods-item').each(function(){
          var _thisEm = $(this).find('.refund-number em');
          rec_info_arr.push(_thisEm.attr('goodsid')+':'+_thisEm.text());
        });
        params.rec_info = rec_info_arr.join(',');
        params.new_rec_info = rec_info_arr.join(',');
        // params.return_number = that.refund_number;  //(退换货数量 )
        params.return_type = that.refund_type;   //(退换货类型0仅退款 1退货 2换货)
        params.credentials = 0;   //是否有检测报告，不传默认为0 可不传)

        params.return_brief = $('textarea[name="refund_remark"]').val();      ////问题描述
        
        if(params.return_brief == ''){
          DialogLayer.open({
            content: '问题描述未填写'
            ,skin: 'msg'
            ,time:3
          });
          return false;
        }

        if(that.refund_type == 3 || true){
          params.country=that.addressData.country; //国家
          params.province=that.addressData.province; //省
          params.city=that.addressData.city; //市
          params.district=that.addressData.district; //区
          // params.street = that.addressData.street; //街
          params.address = that.addressData.address; //联系地址
          // params.zipcode=that.addressData.zipcode; //邮编
          params.addressee=that.addressData.consignee; //联系人
          params.phone=that.addressData.mobile; //手机号码
        }

        params.first_image = '';
        params.second_image = '';
        params.third_image = '';
        $('.img-show').find('img').each(function(index){
          var _this = $(this);
          var _thispath = _this.attr('imgpath');
          if(index === 0){
            params.first_image = _thispath;   //第一张凭证图片 ,
          }
          if(index === 1){
            params.second_image = _thispath;      //:第二张凭证图片 ,
          }
          if(index === 2){
            params.third_image = _thispath;        //:第三张凭证图片 
          }
          
        })
        
        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            DialogLayer.open({
                  content: '提交成功！'
                  ,btn: '确定',
                  yes: function(index){
                    window.location.href = 'userOrderDetail.html?order_id='+that.order_id
                  }
                });
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
                ,time:3
              });
            }

            // window.location.href = 'login.html'
          }
        },'POST')



      },
      getOrderDetail(){
        var that = this;
        var url = config.indexAjax.orderreturninfo;
        
        var params = {
          order_id:that.order_id
        };

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.goods_list = res.data;
            
            that.userAddress();
            // that.initOpration();

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
      
      userAddress(){
        var that = this;
        var url = config.indexAjax.addresslist;
        
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){

            
            var addresslist = res.data;
            for (var i = 0; i < addresslist.length; i++) {
              if(addresslist[i].default_address === 1 && that.address_id === ''){
                var default_address_id = addresslist[i].id;
                that.addressData = addresslist[i];
              }

              if(that.address_id !== '' && that.address_id == addresslist[i].id){
                that.addressData = addresslist[i];
              }
            };

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
      selectAddress(){
        var that = this;
        // window.location.href = 'selectAddress.html?rec_id='+that.rec_id;
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
  
  .refund-type{padding: 0.512rem;background-color: #fff;}
  .refund-type li{padding: 0.512rem 0rem;border-bottom: 1px solid #ddd;}
  .refund-type li .zs{font-size: 0.512rem;color: #666;}

  .refund-form{}
  .refund-form p{padding: 0.3rem;border-bottom: 1px solid #ddd;background-color: #fff;}
  .refund-form p label{width: 3.5rem;display: inline-block;}
  .refund-form p select{border: 1px solid #ddd;border-radius: 5px;width: 10rem;height: 1rem;font-size: 0.512rem;}
  .refund-form p input{border: 0px;height: 1rem;font-size: 0.512rem;width: 10rem;}
  .refund-form p textarea{display: block;width: 14rem;background-color: #eaeaea;border-radius: 5px;border: 1px solid #ddd;font-size: 0.512rem;margin-bottom: 0.512rem;margin-top: 0.3rem;padding: 0.3rem;}
  
  .refund-number i{display: inline-block;width: 1rem;height: 1rem;text-align: center;line-height: 1rem;border: 1px solid #ddd;}
  .refund-number em{display: inline-block;width: 2rem;height: 1rem;text-align: center;line-height: 1rem;border: 1px solid #ddd;margin-left: 0.2rem;margin-right: 0.2rem;}
  
  .refund-form .photo-p{margin-top: 0.3rem;background-color: #fff;padding: 0.3rem;}
  .refund-form .photo-p .upload-photo{border-radius: 3px;border: 1px solid #ddd;width: 2rem;height: 2rem;font-size: 2rem;text-align: center;line-height: 2rem;color: #999;display: inline-block;position: relative;overflow: hidden;}
  .refund-form .photo-p .upload-photo input{position: absolute;left: 0px;width: 2rem;height: 2rem;text-indent: 14rem;color: #fff;}
  
  .refund-form .photo-p span{font-size: 0.512rem;}
  .submit-btn{position: fixed;bottom: 0;background: #f5337d;color: #fff;width: 100%;height: 2rem;line-height: 2rem;text-align: center;}
  

  .goods-item{height: 4rem;padding: 0.5rem 0rem;overflow: hidden;}
  .goods-item .check-div{float: left;width: 2rem;padding: 1.5rem 0rem;}
  .goods-item .goods-img{float: left;width: 4rem;height: 100%;}
  .goods-item .goods-info{float: left; height: 100%;padding:0rem 0.5rem;word-wrap:break-word; width: 5rem;}
  
  .check-div .check-box{margin-left: 0.5rem;}
  .goods-info .goods-name{font-size: 0.512rem;overflow: hidden;height: 2rem;}
  .goods-price{font-size: 0.512rem}
  .goods-price .price{color: #f5337d;}
  .goods-price .size{margin-right: 0.5rem;width: 4rem;overflow: hidden;text-overflow:ellipsis;}
  .goods-info p{border-bottom: 0px;}

  .goods-opra{padding-top: 2.8rem;}
  /*.goods-opra span{font-size: 0.8rem;border: 1px solid #ddd;width: 0.8rem;height: 0.8rem;display: inline-block;text-align: center;line-height: 0.8rem;}
  .goods-item .goods-opra input{border: 1px solid #ddd;text-align: center;height: 0.8rem;line-height: 0.8rem;font-size: 0.256rem;width: 3.5rem;}*/


</style>
