import { apiSlice } from "./api";

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      providesTags: ["refetchMyProfile"],
      query: () => `/users/me`,
    }),

    updateMyProfile: builder.mutation({
      invalidatesTags: ["refetchMyProfile"],
      query: ({ payload }) => ({
        url: `/users/me`,
        method: "PUT",
        body: payload,
      }),
    }),

    getUsers: builder.query({
      providesTags: ["getUsers"],
      query: ({ page = 1, limit = 50, role, haveDevices = false }) =>
        `/users?page=${page}&limit=${limit}${role ? `&role=${role}` : ""}${
          haveDevices ? `&haveDevices=${haveDevices}` : ""
        }`,
    }),

    getUserById: builder.query({
      query: (id: string) => `/users/${id}`,
    }),

    createUser: builder.mutation({
      invalidatesTags: ["getUsers"],
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),

    updateUser: builder.mutation({
      invalidatesTags: ["getUsers"],
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteUser: builder.mutation({
      invalidatesTags: ["getUsers"],
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),

    uploadProfilePicture: builder.mutation({
      invalidatesTags: ["getUsers"],
      query: (formData: FormData) => ({
        url: `/users/upload-profile`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadProfilePictureMutation,
} = userService;
