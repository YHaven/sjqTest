<template>
<div class="list" v-infinite-scroll="loadMore">
  <div class="list-block infinite-list">
    <ul>
      <li class="shop-item" v-for="item in items" track-by="$index">
        <div class="s-title clearfix">商品名称{{item.name}}</div>
        <div class="s-content"><img src="/homesrc/static/img/1.jpg"></div>
        
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {loader} from '../util/util'
import $ from 'zepto'

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    for (let i = 0; i < 2; i++) {
      this.items.push({
        id: i,
        name: `demo${i + 1}`
      })
    }
  },
  data () {
    return {
      items: [],
      loading: false
    }
  },
  computed: {
    length () {
      return this.items.length
    }
  },
  methods: {
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        let i = this.length
        this.items.push({
          id: i,
          name: `demo${i + 1}`
        })
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    }
  }
}
</script>

<style scoped>
.list-block {
  margin: .5rem 0;
}
.list {
  bottom: 2.5rem;
  height: 90%;
  overflow-y:scroll; 
}
.s-title{width: 100%;}
.s-content img{width: 100%;}
</style>