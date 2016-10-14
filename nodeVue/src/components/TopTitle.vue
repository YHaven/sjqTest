<template>
	<div class="topTitle" >{{ parentApptitle }}</div>
</template>


<script type="text/javascript">
	export default {
		props: ['parentApptitle'],
		ready(){
			// console.log('tab ready');
   //          console.log(this.$get('parentApptitle').title);
		}
    }
</script>

<style scoped>
.topTitle{
	text-align: center;
	height:2rem;
	line-height: 2rem;
	color: #777;
}
</style>
