<template>
  <div class="swiper-container-dk">
      <ul class="shop-product swiper-wrapper">

        <li class="swiper-slide" v-for="seller_good in seller_goods">
          <a :href="'/mobile/index.php?r=goods&id='+ seller_good.id +'&u=0'">
            <div class="product-img">
              <img :src="seller_good.img.small" alt="">
            </div>
            <p class="product-name" :title="seller_good.name">{{seller_good.nameShort}}</p>
            <p class="product-price">{{seller_good.shop_price}}</p>
          </a>
          
        </li>
      </ul>
  </div>
</template>

<script>
import Swiper from 'common/js/swiper-3.4.2.jquery.min'

export default {
  props: ['seller_goods'],
  data () {
    return {
      slider: null
    }
  },
  mounted () {

    let self = this
    var timer = setInterval(function(){
      if(self.seller_goods.length>0){

        var swiper = new Swiper('.swiper-container-dk', {
                          slidesPerView: 3.3,
                          spaceBetween: "2%"

                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-container-dk{height:6.4rem;overflow: hidden;}
.swiper-container-dk {
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
