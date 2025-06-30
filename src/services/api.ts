import axios from 'axios'

const api = axios.create({
  baseURL: 'https://emojihub.yurace.pro/api',
})

export default api
