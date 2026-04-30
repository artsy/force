import { refreshAccessTokenMiddleware } from "../refreshAccessTokenMiddleware"
import { refreshAccessToken } from "Server/passport/lib/refreshAccessToken"

jest.mock("Server/config", () => ({
  ACCESS_TOKEN_REFRESH_ENABLED: true,
  ACCESS_TOKEN_REFRESH_THRESHOLD_SECONDS: 7 * 24 * 60 * 60,
  API_URL: "https://example.test",
  CLIENT_ID: "client-id",
  CLIENT_SECRET: "client-secret",
}))

jest.mock("Server/passport/lib/refreshAccessToken", () => ({
  refreshAccessToken: jest.fn(),
  shouldRefresh: jest.requireActual("Server/passport/lib/refreshAccessToken")
    .shouldRefresh,
}))

jest.mock("Server/passport/lib/app/forwarded_for", () => () => "127.0.0.1")

const mockRefresh = refreshAccessToken as jest.Mock

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
  return `${header}.${body}.sig`
}

const tokenExpiringIn = (seconds: number): string =>
  buildJwt({ exp: Math.floor(Date.now() / 1000) + seconds, sub: "u-1" })

const buildReqRes = (overrides: Partial<any> = {}) => {
  const next = jest.fn()
  const defaultToken = tokenExpiringIn(60 * 60 * 24 * 30)
  const req: any = {
    method: "GET",
    path: "/some-page",
    user: { id: "u-1", accessToken: defaultToken },
    session: {
      passport: { user: { id: "u-1", accessToken: defaultToken } },
    },
    logout: jest.fn(cb => cb && cb()),
    ...overrides,
  }
  if (req.user && req.session?.passport?.user) {
    req.session.passport.user.accessToken = req.user.accessToken
  }
  const res: any = {}
  return { req, res, next }
}

describe("refreshAccessTokenMiddleware", () => {
  beforeEach(() => {
    mockRefresh.mockReset()
  })

  it("no-ops when there is no user", async () => {
    const { req, res, next } = buildReqRes({ user: undefined, session: {} })
    await refreshAccessTokenMiddleware(req, res, next)
    expect(mockRefresh).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("no-ops when token is fresh", async () => {
    const { req, res, next } = buildReqRes()
    await refreshAccessTokenMiddleware(req, res, next)
    expect(mockRefresh).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("no-ops on OPTIONS requests", async () => {
    const { req, res, next } = buildReqRes({
      method: "OPTIONS",
      user: { id: "u-1", accessToken: tokenExpiringIn(60) },
    })
    await refreshAccessTokenMiddleware(req, res, next)
    expect(mockRefresh).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("no-ops on asset paths", async () => {
    const { req, res, next } = buildReqRes({
      path: "/assets/foo.js",
      user: { id: "u-1", accessToken: tokenExpiringIn(60) },
    })
    await refreshAccessTokenMiddleware(req, res, next)
    expect(mockRefresh).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("refreshes and writes the new token to req.user and session", async () => {
    const expiring = tokenExpiringIn(60)
    const { req, res, next } = buildReqRes({
      user: { id: "u-1", accessToken: expiring },
      session: { passport: { user: { id: "u-1", accessToken: expiring } } },
    })
    mockRefresh.mockResolvedValue({ ok: true, accessToken: "FRESH" })

    await refreshAccessTokenMiddleware(req, res, next)

    expect(req.user.accessToken).toBe("FRESH")
    expect(req.session.passport.user.accessToken).toBe("FRESH")
    expect(next).toHaveBeenCalled()
  })

  it("logs the user out when refresh returns invalid", async () => {
    const { req, res, next } = buildReqRes({
      user: { id: "u-1", accessToken: tokenExpiringIn(60) },
    })
    mockRefresh.mockResolvedValue({ ok: false, reason: "invalid" })

    await refreshAccessTokenMiddleware(req, res, next)

    expect(req.logout).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("keeps the current token on transient failures", async () => {
    const expiring = tokenExpiringIn(60)
    const { req, res, next } = buildReqRes({
      user: { id: "u-1", accessToken: expiring },
      session: { passport: { user: { id: "u-1", accessToken: expiring } } },
    })
    mockRefresh.mockResolvedValue({ ok: false, reason: "transient" })

    await refreshAccessTokenMiddleware(req, res, next)

    expect(req.user.accessToken).toBe(expiring)
    expect(req.session.passport.user.accessToken).toBe(expiring)
    expect(next).toHaveBeenCalled()
  })

  it("dedupes concurrent refreshes for the same user", async () => {
    const expiring = tokenExpiringIn(60)
    let resolve: (value: any) => void = () => {}
    mockRefresh.mockReturnValue(
      new Promise(r => {
        resolve = r
      }),
    )

    const a = buildReqRes({
      user: { id: "u-1", accessToken: expiring },
      session: { passport: { user: { id: "u-1", accessToken: expiring } } },
    })
    const b = buildReqRes({
      user: { id: "u-1", accessToken: expiring },
      session: { passport: { user: { id: "u-1", accessToken: expiring } } },
    })

    const pA = refreshAccessTokenMiddleware(a.req, a.res, a.next)
    const pB = refreshAccessTokenMiddleware(b.req, b.res, b.next)

    resolve({ ok: true, accessToken: "FRESH" })
    await Promise.all([pA, pB])

    expect(mockRefresh).toHaveBeenCalledTimes(1)
    expect(a.req.user.accessToken).toBe("FRESH")
    expect(b.req.user.accessToken).toBe("FRESH")
  })
})
