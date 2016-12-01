<template>
	<div class="camera-area">
        <input type="file" name="fileToUpload" class="fileToUpload" id="fileToUpload" accept="image/*" capture="camera" style="display:-none"/>
        <div class="upload-progress"><span></span></div>
       	<input type="hidden" id="uploadImg" name="uploadImg" value="">
      	<div class="thumb"></div>
  	</div>
</template>

<style scoped>
	.camera-area{position: relative;}
	.thumb{position: absolute;right: 30px;top: 0px;width: 1rem;height: 1rem;}
	.thumb img{width: 100%;height: 100%;}

</style>

<script>
	import $ from 'zepto'
	import '../util/upload'


	export default {
		ready () {
			console.log('start');
		    $(".camera-area").fileUpload({
		        "url": "savetofile.php",
		        "file": "myFile"
		    });
		}
	}
</script>
