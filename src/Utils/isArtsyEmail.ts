export const isArtsyEmail = (email: string | null | undefined): boolean => {
  return !!email && /@artsymail.com$/.test(email)
}
