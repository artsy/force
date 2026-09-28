const INSTAGRAM_BASE_URL = "https://www.instagram.com"

export const getInstagramURL = (
  handle: string | null | undefined,
): string | null => {
  const trimmed = handle?.trim()

  if (!trimmed) {
    return null
  }

  return `${INSTAGRAM_BASE_URL}/${trimmed}`
}
