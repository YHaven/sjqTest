<template>
  <div class="swiper-banner">
    <div class="swiper-wrapper">
        <a :href="banneri.url" v-for="banneri in banner" class="swiper-slide">
          <img :src="banneri.imgUrl" alt="" >
        </a>
    </div>
    <div class="swiper-pagination-parent">
      <div class="swiper-pagination"></div>
    </div>
    
  </div>
</template>

<script>
import Swiper from 'common/js/swiper-3.4.2.jquery.min'

export default {
  props: ['banner'],
  data () {
    return {
      slider: null
    }
  },
  mounted () {

    let self = this
    var timer = setInterval(function(){
      if(self.banner.length>0){

        var swiper = new Swiper('.swiper-banner', {
                          slidesPerView: 1,
                          spaceBetween: "1%",
                          autoplay: 3000,
                          paginationClickable: true,
                          pagination: '.swiper-pagination'
                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-banner{height:4.48rem;overflow: hidden;}
.swiper-banner {
    box-sizing: content-box;display: flex;position: relative;transition-property: transform;width: 100%;z-index: 1;}
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
