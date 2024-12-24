import { logFormat } from "../morgan"

const mockUrl = jest.fn()
const tokens = {
  status: jest.fn(),
  method: jest.fn(),
  "remote-addr": jest.fn(),
  "response-time": jest.fn(),
  "user-agent": jest.fn(),
  url: mockUrl,
}

const req = {} as any
const res = {} as any

let url: string

describe("logFormat", () => {
  describe("forbidden query param", () => {
    beforeEach(() => {
      url =
        "https://artsy.biz/artworks?foo=abc&setup_intent_client_secret=SECRET&bar=def"
    })

    it("strips sensitive query params whilst preserving the url", () => {
      mockUrl.mockReturnValue(url)

      const result = logFormat(tokens, req, res)

      expect(result).toMatch(
        "https://artsy.biz/artworks?foo=abc&setup_intent_client_secret=[FILTERED]&bar=def",
      )
    })
    it("preserves other params", () => {
      mockUrl.mockReturnValue(url)

      const result = logFormat(tokens, req, res)

      expect(result).toMatch("foo=abc")
      expect(result).toMatch("setup_intent_client_secret=[FILTERED]")
      expect(result).toMatch("bar=def")
    })
  })
  it("leaves an innocent url untouched", () => {
    url = "https://artsy.biz/artworks?foo=abc&bar=def"
    mockUrl.mockReturnValue(url)

    const result = logFormat(tokens, req, res)

    expect(result).toMatch(url)
  })
})
