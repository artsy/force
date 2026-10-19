const REDIRECT_FALLBACK = "/"

const ALLOWLIST_HOSTS = ["localhost", "artsy.net"]

const ALLOWLIST_PROTOCOLS = ["http:", "https:"]

// Placeholder origin used only to resolve relative addresses during parsing.
// It is never returned, so it does not need to be a real host.
const RELATIVE_BASE = "https://sanitize-redirect.invalid"

const bareHost = (hostname: string) => {
  const hostParts = hostname.split(".")

  return hostParts.slice(hostParts.length - 2).join(".")
}

/**
 * Parses an address the same way a browser would (WHATWG URL parser).
 * Absolute addresses are parsed without a base so that scheme-only forms
 * like `http:example.com` resolve to their external host rather than being
 * treated as relative. Returns `null` when the address can't be parsed.
 */
const parseAddress = (address: string): URL | null => {
  try {
    return new URL(address)
  } catch {
    // Not an absolute URL; fall through and resolve it as a relative one
  }

  try {
    return new URL(address, RELATIVE_BASE)
  } catch {
    return null
  }
}

const safeAddress = (address: string) => {
  const parsed = parseAddress(address)

  // Anything we can't confidently resolve is unsafe
  if (!parsed) return false

  if (!ALLOWLIST_PROTOCOLS.includes(parsed.protocol)) return false

  if (parsed.origin === RELATIVE_BASE) return true

  return ALLOWLIST_HOSTS.includes(bareHost(parsed.hostname))
}

/**
 * Extracted from unmaintained passport directory
 */
export const sanitizeRedirect = (address?: string) => {
  if (!address) return REDIRECT_FALLBACK

  return safeAddress(address) ? address : REDIRECT_FALLBACK
}
