<template>
  <div class="swiper-container-wh">
    <div class="swiper-wrapper">
      <ul class="wh-list swiper-slide clearfix" v-for="(anchor_recommend, index) in anchorRecommend">
        <li v-for="(whRecommend, index) in anchor_recommend">
          <i class="sjq-icon video-icon"></i>
          <a :href="'videoDetail.html?topic_id='+whRecommend.topic_id">
          <img class="wh-img" :src="whRecommend.video_img" alt="">
          </a>
          <p class="wh-title">{{whRecommend.title.length>8?whRecommend.title.substring(0,8)+'...':whRecommend.title}}</p>
          <p class="wh-name"><img class="wh-header" :src="whRecommend.anchor_img" alt="" style="float:left;">{{whRecommend.anchor_name}}</p>
        </li>
      </ul>
    </div>
    
    <div class="swiper-pagination-parent">
      <div class="swiper-pagination-wh"></div>
    </div>

  </div>


</template>

<script>
import Swiper from 'common/js/swiper-3.4.2.jquery.min'

export default {
  props: ['anchorRecommend'],
  data () {
    return {
      slider: null
    }
  },
  mounted () {

    let self = this
    var timer = setInterval(function(){
      if(self.anchorRecommend.length>0){

        var swiper = new Swiper('.swiper-container-wh', {
                          slidesPerView: 1,
                          autoplay: 3000,
                          paginationClickable: true,
                          pagination: '.swiper-pagination-wh'
                      });
        
        clearInterval(timer);
      }
      
    },100); 


    
  }
}
</script>

<style scoped>
.swiper-container-wh{overflow: hidden;}
.swiper-container-wh { 
    box-sizing: content-box;display: flex;position: relative;transition-property: transform;width: 100%;z-index: 1;}
.swiper-pagination-parent{bottom: 0.25rem;}
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
