import { useUser } from '../store/apis/hooks/use-user'

export default function HomePage() {
  const { user } = useUser()

  return <div>{user && `Bienvenido/a ${user.username}`}</div>
}
