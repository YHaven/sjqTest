<template>
<div class="content profile">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"  v-link="{path: '/house/lessor/roomlist'}">
    <span class="icon icon-left"></span>
    </a>
    <div class="title">编辑房号</div>
  </header>
  <form class="list-block">
    <input type="hidden" id="houseId" name="houseId" value=""/>
    <input type="hidden" id="id" name="id" value=""/>
    <ul>
      <li>
        <div class="item-content">
            <div class="item-inner">
                采荷新村
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
                    <input id="roomName" type="text" name="roomName" placeholder="房号" value="" >
                </div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">备注</div>
                <div class="item-input">
                    <input id="roomRemark" type="text" name="roomRemark" placeholder="房间配置备注" value="" >
                </div>
            </div>
        </div>
      </li>
    </ul>
    
  </div>
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
