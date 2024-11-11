import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, {
  AxiosResponse,
} from "axios";

const baseQueryWithAxios: BaseQueryFn<
  { url: string; method: string; body?: any; baseUrl: string; queryParams?: Record<string, any> },
  unknown,
  { error: string | unknown }
> = async (args, api, extraOptions) => {
  const { url, method, body, baseUrl, queryParams } = args;

  let requestUrl = baseUrl + url;
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString();
    requestUrl = `${requestUrl}?${queryString}`;
  }

  console.log(requestUrl);
  

  try {
    const response: AxiosResponse = await axios.request({
      url: requestUrl,
      method: method,
      data: body,
    });

    return { data: response.data }; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.message || error.message || "Terjadi kesalahan",
      };
    } else {
      return { error: "Terjadi kesalahan" };
    }
  }
};

export default baseQueryWithAxios;