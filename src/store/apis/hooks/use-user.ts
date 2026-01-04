import { useGetMeQuery } from '../user-api'

export const useUser = () => {
  const { isSuccess, data, isFetching, isLoading, isError } = useGetMeQuery()

  return {
    user: isSuccess ? data : undefined,
    isFetching,
    isLoading,
    isError
  }
}
