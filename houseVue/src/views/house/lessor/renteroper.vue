<template>
<div class="content profile">
  <top-header path="/house/lessor/renterlist?id=" label="编辑租客" :pid="fdata.room.id"></top-header>
  <form class="list-block" id="renterForm">
    <input type="hidden" id="roomId" name="roomId" value="{{fdata.room.id}}"/>
    <input type="hidden" id="id" name="id" value="{{fdata.id}}"/>
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                {{fdata.room.roomName}}
            </div>
        </div>
      </li>
    </ul>
    <ul>
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
                <div class="item-title label">租客姓名</div>
                <div class="item-input">
                    <input id="renterName" type="text" name="renterName" placeholder="请输入租客姓名" value="{{fdata.renterName}}">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">电话号码</div>
                <div class="item-input">
                    <input id="renterPhone" type="text" name="renterPhone" placeholder="暂未填写电话号码" value="{{fdata.renterPhone}}">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">身份证</div>
                <div class="item-input">
                    <input id="cid" type="text" name="cid" placeholder="暂无身份信息" value="{{fdata.cid}}">
                </div>
            </div>
        </div>
      </li>
    </ul>
    <div class="s-title">签约资料</div>
    <ul style="margin-top:.5rem;">
      <li>
        <div class="item-content item-link">
            <div class="item-inner">
                <div class="item-title label">起租日期</div>
                <div class="item-input">
                    <input id="startTime" type="date" name="startTime" placeholder="" value="{{fdata.startTime}}">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content item-link">
            <div class="item-inner">
                <div class="item-title label">到租日期</div>
                <div class="item-input">
                    <input id="endTime" type="date" name="endTime" placeholder="" value="{{fdata.endTime}}">
                </div>
            </div>
        </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">缴费周期</div>
                  <div class="item-input">
                      <input id="cycleTime" type="number" name="cycleTime" placeholder="月" value="{{fdata.cycleTime}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
        <div class=" item-content">
            <div class="item-inner">
                <div class="item-title label">每期租金</div>
                <div class="item-input">
                    <input id="money" type="number"  name="money" placeholder="0.00" value="{{fdata.money}}">
                </div>
            </div>
        </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">押金</div>
                  <div class="item-input">
                      <input id="deposit" type="number" name="deposit" placeholder="0.00" value="{{fdata.deposit}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">居住人数</div>
                  <div class="item-input">
                      <input id="renterNumber" type="number" name="renterNumber" placeholder="0" value="{{fdata.renterNumber}}">
                  </div>
              </div>
          </div>
      </li>
    </ul>
    <div class="s-title">收租提醒</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">提前提醒天数</div>
                  <div class="item-input">
                      <input id="remindDay" type="number" name="remindDay" placeholder="0" value="{{fdata.remindDay}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">提醒时间</div>
                  <div class="item-input">
                      <input id="remindTime" type="time" name="remindTime" placeholder="00:00" value="{{fdata.remindTime}}">
                  </div>
              </div>
          </div>
      </li>
      </ul>
    <div class="s-title">上次表度数</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">电表度数</div>
                  <div class="item-input">
                      <input id="electric" type="text" name="electric" placeholder="0" value="{{fdata.electric}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      <input id="water" type="text" name="water" placeholder="0" value="{{fdata.water}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                      <input id="gas" type="text" name="gas" placeholder="0" value="{{fdata.gas}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">备注</div>
                  <div class="item-input">
                      <textarea id="remark" name="remark"  >{{fdata.remark}}</textarea>
                  </div>
              </div>
          </div>
      </li>
    </ul>
  </form>
  <div class="submit-button" >
    <button class="button button-big button-fill" @click="postForm">保存</button>
    <button class="button button-big button-green" v-if="isAdd === false" @click="deleteData">删除</button>
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
        return this.$http.post(planPro.ajaxUrl.renteroper+'?id='+pId,{},{credentials: true})
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
        var fId = planPro.fun.getQueryString('roomId');
        if(fId){
            this.$set('fdata', {"room":{"id":fId}});
            this.$set('isAdd', true);
        }
      }
      
    }
  },
  ready () {

  },
  data () {
    return {
      fdata: {},
      isAdd:false,
      loading : false
    }
  },
  computed: {

  },
  methods: {
    //删除
    deleteData(){
      var _this = this;
      if (_this.loading) {
        return
      }
      _this.loading = true
      let scroller = $('.content')
      loader.show()
      setTimeout(() => {
          let params = {'id':$('#id').val()}
        var postUrl = planPro.ajaxUrl.deleterenteroper; 
        _this.$http.post(postUrl,params,{credentials: true})
          .then(({data}) => {

            if(data.status){
              _this.$route.router.go({path: '/house/lessor/renterlist?id='+_this.fdata.renter.id, replace: true});
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
        let params = planPro.fun.serializeArrayToJson($('#renterForm').serializeArray());
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
        if(params.startTime !== ''){
          params.startTime = params.startTime.replace('/','-')+' 00:00:00';
        }
        if(params.endTime !== ''){
          params.endTime = params.endTime.replace('/','-')+' 00:00:00';
        }
        if(!checkResult){
          _this.loading = false;
          loader.hide()
          return false;
        }

        params.vt = 1;

        var postUrl = planPro.ajaxUrl.postrenteroper; //添加的
        if(params.id !== '') postUrl = planPro.ajaxUrl.postrenteropermodify;  //修改的
        _this.$http.post(postUrl,params,{credentials: true})
          .then(({data}) => {
            if(data.status){
              _this.$route.router.go({path: '/house/lessor/renterlist?id='+_this.fdata.room.id, replace: true});
            }else{
              if(data.islogin === false){
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
    FileInput,
    TopHeader
  }
}

</script>

<style scoped>
.profile .list-block {
  /*margin: 2.4rem 0 1rem 0;*/
  margin: 0px;
  /*margin-top: .2rem;*/
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
.profile .submit-button .button-green{
  background-color: #15e400;
  color: #fff;
  margin-top: 0.5rem;
}
</style>
