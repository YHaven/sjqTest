<template>
	<div>
    <div v-for="n in 10">{{msg}}</div>
	</div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style>
    html{
        background: red;
    }
</style>