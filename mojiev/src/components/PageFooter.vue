<template>
  <ul class="footer-nav">
      <li :class="active === 1 ? 'active' : ''" >
        <a href="/mojivue/module/index.html">
          <i class="sjq-icon home-icon"></i>
          <span>主页</span>
        </a>
      </li>
      <li :class="active === 2 ? 'active' : ''">
        <a href="/mobile/index.php?r=category">
          <i class="sjq-icon fenlei-icon"></i>
          <span>分类</span>
        </a>
      </li>
      <!-- <li :class="active === 3 ? 'active' : ''">
        <a href="">
          <i class="sjq-icon faxian-icon"></i>
          <span>发现</span>
        </a>
      </li> -->
      <li :class="active === 4 ? 'active' : ''">
        <a href="/mobile/index.php?r=cart">
          <i class="sjq-icon gouwuche-icon"></i>
          <span>购物车</span>
        </a>
      </li>
      <li :class="active === 5 ? 'active' : ''">
        <a href="/mobile/index.php?r=user">
          <i class="sjq-icon wode-icon"></i>
          <span>我的</span>
        </a>
      </li>
    </ul>
</template>

<script>

export default {
  props: ['active'],
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped>

</style>
