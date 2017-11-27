<template>
  <div class="block-content swiper-container-mx" style="padding:0;">
    <ul class="mx-list  swiper-wrapper">
      <li v-for="yunMt in mxMarket" class="swiper-slide">
        <a :href="'groupDetail.html?goodsid='+ yunMt.id ">
        <div class="market-img">
          <img class="mx-img" :src="yunMt.img.thumb" alt="">
          <p>{{yunMt.goods_name.length>8?yunMt.goods_name.substring(0,8)+'...':yunMt.goods_name}}</p>
          <p>¥{{yunMt.shop_price}}</p>
        </div>
        </a>
      </li>
    </ul>

  </div>


</template>

<script>
import Swiper from 'common/js/swiper-3.4.2.jquery.min'

export default {
  props: ['mxMarket'],
  data () {
    return {
      slider: null
    }
  },
  mounted () {

    let self = this
    var timer = setInterval(function(){
      if(self.mxMarket.length>0){

        var swiper = new Swiper('.swiper-container-mx', {
                          slidesPerView: 2.5,
                          spaceBetween: "1.5%",
                          autoplay: 3000,
                          paginationClickable: true
                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-container-mx{overflow: hidden;}
.swiper-container-mx { 
    box-sizing: content-box;display: flex;position: relative;transition-property: transform;width: 100%;z-index: 1;}
.swiper-container-mx p{font-size: 0.555rem;}
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
