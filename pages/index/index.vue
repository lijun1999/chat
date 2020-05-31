<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="goUserDetail()">
				<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2007721427,4242707731&fm=26&gp=0.jpg"></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/common/logo.png" class="logo"></image>
			</view>
			<view class="top-bar-right">
				<view class="search" @tap="goSearch()">
					<image src="../../static/images/index/search.png"></image>
				</view>
				<view class="add">
					<image src="../../static/images/index/add.png"></image>
				</view>
			</view>
		</view>
		
		<view class="friend-list-box">
			<!-- 好友申请 -->
			<view class="apply">
				<view class="friend-list">
					<view class="friend-list-l">
						<text class="tip">1</text>
						<image src="../../static/images/index/newfriend.png" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">好友申请</view>
							<view class="time">19:13</view>
						</view>
						<view class="news">
							OMG，买它买它买它zxxdgvszxvzxVB大三下在所不惜这首歌是代表V型主打歌
						</view>
					</view>
				</view>
			</view>
			
			<!-- 消息列表 -->
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id">
					<view class="friend-list-l">
						<text class="tip" v-if="item.tip > 0">{{item.tip > 99 ? '99+' : item.tip}}</text>
						<image :src="item.imgUrl" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{timeFormat(item.time)}}</view>
						</view>
						<view class="news">{{item.news}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../common/js/datas.js'
	import myfun from '../../common/js/myfun.js'
	export default {
		data() {
			return {
				title: 'Hello',
				friends: null
			}
		},
		onLoad() {
			this.getFrirends()
		},
		methods: {
			timeFormat(date) {
				return myfun.timeFormat(date)
			},
			getFrirends() {
				this.friends = datas.friends()
				console.log(this.friends)
			},
			goUserDetail(){
				const id = uni.getStorageSync('id');
				console.log(id)
				uni.navigateTo({
					url: '/pages/userdetail/userdetail?id=' +id
				})
			},
			//跳转到搜索页
			goSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);
	}
	.top-bar {
		position: fixed;
		z-index: 9;
		left: 0;
		top: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		// box-sizing: border-box;
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-border-color;
		.top-bar-left {
			position: relative;
			z-index: 10;
			padding-left: $uni-spacing-col-base;
			float: left;
			image {
				width:68rpx;
				height:68rpx;
				border-radius:16rpx;
				margin-top: 10rpx;
			}
		}
		.top-bar-center {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 10rpx;
			text-align: center;
			margin: 0;
			.logo {
				margin-top: 19rpx;
				width:88rpx;
				height:42rpx;
			}
		}
		.top-bar-right {
			padding-right: 14rpx;
			float: right;
			.search {
				position: relative;
				z-index: 10;
				width:88rpx;
				height:88rpx;
				display: inline-block;
			}
			.add {
				position: relative;
				z-index: 10;
				width:88rpx;
				height:88rpx;
				display: inline-block;
			}
			image {
				width:52rpx;
				height:52rpx;
				padding: 18rpx 0 0 18rpx;
			}
		}
	}
	.friend-list-box {
		padding-top: 104rpx;
		box-sizing: border-box;
		width: 100%;
	}
	.friend-list {
		&:active {
			background-color: $uni-bg-color-grey;
		}
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;
		display: flex;
		.friend-list-l {
			position: relative;
			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}
			.tip {
				position: absolute;
				top: -8rpx;
				left: 68rpx;
				z-index: 10;
				min-width: 22rpx;
				height:36rpx;
				padding: 0 6rpx;
				background: $uni-color-warning;
				border-radius: 18rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
		}
		.friend-list-r {
			flex: 1;
			padding-left: $uni-spacing-col-base;
			.top {
				height: 50rpx;
				.name {
					float: left;
					font-size: 36rpx;
					color: $uni-text-color;
					line-height: 50rpx;;
				}
				.time {
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
				}
			}
			.news {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
</style>
