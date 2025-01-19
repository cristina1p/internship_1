import { getTokenFromLocalStorage } from '@helper/localStorage'
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api/', // your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add Authorization token dynamically
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage() // Retrieve token from localStorage
    if (token) {
      config.headers = config.headers || {} // Ensure headers object exists
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
