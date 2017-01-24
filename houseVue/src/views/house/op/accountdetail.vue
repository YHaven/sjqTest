<template>
<top-header path="/house/op/accountbook?id=" label="流水详情" :pid="fdata.renter.id"></top-header>
<div class="content profile">
  
  <form class="list-block" id="rentalForm">
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">金额</div>
                <div class="item-input">
                  {{fdata.rental}}
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">事由</div>
                <div class="item-input">
                    租金
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">相关租客</div>
                <div class="item-input">
                    采荷新村-202-222
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">收款日期</div>
                <div class="item-input">
                    2017-01-24
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">到账日期</div>
                <div class="item-input">
                    2017-01-24
                </div>
            </div>
        </div>
      </li>
    </ul>
    
    <div class="s-title">备注</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  
                  <div class="item-input">
                      {{fdata.remark}}
                      
                  </div>
              </div>
          </div>
      </li>
    </ul>
    
  </form>
  
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

  },
  components: {
    TopHeader
  }
}

</script>


<style scoped>
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
