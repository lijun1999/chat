<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @tap="goSignup">
				<view class="text">注册</view>
			</view>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/images/common/logo.png"></image>
		</view>
		<view class="login-box">
			<view class="title">登录</view>
			<view class="slogan">欢迎使用FE3O4</view>
			<view class="login-form">
				<input type="text" placeholder="用户名/邮箱" class="user"  placeholder-style="color:#aaa;font-weight:400" v-model="loginForm.user" />
				<input type="password" placeholder="密码" class="pw" placeholder-style="color:#aaa;font-weight:400" v-model="loginForm.pw" />
			</view>
			<view class="tip" v-show="tip ? tip : '' ">{{tip}}</view>
		</view>
		<view class="login-button" @tap="login">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tip: '',
				loginForm: {
					user: '',
					pw: ''
				},
				token: ''
			};
		},
		methods: {
			//登录
			async login() {
				if (this.loginForm.user.length == 0 || this.loginForm.pw.length == 0) {
					return this.tip = '请完整填写信息';
				}
				const res = await this.$myRequest({
					url: '/login/match',
					method: 'post',
					data: this.loginForm
				})
				console.log(res)
				if (res.data.status == 200) {
					//存token,token有效期120天
					uni.setStorage({
					    key: 'token',
					    data: res.data.result.token,
					});
					uni.setStorage({
					    key: 'id',
					    data: res.data.result.id,
					});
					uni.setStorage({
					    key: 'name',
					    data: res.data.result.name,
					});
					uni.setStorage({
					    key: 'imgurl',
					    data: res.data.result.imgurl,
					});
					this.token = res.data.result.token;
					this.loginForm ={}
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}else {
					this.tip = res.data.msg
				}
			},
			//跳转到注册页
			goSignup() {
				uni.navigateTo({
					url:'../signup/signup'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: var(--status-bar-height);
	}
	.top-bar {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;
		.top-bar-right {
			padding-right: 32rpx;
			float: right;
			.text {
				font-size: $uni-font-size-lg;
				line-height: 88rpx;
			}
		}
	}
	.logo {
		text-align: center;
		image{
			padding-top: 256rpx;
			width: 194rpx;
			height: 91rpx;
			margin: 0 auto;
		}
	}
	.login-box {
		padding: 54rpx $uni-spacing-col-lg 120rpx;
		width: 100%;
		box-sizing: border-box;
		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan {
			font-size: 40rpx;
			color: $uni-bg-color-grey;
			line-height: 56rpx;
		}
		.login-form {
			padding-top: 40rpx;
			input {
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
			.pw {
				padding-top: 10rpx;
			}
		}
		.tip {
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
	}
	.login-button {
		margin: 0 auto;
		width:520rpx;
		height:96rpx;
		background:$uni-color-primary;
		box-shadow:0px 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius:48rpx;
		font-size:$uni-font-size-lg;
		font-weight:500;
		color:rgba(39,40,50,1);
		line-height:96rpx;
		text-align: center;
	}
</style>
