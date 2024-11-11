import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAxios from "./baseQueryWithAxios";

export interface Content {
  id: number;
  previewURL: string;
  tags: string;
  user: string;
  userImageURL: string;
}

export interface ContentsResponse {
  totalHits: number;
  hits: Content[];
}

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: baseQueryWithAxios,
  endpoints: (builder) => ({
    getContents: builder.query<
      ContentsResponse,
      { page: number; perPage: number; searchTerm: string; key?: string }
    >({
      query: ({ page, perPage, searchTerm, key }) => {
        return {
          url: "",
          method: "GET",
          baseUrl: "https://pixabay.com/api",
          queryParams: {
            page: page,
            per_page: perPage,
            q: searchTerm,
            key: key,
          },
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData, { arg }) => {
        currentCacheData.totalHits = responseData.totalHits

        if (arg.page === 1) {
          currentCacheData.hits = responseData.hits;
        } else {
          currentCacheData.hits.push(...responseData.hits);
        }
      },
      forceRefetch({ currentArg, previousArg, state, endpointState }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetContentsQuery } = contentApi;
