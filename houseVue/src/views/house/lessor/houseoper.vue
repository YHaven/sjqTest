<template>
<div class="content profile">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/lessor/houselist', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title">编辑房产</h1>
  </header>
  <form class="list-block">
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
      <li>
        <div class="item-content">
          <div class="item-inner ">
            <img src="/static/img/1.jpg" height="auto" style='width: 2.2rem;'>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">房子图片</div>
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
                    <select name="houseType">
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

  

  <div class="submit-button">
    <button class="button button-big button-fill">保存</button>
  </div>
</div>
</template>
<script>
  import $ from 'zepto'
  import FileInput from '../../../components/FileInput'
  

  export default {
  route: {
    data () {

      return this.$http.get(planPro.ajaxUrl.houseoper+'?id='+planPro.fun.getQueryString('id'))
      .then(({data: {status,data}}) => {
        this.$set('fdata', data);
      })
    }
  },
  ready () {

  },
  data () {
    return {
      fdata: {}
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
    }

  },
  components: {
    FileInput
  }
}

</script>
<style>
.profile .bar{
  position: relative;
}
.profile .list-block {
  /*margin: 2.4rem 0 1rem 0;*/
  margin-top: .2rem;
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
