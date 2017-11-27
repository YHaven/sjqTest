<template>
  <div class="block-content swiper-container-market" style="padding:0;">
    <ul class="mj-list  swiper-wrapper">
      <li v-for="yunMt in yunMarket" class="swiper-slide">
        <a :href="'marketprodstore.html?id='+ yunMt.id +'&marketname='+yunMt.name">
        <div class="market-img">
          <img class="wh-img" :src="yunMt.image" alt="">
          <span><i>{{yunMt.name}}</i></span>
        </div>
        </a>
      </li>
    </ul>

    <div class="swiper-pagination-parent">
      <div class="swiper-pagination-mj"></div>
    </div>

  </div>


</template>

<script>
import Swiper from 'common/js/swiper-3.4.2.jquery.min'

export default {
  props: ['yunMarket'],
  data () {
    return {
      slider: null
    }
  },
  mounted () {

    let self = this
    var timer = setInterval(function(){
      if(self.yunMarket.length>0){

        var swiper = new Swiper('.swiper-container-market', {
                          slidesPerView: 1,
                          spaceBetween: "1%",
                          autoplay: 3000,
                          paginationClickable: true,
                          pagination: '.swiper-pagination-mj'
                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-container-market{overflow: hidden;}
.swiper-pagination-parent{bottom: 0.25rem;}
.swiper-container-market {
    box-sizing: content-box;display: flex;position: relative;transition-property: transform;width: 100%;z-index: 1;height: 9rem;}
.swiper-slide {
    -moz-box-align: center;
    -moz-box-pack: center;
    align-items: center;
    color: #fff;
    /*display: flex;*/
    flex-shrink: 0;
    font-size: 16px;
    justify-content: center;
    padding: 3px 0;
    position: relative;
    width: 100%;
}

</style>
