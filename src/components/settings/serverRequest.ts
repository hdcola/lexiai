import { useJWTStore } from "@/stores/jwt";
import axios, { type AxiosRequestConfig } from "axios"

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

/**
 * Centralized server request function.
 * Automatically handles the token, base URL, and error handling.
 * 
 * @param {string} apiPoint - specific URL of the API request 
 * @param {string} apiMethod - HTTP method (get, post, patch, or delete)
 * @param {string} dataJson - data to send in the request
 * @returns  - the responce from the API request  
 */
export async function serverRequest(
    apiMethod: 'get' | 'post' | 'patch' | 'delete', // restricting to valid HTTP methods
    apiPoint: string,
    dataJson?: object,
    customHeaders?: object) {
    try {
        const jwtStore = useJWTStore();
        const token = jwtStore.getToken();

        const headers = {
            Authorization: token ? `Bearer ${token}` : undefined,
            ...customHeaders,
        };
        const config: AxiosRequestConfig = {
            headers,
        };


        const response = 
        apiMethod === 'get' || apiMethod === 'delete'
            ? await axios[apiMethod](`${apiUrl}:${apiPORT}${apiPoint}`, config) // no payload for GET/DELETE
            : await axios[apiMethod](`${apiUrl}:${apiPORT}${apiPoint}`, dataJson, config); // payload for POST, PATCH, PUT);

        return response;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Invalid token. Redirecting to login...');
                window.location.href = '/login';
            } else {
                console.error(`Error ${error.response.status}:`, error.response.data);
            }
        }  else if (typeof error === 'string') {
            console.error('String error:', error);
          } else {
            console.error('Network or unexpected error:', error);
            throw error; 
        }
        
    }
}