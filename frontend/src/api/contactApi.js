import axiosClient from "./axiosClient";

/**
 * 7. Submit Contact / Enquiry Request
 * POST /contact/connect-request
 * Body: { name, email, phoneNo, message, formType, turnstileToken }
 */
export const submitContactRequest = async (payload, options = {}) => {
  const response = await axiosClient.post(
    "/contact/connect-request",
    {
      name: payload.name || payload.fullName,
      email: payload.email,
      phoneNo: payload.phoneNo || payload.phone || payload.mobile,
      message: payload.message || payload.comments,
      formType: payload.formType || "CONTACT",
      turnstileToken: payload.turnstileToken || "0.default_token",
    },
    options
  );

  return response.data;
};

/**
 * 8. Get Available Contacts (Paginated)
 * GET /contact/available-contacts?pageNo=0&size=10&sortBy=createdAt&sortDir=desc
 */
export const getAvailableContacts = async (
  pageNo = 0,
  size = 10,
  sortBy = "createdAt",
  sortDir = "desc",
  options = {}
) => {
  const response = await axiosClient.get("/contact/available-contacts", {
    ...options,
    params: {
      pageNo,
      size,
      sortBy,
      sortDir,
      ...options.params,
    },
  });

  return response.data;
};

/**
 * 9. Get Single Contact by ID
 * GET /contact/exist-contact/{id}
 */
export const getContactById = async (id, options = {}) => {
  const response = await axiosClient.get(`/contact/exist-contact/${id}`, options);
  return response.data;
};

/**
 * 10. Mark Contact as Seen
 * PATCH /contact/seen-contact/{id}
 */
export const markContactAsSeen = async (id, options = {}) => {
  const response = await axiosClient.patch(`/contact/seen-contact/${id}`, options);
  return response.data;
};

/**
 * 11. Delete Contact by ID
 * DELETE /contact/remove-contact/{id}
 */
export const deleteContact = async (id, options = {}) => {
  const response = await axiosClient.delete(`/contact/remove-contact/${id}`, options);
  return response.data;
};

/**
 * 12. Search Contacts by Keyword
 * GET /contact/search-response/{keyword}
 */
export const searchContacts = async (keyword, options = {}) => {
  const response = await axiosClient.get(`/contact/search-response/${encodeURIComponent(keyword)}`, options);
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