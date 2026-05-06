import request from "superagent"
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "Server/config"

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

export const refreshAccessToken = async (
  currentToken: string,
  forwardedFor: string,
): Promise<RefreshResult> => {
  let trustToken: string
  try {
    const trustRes = await request
      .post(`${API_URL}/api/v1/me/trust_token`)
      .set({
        "X-Access-Token": currentToken,
        "X-Forwarded-For": forwardedFor,
      })
    trustToken = trustRes.body?.trust_token
    if (!trustToken) return { ok: false, reason: "transient" }
  } catch (err: any) {
    return {
      ok: false,
      reason: isInvalidStatus(err?.status) ? "invalid" : "transient",
    }
  }

  try {
    const tokenRes = await request
      .post(`${API_URL}/oauth2/access_token`)
      .set({ "X-Forwarded-For": forwardedFor })
      .send({
        grant_type: "trust_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: trustToken,
      })
    const accessToken = tokenRes.body?.access_token
    if (!accessToken) return { ok: false, reason: "transient" }
    return { ok: true, accessToken }
  } catch (err: any) {
    return {
      ok: false,
      reason: isInvalidStatus(err?.status) ? "invalid" : "transient",
    }
  }
}
