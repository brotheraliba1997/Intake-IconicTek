import { apiSlice } from "./api";

export const formService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyForm: builder.query({
      providesTags: ["refetchMyForms"],
      query: () => `/form/`,
    }),

    updateMyForm: builder.mutation({
      invalidatesTags: ["refetchMyForms"],
      query: ({ payload }) => ({
        url: `/form/me`,
        method: "PUT",
        body: payload,
      }),
    }),

    getform: builder.query({
      providesTags: ["getForms"],
      query: ({ page = 1, limit }) => `/form?page=${page}&limit=${limit}`,
    }),

    getFormById: builder.query({
      providesTags: ["getForms"],
      query: (id: string) => `/form/${id}`,
    }),

    createForm: builder.mutation({
      invalidatesTags: ["getForms"],
      query: (payload) => ({
        url: "/form",
        method: "POST",
        body: payload,
      }),
    }),

    updateForm: builder.mutation({
      invalidatesTags: ["getForms"],
      query: ({ id, payload }) => ({
        url: `/form/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteForm: builder.mutation({
      invalidatesTags: ["getForms"],
      query: (id: string) => ({
        url: `/form/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyFormQuery,
  useUpdateMyFormMutation,
  useGetformQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
} = formService;
