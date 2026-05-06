import { requestGravity } from "../../http"
import { denyBadLogoutLinks, logout } from "../logout"
import redirectBack from "../redirectBack"

jest.mock("../../http")
jest.mock("../redirectBack", () => jest.fn())
jest.mock("Server/passport/lib/options", () => ({
  ARTSY_URL: "http://apiz.artsy.net",
}))

const mockRequestGravity = requestGravity as jest.Mock

describe("logout", () => {
  beforeEach(() => {
    mockRequestGravity.mockResolvedValue({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("denyBadLogoutLinks", () => {
    it("allows artsy.net referrers", () => {
      const req = { get: jest.fn(() => "https://www.artsy.net/artworks") }
      const next = jest.fn()

      denyBadLogoutLinks(req as any, {} as any, next)

      expect(next).toHaveBeenCalledWith()
    })

    it("allows the bare artsy.net referrer", () => {
      const req = { get: jest.fn(() => "https://artsy.net/artworks") }
      const next = jest.fn()

      denyBadLogoutLinks(req as any, {} as any, next)

      expect(next).toHaveBeenCalledWith()
    })

    it("rejects non-Artsy referrers", () => {
      const req = { get: jest.fn(() => "https://malicious.example") }
      const next = jest.fn()

      denyBadLogoutLinks(req as any, {} as any, next)

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Malicious logout link." }),
      )
    })

    it("rejects lookalike Artsy referrers", () => {
      const req = { get: jest.fn(() => "https://notartsy.net") }
      const next = jest.fn()

      denyBadLogoutLinks(req as any, {} as any, next)

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Malicious logout link." }),
      )
    })

    it("rejects missing referrers", () => {
      const req = { get: jest.fn(() => undefined) }
      const next = jest.fn()

      denyBadLogoutLinks(req as any, {} as any, next)

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Malicious logout link." }),
      )
    })
  })

  it("deletes the Gravity access token with current request metadata", async () => {
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: {},
      logout: jest.fn(),
      session: {},
      user: { accessToken: "access-token" },
      xhr: true,
    }
    const send = jest.fn()
    const res = { status: jest.fn(() => ({ send })) }

    await logout(req as any, res as any, jest.fn())

    expect(mockRequestGravity).toHaveBeenCalledWith({
      headers: {
        "X-Access-Token": "access-token",
        "X-Forwarded-For": "99.99.99.99",
      },
      method: "DELETE",
      url: "http://apiz.artsy.net/api/v1/access_token",
    })
    expect(req.logout).toHaveBeenCalled()
    expect(req.session).toBeNull()
  })

  it("sends success for XHR logout requests", async () => {
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: {},
      logout: jest.fn(),
      session: {},
      xhr: true,
    }
    const send = jest.fn()
    const res = { status: jest.fn(() => ({ send })) }

    await logout(req as any, res as any, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(send).toHaveBeenCalledWith({ msg: "success" })
    expect(redirectBack).not.toHaveBeenCalled()
  })

  it("still sends success when Gravity token deletion fails", async () => {
    mockRequestGravity.mockRejectedValue(new Error("Gravity unavailable"))
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: {},
      logout: jest.fn(),
      session: {},
      user: { accessToken: "access-token" },
      xhr: true,
    }
    const send = jest.fn()
    const res = { status: jest.fn(() => ({ send })) }

    await logout(req as any, res as any, jest.fn())

    expect(req.logout).toHaveBeenCalled()
    expect(req.session).toBeNull()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(send).toHaveBeenCalledWith({ msg: "success" })
  })

  it("redirects back for non-XHR logout requests", async () => {
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: {},
      logout: jest.fn(),
      session: {},
    }
    const res = {}

    await logout(req as any, res as any, jest.fn())

    expect(redirectBack).toHaveBeenCalledWith(req, res)
  })
})
