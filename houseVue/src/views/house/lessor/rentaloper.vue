<template>
<div class="content profile">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/lessor/rentallist', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title">采荷新村-508-可以的-账单</h1>
  </header>
  <form class="list-block">
    <input type="hidden" id="renterId" name="renterId" value=""/>
    <input type="hidden" id="id" name="id" value=""/>
    <ul>
      <li>
        <div class="item-content item-link">
            <div class="item-inner">
                <div class="item-title label">收租日期</div>
                <div class="item-input">
                    <input id="rentalTime" type="text" name="rentalTime" placeholder="请输入日期" value="">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">租金</div>
                <div class="item-input">
                    <input id="rental" type="text" name="rental" placeholder="0" value="" >
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
                  <div class="item-title label">电表度数</div>
                  <div class="item-input">
                      <input id="electric" type="text" name="electricPrice" placeholder="每度价格">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      <input id="water" type="text" name="waterPrice" placeholder="每度价格">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                      <input id="gas" type="text" name="gasPrice" placeholder="每度价格">
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
                      <input id="electricNow" type="text" name="electricNow" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      <input id="waterNow" type="text" name="waterNow" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                      <input id="gasNow" type="text" name="gasNow" placeholder="0">
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
                      0
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      0
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                     0
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
                    <input id="otherPrice" type="text"  name="otherPrice" placeholder="0.00" >
                </div>
            </div>
        </div>
      </li>
      
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">备注</div>
                  <div class="item-input">
                      <textarea id="remark" name="remark" placeholder="" ></textarea>
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
