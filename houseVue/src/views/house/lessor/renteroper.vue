<template>
<div class="content profile">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/lessor/renterlist'}">
    <span class="icon icon-left"></span>
    </a>
    <div class="title">编辑租客</div>
  </header>
  <form class="list-block">
    <input type="hidden" id="roomId" name="roomId" value=""/>
    <input type="hidden" id="id" name="id" value=""/>
    <ul>
      <li style="height: 3rem;">
        <div class="item-content" style="min-height: 3rem;">
          <input type="hidden" name="uploadImg" value="">
          <div class="item-media"><img src="" height="auto" style='width: 2.2rem;'></div>
          <div class="item-inner" style="min-height: 3rem;">
            <div class="item-title-row">
            </div>
            <input type="file" style="display:none;">
            <div class="item-subtitle"><span class="imgpath"></span>图片</div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">租客姓名</div>
                <div class="item-input">
                    <input id="renterName" type="text" name="renterName" placeholder="请输入租客姓名" value="">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">电话号码</div>
                <div class="item-input">
                    <input id="renterPhone" type="text" name="renterPhone" placeholder="暂未填写电话号码" value="">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">身份证</div>
                <div class="item-input">
                    <input id="cid" type="text" name="cid" placeholder="暂无身份信息" value="">
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
                    <input id="startTime" type="text" name="startTime" placeholder="" value="">
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content item-link">
            <div class="item-inner">
                <div class="item-title label">到租日期</div>
                <div class="item-input">
                    <input id="endTime" type="text" name="endTime" placeholder="" value="">
                </div>
            </div>
        </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">缴费周期</div>
                  <div class="item-input">
                      <input id="cycleTime" type="number" name="cycleTime" placeholder="月" value="">
                  </div>
              </div>
          </div>
      </li>
      <li>
        <div class=" item-content">
            <div class="item-inner">
                <div class="item-title label">每期缴租</div>
                <div class="item-input">
                    <input id="money" type="text"  name="money" placeholder="0.00" >
                </div>
            </div>
        </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">押金</div>
                  <div class="item-input">
                      <input id="deposit" type="text" name="deposit" placeholder="0.00">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">居住人数</div>
                  <div class="item-input">
                      <input id="renterNumber" type="text" name="renterNumber" placeholder="0">
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
                      <input id="remindDay" type="number" name="remindDay" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">提醒时间</div>
                  <div class="item-input">
                      <input id="remindTime" type="text" name="remindTime" placeholder="00:00">
                  </div>
              </div>
          </div>
      </li>
      </ul>
    <div class="s-title">表度数</div>
    <ul style="margin-top:.5rem;">
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">电表度数</div>
                  <div class="item-input">
                      <input id="electric" type="text" name="electric" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">水表度数</div>
                  <div class="item-input">
                      <input id="water" type="text" name="water" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">燃气度数</div>
                  <div class="item-input">
                      <input id="gas" type="text" name="gas" placeholder="0">
                  </div>
              </div>
          </div>
      </li>
      <li>
          <div class="item-content">
              <div class="item-inner">
                  <div class="item-title label">备注</div>
                  <div class="item-input">
                      <textarea id="remark" name="remark"  ></textarea>
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
