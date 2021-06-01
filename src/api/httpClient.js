import axios from "axios";
import {apiURL, apiToken} from '@/constants/api.constants';

const httpClient = axios.create({
    baseURL: apiURL,
    headers: {
        // "Access-Control-Allow-Methods": "GET",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "x-auth-token, x-response-control",
        // "Content-Length": 0,
        // "Content-Type": "text/plain",
        "X-Auth-Token": apiToken,
    },
})

export default httpClient;