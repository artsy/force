const MAX_ATTEMPTS = 20 // 20 * 100ms = 2s total
const INTERVAL_MS = 100

type BrazeAttributeValue = string | string[]

/**
 * Writes custom attributes straight to the Braze Web SDK, bypassing Segment's
 * identify pipeline — Artsy's Braze destination config drops non-reserved
 * identify traits, so they never land as custom attributes. Braze batches
 * attribute writes, so we flush immediately in case the user navigates away.
 */
export const setBrazeCustomAttributes = (
  attributes: Record<string, BrazeAttributeValue>,
) => {
  const entries = Object.entries(attributes).filter(([, value]) => {
    return Array.isArray(value) ? value.length > 0 : !!value
  })

  if (entries.length === 0) {
    return
  }

  let attempt = 0

  const trySet = () => {
    const braze = window.braze
    const brazeUser = braze?.getUser()

    if (braze && brazeUser) {
      entries.forEach(([key, value]) => {
        brazeUser.setCustomUserAttribute(key, value)
      })
      braze.requestImmediateDataFlush()
      return
    }

    attempt += 1
    if (attempt < MAX_ATTEMPTS) {
      setTimeout(trySet, INTERVAL_MS)
    }
  }

  trySet()
}
