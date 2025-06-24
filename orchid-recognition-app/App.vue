<script>
	// App.vue 是 uni-app 的主组件，用于监听应用生命周期、配置全局样式等
	// 它不是用来展示具体页面的
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 在这里可以做一些App启动时的初始化操作，
			// 比如检查本地存储中是否有登录凭证，如果有则直接跳转到识别页
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* App.vue 中可以定义全局样式 */
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>