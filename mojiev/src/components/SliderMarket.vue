<template>
  <div class="block-content swiper-container-market">
    <ul class="slider-market  swiper-wrapper">
      <li v-for="yunMt in yunMarket" class="swiper-slide">
        <div class="market-img">
          <img :src="yunMt.image" alt="">
          <span><i class="f-l">{{yunMt.name}}</i><i class="f-r">入驻商家：{{yunMt.shop_num}}</i></span>
        </div>
        <div class="market-info">
          <div class="market-it" v-for="shop in yunMt.shop">
            <a :href="'/mobile/index.php?r=store/index/shop_info&id='+shop.shop_id">
            <img :src="shop.shop_logo" alt="">
            <div class="market-in">
              <p class="market-name">{{shop.shop_name}}</p>
              <p class="market-cl">{{shop.shop_desc}}</p>
            </div>
            </a>
          </div>
        </div>
      </li>
    </ul>
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
                          slidesPerView: 1.5,
                          spaceBetween: "3%"

                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-container-market{overflow: hidden;}
.swiper-container-market {
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
