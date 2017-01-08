<template>
<div class="content profile">
  <top-header path="/house/lessor/houselist" label="编辑房产"></top-header>
  <form class="list-block" id="houseForm">
    <input type="hidden" id="id" name="id" value="{{fdata.id}}"/>
    <ul>
      <!-- <li style="height: 3rem;">
        <div class="item-content" style="min-height: 3rem;">
          
          <div class="item-media"></div>
          <div class="item-inner" class="uploadBtn" style="min-height: 3rem;">
            <div class="item-title-row">
            </div>
            <input style="display:-none;" accept="image/*" onchange="uploadImgFile(this)" id="Filedata" name="Filedata" type="file">
            <input type="hidden" name="uploadImg" value="">
            <div class="item-subtitle"><span class="imgpath"></span>图片</div>
          </div>
        </div>
      </li> -->
      <li style="height: 3rem;">
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label"><img src="{{fdata.uploadImg}}" height="auto" style='width: 2.2rem;'></div>
                <div class="item-input">
                    <file-input :pdata="fdata"></file-input>
                    <!-- <input style="display:-none;" accept="image/*" v-on:change="uploadImgFile(this)" id="Filedata" name="Filedata" type="file">
                    <input type="hidden" name="uploadImg" value=""> -->

                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">*房子名称</div>
                <div class="item-input">
                    <input id="houseName" type="text" name="houseName" placeholder="请输入房产名称" value="{{fdata.houseName}}">
                </div>
            </div>
        </div>
      </li>
    </ul>
    <ul style="margin-top:.5rem;">
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">房产类型</div>
                <div class="item-input">
                    <select name="houseType" id="houseType">
                        <option value="1" v-if="fdata.houseType === '1'" seleted>住宅/小区/公寓</option>
                        <option value="1" v-else>住宅/小区/公寓</option>
                        <option value="1" v-if="fdata.houseType === '2'" seleted>办公室/写字楼</option>
                        <option value="1" v-else>办公室/写字楼</option>
                        <option value="1" v-if="fdata.houseType === '3'" seleted>商铺</option>
                        <option value="1" v-else>商铺</option>
                        <option value="1" v-if="fdata.houseType === '4'" seleted>仓库</option>
                        <option value="1" v-else>仓库</option>
                    </select>
                </div>
            </div>
        </div>
      </li>
     
    </ul>
  </form>

  

  <div class="submit-button" @click="postForm">
    <button class="button button-big button-fill" >保存</button>
  </div>
</div>
</template>
<script>
  import TopHeader from '../../../components/TopHeader'
  import {loader} from '../../../util/util'
  import $ from 'zepto'
  import FileInput from '../../../components/FileInput'
  

  export default {
  route: {
    data () {
      var pId = planPro.fun.getQueryString('id');
      if(pId){
        return this.$http.get(planPro.ajaxUrl.houseoper+'?id='+pId)
        .then(({data}) => {
          if(data.status){
            this.$set('fdata', data.data);
          }else{
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
        this.$set('fdata', {});
      }
      
    }
  },
  ready () {

  },
  data () {
    return {
      fdata: {},
      loading : false
    }
  },
  computed: {

  },
  methods: {
    uploadImgFile(thisFile){
      var fileName = thisFile.id;
      target.ajaxFileUpload ({ 

                url : 'http://www.zhencome.com/plana/index!userProfile.action?vt=1',

                secureuri :false, 

                fileElementId : thisFile.id, 

                dataType : 'json', 

                data : {},

                success : function (data,status){
                  if(data.status){
                    $('input[name="uploadImg"]').val(data.imgid);
                    $('.house-short-img img').attr('src',data.imgurl);
                  }else{
                    PLANA.showbox.showMessageBox(data.errorinfo,true,3000);
                  }
                }

            });
    },
    //提交
    postForm () {
      var _this = this;
      if (_this.loading) {
        return
      }
      _this.loading = true
      let scroller = $('.content')
      loader.show()
      setTimeout(() => {
        let params = planPro.fun.serializeArrayToJson($('#houseForm').serializeArray());
        var checkResult = true;
        if(params.houseName === ''){
          layer.open({content: '房屋名称未填写',time:2});
          checkResult = false;
        }

        if(!checkResult){
          _this.loading = false;
          loader.hide()
          return false;
        }

        params.vt = 1;

        var postUrl = planPro.ajaxUrl.posthouseoper; //添加的
        if(params.id !== '') postUrl = planPro.ajaxUrl.posthouseopermodify;  //修改的
        _this.$http.post(postUrl,params)
          .then(({data: {status}}) => {
            _this.$route.router.go({path: '/house/lessor/houselist', replace: true});
        })
      
        _this.loading = false
        loader.hide()
      }, 1500)
    }

  },
  components: {
    FileInput,
    TopHeader
  }
}

</script>
<style scoped>
.profile .bar{
  position: relative;
}
.profile .list-block {
  /*margin: 2.4rem 0 1rem 0;*/
  /*margin-top: .2rem;*/
  margin: 0px;
  font-size: .65rem;
}
.profile .list-block .item-subtitle {
  font-size: .65rem;
}
.profile .list-block .item-input {
  margin-top: .06rem;
  margin-bottom: .06rem;
}
.profile .list-block input {
  font-size: .65rem;
}
.profile .list-block select {
  font-size: .65rem;
}
.profile .list-block textarea {
  font-size: .65rem;
}
.profile .list-block .item-title.label  {
  width: 30%;
}
.profile .submit-button {
  margin: 0 auto 2rem auto;
  width: 100%;
  padding: 0 .45rem;
}
.profile .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.thumb img{width: 100%;height: 100%;}
</style>
