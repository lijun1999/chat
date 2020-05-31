<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="navBack()">
				<image src="../../static/images/common/back.png"></image>
			</view>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/images/common/logo.png" mode=""></image>
		</view>
		<view class="login-box">
			<view class="title">注册</view>
			<!-- <view class="slogan">欢迎使用FE3O4</view> -->
			<view class="login-form">
				<view class="input-box">
					<input type="text" placeholder="昵称" class="user"  placeholder-style="color:#aaa;font-weight:400" @input="userVaild" />
					<view class="employ" v-if="userEmploy">已占用</view>
					<image src="../../static/images/signup/Group.png" class="yes" v-if="isuser"></image>
				</view>
				<view class="input-box">
					<input type="text" placeholder="邮箱" class="email"  placeholder-style="color:#aaa;font-weight:400" @input="emailVaild"/>
					<view class="employ" v-if="emailEmploy">已占用</view>
					<view class="invalid" v-if="invalid">邮箱无效</view>
					<image src="../../static/images/signup/Group.png" class="yes" v-if="isemail"></image>
				</view>
				<view class="input-box">
					<input :type="type" placeholder="密码" class="pw" placeholder-style="color:#aaa;font-weight:400" @input="pwVaild"/>
					<view @tap="changeType()">
						<image src="../../static/images/signup/open.png" class="look" v-show="look" ></image>
						<image src="../../static/images/signup/close.png" class="look" v-show="!look"></image>
					</view>
				</view>
			</view>
			<view class="tip" v-show="tip ? tip : '' ">{{tip}}</view>
		</view>
		<view :class="ok ? 'login-button' : 'login-button2'" @tap="signup">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tip: '',
				type: 'password',
				isuser: false,
				isemail: false,
				look: false,
				invalid: false,
				emailEmploy: false,
				userEmploy: false,
				signupForm: {
					name: '大表哥',
					email: 'dabiaoge@qq.com',
					pw: '123456'
				},
				ok: false
			};
		},
		methods: {
			// 注册
			async signup() {
				// if (!this.ok) {
				// 	return this.tip = '请将信息填写完整';
				// }
				console.log(this.signupForm)
				const res = await this.$myRequest({
					url: '/signup/add',
					method: 'post',
					data: this.signupForm
				})
				if (res.data.status == 200) {
					uni.showLoading({
					    title: '注册成功,将在1秒后跳转到登录页'
					});
					setTimeout( ()=> {
					    uni.hideLoading();
						this.navBack()
					}, 1000);
				} else {
					this.tip = res.data.msg
				}
			},
			//返回上一页
			navBack() {
				uni.navigateBack({})
			},
			//密码显示与隐藏
			changeType() {
				this.type = this.type == 'password' ? 'text' : 'password';
				this.look = !this.look;
			},
			//邮箱验证
			emailVaild(e) {
				const email = e.detail.value
				// 没有填写信息不验证
				if (email.length == 0) {
					return;
				}
				const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(reg.test(email)){
					this.signupForm.email = email;
					this.isemail = true;
					this.invalid = false;
				}else{
					this.signupForm.email = null;
					this.isemail = false;
					this.invalid = true;
				}
				this.isOK()
			},
			userVaild(e) {
				this.signupForm.name = e.detail.value
				this.isuser = true
				
				console.log(e.detail.value)
				this.isOK()
			},
			//密码验证
			pwVaild(e) {
				this.signupForm.pw = e.detail.value;
				this.isOK()
			},
			//判断三个信息是否都可用
			isOK() {
				if (this.isuser && this.isemail && this.signupForm.pw.length > 5) {
					this.ok = true
				} else {
					this.ok = false
				}
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
		.top-bar-left {
			width: 88rpx;
			padding-left: 32rpx;
			float: left;
			image {
				width:46rpx;
				height:46rpx;
				margin-top: 21rpx;
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
			.input-box {
				padding: 10rpx 10rpx 0;
				display: flex;
				border-bottom: 1px solid $uni-border-color;
				input {
					flex: 1;
					height: 88rpx;
					font-size: $uni-font-size-lg;
					font-weight: 500;
					color: $uni-text-color;
					line-height: 88rpx;
				}
				.employ, .invalid {
					font-size: $uni-font-size-base;
					font-weight: 500;
					color: $uni-color-warning;
					line-height: 88rpx;
				}
				.yes, .look {
					width: 42rpx;
					height: 32rpx;
					margin-top: 28rpx;
				}
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
	.login-button2 {
		margin: 0 auto;
		width:520rpx;
		height:96rpx;
		background:rgba(39,40,50,0.2);
		box-shadow:0px 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius:48rpx;
		font-size:$uni-font-size-lg;
		font-weight:500;
		color:rgba(39,40,50,1);
		line-height:96rpx;
		text-align: center;
	}
</style>
