import axios from "axios";

const api = axios.create({
    baseURL: "https://bluestarbackend.vercel.app/api/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw new Error("Refresh token không tồn tại");

                const res = await axios.post("https://bluestarbackend.vercel.app/api/api/auth/refresh", {
                    refresh_token: refreshToken,
                });

                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);

                originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Lỗi khi refresh token:", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
