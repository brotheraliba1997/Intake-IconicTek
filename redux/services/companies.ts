import { apiSlice } from "./api";

export const companyService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCompany: builder.query({
      providesTags: ["refetchMyCompany"],
      query: () => `/companies/me`,
    }),

    updateMyCompany: builder.mutation({
      invalidatesTags: ["refetchMyCompany"],
      query: ({ payload }) => ({
        url: `/companies/me`,
        method: "PUT",
        body: payload,
      }),
    }),

    getCompanies: builder.query({
      providesTags: ["getCompanies"],
      query: ({ page = 1, limit }) => `/companies?page=${page}&limit=${limit}`,
    }),

    getCompanyById: builder.query({
      providesTags: ["getCompanies"],
      query: (id: string) => `/companies/${id}`,
    }),

    createCompany: builder.mutation({
      invalidatesTags: ["getCompanies"],
      query: (payload) => ({
        url: "/companies",
        method: "POST",
        body: payload,
      }),
    }),

    updateCompany: builder.mutation({
      invalidatesTags: ["getCompanies"],
      query: ({ id, payload }) => ({
        url: `/companies/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteCompany: builder.mutation({
      invalidatesTags: ["getCompanies"],
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyCompanyQuery,
  useUpdateMyCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyService;
