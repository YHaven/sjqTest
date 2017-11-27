<template>
  <div id="islider" class="banner"></div>
</template>

<script>
import ISlider from 'common/js/iSlider'

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
        let imgs = []
        let bannerData = self.banner
        for (let i = 0; i < bannerData.length; i++) {
          var imgcontent = {};
          imgcontent.content = '<a href="'+ bannerData[i].url +'"><img src="'+ bannerData[i].imgUrl +'" width="100%"></a>'
          imgs.push(imgcontent)
        }
        
        self.slider = new ISlider({
          dom: self.$el,
          data: imgs,
          isVertical: false,
          isLooping: true,
          isDebug: false,
          isAutoplay: true
        })
        
        clearInterval(timer);
      }
      
    },100); 
  }
}
</script>

<style>
.banner{height: 6.4rem; width: 100%; overflow: hidden; position: relative;}
.banner ul{list-style: none; margin: 0; padding: 0; height: 100%; overflow: hidden;}
.banner li{position: absolute; margin: 0; padding: 0; height: 100%;width: 100%; overflow: hidden; display: -webkit-box; -webkit-box-pack: start; list-style: none;}
.banner li a{width: 100%;display: block;}
.banner li img{width: 100%; height: auto;}
</style>
