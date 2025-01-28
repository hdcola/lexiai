import { defineStore } from 'pinia'
import type { VoiceName } from '@/lib/gemini/config/config-types';
import { useServerRequest } from '@/assets/composables/useServerRequest';


type User = {
    _id: string;
    email: string;
    username: string;
    password?: string;
    created_at: string;
    settings: UserSettings;
}


export type UserSettings = {
    language_id: string;
    level: string;
    topic_id: string;
    style_id: string;
    favorites: Record<string, boolean>;
    api_key: string;
    voice_name: VoiceName;
};


export const useUserStore = defineStore('userSet', {
    state: () => ({
        user: {} as User,
        settings: {} as UserSettings,
        favorites: {} as UserSettings["favorites"],
    }),
    actions: {
        saveUser(user: User) {
            this.user = user;

            if (user.settings) {
                this.settings = user.settings;

                if (user.settings.favorites) {
                    this.favorites = user.settings.favorites;
                }
            }
        },
        getUser() {
            return { ...this.user };
        },
        async fetchUserSettings() {
            try {
                const response = await useServerRequest('get', '/api/users/settings');

                if (response?.data && response?.data.settings) {
                    this.settings = response?.data.settings;
                    if (this.settings.favorites) {
                        this.favorites = this.settings.favorites;
                    }
                    console.log("Settings retrieved:", response?.data.settings);
                } else {
                    console.log("Settings are not set up.");
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        },
        getLanguageSettings() {
            return { ... this.settings }
        },
        async saveLanguage(languageId: string, styleId: string) {
            try {
                const response = await useServerRequest('patch', '/api/users/settings', {
                    settings: {
                        language_id: languageId,
                        style_id: styleId,
                    },
                });

                console.log('Language updated successfully:', response?.data);
                this.settings.language_id = languageId; // Update language in store
                this.settings.style_id = styleId;
            } catch (error) {
                console.error('Failed to update settings:', error);
            }


        },
        async toggleFavorite(topicId: string, isFavorite: boolean) {

            try {
                await useServerRequest('patch', '/api/users/favorites', {
                    favorites: { [topicId]: isFavorite }
                });

                // Save to user
                if (isFavorite) {
                    this.favorites[topicId] = isFavorite;
                }
                else {
                    delete this.favorites[topicId]
                }

            } catch (error) {
                console.error("Error updating favorites:", error);
            }
        },
        getFavorites() {
            return { ...this.favorites };
        },
        async saveLexiSettings(voiceName: VoiceName, apiKey: string) {

            // Save to server


            try {
                // Send API request to update settings
                const response = await useServerRequest('patch', '/api/users/settings', {
                    settings: {
                        voice_name: voiceName,
                        api_key: apiKey,
                    }
                });
                if (response?.status === 200 && response.data.settings) {
                    console.log("Lexi settings successfully updated on the server:", response.data.settings);

                    // Save to user
                    this.settings.voice_name = response.data.settings.voice_name;
                    this.settings.api_key = response.data.settings.api_key;
                } else {
                    console.log("Unexpected response when updating Lexi settings:", response);
                }
            } catch (error) {
                console.error("Error updating Lexi settings:", error);
            }
        },
        getLexiSettings() {
            return { ...this.settings }
        },
        async saveProfileSettings(username: string, email: string) {

            // Save to server

            try {
                // Send API request to update settings
                const response = await useServerRequest('patch', '/api/users/update', {
                    username: username,
                    email: email,
                });

                console.log("User profile successfully updated on the server:", response?.data);

                // Save to user
                this.user.username = response?.data.username;
                this.user.email = response?.data.email;

            } catch (error) {
                console.error("Error updating profile:", error);
            }

        },
        getProfileSettings() {
            return { ...this.user }
        },
        async saveSecuritySettings(password: string) {

            // Save to server 
            try {
                // Send API request to update settings
                const response = await useServerRequest('patch', '/api/users/security', {
                    password: password,
                });

                if (response?.status === 200 && response.data.user) {
                    console.log("User new password successfully saved on the server:", response.data.user);
                } else {
                    console.log("Unexpected response when saving a new password:", response);
                }
            } catch (error) {
                console.error("Error saving a new password:", error);
            }
        }
    },
    persist: false
})
