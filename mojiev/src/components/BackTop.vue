<template>
  <div id="gotop" class="gotop">
        <a href="javascript:this.blur();" class="w_top">
            <img :src="proPath+'/static/images/ic_intop.png'" alt="" />
        </a>
    </div>
</template>

<script>
import $ from 'zepto'
import MojiAjax from 'common/js/moji.ajax' 

export default {
  data () {
    return {
        proPath:MojiAjax.indexFuns.propath
      }
  },
  mounted () {
    console.info(22)
    document.body.addEventListener('touchmove',function(event){
            if($(".yo-scroll").scrollTop() > 100){
                    document.getElementById('gotop').style.display = 'block';
            }else{
                    document.getElementById('gotop').style.display = 'none';
            }
        })
        $("#gotop").on("click",function(){
          console.info(1222)
            $(".yo-scroll").scrollTop(0);
            $("#gotop").hide();
            return false;
        })
  }
}
</script>

<style>
.gotop{
        position: fixed;
        z-index: 888;
        width: 30px;
        height: 30px;
        display: none;
        bottom: 2.453rem;
        right: 0.2rem;
        width: 2rem;
        height: 2rem;
    }
    .w_top{
        width: 2rem;
        height: 2rem;
    }
    .w_top img{
        width: 2rem;
    }
</style>
