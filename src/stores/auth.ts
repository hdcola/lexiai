import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from './user';


const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT


export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: <boolean>false,
        errorMessage: "",
        successMessage: ""
    }),
    actions: {
        async isAuthenticated() {
            if (this.isLoggedIn == true){
                return this.isLoggedIn;
            }

            try {
                const isValid = await this.isValidToken();  
                if (isValid) {
                    this.isLoggedIn = true;
                    console.log("Token is valid. User is logged in.");

                } else {
                    this.isLoggedIn = false;
                    console.log("Token is invalid. User is not logged in.");
                }
            } catch (error) {
                console.error("Error validating token:", error);
                this.isLoggedIn = false;
            }
            return this.isLoggedIn;
        },
        async isValidToken(): Promise<boolean> {
            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();

            if (!token) {
                console.error('Token is missing.');
                return false;
            }
            
            try {
                const response = await axios.get(`${apiUrl}:${apiPORT}/api/jwt/validate`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log('Token is valid');

                // Save user info to user
                const userStore = useUserStore();
                userStore.saveUser(response.data.user)

                return true;
            }
            catch(error) {
                if (axios.isAxiosError(error)) {
                    if (error.status === 401) {
                        console.error('Token is invalid');
                        jwtStore.deleteToken();
                        return false;
                    }
                }
                throw error;
            }
        },
        async login(email: string, password: string) {


            try {
                const response = await axios.post(`${apiUrl}:${apiPORT}/api/users/login`, {
                    email: email,
                    password: password
                })

                const newToken = response.data.accessToken
                const jwtStore = useJWTStore()

                // Save token
                jwtStore.saveToken(newToken)

                console.log('Login successful, token stored.')
                this.isLoggedIn = true;

                const userStore = useUserStore();
                userStore.saveUser(response.data.user);

                // redirect to home
                setTimeout(() => router.push('/lexiai'), 2000)

            } catch (error) {
                this.isLoggedIn = false;
                if (axios.isAxiosError(error)) {
                    throw error.response?.data.message || 'Login failed. Please try again.'
                } else {
                    // other unknown errors
                    throw 'An unexpected error occurred.'
                }
            }

        },
        async register(username: string, email: string, password: string) {
            this.successMessage = '';
            this.errorMessage = '';

            try {
                const response = await axios.post(`${apiUrl}:${apiPORT}/api/users/register`, {
                    username,
                    email,
                    password,
                })

                console.log('Registration successful:', response.data)

                this.successMessage = 'Registration successful. Please log in.'
                setTimeout(() => router.push('/login'), 2000) // Redirect after 3 seconds
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
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