import { api } from '@api/axios'
import { removeTokenFromLocalStorage } from '@helper/localStorage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Custom hook to set up the interceptor
export const useAxiosInterceptors = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        // If the response is successful, just return it
        return response
      },
      (error) => {
        // Check if the error status is 401
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === 'Invalid or expired token'
        ) {
          console.error('Unauthorized! Redirecting to login...')
          removeTokenFromLocalStorage()
          navigate('/login') // Redirect to login page using react-router-dom navigate
        }
        // Reject the promise to handle other errors
        return Promise.reject(error)
      },
    )

    // Cleanup the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [navigate])
}
