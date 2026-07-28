import { createContext, useContext, useEffect, useState } from "react";
import {
    getProfile,
    login as loginService,
    logout as logoutService,
} from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        setLoading(true);

        try {
            const response = await getProfile();

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProfile();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginService(credentials);

            await refreshProfile();

            return response;
        } catch (error) {
            throw error.response?.data?.message || "Something went wrong.";
        }
    };

    const logout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContext;
