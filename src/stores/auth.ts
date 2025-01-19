import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: <boolean>false
    }),
    actions: {
        isAuthenticated() {
            return this.isLoggedIn;
        },
        login() {
            // Move axios login logic here, pass the email/pass as params
            this.isLoggedIn = true;
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