<template>
  <div id="app">
    <link rel="stylesheet" :href="proPath+'/static/js/need/layer.css'">
    <link rel="stylesheet" :href="proPath+'/static/css/reset.css'">
    <!-- 头部 -->
    <ul class="header">
      <li class="header-left"><i class="sjq-icon go-back-icon" onClick="javascript:history.go(-1);"></i></li>
      <li class="header-middle text-c">
        <i>填写物流信息</i>
      </li>
      <!-- <li class="header-right"><i class="sjq-icon msg-icon"></i></li> -->
    </ul>
    <!-- 头部 -->

    <form class="refund-form">

      <p>
        <label for="">物流公司</label>
        <span>
          <select name="shipping_id" id="">
            <option :value="shippingItem.shipping_id" v-for="(shippingItem, gindex) in orderShippingList">{{shippingItem.shipping_name}}</option>
          </select>
        </span>
        
      </p>
      <p>
        <label for="">快递单号</label>
        <span>
          <input name="invoice_no" type="text" >
        </span>
      </p>
      
      <div class="photo-p">
        <div>物流面单</div>
        <div class="img-show"></div>
        <label for="" class="upload-photo">
          +<input class="fileupload" type="file" name="fileupload" id="fileupload" @change="uploadFile()" accept="image/gif, image/jpeg, image/png">
        </label>
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
        maxmoneyprice:0.00,
        maxfeeprice:0.00,
        maxnumber:0,
        orderShippingList:[],
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


        that.orderShipping();
        // that.userAddress();
        
        // that.getOrderDetail()
        
    },
    methods: {                          //方法
      uploadFile(fileDomStr){
        if($('.img-show').find('img').length == 1){
          DialogLayer.open({
            content: '最多上传1张面单'
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
        var url = config.indexAjax.ordersendcourier;
        var params = {};


        params.ret_id = that.ret_id;
        params.shipping_id = $('select[name="shipping_id"] option').not(function(){ return !this.selected }).val();   
        params.invoice_no = $('input[name="invoice_no"]').val();
        
        if(params.invoice_no == ''){
          DialogLayer.open({
            content: '快递单号未填写'
            ,skin: 'msg'
            ,time:3
          });
          return false;
        }

        $('.img-show').find('img').each(function(index){
          var _this = $(this);
          var _thispath = _this.attr('imgpath');
          if(index === 0){
            params.images = _thispath;   //第一张凭证图片 ,
          }
          
        })
        
        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            
            window.location.href = 'userOrderDetail.html?order_id='+that.order_id
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
      orderShipping(){
        var that = this;
        var url = config.indexAjax.ordershipping;
        
        var params = {};

        MojiAjax.indexFuns.postJsonAjax(url,params,function(res){
          if(res.status.succeed === 1){
            that.orderShippingList = res.data;

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
  .refund-number em{display: inline-block;width: 3rem;height: 1rem;text-align: center;line-height: 1rem;border: 1px solid #ddd;margin-left: 0.2rem;margin-right: 0.2rem;}
  
  .refund-form .photo-p{margin-top: 0.3rem;background-color: #fff;padding: 0.3rem;}
  .refund-form .photo-p .upload-photo{border-radius: 3px;border: 1px solid #ddd;width: 2rem;height: 2rem;font-size: 2rem;text-align: center;line-height: 2rem;color: #999;display: inline-block;position: relative;overflow: hidden;}
  .refund-form .photo-p .upload-photo input{position: absolute;left: 0px;width: 2rem;height: 2rem;text-indent: 14rem;color: #fff;}
  
  .refund-form .photo-p span{font-size: 0.512rem;}
  .submit-btn{position: fixed;bottom: 0;background: #f5337d;color: #fff;width: 100%;height: 2rem;line-height: 2rem;text-align: center;}
  
</style>
