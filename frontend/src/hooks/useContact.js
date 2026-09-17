
import "../utils/recoilPolyfill";
import { useRecoilState } from "recoil";

import {
  contactSubmittingState,
  contactSuccessState,
  contactErrorState,
  contactResponseState,
} from "../atoms/contactAtom";

import { submitContactRequest } from "../api/contactApi";

const parseBackendError = (err) => {
  if (!err?.response) {
    return {
      type: "NETWORK_ERROR",
      message:
        "Unable to submit your request right now. Please try again.",
      fieldErrors: {},
    };
  }

  const { status, data } = err.response;

  if (status === 400) {
    if (
      data?.message &&
      typeof data.message === "string" &&
      (data.message.toLowerCase().includes("captcha") ||
        data.message.toLowerCase().includes("turnstile"))
    ) {
      return {
        type: "CAPTCHA_ERROR",
        message:
          data.message ||
          "Captcha verification failed. Please try again.",
        fieldErrors: {},
      };
    }

    if (
      data &&
      typeof data === "object" &&
      !data.message
    ) {
      return {
        type: "VALIDATION_ERROR",
        message: "Please correct the highlighted fields.",
        fieldErrors: data,
      };
    }

    if (data?.message) {
      return {
        type: "VALIDATION_ERROR",
        message: data.message,
        fieldErrors:
          typeof data.errors === "object"
            ? data.errors
            : {},
      };
    }
  }

  if (status === 500) {
    return {
      type: "SERVER_ERROR",
      message:
        "Unable to process your request at this moment. Please try again shortly.",
      fieldErrors: {},
    };
  }

  return {
    type: "SERVER_ERROR",
    message:
      "Unable to submit your request right now. Please try again.",
    fieldErrors: {},
  };
};

export const useContact = (formKey = "CONTACT") => {
  const [submitting, setSubmitting] = useRecoilState(
    contactSubmittingState(formKey)
  );

  const [success, setSuccess] = useRecoilState(
    contactSuccessState(formKey)
  );

  const [error, setError] = useRecoilState(
    contactErrorState(formKey)
  );

  const [response, setResponse] = useRecoilState(
    contactResponseState(formKey)
  );

  const resetContactState = () => {
    setSubmitting(false);
    setSuccess(false);
    setError(null);
    setResponse(null);
  };

  const submitContact = async (payload) => {
    if (submitting) {
      return {
        success: false,
        error: null,
      };
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await submitContactRequest(payload);

      setResponse(data);
      setSuccess(true);

      return {
        success: true,
        data,
      };
    } catch (err) {
      const formattedError = parseBackendError(err);

      setError(formattedError);
      setSuccess(false);

      return {
        success: false,
        error: formattedError,
      };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitContact,
    submitting,
    success,
    error,
    response,
    resetContactState,
    formKey,
  };
};

export default useContact;
