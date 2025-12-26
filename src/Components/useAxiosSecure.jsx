"use client" 


import useAuth from '@/Hook/sheard'
import axios from 'axios'
import { useRouter } from 'next/navigation' 
import { useEffect } from 'react'



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logOut, user } = useAuth() 
    const router = useRouter()

    useEffect(() => {
    
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token') 
                if (token) {
                    config.headers.authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

      
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response ? error.response.status : null

                if (status === 401 || status === 403) {
                    await logOut()
                    router.push('/login') 
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor)
            axiosSecure.interceptors.response.eject(responseInterceptor)
        }
    }, [logOut, router, user])

    return axiosSecure
}

export default useAxiosSecure