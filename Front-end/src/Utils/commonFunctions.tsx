import { toast } from "react-toastify";

export const successMessage = (message: string): void => {
  toast.success(message, {
    position: "top-right",
    closeOnClick: true,
  });
};

export const errorMessage = (message: string): void => {
  toast.error(message, {
    position: "top-right",
    closeOnClick: true,
  });
};

interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
  request?: any;
  message: string;
}

interface HandleErrorResult {
  error: boolean;
  errorType?: string;
  errorBody: any;
}

export const handleError = (error: ErrorResponse): HandleErrorResult => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      error: true,
      errorType: "response",
      errorBody: error.response,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return { error: true, errorType: "request", errorBody: error.request };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { error: true, errorBody: error.message };
  }
};

interface HandleErrorResponseResult {
  error: boolean;
  errorType?: string;
  errorBody: any;
}

export const handleErrorResponse = (
  result: HandleErrorResponseResult,
  showToast = true
): boolean => {
  switch (result.errorType) {
    case "request":
      errorMessage("خطای دسترسی به اینترنت");
      break;
    case "response":
      showToast &&
        errorMessage(
          (result.errorBody && result.errorBody.data.message) || result.errorBody.data.message
        );
      break;
    default:
      errorMessage(result.errorBody);
      break;
  }
  return false;
};

export const convertEnglishNumberToPersian = (num: number): string => {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num?.toString().replace(/[0-9]/g, (w) => id[+w]);
};
