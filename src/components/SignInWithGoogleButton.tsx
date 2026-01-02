export default function SignInWithGoogleButton() {
  const handleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  return <button onClick={handleSignIn}>Login</button>
}
