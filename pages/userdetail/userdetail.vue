<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="navBack()">
				<image src="../../static/images/common/back.png"></image>
			</view>
			<view class="top-bar-center">详情</view>
		</view>
		<view class="user-info">
			<view class="user-info-item head">
				<view class="item-text">头像</view>
				<view class="item-info">
					<image-cropper  :src="tempFilePath" @confirm="confirm" @cancel="cancel" ></image-cropper>
					<image :src="userInfo.imgurl" @tap="upload"  class="meslist_img user-img" ></image>
				</view>
			</view>
			<view class="user-info-item" @tap="modifyAnimation(userInfo.explain, '签名')">
				<view class="item-text">签名</view>
				<view class="item-info">{{userInfo.explain ? userInfo.explain: '请填写'}}</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item border-bottom">
				<view class="item-text">注册</view>
				<view class="item-info">{{userInfo.register | formatDate}}</view>
			</view>
			<view class="user-info-item" @tap="modifyAnimation(userInfo.name, '昵称')">
				<view class="item-text">昵称</view>
				<view class="item-info">{{userInfo.name}}</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item">
				<view class="item-text">性别</view>
				<view class="item-info">
					<picker @change="bindPickerChange" :value="sexIndex" :range="sex">
						<view class="uni-input">{{userInfo.sex}}</view>
					</picker>
				</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item">
				<view class="item-text">生日</view>
				<view class="item-info">
					<picker mode="date" :value="userInfo.birth" start="1900-01-01" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{userInfo.birth ? userInfo.birth:'请选择' }}</view>
					</picker>
				</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item" @tap="modifyAnimation(userInfo.phone, '电话')">
				<view class="item-text">电话</view>
				<view class="item-info">{{userInfo.phone  ?  userInfo.phone: '请填写'}}</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item border-bottom" @tap="modifyAnimation(userInfo.email, '邮箱')" >
				<view class="item-text">邮箱</view>
				<view class="item-info">{{userInfo.email}}</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
			<view class="user-info-item border-bottom" @tap="modifyAnimation('', '密码')">
				<view class="item-text">密码</view>
				<view class="item-info">*****</view>
				<image src="../../static/images/userdetail/right.png" mode="" class="item-right"></image>
			</view>
		</view>
		
		<view class="bottom-bar">
			<view class="bottom-btn">退出应用</view>
		</view>
		
		<!-- 弹出层 -->
		<view class="modify" :style="{bottom:-modifyHeigth+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="modifyAnimation()">取消</view>
				<view class="title">{{headerTitle}}</view>
				<view class="define" @tap="modifySubmit()">确定</view>
			</view>
			<view class="modify-main">
				<input v-if="modifyType == '密码' || modifyType == '邮箱'" v-model="pw" type="password" class="modify-pw" placeholder-style="color:#aaa;font-weight:400" placeholder="请输入原密码" />
				<textarea v-model="data" class="modify-text" :placeholder="modifyType == '密码' ? '请输入新密码': ''" placeholder-style="color:#aaa;font-weight:400" />
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				cropFilePath: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3907030802,3322597418&fm=26&gp=0.jpg',
				date: currentDate,
				endDate: null,
				sex: ['男', '女', '未知'],
				sexIndex: 0,
				tempFilePath: '',
				headimg: '',
				data: '',
				pw: '',
				isEdit: false, //是否弹出动画框
				modifyHeigth: null, //修改框高度
				animationData: {}, //修改动画框的动画
				//用户数据
				userInfo: {},
				headerTitle: '', //修改框的文字
				modifyType: '', //修改框的类型
				id: null
			};
		},
		components: {ImageCropper},
		onReady() {
			this.getElementStyle();
		},
		onLoad(option) {
			this.id = option.id;
			this.endDate = this.getDate();
			this.getUserDetail()
		},
		methods: {
			//获取数据
			async getUserDetail() {
				//获取用户列表
				console.log(this.id)
				const res = await this.$myRequest({
					url: '/user/detail',
					method: 'post',
					data: {
						id: this.id
					}
				})
				console.log(res)
				if (res.data.status == 200) {
					this.userInfo = res.data.result
				}
			},
			//返回上一页
			navBack() {
				uni.navigateBack({})
			},
			// 生日时间选择器改变，更改生日
			bindDateChange(e) {
				this.userInfo.birth = e.target.value
				let data = {
					id: this.id,
					type: 'birth',
					data: this.userInfo.birth
				};
				this.updateInfo(data)
			},
			// 性别选择器改变
			async bindPickerChange(e) {
				this.sexIndex = e.target.value;
				this.userInfo.sex = this.sex[this.sexIndex];
				let data = {
					id: this.id,
					type: 'sex',
					data: this.userInfo.sex
				};
				this.updateInfo(data)
			},
			// 请求修改数据
			async updateInfo(data){
				const res = await this.$myRequest({
					url: '/user/update',
					method: 'post',
					data: data
				})
				console.log(res)
				console.log()
				if (res.data.status == 200) {
					console.log(data.type)
					if (data.type != 'pw' && data.type != 'birth' && data.type != 'sex') {
						this.userInfo[data.type] = this.data;
					} 
					if (data.type != 'birth' && data.type != 'sex') {
						//关闭修改框
						this.modifyAnimation()
						console.log(data.type != 'sex')
						this.data = '';
						this.pw = '';
					}
				} else {
					if (data.type != 'birth' && data.type != 'sex') {
						//关闭修改框
						this.modifyAnimation()
						this.data = '';
						this.pw = '';
					}
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false
					})
				}
			},
			//获取页面高度
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
				  this.modifyHeigth = data.height;
				}).exec();
			},
			//修改框的动画
			modifyAnimation(data, title) {
				this.isEdit = !this.isEdit
				//信息框的动画
				const animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out',
				})
				if (this.isEdit) {
					//设置顶部的文字
					this.headerTitle = title;
					//设置文本框的内容
					this.data = data;
					this.modifyType = title;
					animation.bottom(0).step()
				} else {
					this.modifyType = '';
					animation.bottom(-this.modifyHeigth).step()
				}
				this.animationData = animation.export()
			},
			//修改模态框确定
			async modifySubmit(type) {
				//处理修改
				let data = {
					id: this.id,
					type: null,
					data: this.data.trim()
				};
				switch(this.modifyType) {
					case '签名':
						data.type = 'explain'
						break;
					case '昵称':
						data.type = 'name'
						break;
					case '电话':
						data.type = 'phone'
						break;
					case '邮箱':
						data.type = 'email';
						data.pw = this.pw.trim();
						break;
					case '密码':
						data.type = 'pw';
						data.pw = this.pw.trim();
						break;
					default:
						break;
				}
				console.log(data)
				this.updateInfo(data);
			},
			
			
			//图片裁剪的方法
			 upload() {
				 uni.chooseImage({
					 count: 1, //默认9
					 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					 sourceType: ['album'], //从相册选择
					 success: (res) => {
						 this.tempFilePath = res.tempFilePaths.shift()

					 }
				 });
			 },
			confirm(e) {
				this.tempFilePath = '';
				this.userInfo.imgurl = e.detail.tempFilePath;
				this.headimg=e.detail.tempFilePath;
				uni.uploadFile({url:'后端地址上传图片接口地址',
				  filePath: this.headimg,
							name: 'file',
							fileType:'image',
								//formData:{},传递参数
							 success: (uploadFileRes) => { 
								 var backstr= uploadFileRes.data;
			//自定义操作
							 },
							 complete() {
								//console.log("this is headimg"+this.headimg)   
							 },
							 fail(e) {
								console.log("this is errormes "+e.message)  
							 }

							 });
			},
			cancel() {
				console.log('canceled');
				this.tempFilePath="";
			},
			//获取时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
		z-index: 9;
		left: 0;
		top: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-border-color;
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
		.top-bar-center {
			font-size:40rpx;
			color:rgba(39,40,50,1);
			line-height:88rpx;
			position: absolute;
			left: 0;
			right: 0;
			text-align: center;
			margin: 0;
		}
	}
	.user-info {
		margin-top: 130rpx;
		.user-info-item {
			width:750rpx;
			height:112rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			// border: 1px solid red;
			display: flex;
			.item-text {
				font-size:32rpx;
				color:rgba(39,40,50,1);
				line-height:112rpx;
				padding-right: 32rpx;
			}
			.item-info {
				flex: 1;
				width:558rpx;
				font-size:32rpx;
				color:rgba(39,40,50,0.6);
				line-height:112rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
			.item-right {
				width: 28rpx;
				height: 28rpx;
				padding-top: 42rpx;
				
			}
		}
		.border-bottom {
			border-bottom: 1px solid $uni-border-color;
		}
	}
	.head {
		height: 148rpx !important;
		.item-text {
			line-height: 148rpx !important;
		}
		.user-img {
			width:104rpx;
			height:104rpx;
			border-radius:20rpx;
			margin: 22rpx 0;
		}
		.item-right {
			padding-top: 50rpx !important;
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
			border-radius:10rpx;
			font-size:32rpx;
			color:rgba(255,93,91,1);
		}
	}
	.modify {
		position: fixed;
		z-index: 1000;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		.modify-header {
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			background: $uni-bg-color;
			border-bottom: 1px solid $uni-border-color;
			display: flex;
			.close {
				padding-left: 32rpx;
				font-size:32rpx;
				color:rgba(39,40,50,1);
				line-height:88rpx;
			}
			.title {
				flex: 1;
				text-align: center;
				font-size:40rpx;
				color:rgba(39,40,50,1);
				line-height:88rpx;
			}
			.define {
				padding-right: 32rpx;
				font-size:32rpx;
				color:rgba(74,170,255,1);
				line-height:88rpx;
			}
		}
		.modify-main {
			display: flex;
			padding-top: 40rpx;
			flex-direction: column;
			.modify-text {
				margin: 0 auto;
				padding: 18rpx 20rpx;
				box-sizing: border-box;
				width:686rpx;
				height:420rpx;
				background:rgba(243,244,246,1);
				border-radius:20rpx;
				font-size:32rpx;
				color:rgba(39,40,50,1);
				line-height:44rpx;
			}
			.modify-pw {
				width:686rpx;
				height: 88rpx;
				margin: 0 auto 40rpx;
				padding:  0 20rpx;
				box-sizing: border-box;
				background:rgba(243,244,246,1);
				border-radius:20rpx;
				font-size:32rpx;
				color:rgba(39,40,50,1);
				line-height:88rpx;
			}
		}
	}
</style>
