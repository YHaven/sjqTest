<template>
  
  <div class="content profile">
  <top-header path="/house/lessor/roomlist?id=" label="编辑房号" :pid="fdata.house.id"></top-header>
  <form class="list-block" id="roomForm">
    <input type="hidden" id="houseId" name="houseId" value="{{fdata.house.id}}"/>
    <input type="hidden" id="id" name="id" value="{{fdata.id}}"/>
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                {{fdata.house.houseName}}
            </div>
        </div>
      </li>
    </ul>
    <ul style="margin-top:.5rem;">
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">房号</div>
                <div class="item-input">
                    <input id="roomName" type="text" name="roomName" placeholder="房号" value="{{fdata.roomName}}" >
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">备注</div>
                <div class="item-input">
                    <input id="roomRemark" type="text" name="roomRemark" placeholder="房间配置备注" value="{{fdata.roomRemark}}" >
                </div>
            </div>
        </div>
      </li>
    </ul>
  </form>
  <div class="submit-button" @click="postForm">
    <button class="button button-big button-fill">保存</button>
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
        return this.$http.get(planPro.ajaxUrl.roomoper+'?id='+pId)
        .then(({data: {status,data}}) => {
          this.$set('fdata', data);
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
        let params = planPro.fun.serializeArrayToJson($('#roomForm').serializeArray());
        var checkResult = true;
        if(params.roomName === ''){
          layer.open({content: '房号未填写',time:2});
          checkResult = false;
        }

        if(!checkResult){
          _this.loading = false;
          loader.hide()
          return false;
        }

        params.vt = 1;
        var postUrl = planPro.ajaxUrl.postroomoper; //添加的
        if(params.id !== '') postUrl = planPro.ajaxUrl.postroomopermodify;  //修改的
        _this.$http.post(postUrl,params)
          .then(({data: {status}}) => {
            _this.$route.router.go({path: '/house/lessor/roomlist?id='+_this.fdata.house.id, replace: true});
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
.profile .list-block {
  /*margin: 2.4rem 0 1rem 0;*/
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
</style>
