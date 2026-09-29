import { useAdminData } from "../context/AdminDataContext";

export const useAdminInquiries = () => {
  const {
    inquiries,
    inquiriesLoading,
    inquiriesError,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
  } = useAdminData();

  return {
    inquiries,
    loading: inquiriesLoading,
    error: inquiriesError,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
  };
};

export default useAdminInquiries;
