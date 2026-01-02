import { useGetMeQuery } from '../store'

export default function HomePage() {
  const { data } = useGetMeQuery()

  return <div>{data && `Bienvenido/a ${data.username}`}</div>
}
