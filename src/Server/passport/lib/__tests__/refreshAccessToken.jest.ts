import { requestGravity } from "../http"
import {
  decodeJwtExp,
  refreshAccessToken,
  shouldRefresh,
} from "../refreshAccessToken"

jest.mock("Server/config", () => ({
  API_URL: "https://example.test",
  CLIENT_ID: "client-id",
  CLIENT_SECRET: "client-secret",
}))

jest.mock("../http")

const mockRequestGravity = requestGravity as jest.Mock

const buildJwt = (payload: object): string => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
  const body = Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
  return `${header}.${body}.signature`
}

describe("decodeJwtExp", () => {
  it("returns the exp claim from a valid JWT", () => {
    const exp = 1_700_000_000
    expect(decodeJwtExp(buildJwt({ exp }))).toBe(exp)
  })

  it("returns null when exp is missing", () => {
    expect(decodeJwtExp(buildJwt({ sub: "u-1" }))).toBeNull()
  })

  it("returns null for malformed tokens", () => {
    expect(decodeJwtExp("not.a.jwt-payload")).toBeNull()
    expect(decodeJwtExp("only-one-segment")).toBeNull()
    expect(decodeJwtExp("")).toBeNull()
  })
})

describe("shouldRefresh", () => {
  const now = 1_700_000_000
  const threshold = 7 * 24 * 60 * 60

  it("returns true when token is within the refresh window", () => {
    const exp = now + threshold - 60
    expect(shouldRefresh(buildJwt({ exp }), now, threshold)).toBe(true)
  })

  it("returns false when token is fresh", () => {
    const exp = now + threshold + 60
    expect(shouldRefresh(buildJwt({ exp }), now, threshold)).toBe(false)
  })

  it("returns false when token is already expired", () => {
    const exp = now - 60
    expect(shouldRefresh(buildJwt({ exp }), now, threshold)).toBe(false)
  })

  it("returns false for malformed tokens", () => {
    expect(shouldRefresh("garbage", now, threshold)).toBe(false)
  })
})

describe("refreshAccessToken", () => {
  type Outcome =
    | { body: any }
    | { error: { status?: number; body?: any; message?: string } }

  const mockRoute = (trust: Outcome, token?: Outcome) => {
    mockRequestGravity.mockImplementation(({ url }: { url: string }) => {
      const outcome = url.includes("trust_token") ? trust : token

      if (!outcome) return Promise.resolve({ body: {} })

      if ("error" in outcome) {
        return Promise.reject({
          message: outcome.error.message ?? "Error",
          response: {
            body: outcome.error.body ?? {},
            ok: false,
            status: outcome.error.status,
            text: "",
          },
        })
      }

      return Promise.resolve({ body: outcome.body, ok: true })
    })
  }

  beforeEach(() => {
    mockRequestGravity.mockReset()
  })

  it("returns a fresh access token on success", async () => {
    mockRoute(
      { body: { trust_token: "TT" } },
      { body: { access_token: "NEW" } },
    )
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: true, accessToken: "NEW" })
  })

  it("forwards the access token and IP when requesting a trust token", async () => {
    mockRoute(
      { body: { trust_token: "TT" } },
      { body: { access_token: "NEW" } },
    )
    await refreshAccessToken("OLD", "127.0.0.1")
    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "https://example.test/api/v1/me/trust_token",
        headers: expect.objectContaining({
          "X-Access-Token": "OLD",
          "X-Forwarded-For": "127.0.0.1",
        }),
      }),
    )
    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "https://example.test/oauth2/access_token",
        headers: expect.objectContaining({
          "X-Forwarded-For": "127.0.0.1",
        }),
        body: expect.objectContaining({
          grant_type: "trust_token",
          client_id: "client-id",
          client_secret: "client-secret",
          code: "TT",
        }),
      }),
    )
  })

  it("returns invalid when trust_token call returns 401", async () => {
    mockRoute({ error: { status: 401 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "invalid" })
  })

  it("returns invalid when access_token call returns 403", async () => {
    mockRoute({ body: { trust_token: "TT" } }, { error: { status: 403 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "invalid" })
  })

  it("returns transient on 5xx", async () => {
    mockRoute({ error: { status: 503 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "transient" })
  })

  it("returns transient when trust_token body is missing", async () => {
    mockRoute({ body: {} })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "transient" })
  })

  it("returns transient when access_token body is missing", async () => {
    mockRoute({ body: { trust_token: "TT" } }, { body: {} })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "transient" })
  })
})
