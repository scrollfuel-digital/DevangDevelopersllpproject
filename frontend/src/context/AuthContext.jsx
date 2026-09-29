import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { loginAdmin, checkSessionApi, logoutAdmin } from "../api/authApi";
import { setAxiosAuthToken } from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clear any legacy storage keys on startup and perform cookie/session check
  useEffect(() => {
    try {
      const keysToClean = [
        "token",
        "devang_auth_token_v1",
        "admin_token",
        "admin_session",
        "devang_admin_blogs",
        "devang_admin_inquiries",
        "devang_admin_users_v1",
        "user",
      ];
      keysToClean.forEach((k) => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
      });
    } catch (e) {
      // Ignore storage errors
    }

    const restoreSession = async () => {
      setAuthLoading(true);
      try {
        const res = await checkSessionApi();
        if (res && (res.user || res.email)) {
          const userData = res.user || {
            id: res.id || "admin-user",
            name: res.name || "Devang Administrator",
            email: res.email,
            role: res.role || "Administrator",
          };
          setUser(userData);
          setIsAuthenticated(true);
          if (res.token) {
            setToken(res.token);
            setAxiosAuthToken(res.token);
          }
        }
      } catch (err) {
        // Unauthenticated or backend doesn't support session cookies yet
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (email, password, turnstileToken) => {
    setError(null);
    try {
      const res = await loginAdmin(email, password, turnstileToken);
      const jwtToken =
        res?.token ||
        res?.jwtToken ||
        res?.accessToken ||
        res?.jwt ||
        res?.data?.token;

      const userData = {
        id: res?.user?.id || "admin-user",
        name: res?.user?.name || "Devang Administrator",
        email: res?.user?.email || email,
        role: res?.user?.role || "Administrator",
      };

      // Store ONLY in React memory (No localStorage / sessionStorage)
      if (jwtToken) {
        setToken(jwtToken);
        setAxiosAuthToken(jwtToken);
      }
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData, token: jwtToken };
    } catch (err) {
      const msg = err?.message || err?.error || "Invalid credentials or login failure.";
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch (e) {}
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    setAxiosAuthToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    authLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

