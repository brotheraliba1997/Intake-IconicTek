import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { HYDRATE } from "next-redux-wrapper";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  console.log("sess=>", session?.user);
  if (session?.user?.accessToken) {
    headers.set("Authorization", `Bearer ${session.user.accessToken}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,

  prepareHeaders: (headers, { getState }: any) => {
    return addTokenToRequest(headers, { getState });
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    
  } else if (result?.error?.status === 401) {
    
  } else {
    
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action: any, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    "getCompanies",
    "getForms",
    "refetchMyForms",
    "getAnswers",
    "refetchMyAnswers",
    "refetchMyCompany",
    "refetchMyProfile",
    "getUsers",
  ], 
  endpoints: (builder) => ({}),
});
