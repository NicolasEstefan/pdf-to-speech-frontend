import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'
import type { Generation } from '../types/generation'
import type { PaginationParams } from '../types/paginated-request-params'
import type { PaginatedResponse } from '../types/paginated-response'

export const generationsApi = createApi({
  reducerPath: 'generations',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getGenerations: builder.query<PaginatedResponse<Generation>, PaginationParams>({
        query: (paginationParams) => ({
          url: '/generations',
          method: 'GET',
          params: paginationParams,
        }),
        serializeQueryArgs: ({ endpointName }) => endpointName,
        forceRefetch: ({ previousArg, currentArg }) => previousArg?.page !== currentArg?.page,
        merge: (cachedResponse, newResponse) => {
          cachedResponse.data.push(...newResponse.data)
          cachedResponse.totalPages = newResponse.totalPages
        },
      }),
    }
  },
})

export const { useGetGenerationsQuery } = generationsApi
