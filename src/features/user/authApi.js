import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../config/constants/host';
import { setUser } from './userSlice';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'signup',
          method: "POST",
          body: data
        }
      }
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setUser(data?.user));
        } catch (error) { }
      },
    }),

  })
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi