<template>
	<div class="camera-area">
		<ul class="imgShow clearfix">
          <!-- <li>
          	<img src="/static/img/1.jpg" alt="">
          	<input name="imgUrl" type="hidden" value=""/>
          	<div class="delete">删除</div>
          </li> -->
        </ul>
        <div class="upload-progress"><span></span></div>
		<div class="addImgBtn">+</div>
        <input type="file" name="fileToUpload" class="fileToUpload" id="fileToUpload" accept="image/*" capture="camera" style="display:-none"/>
        
       	<input type="hidden" id="uploadImg" class="uploadImg" name="uploadImg" value="{{pdata.imgId}}">
      	<div class="thumb"></div>
  	</div>
</template>

<style>
	.camera-area{position: relative;}
	.thumb{position: absolute;right: 30px;top: 0px;width: 1rem;height: 1rem;display: none;}
	.thumb img{width: 100%;height: 100%;}
	.upload-progress{display: none;}
	.addImgBtn{border: 2px solid #ccc5c7;border-radius: 5px; width: 4rem;height: 4rem;line-height: 4rem;text-align: center;color: #ccc5c7;font-size: 2rem;}
	#fileToUpload{border: 2px solid #ccc5c7;border-radius: 5px; width: 4rem;height: 4rem;line-height: 4rem;text-align: center;color: #ccc5c7;font-size: 2rem;text-indent: 5rem;background: rgba(0,0,0,0);overflow: hidden;position: absolute;z-index: 1;bottom: 0px}
	.imgShow img{width: 100%;}
	.imgShow li{padding: 0.5rem;position: relative;text-align: center;float: left;width: 5rem;}
	.delete{background: rgba(0,0,0,0.7);color: #fff;}
</style>

<script>
	import $ from 'zepto'
	import '../util/upload'

	export default {
		props: [
            'pdata'
        ],
		ready () {
		    $(".camera-area").fileUpload({
		        "url": planPro.ajaxUrl.fileUpload,
		        "file": "topFiles", //Filedata
		        "uploadFailed": function(){
		        	layer.open({title:['提示','background-color: #FF4351; color:#fff;margin-top:0px;'],time:200,content: '上传失败！'});
		        }
		    });
		},
		methods: {
		}
	}
</script>
