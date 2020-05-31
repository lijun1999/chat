export default {
	timeFormat(date) {
		let old = new Date(date);
		let now = new Date();
		//获取old的具体时间
		let d = old.getTime();
		let h = old.getHours()
		let m = old.getMinutes();
		let Y = old.getFullYear()
		let M = old.getMonth() + 1
		let D = old.getDate()
		//获取now的具体时间
		let now_d = now.getTime();
		let now_h = now.getHours()
		let now_m = now.getMinutes();
		let now_Y = now.getFullYear()
		let now_M = now.getMonth() + 1
		let now_D = now.getDate()
		
		if(D===now_D && M === now_M && Y === now_Y) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + h
			}
			return h + ':' + m 
		} else if(D + 1 ===now_D && M === now_M && Y === now_Y) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + h
			}
			return '昨日 ' + h + ':' + m 
		} else {
			return `${Y}/${M}/${D}`
		}
	}
}