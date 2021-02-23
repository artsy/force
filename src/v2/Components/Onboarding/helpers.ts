export const fallbackRedirectTo = "/"

export const computeRedirectTo = (cookies, bootstrapData): string => {
  const cookieDestination = cookies.get("destination")
  const bootstrapRedirectTo = bootstrapData.redirectTo

  if (cookieDestination) {
    cookies.expire("destination")
    return cookieDestination
  }

  return bootstrapRedirectTo || fallbackRedirectTo
}
