import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'

interface User {
  id: string
  username: string
}

export const userApiTags = ['GET_ME'] as const
export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: baseQueryWithReauth,
  tagTypes: userApiTags,
  endpoints(builder) {
    return {
      getMe: builder.query<User, void>({
        providesTags: ['GET_ME'],
        query: () => {
          return {
            url: '/users/me',
            method: 'GET'
          }
        }
      })
    }
  }
})

export const { useGetMeQuery } = userApi
