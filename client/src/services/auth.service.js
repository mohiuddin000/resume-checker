import api from "../api/axios.js";

const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = (data) =>
    handleRequest(() => api.post("/auth/login", data));

export const register = (data) =>
    handleRequest(() => api.post("/auth/register", data));

export const logout = () => handleRequest(() => api.post("/auth/logout"));

export const getProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
};

export const resetPassword = async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
        password,
    });
    return response.data;
};

export const verifyEmail = async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
};

export const resendVerificationEmail = async () => {
    const response = await api.post("/auth/resend-verification-email");
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.post("/auth/change-password", data);
    return response.data;
};
