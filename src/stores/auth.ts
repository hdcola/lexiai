import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import router from '@/router';
import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: <boolean>false,
        errorMessage: "",
        successMessage: ""
    }),
    actions: {
        isAuthenticated() {
            return this.isLoggedIn;
        },
        async login(email: string, password: string) {
            this.successMessage = '';
            this.errorMessage = '';

            if (!email || !password) {
                this.errorMessage = 'Email and password are required.';
                return
            }
            try {
                const response = await axios.post(`${apiUrl}:${apiPORT}/api/users/login`, {
                    email: email,
                    password: password,
                })

                if (response.data.accessToken) {
                    const newToken = response.data.accessToken
                    const jwtStore = useJWTStore()

                    // Save token
                    jwtStore.saveToken(newToken)

                    console.log('Login successful, token stored')
                    this.isLoggedIn = true;
                    this.successMessage = 'Login successful'

                    // redirect to home
                    setTimeout(() => router.push('/lexiai'), 2000)
                }
            } catch (error) {
                this.isLoggedIn = false;
                if (axios.isAxiosError(error)) {
                    this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
                } else {
                    // other unknown errors
                    this.errorMessage = 'An unexpected error occurred.'
                }
            }

        },
        logout() {
            const jwtStore = useJWTStore();
            jwtStore.deleteToken();
            this.isLoggedIn = false;
            console.log("User is logged out");
            router.push("/login");
        }
    },
    persist: false
})