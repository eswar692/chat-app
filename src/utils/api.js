import axios from'axios'
import {server} from './constant'

export const apiClient = axios.create({
    baseURL:server,
})
