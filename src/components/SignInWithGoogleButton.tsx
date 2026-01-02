import { useGetMeQuery } from '../store'
import Button from './common/Button'
import { IconBrandGoogleFilled } from '@tabler/icons-react'

export default function SignInWithGoogleButton() {
  const { data } = useGetMeQuery()

  const handleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  const handleSignOut = () => {}

  const signInButton = (
    <Button
      onClick={handleSignIn}
      className='flex gap-2 items-center justify-center font-semibold'
    >
      <IconBrandGoogleFilled width={35} /> Continuar con Google
    </Button>
  )

  const signOutButton = (
    <Button onClick={handleSignOut} className='font-semibold'>
      Cerrar sesión
    </Button>
  )

  return data ? signOutButton : signInButton
}
