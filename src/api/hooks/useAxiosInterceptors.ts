import { api } from '@api/axios'
import { TokenContext } from '@components/contexts'
import { useContext, useEffect } from 'react'

// Custom hook to set up the interceptor
export const useAxiosInterceptors = () => {
  const { setToken } = useContext(TokenContext)

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
          setToken('')
        }
        // Reject the promise to handle other errors
        return Promise.reject(error)
      },
    )

    // Cleanup the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [setToken])
}
