import axios, { AxiosRequestConfig, Method } from "axios";
import { useState } from "react";
import { errorMessage, successMessage } from "../Utils/commonFunctions";

interface UseFetchProps {
  url: string;
  method?: Method;
  body?: any;
}

const useFetch = ({ url, method = 'GET', body }: UseFetchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      method,
      url,
      data: body,
    };

    try {
      const response = await axios(config);
      successMessage("Operation successful");
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        errorMessage(error.message);
      } else {
        errorMessage("An error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
