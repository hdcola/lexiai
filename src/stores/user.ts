import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

export type UserSettings = {
    language_id: string;
    level: string;
    topic_id: string;
    style: string;
    favorites: Record<string, boolean>;
};


export const useUserStore = defineStore('userSet', {
    state: () => ({
        settings: {} as UserSettings | null,
        favorites: {} as Record<string, boolean>
    }),
    actions: {
        async fetchUserSettings() {
            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();
            if (!token) {
                console.log("No token found for fetchUserSettings. User is not logged in.");
                return;
            } else {
                console.log("fetchUserSettings function. User is logged in.", token);
            }

            try {
                const response = await axios.get(`${apiUrl}:${apiPORT}/api/users/settings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.data && response.data.settings) {
                    this.settings = response.data.settings;
                    if (this.settings?.favorites) {
                        this.favorites = this.settings.favorites;
                    }
                    console.log("Settings retrieved:", response.data.settings);
                } else {
                    console.log("Settings are not set up.");
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        },
        async toggleFavorite(topicId: string, isFavorite: boolean) {

            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();
            if (!token) {
                console.log("No token found for fetchUserSettings. User is not logged in.");
                return;
            } else {
                console.log("fetchUserSettings function. User is logged in.", token);
            }

            // Save to user
            if (!isFavorite) {
                const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/favorites`, {
                    favorites: { [topicId]: false }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    delete this.favorites[topicId]
                }
            } else {
                const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/favorites`, {
                    favorites: { [topicId]: true }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    this.favorites[topicId] = isFavorite;
                }
            }
            // Save to server
        },
        getFavorites() {
            return { ...this.favorites };
        }
    },
    persist: false
})
