const LOCAL_IP = "172.17.193.33";
const PORT = "8000";

const getBaseServerUrl = () => {
    if (__DEV__) {
        return `http://${LOCAL_IP}:${PORT}`;
    }
    return "https://your-production-domain.com";
};

export const BASE_SERVER_URL = getBaseServerUrl();
export const API_BASE_URL = `${BASE_SERVER_URL}/api`;
export const STORAGE_URL = `${BASE_SERVER_URL}/storage`;
