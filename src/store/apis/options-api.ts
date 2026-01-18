import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'
import type { Options } from '../types/options'

export const optionsApi = createApi({
  reducerPath: 'options',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getOptions: builder.query<Options, void>({
        query: () => ({
          url: '/options',
          method: 'GET',
        }),
      }),
    }
  },
})

export const { useGetOptionsQuery } = optionsApi
