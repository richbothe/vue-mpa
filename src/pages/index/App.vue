<template>
	<div class="text-center">
		<h1>Home</h1>
		<Header/>
	</div>
</template>
<script>
import Header from '@components/Header';
export default {
	name: 'Home',
	components: {
		Header
	}
};
</script>
<style>
.body {
	font-family: Arial, Helvetica, sans-serif
}
</style>