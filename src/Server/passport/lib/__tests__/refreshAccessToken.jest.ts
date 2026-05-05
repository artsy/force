import {
  decodeJwtExp,
  refreshAccessToken,
  shouldRefresh,
} from "../refreshAccessToken"
import request from "superagent"

jest.mock("Server/config", () => ({
  API_URL: "https://example.test",
  CLIENT_ID: "client-id",
  CLIENT_SECRET: "client-secret",
}))

jest.mock("superagent", () => ({
  post: jest.fn(),
}))

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
  const post = request.post as jest.Mock

  const mockChain = (
    trust: { body?: any; throw?: { status?: number } },
    token?: { body?: any; throw?: { status?: number } },
  ) => {
    const trustChain: any = {
      set: jest
        .fn()
        .mockImplementation(() =>
          trust.throw
            ? Promise.reject({ status: trust.throw.status })
            : Promise.resolve({ body: trust.body }),
        ),
    }
    const tokenChain: any = {
      set: jest.fn().mockReturnThis(),
      send: jest
        .fn()
        .mockImplementation(() =>
          !token
            ? Promise.resolve({ body: {} })
            : token.throw
              ? Promise.reject({ status: token.throw.status })
              : Promise.resolve({ body: token.body }),
        ),
    }
    post.mockImplementation((url: string) =>
      url.includes("trust_token") ? trustChain : tokenChain,
    )
  }

  beforeEach(() => {
    post.mockReset()
  })

  it("returns a fresh access token on success", async () => {
    mockChain(
      { body: { trust_token: "TT" } },
      { body: { access_token: "NEW" } },
    )
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: true, accessToken: "NEW" })
  })

  it("returns invalid when trust_token call returns 401", async () => {
    mockChain({ throw: { status: 401 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "invalid" })
  })

  it("returns invalid when access_token call returns 403", async () => {
    mockChain({ body: { trust_token: "TT" } }, { throw: { status: 403 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "invalid" })
  })

  it("returns transient on 5xx", async () => {
    mockChain({ throw: { status: 503 } })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "transient" })
  })

  it("returns transient when trust_token body is missing", async () => {
    mockChain({ body: {} })
    const result = await refreshAccessToken("OLD", "127.0.0.1")
    expect(result).toEqual({ ok: false, reason: "transient" })
  })
})
