import { useTranslation } from 'react-i18next'
import { useLogoutMutation } from '../store'
import { useUser } from '../store/apis/hooks/use-user'
import { Button } from '@mantine/core'
import { IconBrandGoogleFilled } from '@tabler/icons-react'

export default function SignInWithGoogleButton() {
  const { t } = useTranslation()
  const { user, isFetching } = useUser()
  const [logout, logoutResults] = useLogoutMutation()

  const handleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  const handleSignOut = async () => {
    await logout()
    window.location.reload()
  }

  if (isFetching) return null

  if (user) {
    return (
      <Button onClick={handleSignOut} disabled={logoutResults.isLoading} radius="xl">
        {t('sign-out')}
      </Button>
    )
  }

  return (
    <Button onClick={handleSignIn} radius="xl" leftSection={<IconBrandGoogleFilled size={20} />}>
      {t('sign-in-with-google')}
    </Button>
  )
}
