<template>
	<header class="bar bar-nav">
		<a class="button button-link button-nav pull-left" v-link="{path: path, replace: true}">
	    	<span class="icon icon-left"></span>
	    </a>
    	<div class="title" v-text="label"></div>
  </header>
</template>


<script type="text/javascript">
	// import router from "./router.js" //首先导入路由对象
	export default {
		props: {
		    path: '',
		    icon: '',
		    label: ''
		},
		methods: {
			goback(){
				// console.log(router)
				router.go({path:'home'})
			}
		}
    }
</script>

<style scoped>

</style>
