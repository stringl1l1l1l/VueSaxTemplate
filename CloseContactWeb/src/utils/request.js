import axios from 'axios'
import store from '@/store/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080' || process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.token = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      let mes = ""
      if(res.data) {
        if(typeof res.data == "string")
          mes = mes + " " + res.data
        else if(typeof res.data == "object") {
          for (const key in res.data) {
            mes = mes + " " + res.data[key]
          }
        }
      }

      // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        // to re-login
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 刷新
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

const http = {
  post(url, params) {
    return service.post(url, params, {
      method: 'post',
      transformRequest: [params => {
        return JSON.stringify(params)
      }],
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  get(url, params) {
    return service.get(url, {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
  },
  getRestApi(url, ...params) {
    if (Object.is(params, null)) {
      return service.get(url)
    }
    else {
      let _params=''
      for(let j = 0; j < params.length; j++) {
        _params+=`/${params[j]}`
      }if (_params) {
        return service.get(`${url}${_params}`)
      }
    }
  },
  put(url, params) {
    return service.put(url, params, {
      transformRequest: [params => {
        return JSON.stringify(params)
      }],
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  delete(url, ...params) {
    if (Object.is(params, null)) {
      return service.delete(url)
    }
    else {
      let _params=''
      for(let j = 0; j < params.length; j++) {
        _params+=`/${params[j]}`
      }if (_params) {
        return service.delete(`${url}${_params}`)
      }
    }
  }
}
export default http
