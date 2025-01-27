import { defineStore } from 'pinia'

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