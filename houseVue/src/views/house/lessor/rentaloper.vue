<template>
<div class="content profile">
  <top-header path="/house/lessor/rentallist" label="采荷新村-508-可以的-账单"></top-header>
  <form class="list-block" id="rentalForm">
    <input type="hidden" id="renterId" name="renterId" value="{{fdata.renterId}}"/>
    <input type="hidden" id="id" name="id" value="{{fdata.id}}"/>
    <ul>
      <li>
        <div class="item-content item-link">
            <div class="item-inner">
                <div class="item-title label">收租日期</div>
                <div class="item-input">
                    <input id="rentalTime" type="text" name="rentalTime" placeholder="请输入日期" value="{{fdata.rentalTime}}">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">租金</div>
                <div class="item-input">
                    <input id="rental" type="text" name="rental" placeholder="0" value="{{fdata.rental}}" >
                </div>
            </div>
        </div>
      </li>
      
    </ul>
    <div class="s-title">非固定费用</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">电单价</div>
                  <div class="item-input">
                      <input id="electricPrice" type="text" name="electricPrice" placeholder="每度价格" value="{{fdata.electricPrice}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水单价</div>
                  <div class="item-input">
                      <input id="waterPrice" type="text" name="waterPrice" placeholder="每度价格" value="{{fdata.waterPrice}}">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气单价</div>
                  <div class="item-input">
                      <input id="gasPrice" type="text" name="gasPrice" placeholder="每度价格" value="{{fdata.gasPrice}}">
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
        return this.$http.get(planPro.ajaxUrl.houseoper+'?id='+planPro.fun.getQueryString('id'))
        .then(({data: {status,data}}) => {
          this.$set('fdata', data);
        })
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
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.content')
      loader.show()
      setTimeout(() => {
        let params = {
            vt:1, //1表示处理
            id:$('#id').val(),
            uploadImg:$('#uploadImg').val(),
            houseName:$('#houseName').val(),
            houseType:$('#houseType').val()
        }
        var postUrl = planPro.ajaxUrl.posthouseoper; //添加的
        if(params.id !== '') postUrl = planPro.ajaxUrl.posthouseopermodify;  //修改的
        this.$http.post(postUrl,params)
          .then(({data: {status}}) => {
            console.log(status);
        })
      
        this.loading = false
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
