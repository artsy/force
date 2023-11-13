export const isArtsyEmail = (email: string | null | undefined): boolean => {
  if (!email) {
    return false
  }

  return /@artsymail.com$/.test(email)
}
