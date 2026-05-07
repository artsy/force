import { API_URL, CLIENT_ID, CLIENT_SECRET } from "Server/config"
import { type GravityError, requestGravity } from "./http"

export type RefreshResult =
  | { ok: true; accessToken: string }
  | { ok: false; reason: "invalid" | "transient" }

export const decodeJwtExp = (token: string): number | null => {
  const parts = token.split(".")
  if (parts.length !== 3) return null

  try {
    const padded = parts[1] + "=".repeat((4 - (parts[1].length % 4)) % 4)
    const base64 = padded.replace(/-/g, "+").replace(/_/g, "/")
    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf8"))
    return typeof payload?.exp === "number" ? payload.exp : null
  } catch {
    return null
  }
}

export const shouldRefresh = (
  token: string,
  nowSeconds: number,
  thresholdSeconds: number,
): boolean => {
  const exp = decodeJwtExp(token)
  if (exp === null) return false
  return exp > nowSeconds && exp - nowSeconds < thresholdSeconds
}

const isInvalidStatus = (status: number | undefined): boolean =>
  status === 401 || status === 403

const reasonFromError = (err: GravityError): "invalid" | "transient" =>
  isInvalidStatus(err?.response?.status) ? "invalid" : "transient"

export const refreshAccessToken = async (
  currentToken: string,
  forwardedFor: string,
): Promise<RefreshResult> => {
  let trustToken: string
  try {
    const trustRes = await requestGravity({
      headers: {
        "X-Access-Token": currentToken,
        "X-Forwarded-For": forwardedFor,
      },
      method: "POST",
      url: `${API_URL}/api/v1/me/trust_token`,
    })
    trustToken = trustRes.body?.trust_token
    if (!trustToken) return { ok: false, reason: "transient" }
  } catch (err) {
    return { ok: false, reason: reasonFromError(err as GravityError) }
  }

  try {
    const tokenRes = await requestGravity({
      body: {
        grant_type: "trust_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: trustToken,
      },
      headers: { "X-Forwarded-For": forwardedFor },
      method: "POST",
      url: `${API_URL}/oauth2/access_token`,
    })
    const accessToken = tokenRes.body?.access_token
    if (!accessToken) return { ok: false, reason: "transient" }
    return { ok: true, accessToken }
  } catch (err) {
    return { ok: false, reason: reasonFromError(err as GravityError) }
  }
}
