import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAxios from "./baseQueryWithAxios";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAxios,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        baseUrl: "https://simpel-login.vercel.app/api",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
