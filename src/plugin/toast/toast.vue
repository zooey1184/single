<template>
	<transition name="fade">
		<div class="toast" v-if="toastShow" :style="{background: background, color: color}">{{message}}</div>
	</transition>
</template>
<script>
	export default {
		name: 'toast',
		data() {
			return {
				message: '',
				toastShow: false,
				background: '#f44336',
				color: '#fff'
			}
		}
	}
</script>
<style scoped lang="less">
.toast {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 12px 0;
	background: #f44336;
	color: #fff;
	font-size: 14px;
	text-align: center;
	z-index: 9999;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.fade-enter-active, .fade-leave-active {
	transition: all .4s;
}
</style>
