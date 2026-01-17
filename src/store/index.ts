import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './apis/user-api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { generationsApi } from './apis/genereations-api'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [generationsApi.reducerPath]: generationsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(generationsApi.middleware)
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { useGetMeQuery, useLogoutMutation } from './apis/user-api'
export { useGetGenerationsQuery } from './apis/genereations-api'
