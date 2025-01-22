import axios from 'axios';
import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

export const useJWTStore = defineStore('jwt', {
    state: () => ({
        jwtToken: <string>""
    }),
    actions: {
        saveToken(token: string) {
            this.jwtToken = token;
        },
        getToken() {
            return this.jwtToken;
        },
        deleteToken() {
            this.jwtToken = "";
        },
        async isValidToken(): Promise<boolean> {
            if (!this.jwtToken) {
                console.error('Token is missing.');
                return false;
            }
        
            try {
                const response = await axios.get(`${apiUrl}:${apiPORT}/api/jwt/validate`, {
                    headers: {
                        Authorization: `Bearer ${this.jwtToken}`,
                    }
                });
        
                if (response.status === 200) {
                    const decoded_token = response.data?.decoded_token;
                    console.log('Token is valid', decoded_token);
                    return true;
                } else {
                    console.error('Token is invalid');
                    return false;
                }
            } catch (error) {
                console.error('Error validating token:', error);
                return false;
            }
        }
    },
    persist: true
})