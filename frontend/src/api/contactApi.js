import axiosClient from "./axiosClient";

export const submitContactRequest = async (payload) => {
    const response = await axiosClient.post(
        "/contact/connect-request",
        payload
    );

    return response.data;
};

export default {
    submitContactRequest,
};