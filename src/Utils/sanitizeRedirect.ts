import { parse } from "url"

const REDIRECT_FALLBACK = "/"

const ALLOWLIST_HOSTS = ["internal", "localhost", "artsy.net"]

const ALLOWLIST_PROTOCOLS = ["http:", "https:", null]

const bareHost = (hostname: string | null) => {
  if (hostname == null) return "internal"

  const hostParts = hostname.split(".")

  return hostParts.slice(hostParts.length - 2).join(".")
}

const normalizeAddress = (address: string) => {
  return (
    address
      // Corrects number of slashes
      .replace(/^http:\/+/, "http://")
      .replace(/^https:\/+/, "https://")
      // Strip whitespace
      .replace(/\s/g, "")
  )
}

const safeAddress = (address: string) => {
  const parsed = parse(normalizeAddress(address), false, true)

  return (
    ALLOWLIST_PROTOCOLS.includes(parsed.protocol) &&
    ALLOWLIST_HOSTS.includes(bareHost(parsed.hostname))
  )
}

/**
 * Extracted from unmaintained passport directory
 */
export const sanitizeRedirect = (address?: string) => {
  if (!address) return REDIRECT_FALLBACK

  return safeAddress(address) ? address : REDIRECT_FALLBACK
}
