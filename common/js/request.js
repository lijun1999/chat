const baseUrl = 'http://127.0.0.1:3000'
export const myRequest = (options) => {
	return new Promise((resolve, reject)=>{
		const token = uni.getStorageSync('token')
		uni.request({
			url: baseUrl+options.url,
			header: {
			  'content-type': 'application/json',
			  'authorization':token
			},
			method: options.method || 'get',
			data: options.data || {},
			success: res => {
				if (res.data.status == 300){
					uni.showToast({
						title:'登录已过期，请重新登录',
						icon: 'none'
					})
					return uni.redirectTo({
						url: '/pages/login/login'
					})
				}
				resolve(res)
			},
			fail: err => {
				return uni.showToast({
					title:'请求借口失败'
				})
				reject(err)
			}
		})
	})
}