import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import axios from 'axios';
import type { VoiceName } from '@/lib/gemini/config/config-types';

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

export type UserSettings = {
    language_id: string;
    level: string;
    topic_id: string;
    style: string;
    favorites: Record<string,boolean>;
    apiKey: string;
    voiceName: VoiceName;
};


export const useUserStore = defineStore('userSet', {
    state: () => ({
        settings: {} as UserSettings,
        favorites: {} as Record<string,boolean>
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
                    if (this.settings.favorites) {
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
        toggleFavorite(topicId: string, isFavorite: boolean) {

            // Save to user
            if (!isFavorite) {
                delete this.favorites[topicId]
            } else {
                this.favorites[topicId] = isFavorite;
            }
            
            // Save to server
        },
        getFavorites() {
            return {...this.favorites};
        },
        saveLexiSettings(voiceName: VoiceName, apiKey: string) {

            // Save to user
            this.settings.voiceName = voiceName;
            this.settings.apiKey = apiKey;

            // Save to server
        },
        getLexiSettings() {
            return {...this.settings}
        }
    },
    persist: false
})
