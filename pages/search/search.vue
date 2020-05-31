<template>
	<view class="content">
		<!-- 头部 -->
		<view class="top-bar">
			<view class="search-box">
				<input type="text" placeholder="搜索用户/群" class="search"  placeholder-style="color:#aaa;font-weight:400" @blur="search" />
				<image src="../../static/images/search/search@2x.png" class="search-img"></image>
			</view>
			<view class="top-bar-right" @tap="navBack">取消</view>
		</view>
		
		<view class="list-box">
			<view class="search-user">
				<view class="title" v-if="userArr.length > 0">用户</view>
				<view class="item" v-for="(item, index) in userArr" :key="item.id">
					<image :src="item.imgurl" @tap="goUserDetail(item.id)"></image>
					<view class="info-box">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view :class="item.tip == 1 ? 'button' : 'button2'">{{item.tip == 1 ? '发消息' : '加好友'}}</view>
				</view>
			</view>
			<view class="search-group">
				<view class="title" v-if="groupArr.length > 0"></view>
				<view class="item" v-for="(item,index) in groupArr" :key="item._id">
					<image :src="item.imgurl"></image>
					<view class="group-name">{{item.name}}</view>
					<view class="button">发消息</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import datas from '../../common/js/datas.js'
	export default {
		data() {
			return {
				userArr: [],
				groupArr: [],
				data:''
			};
		},
		methods: {
			//获取关键词
			async search(e) {
				this.userArr = [];
				this.groupArr = [];
				this.data = e.detail.value;
				// let searchval = e.detail.value;
				// if (e.detail.value.length > 1) {
				// 	this.searchUser(e.detail.value)
				// }
				
				//获取用户列表
				const friend = await this.$myRequest({
					url: '/search/user',
					method: 'post',
					data: {
						data: this.data
					}
				})
				if (friend.data.status == 200) {
					this.userArr = friend.data.result
				}
				
				//获取群列表
				const group = await this.$myRequest({
					url: '/search/group',
					method: 'post',
					data: {
						data: this.data
					}
				})
				if (group.data.status == 200) {
					this.groupArr = group.data.result
				}
			},
			//寻找关联词匹配的好友
			searchUser(e) {
				let arr = datas.friends();
				let exp = eval("/" + e + "/g" );
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
						this.isFriend(arr[i]);
						arr[i].name = arr[i].name.replace(exp, "<span style='color:#4AAAFF;'>"+ e + "</span>");
						arr[i].email = arr[i].email.replace(exp, "<span style='color:#4AAAFF;'>"+ e + "</span>");
						this.userArr.push(arr[i]);
					}
				}
				console.log(this.userArr)
			},
			//判断是否为好友
			isFriend(e) {
				let tip = 0;
				let arr = datas.isFriend();
				for(let i = 0; i < arr.length; i++) {
					if (arr[i].friend == e.id) {
						tip = 1;
					}
				}
				e.tip = tip;
			},
			//取消
			navBack() {
				uni.navigateBack({})
			},
			//去用户详情页
			goUserDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: '../addfriend/addfriend?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		// box-sizing: border-box;
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-border-color;
		display: flex;
		.search-box {
			width: 600rpx;
			height: 60rpx;
			margin: 14rpx 32rpx 0;
			box-sizing: border-box;
			display: flex;
			background: rgba(243,244,246,1);
			padding: 0 12rpx;
			border-radius: 10rpx;
			.search {
				flex: 1;
				line-height: 60rpx;
				margin-top: 8rpx;
			}
			.search-img {
				width: 40rpx;
				height: 40rpx;
				margin: 10rpx;
			}
		}
		.top-bar-right {
			font-size:28rpx;
			color:rgba(39,40,50,1);
			line-height:88rpx;
		}
	}
	.list-box {
		.search-user, .search-group {
			.title {
				height:60rpx;
				font-size:44rpx;
				font-weight:600;
				color:rgba(39,40,50,1);
				line-height:60rpx;
				padding: 34rpx 32rpx 0;
			}
			.item {
				width: 100%;
				height: 120rpx;
				box-sizing: border-box;
				display: flex;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
					margin: 20rpx 32rpx;
				}
				.info-box {
					flex: 1;
					height: 80rpx;
					margin-top: 20rpx;
					.name {
						font-size:36rpx;
						color:rgba(39,40,50,1);
						line-height:50rpx;
					}
					.email {
						font-size:24rpx;
						color:rgba(39,40,50,1);
						line-height:28rpx;
					}
				}
				.group-name {
					flex: 1;
					line-height: 120rpx;
					font-size:36rpx;
					color:rgba(39,40,50,1);
				}
				.button {
					width:120rpx;
					height:48rpx;
					background:rgba(255,228,49,1);
					border-radius:24rpx;
					font-size:24rpx;
					color:rgba(39,40,50,1);
					line-height:48rpx;
					text-align: center;
					margin: 36rpx 32rpx;
				}
				.button2 {
					width:120rpx;
					height:48rpx;
					background:rgba(74,170,255,0.1);
					border-radius:24rpx;
					font-size:24rpx;
					color:rgba(39,40,50,1);
					line-height:48rpx;
					text-align: center;
					margin: 36rpx 32rpx;
				}
			}
		}
	}
</style>
