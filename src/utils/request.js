import axios from 'axios'
import { getStore, setStore } from './storage'
import router from '../router/index'
import { Message } from 'element-ui'
import qs from 'qs'

// 统一请求路径前缀
// const base = 'http://139.224.11.125:8848' // 服务器地址
const base = '/api' // 本地//
// 超时设定
axios.defaults.timeout = 15000

axios.interceptors.request.use(
	config => {
		return config
	},
	err => {
		Message.error('请求超时')
		return Promise.reject(err)
	}
)

// http response 拦截器
axios.interceptors.response.use(
	response => {
		const data = response.data
		const msg = response.data.message
		// 根据返回的code值来做不同的处理(和后端约定)
		switch (data.code) {
			case 401:
				// 未登录 清除已登录状态
				setStore('token', '')
				if (router.history.current.name !== 'userLogin') {
					router.replace('/')
					if (msg !== null) {
						Message.error(msg)
					} else {
						Message.error('登录失效，请重新登录')
					}
				}
				break
			case 403:
				// 没有权限
				if (msg !== null) {
					Message.error(msg)
				} else {
					Message.error('没有权限！')
				}
				break
			case 500:
				// 错误
				if (msg == null) {
					Message.error('系统异常！')
				}
				break
			default:
				return data
		}
		return data
	},
	err => {
		// 返回状态码不为200时候的错误处理
		Message.error(err.toString())
		return Promise.resolve(err)
	}
)
export const loginRequest = (url, params, data) => {
	// console.log('函数调用成功')
	const token = getStore('token')
	// console.log(token)
	return axios({
		method: 'get',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		}
	})
}
export const getRequest = (url, params, data) => {
	const token = localStorage.getItem('token')
	console.log(token)
	return axios({
		method: 'get',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		headers: {
			'Content-Type': 'application/json',
			'token': token
		}
	})
}

export const postRequest = (url, params, data) => {
	const token = localStorage.getItem('token')
	return axios({
		method: 'post',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		headers: {
			'Content-Type': 'application/json',
			'token': token
		}
	})
}

export const putRequest = (url, params, data) => {
	const token = getStore('token')
	return axios({
		method: 'put',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		transformRequest: [
			function (data) {
				let ret = ''
				for (const it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}
		],
		headers: {
			'Content-Type': 'application/json',
			'token': token
		}
	})
}

export const deleteRequest = (url, params, data) => {
	const token = getStore('token')
	return axios({
		method: 'delete',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		headers: {
			'token': token
		}
	})
}

export const importRequest = (url, params, data) => {
	const token = getStore('token')
	return axios({
		method: 'post',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		headers: {
			'token': token
		}
	})
}
export const IORequest = (url, params, data) => {
	const token = getStore('token')
	return axios({
		method: 'get',
		url: `${base}${url}`,
		params: params,
		data: data,
		paramsSerializer: params => {
			return qs.stringify(params, { indices: false })
		},
		responseType: 'blob',
		headers: {
			'token': token
		}
	})
}
export const uploadFileRequest = (url, data) => {
	const LToken = localStorage.getItem('token')
	return axios({
		method: 'post',
		url: `${base}${url}`,
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data',
			'token': LToken
		}
	})
}
