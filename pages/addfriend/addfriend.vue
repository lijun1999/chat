<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="navBack()">
				<image src="../../static/images/common/back.png"></image>
			</view>
			<view class="top-bar-right" @tap="navBack()">
				<image src="../../static/images/addfriend/more.png"></image>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai"></view>
			<image class="bg-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2071250109,1112228560&fm=26&gp=0.jpg" mode="aspectFill"></image>
		</view>
		<view class="user-box">
			<view class="user-img-box">
				<view class="user-sex" style="background:rgba(255,93,91,1);" :animation="animationData4">
					<image src="../../static/images/addfriend/female.png" mode=""></image>
				</view>
				<image :animation="animationData3" class="user-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2071250109,1112228560&fm=26&gp=0.jpg" mode="aspectFill"></image>
			</view>
			<view class="user-info-box">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称：{{user.nick}}</view>
				<view class="intr">{{user.intr}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn" @tap="AddFriendAnimation()">加为好友</view>
		</view>
		
		<view class="add-misg" :style="{height:addHeigth + 'px',bottom:-addHeigth + 'px'}" :animation="animationData1">
			<view class="add-name">{{user.name}}</view>
			<textarea :value="myname + '请求加为好友'" maxlength="120"  class="add-msg"/>
		</view>
		<view class="add-btn" :animation="animationData2">
			<view class="cancel" @tap="AddFriendAnimation()">取消</view>
			<view class="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '大表哥',
					nick: '九亿少女的梦',
					intr: '阿苏及看法哈UK复活草按理说电话；奥减肥茶'
				},
				myname: '大表叔',
				addHeigth: '', //add-misg的高度
				animationData1: {}, //信息框的动画
				animationData2: {}, //bottom的动画
				animationData3: {}, //头像的动画
				animationData4: {}, //性别的动画
				isAdd: false, //是否弹出添加框
			};
		},
		onReady() {
			this.getElementStyle()
		},
		methods: {
			//返回上一页
			navBack() {
				uni.navigateBack({})
			},
			//获取页面高度
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				  this.addHeigth = data.height - 186;
				}).exec();
			},
			// 添加动画
			AddFriendAnimation() {
				this.isAdd = !this.isAdd
				//信息框的动画
				const animation1 = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				//button的动画
				const animation2 = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				//头像的动画
				const animation3 = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				//性别的动画
				const animation4 = uni.createAnimation({
					duration: 50,
					timingFunction: 'ease',
				})
				if (this.isAdd) {
					animation1.bottom(0).step()
					animation2.bottom(0).step()
					animation3.width(120).height(120).translateY(30).translateX(-80).step()
					animation4.opacity(0).step()
				} else {
					animation1.bottom(-this.addHeigth).step()
					animation2.bottom(-100).step()
					animation3.width(200).height(200).translateY(0).translateX(0).step()
					animation4.opacity(1).step()
				}
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
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
		// background: $uni-bg-color;
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
		.top-bar-right {
			float: right;
			image {
				width: 52rpx;
				height: 12rpx;
				padding: 38rpx 32rpx;
			}
		}
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-bai {
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}
		.bg-img {
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(16px);
			opacity: 0.5;
		}
	}
	.user-box {
		text-align: center;
		padding-top: 148rpx;
		.user-img-box {
			position: relative;
			margin: 0 auto;
			width:412rpx;
			height:412rpx;
			.user-sex {
				z-index: 11;
				position: absolute;
				bottom: 22rpx;
				right: 22rpx;
				width:64rpx;
				height:64rpx;
				border-radius:36rpx;
				image {
					width: 32rpx;
					height: 32rpx;
					padding: 16rpx;
				}
			}
			.user-img {
				position: relative;
				z-index: 10;
				top: 0;
				width:400rpx;
				height:400rpx;
				border-radius:48rpx;
				border:6px solid rgba(255,255,255,1);
				box-shadow:0 36rpx 40rpx 0 rgba(39,40,50,0.1);
			}
		}
		.user-info-box {
			padding-top: 48rpx;
			.name {
				height:74rpx;
				font-size:52rrpx;
				color:rgba(39,40,50,1);
				line-height:74rpx;
			}
			.nick {
				height:40rpx;
				font-size:28rpx;
				color:rgba(39,40,50,1);
				line-height:40rpx;
			}
			.intr {
				margin: 20rpx auto;
				text-align: left;
				width:552rpx;
				font-size:28rpx;
				font-weight:300;
				color:rgba(39,40,50,1);
				line-height:48rpx;
			}
		}
	}
	.bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 134rpx;
		// background-color: #eee;
		.bottom-btn {
			margin: 7rpx auto;
			text-align: center;
			line-height: 80rpx;
			width:684rpx;
			height:80rpx;
			background:rgba(255,228,49,1);
			border-radius:10rpx;
			font-size:32rpx;
			color:rgba(39,40,50,1);
		}
	}
	.add-misg {
		z-index: 0;
		position: fixed;
		// bottom: 0;
		width: 100%;
		background: #fff;
		border-radius: 40rpx 40rpx 0 0;
		box-sizing: border-box;
		padding: 0 52rpx;
		.add-name {
			padding-top: 168rpx;
			font-size:52rpx;
			color:rgba(39,40,50,1);
			line-height:74rpx;
		}
		.add-msg {
			margin-top: 40rpx;
			padding: 18rpx 20rpx;
			box-sizing: border-box;
			width:638rpx;
			height:420rpx;
			background:rgba(243,244,246,1);
			border-radius:20rpx;
			font-size:32rpx;
			color:rgba(39,40,50,1);
			line-height:44rpx;
		}
	}
	.add-btn {
		z-index: 9;
		position: fixed;
		bottom: -134rpx;
		width: 100%;
		height: 134rpx;
		display: flex;
		view {
			text-align: center;
			line-height: 80rpx;
			background:rgba(255,228,49,1);
			border-radius:10rpx;
			font-size:32rpx;
			color:rgba(39,40,50,1);
			height:80rpx;
		}
		.cancel {
			margin: 7rpx 32rpx;
			width:172rpx;
			background:rgba(39,40,50,0.1);
			border-radius:10rpx;
		}
		.send {
			margin-top: 7rpx;
			width:480rpx;
			background:rgba(255,228,49,1);
		}
	}
</style>
