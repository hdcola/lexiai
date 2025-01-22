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
    },
    persist: true
})