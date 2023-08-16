import axios from 'axios'
import { ElMessage  } from 'element-plus'
// import { getToken } from '@/utils/auth'
 
 
export  const request =(options:any)=> {
  return new Promise((resolve, reject) => {
 
    // create an axios instance
    const service = axios.create({
      // baseURL: process.env.BASE_API, // api 的 base_url
      baseURL: process.env.VITE_APP_BASE_API,
      timeout: 80000 // request timeout
    })
 
    // request interceptor
    service.interceptors.request.use(
      (config:any) => {
        let token:string =''//此处换成自己获取回来的token/getToken()，通常存在在cookie或者store里面
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers['X-Token'] = token
       
          config.headers.Authorization =  + token       
         }
        return config
      },
      error => {
        // Do something with request error
        console.log("出错啦", error) // for debug
        Promise.reject(error)
      }
    )
 
    // response interceptor
    service.interceptors.response.use(
       (response:any) => {
        return response.data
      },
      error => {
        console.log('err' + error) // for debug
        if(error.response.status == 403){
          ElMessage.error('错了')
        }else{
          ElMessage.error('服务器请求错误，请稍后再试')
        }
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
 
 
export default request