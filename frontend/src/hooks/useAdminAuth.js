import "../utils/recoilPolyfill";
import { useRecoilState } from "recoil";
import { adminAuthState } from "../atoms/adminAtom";
import adminService from "../services/adminService";

export const useAdminAuth = () => {
  const [auth, setAuth] = useRecoilState(adminAuthState);

  const login = async (email, password, turnstileToken) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await adminService.login(email, password, turnstileToken);
      const storedToken = sessionStorage.getItem("admin_token") || res.token;

      if (res.success) {
        if (!storedToken || typeof storedToken !== "string" || !storedToken.trim()) {
          const tokenErr = "Authentication token was not received. Please try again.";
          setAuth((prev) => ({
            ...prev,
            loading: false,
            isAuthenticated: false,
            user: null,
            token: null,
            error: tokenErr,
          }));
          return { success: false, message: tokenErr };
        }

        setAuth({
          user: res.user,
          token: storedToken,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
        return { success: true, user: res.user, token: storedToken };
      } else {
        const errMsg = res.message || "Authentication failed.";
        setAuth((prev) => ({
          ...prev,
          loading: false,
          isAuthenticated: false,
          user: null,
          token: null,
          error: errMsg,
        }));
        return { success: false, message: errMsg };
      }
    } catch (err) {
      const msg = err?.message || "Login attempt failed.";
      setAuth((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: msg,
      }));
      return { success: false, message: msg };
    }
  };

  const signup = async (userData) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await adminService.signup(userData);
      if (res.success) {
        setAuth((prev) => ({
          ...prev,
          loading: false,
          error: null,
        }));
        return {
          success: true,
          message: res.message || "Registration successful. Please login with your credentials.",
        };
      } else {
        setAuth((prev) => ({
          ...prev,
          loading: false,
          error: res.message || "Registration failed.",
        }));
        return { success: false, message: res.message };
      }
    } catch (err) {
      const msg = err?.message || "Signup attempt failed.";
      setAuth((prev) => ({ ...prev, loading: false, error: msg }));
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    adminService.logout();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    login,
    signup,
    logout,
  };
};

export default useAdminAuth;
