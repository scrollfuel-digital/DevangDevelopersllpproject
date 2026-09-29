import axiosClient from "./axiosClient";

export const submitContactRequest = async (
  payload,
  options = {}
) => {
  const response = await axiosClient.post(
    "/contact/connect-request",
    {
      name:
        payload.name ||
        payload.fullName,

      email:
        payload.email,

      phoneNo:
        payload.phoneNo,

      message:
        payload.message ||
        payload.comments,

      formType:
        payload.formType ||
        "CONTACT",

      turnstileToken:
        payload.turnstileToken,
    },
    options
  );

  return response.data;
};

export const getAvailableContacts = async (
  pageNo = 0,
  size = 10,
  sortBy = "createdAt",
  sortDir = "desc",
  options = {}
) => {
  const response =
    await axiosClient.get(
      "/contact/available-contacts",
      {
        ...options,

        params: {
          pageNo,
          size,
          sortBy,
          sortDir,
          ...options.params,
        },
      }
    );

  return response.data;
};

export const getContactById = async (
  id,
  options = {}
) => {
  const response =
    await axiosClient.get(
      `/contact/exist-contact/${id}`,
      options
    );

  return response.data;
};

export const markContactAsSeen = async (
  id,
  options = {}
) => {
  const response =
    await axiosClient.patch(
      `/contact/seen-contact/${id}`,
      options
    );

  return response.data;
};

/**
 * DELETE /contact/remove-contact/{id}
 */
export const deleteContact = async (
  id,
  options = {}
) => {
  const response =
    await axiosClient.delete(
      `/contact/remove-contact/${id}`,
      options
    );

  return response.data;
};

/**
 * GET /contact/search-response/{keyword}
 */
export const searchContacts = async (
  keyword,
  options = {}
) => {
  const response =
    await axiosClient.get(
      `/contact/search-response/${encodeURIComponent(
        keyword
      )}`,
      options
    );

  return response.data;
};

export default {
  submitContactRequest,
  getAvailableContacts,
  getContactById,
  markContactAsSeen,
  deleteContact,
  searchContacts,
};