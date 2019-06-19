import axios from 'axios'

//登录
export function checkLogin(phone, password) {
  return axios.get('/login/cellphone', {
      params:{
        phone: phone,
        password: password
      }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}