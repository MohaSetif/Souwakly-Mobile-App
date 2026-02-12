const LOCAL_IP = "172.17.194.71";
const PORT = "8000";

const getBaseUrl = () => {
    if (__DEV__) {
        return `http://${LOCAL_IP}:${PORT}/api`;
    }

    // Production URL
    return "https://your-production-domain.com/api";
};

export const API_BASE_URL = getBaseUrl();
