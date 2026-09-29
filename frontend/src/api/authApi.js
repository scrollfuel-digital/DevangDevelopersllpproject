import axiosClient from "./axiosClient";

export const loginAdmin = async (email, password, turnstileToken = "0.default_token") => {
  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
      turnstileToken,
    });

    const token =
      response.data?.token ||
      response.data?.jwtToken ||
      response.data?.accessToken ||
      response.data?.jwt ||
      response.data?.data?.token;

    return {
      ...response.data,
      success: response.data?.success !== undefined ? response.data.success : true,
      token,
    };
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || "Network error while connecting to authorization server",
    };
  }
};

export const checkSessionApi = async () => {
  try {
    const response = await axiosClient.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};


export const logoutAdmin = async () => {
  try {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    // If backend doesn't have logout endpoint, silently ignore
    return { success: true };
  }
};

export default {
  loginAdmin,
  checkSessionApi,
  logoutAdmin,
};

