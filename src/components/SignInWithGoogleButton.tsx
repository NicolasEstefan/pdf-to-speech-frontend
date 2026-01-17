import { useLogoutMutation } from '../store'
import { useUser } from '../store/apis/hooks/use-user'
import Button from './common/Button'
import { IconBrandGoogleFilled } from '@tabler/icons-react'

export default function SignInWithGoogleButton() {
  const { user, isFetching } = useUser()
  const [logout, logoutResults] = useLogoutMutation()

  const handleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  const handleSignOut = async () => {
    await logout()
    window.location.reload()
  }

  if (isFetching) {
    return
  }

  const signInButton = (
    <Button onClick={handleSignIn} className="flex items-center justify-center gap-2 font-semibold">
      <IconBrandGoogleFilled width={35} /> Continuar con Google
    </Button>
  )

  const signOutButton = (
    <Button onClick={handleSignOut} disabled={logoutResults.isLoading} className="font-semibold">
      Cerrar sesión
    </Button>
  )

  return user ? signOutButton : signInButton
}
