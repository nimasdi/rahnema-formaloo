import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";
import { errorMessage, successMessage } from "../Utils/commonFunctions";

interface UseFetchProps {
  url: string;
  method?: Method; // Added method parameter
  body?: any; // Optional body for POST, PUT requests
}

const useFetch = ({ url, method = 'GET', body }: UseFetchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const config: AxiosRequestConfig = {
        method,
        url,
        data: body,
      };

      try {
        const response = await axios(config);
        successMessage("عملیات با موفقیت انجام شد");
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          errorMessage(error.message);
        } else {
          errorMessage("خطایی رخ داده است!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};

export default useFetch;
