import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'
import type { Generation } from '../types/generation'
import type { PaginationParams } from '../types/paginated-request-params'
import type { PaginatedResponse } from '../types/paginated-response'
import type { CreateGenerationParams } from '../types/create-generation-params'

const tagTypes = ['GET_GENERATIONS'] as const

export const generationsApi = createApi({
  reducerPath: 'generations',
  baseQuery: baseQueryWithReauth,
  tagTypes,
  endpoints(builder) {
    return {
      getGenerations: builder.infiniteQuery<PaginatedResponse<Generation>, void, PaginationParams>({
        infiniteQueryOptions: {
          initialPageParam: { page: 1, pageSize: 10 },
          getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPageParam.page < lastPage.totalPages
              ? {
                  ...lastPageParam,
                  page: lastPageParam.page + 1,
                }
              : undefined,
        },
        query: ({ pageParam }) => ({
          url: '/generations',
          method: 'GET',
          params: pageParam,
        }),
        providesTags: ['GET_GENERATIONS'],
      }),
      createGeneration: builder.mutation<void, CreateGenerationParams>({
        query: ({ file, speaker, language }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('speaker', speaker)
          formData.append('language', language)

          return {
            url: '/generations',
            method: 'POST',
            body: formData,
          }
        },
        invalidatesTags: ['GET_GENERATIONS'],
      }),
    }
  },
})

export const { useGetGenerationsInfiniteQuery, useCreateGenerationMutation } = generationsApi
