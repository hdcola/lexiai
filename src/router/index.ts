import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import GeminiView from '@/views/GeminiView.vue';
import { useAuthStore } from '@/stores/auth';
import Settings from '@/views/Settings.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/TestView.vue'),
        },
        {
            path: '/gemini',
            name: 'gemini',
            component: GeminiView,
        },
        {
            path: '/lexiai',
            name: 'gemini',
            component: GeminiView,
            beforeEnter: (to, from) => {
                //check if authenticated
                const authStore = useAuthStore();

                if (from.name != 'login' && !authStore.isAuthenticated()) {
                    return '/login'
                }
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            beforeEnter: (to, from) => {
                //check if authenticated
                const authStore = useAuthStore();

                if (from.name != 'login' && !authStore.isAuthenticated()) {
                    return '/login'
                }
            }
        }
    ],
})

export default router
