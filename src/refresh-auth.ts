export const refreshAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )
    return response.status === 200
  } catch {
    return false
  }
}
