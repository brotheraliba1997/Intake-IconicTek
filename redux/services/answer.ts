import { apiSlice } from "./api";

export const answersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAnswers: builder.query({
      providesTags: ["refetchMyAnswers"],
      query: () => `/Answers/me`,
    }),

    updateMyAnswers: builder.mutation({
      invalidatesTags: ["refetchMyAnswers"],
      query: ({ payload }) => ({
        url: `/Answers/me`,
        method: "PUT",
        body: payload,
      }),
    }),

    getAnswers: builder.query({
      providesTags: ["getAnswers"],
      query: ({ page = 1, limit }) => `/Answers?page=${page}&limit=${limit}`,
    }),

    getAnswersById: builder.query({
      providesTags: ["getAnswers"],
      query: (id: string) => `/Answers/${id}`,
    }),

    createAnswers: builder.mutation({
      invalidatesTags: ["getAnswers"],
      query: (payload) => ({
        url: "/answer",
        method: "POST",
        body: payload,
      }),
    }),

    updateAnswers: builder.mutation({
      invalidatesTags: ["getAnswers"],
      query: ({ id, payload }) => ({
        url: `/Answers/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteAnswers: builder.mutation({
      invalidatesTags: ["getAnswers"],
      query: (id: string) => ({
        url: `/Answers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyAnswersQuery,
  useUpdateMyAnswersMutation,
  useGetAnswersQuery,
  useGetAnswersByIdQuery,
  useCreateAnswersMutation,
  useUpdateAnswersMutation,
  useDeleteAnswersMutation,
} = answersService;
