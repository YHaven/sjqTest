<template>
<div class="content profile">
  <top-header path="/house/lessor/rentallist?id=" label="账单编辑" :pid="fdata.renter.id"></top-header>
  <form class="list-block" id="rentalForm">
    <input type="hidden" id="renterId" name="renterId" value="{{fdata.renter.id}}"/>
    <input type="hidden" id="id" name="id" value="{{fdata.id}}"/>
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                {{fdata.renter.renterName}}
            </div>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">实收租金</div>
                <div class="item-input">
                    <input id="rental" type="text" name="rental" placeholder="0" value="{{fdata.rental}}" >
                </div>
            </div>
        </div>
      </li>
      
    </ul>
    
    <div class="s-title">本期表读数</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">电表度数</div>
                  <div class="item-input">
                      <input id="electricNow" type="text" name="electricNow" placeholder="0" value="{{fdata.electricNow}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      <input id="waterNow" type="text" name="waterNow" placeholder="0" value="{{fdata.waterNow}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                      <input id="gasNow" type="text" name="gasNow" placeholder="0" value="{{fdata.gasNow}}">
                  </div>
              </div>
          </div>
      </li>
    </ul>
    <div class="s-title">上期表读数</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">电表度数</div>
                  <div class="item-input">
                      {{fdata.electricPre}}
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      {{fdata.waterPre}}
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                     {{fdata.gasPre}}
                  </div>
              </div>
          </div>
      </li>
    </ul>
    <ul style="margin-top:.5rem">
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">其他费用</div>
                <div class="item-input">
                    <input id="otherPrice" type="text"  name="otherPrice" placeholder="0.00" value="{{fdata.otherPrice}}">
                </div>
            </div>
        </div>
      </li>
      
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">备注</div>
                  <div class="item-input">
                      <textarea id="remark" name="remark" placeholder="" >{{fdata.remark}}</textarea>
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
  import TopHeader from '../../../components/TopHeader'
  import {loader} from '../../../util/util'
  import $ from 'zepto'
  export default {
  route: {
    data () {
      var pId = planPro.fun.getQueryString('id');
      if(pId){
        return this.$http.get(planPro.ajaxUrl.rentaloper+'?id='+pId,{},{credentials: true})
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
        let params = planPro.fun.serializeArrayToJson($('#rentalForm').serializeArray());
        var checkResult = true;
        if(params.renterName === ''){
          layer.open({content: '租客姓名未填写',time:2});
          checkResult = false;
        }
        if(params.renterPhone === ''){
          layer.open({content: '租客电话未填写',time:2});
          checkResult = false;
        }
        if(params.money === '' || Number(params.money) < 0 ){
          layer.open({content: '租金必须大于等于0',time:2});
          checkResult = false;
        }

        if(!checkResult){
          _this.loading = false;
          loader.hide()
          return false;
        }

        params.vt = 1;

        var postUrl = planPro.ajaxUrl.postrentaloper; //添加的
        if(params.id !== '') postUrl = planPro.ajaxUrl.postrentalopermodify;  //修改的
        _this.$http.post(postUrl,params,{credentials: true})
          .then(({data}) => {

            if(data.status){
              _this.$route.router.go({path: '/house/lessor/rentallist?id='+_this.fdata.renter.id, replace: true});
            }else{
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
       
        _this.loading = false
        loader.hide()
      }, 1500)
    }

  },
  components: {
    TopHeader
  }
}

</script>


<style>
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
</style>
