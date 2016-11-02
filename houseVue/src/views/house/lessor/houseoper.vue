<template>
<div class="content profile">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/house/lessor/houselist', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title">编辑房产</h1>
  </header>
  <div class="list-block">
    <ul>
      <li style="height: 3rem;">
        <div class="item-content" style="min-height: 3rem;">
          <div class="item-media"><img src="" height="auto" style='width: 2.2rem;'></div>
          <div class="item-inner" style="min-height: 3rem;">
            <div class="item-title-row">
            </div>
            <input type="file" style="display:none;">
            <div class="item-subtitle"><span class="imgpath"></span>房子主图</div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">房子名称</div>
                <div class="item-input">
                    <input id="nickname" type="text" name="nickname" placeholder="请输入房产名称" value="国际花园">
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
                    <select name="sex">
                        <option selected>住宅/小区/公寓</option>
                        <option >办公室/写字楼</option>
                        <option >商铺</option>
                        <option >仓库</option>
                    </select>
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
