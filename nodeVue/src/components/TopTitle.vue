<template>
	<div class="topTitle" ><i class="iconfont icon-pullleft" v-on:click="goback"></i>{{ parentApptitle }}</div>
</template>


<script type="text/javascript">
	// import router from "./router.js" //首先导入路由对象
	export default {
		props: ['parentApptitle'],
		ready(){
			// console.log('tab ready');
   //          console.log(this.$get('parentApptitle').title);
		},
		methods: {
			goback(){
				// console.log(router)
				router.go({path:'/home'})
			}
		}
    }
</script>

<style scoped>
.topTitle{
	text-align: center;
	height:2rem;
	line-height: 2rem;
	color: #777;
	border-bottom: 1px solid #ddd;
}
.topTitle .iconfont{font-size: 1rem;position: absolute;left: .5rem;}
</style>
