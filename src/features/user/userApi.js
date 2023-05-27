import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../config/constants/host';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
        headers,
        credentials:'include'
      }),
      providesTags: ['User'],

    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        headers,
        credentials:'include'
      })
    }),
    deleteUser: builder.mutation({

      query: (ids) => {
        return {
          url: `/users/delete`,
          headers,
          method: 'DELETE',
          credentials:'include',
          body: { selectedIds: ids }
        }
      },
     
      invalidatesTags: ['User'],
    }),
    changeUserStatus: builder.mutation({
      query(args) {
        return {
          url: `/users/status_change`,
          method: 'PUT',
          headers,
          body: args,
          credentials:'include'
        }
      },
      
      invalidatesTags: ['User'],
    }),

  })
})
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation
} = userApi