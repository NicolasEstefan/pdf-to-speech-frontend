import { Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../store'

export default function Layout() {
  const { isFetching, isError, data } = useGetMeQuery()

  console.log(isFetching)
  console.log(isError)
  console.log(data)

  return (
    <div>
      {data && `${data.id} ${data.username}`}
      <Outlet />
    </div>
  )
}
