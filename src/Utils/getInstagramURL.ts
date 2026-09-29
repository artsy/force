const INSTAGRAM_BASE_URL = "https://www.instagram.com"

// Instagram handles are letters, numbers, periods and underscores. A leading
// `@` is never part of one, so stripping it is lossless. Anything else that
// doesn't match — a pasted profile URL, a `user/tagged` path — is rejected
// rather than repaired: the URL is published as `sameAs`, which asserts to
// search engines that this artist *is* that profile, so emitting nothing is
// better than emitting the wrong one.
const INSTAGRAM_HANDLE = /^[a-zA-Z0-9._]+$/

export const getInstagramHandle = (
  handle: string | null | undefined,
): string | null => {
  const normalized = handle?.trim().replace(/^@/, "")

  if (!normalized || !INSTAGRAM_HANDLE.test(normalized)) {
    return null
  }

  return normalized
}

export const getInstagramURL = (
  handle: string | null | undefined,
): string | null => {
  const normalized = getInstagramHandle(handle)

  if (!normalized) {
    return null
  }

  return `${INSTAGRAM_BASE_URL}/${normalized}`
}
