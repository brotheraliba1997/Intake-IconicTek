import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/todos"}),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (id) => `user/${id}`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "post",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useFetchUserQuery, useCreateUserMutation } = apiSlice;