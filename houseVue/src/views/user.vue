<template>
<div class="content user">
  <div class="banner">
    <div class="logo">
        <div class="logo_img">
            <img src="../assets/img/logo.png" class="img-responsive" style="border:solid 1px #fff;border-radius: 50px;overflow:hidden;" width="64" height="64">
            <div style="color:white;line-height: 1;">我的名字</div>
        </div>
        <!-- <div class="logo_txt">
            <span class="yue">我的签名</span>
            <span class="amount timer count-title" id="count-number" data-to="300" data-speed="500" data-decimals="0">你是傻逼吗</span>
        </div> -->
        <div class="logo_txt">
            <span class="yue">我的签名是大傻逼，你造吗</span>
            <span class="amount timer count-title" id="count-number" data-to="300" data-speed="500" data-decimals="0"></span>
        </div>
    </div>
    <!-- <div class="in">
        <div class="incomes">今日收入 0 积分</div>
        <div class="students">今日邀请 0 个</div>
    </div> -->
  </div>
  <nav class="bar bar-tab user-tab">
    <a class="tab-item">
      <span class="icon icon-shouyi"></span>
      <span class="tab-label">消息</span>
    </a>
    <a class="tab-item">
      <span class="icon icon-shouyimingxi"></span>
      <span class="tab-label">账单</span>
    </a>
    <a class="tab-item" v-link="{ path: '/user/withdraw', replace: true}">
      <span class="icon icon-me"></span>
      <span class="tab-label">小屋</span>
    </a>
  </nav>
  <div class="list-block user-list">
    <ul>
      <li>
        <a class="item-content item-link" v-link="{ path: '/user/profile', replace: true}">
        <div class="item-media"><span class="icon icon-star"></sapn></div>
        <div class="item-inner">
          <div class="item-title">个人资料</div>
        </div>
        </a>
      </li>
    </ul>
    <!-- <ul>
      <li>
        <a class="item-content item-link"  v-link="{ path: '/user/tasks', replace: true}">
          <div class="item-media"><span class="icon icon-star"></sapn></div>
          <div class="item-inner">
            <div class="item-title">我的任务</div>
          </div>
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a class="item-content item-link"  v-link="{ path: '/user/profit', replace: true}">
        <div class="item-media"><span class="icon icon-star"></sapn></div>
        <div class="item-inner">
          <div class="item-title">我的粉丝收益</div>
        </div>
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a class="item-content item-link"  v-link="{ path: '/user/profit/record', replace: true}">
        <div class="item-media"><span class="icon icon-star"></sapn></div>
        <div class="item-inner">
          <div class="item-title">收益明细</div>
        </div>
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a class="item-content item-link"  v-link="{ path: '/invite', replace: true}">
        <div class="item-media"><span class="icon icon-star"></sapn></div>
        <div class="item-inner">
          <div class="item-title">邀请好友</div>
        </div>
        </a>
      </li>
    </ul> -->
    <br>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style>
.banner {
  width: 100%;

  background-color: white;
  padding: 12.7999992px;
}
.banner .logo {
  background-color: #ed8e07;
  border-radius: 10px;
  width: 100%;
  height: 5.5rem;
  padding: 20.2666654px 21.333332px 5.333333px;
  box-shadow: 0 .0rem .8rem rgba(0,0,0,.3);
}
.banner .logo .logo_img {
  margin-top: 0px;
  width: 3.5rem;
  height: 2.5rem;
  float: left;
  display: inline-block;
}
.banner .logo .logo_txt {
  margin-top: 7px;
  text-align: right;
}
.banner .logo .logo_txt .yue {
  color: #ffffff;
  font-size: 15.999999px;
}
.banner .logo .logo_txt .amount {
  display: block;
  margin-top: -6px;
  color: #ffffff;
  font-size: 45.8666638px;
}
.banner .in {
  width: 100%;
  height: 37.333331px;
  margin-top: 11.7333326px;
}
.banner .in .incomes {
  display: inline-block;
  width: 44%;
  height: 37.333331px;
  border-radius: 8px;
  text-align: center;
  line-height: 37.333331px;
  color: #ffffff;
  font-size: 12.7999992px;
  background-color: #ed8e07;
}
.banner .in .students {
  float: right;
  width: 44%;
  height: 37.333331px;
  border-radius: 8px;
  text-align: center;
  line-height: 37.333331px;
  color: #ffffff;
  font-size: 12.7999992px;
  background-color: #ed8e07 ;
}

.user .bar{position: relative;}

.user-tab {
  background: #efeff4;
  height: 3rem;
  position: relative;
}
.user-tab .tab-item {
  height: 3rem;
  background-color: white;
}
.user-tab:before {
  background-color: white;
}
.user-list {
  margin: .7rem 0;
  height: 2.9rem;
}
.user-list ul {
  height: 2.9rem;
  /*box-shadow: 0 .01rem 0 .03rem rgba(0,0,0,.3);*/
}
.user-list li a {
  height: 2.9rem;
}
.user-list li {
  margin-top: .7rem;
  height: inherit;
}
</style>
