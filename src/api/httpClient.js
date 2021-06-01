import axios from "axios";
import {apiURL, apiToken} from '@/constants/api.constants';

const httpClient = axios.create({
    baseURL: apiURL,
    headers: {
        "X-Auth-Token": apiToken,
    }
})

export default httpClient;