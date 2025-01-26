import { defineStore } from 'pinia'
import { useJWTStore } from './jwt';
import axios from 'axios';
import type { VoiceName } from '@/lib/gemini/config/config-types';
import { useServerRequest } from '@/assets/composables/useServerRequest';

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

type User = {
    email: string;
    username: string;
    password?: string;
    createdAt: string;
    settings: UserSettings;
}


export type UserSettings = {
    language_id: string;
    level: string;
    topic_id: string;
    style_id: string;
    favorites: Record<string, boolean>;
    apiKey: string;
    voiceName: VoiceName;
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
        getLanguageSettings() {
            return { ... this.settings }
        },
        async saveLanguage(languageId: string, styleId: string) {
            /* 
              const jwtStore = useJWTStore();
              const token = jwtStore.getToken();
  
              try {
                   const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/settings`, {
                       settings: {
                           language_id: languageId,
                           style_id: styleId,
                       }
                   }, {
                       headers: {
                           Authorization: `Bearer ${token}`,
                       }
                   }); 
                 
  
  
                  if (response.status === 200) {
                      console.log('Language updated successfully:', response.data);
                      this.settings.language_id = languageId; // Update language in store
                      this.settings.style_id = styleId;
                  } else {
                      console.log('Error updating language:', response);
                  }
              } catch (error) {
                  console.error('Error updating language:', error);
              }
  
              */

            try {
                const response = await useServerRequest('patch', '/api/users/settings', {
                    settings: {
                        language_id: languageId,
                        style_id: styleId,
                    },
                });

                console.log('Language updated successfully:', response.data);
                this.settings.language_id = languageId; // Update language in store
                this.settings.style_id = styleId;
            } catch (error) {
                console.error('Failed to update settings:', error);
            }


        },
        async toggleFavorite(topicId: string, isFavorite: boolean) {

            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();

            try {
                await axios.patch(`${apiUrl}:${apiPORT}/api/users/favorites`, {
                    favorites: { [topicId]: isFavorite }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
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
            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();

            try {
                // Send API request to update settings
                const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/settings`, {
                    settings: {
                        voiceName: voiceName,
                        apiKey: apiKey,
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200 && response.data.settings) {
                    console.log("Lexi settings successfully updated on the server:", response.data.settings);

                    // Save to user
                    this.settings.voiceName = response.data.settings.voiceName;
                    this.settings.apiKey = response.data.settings.apiKey;
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
            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();

            try {
                // Send API request to update settings
                const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/update`, {
                    username: username,
                    email: email,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log("User profile successfully updated on the server:", response.data);

                // Save to user
                this.user.username = response.data.username;
                this.user.email = response.data.email;

            } catch (error) {
                console.error("Error updating profile:", error);
            }

        },
        getProfileSettings() {
            return { ...this.user }
        },
        async saveSecuritySettings(password: string) {

            // Save to server 
            const jwtStore = useJWTStore();
            const token = jwtStore.getToken();

            try {
                // Send API request to update settings
                const response = await axios.patch(`${apiUrl}:${apiPORT}/api/users/security`, {
                    password: password,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200 && response.data.user) {
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
