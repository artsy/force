import { redirectPostAuth } from "Apps/Authentication/Middleware/redirectPostAuth"
import { getENV } from "Utils/getENV"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("redirectPostAuth", () => {
  const mockGetENV = getENV as jest.Mock
  const redirectSpy = jest.fn()

  beforeEach(() => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "APP_URL":
          return "https://artsy.net"
        case "API_URL":
          return "https://api.artsy.net"
        case "ALLOWED_REDIRECT_HOSTS":
          return "live.artsy.net,foo.test.com,localhost"
        case "NODE_ENV":
          return "development"
      }
    })
  })

  const setup = ({ req = {}, res = {} }) => {
    redirectPostAuth({
      req: {
        get: (() => "") as any,
        header: (() => "") as any,
        body: {},
        ...req,
      } as any,
      res: {
        locals: { sd: { APP_URL: "https://artsy.net" } },
        redirect: redirectSpy,
        ...res,
      } as any,
    })
  }

  it("redirects to an allowed external URL", () => {
    const url = "https://live.artsy.net/foo"
    const encodedUrl = encodeURI(url)

    setup({
      req: { query: { redirectTo: encodedUrl } },
    })
    expect(redirectSpy).toHaveBeenCalledWith(encodedUrl)
  })

  it("redirects to the APP_URL", () => {
    const url = "https://artsy.net/collect"
    const encodedUrl = encodeURI(url)

    setup({
      req: { query: { redirectTo: encodedUrl } },
    })
    expect(redirectSpy).toHaveBeenCalledWith(encodedUrl)
  })

  it("redirects to the API_URL", () => {
    const url = "https://api.artsy.net/auth"
    const encodedUrl = encodeURI(url)

    setup({
      req: { query: { redirectTo: encodedUrl } },
    })
    expect(redirectSpy).toHaveBeenCalledWith(encodedUrl)
  })

  it("does not redirect to a disallowed external URL", () => {
    const url = "https://another.web.site/foo"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("https://artsy.net/")
  })

  it("does not redirect to a non-artsy.net subdomain, even if included in allowed hosts list", () => {
    const url = "https://foo.test.com/hackme"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("https://artsy.net/")
  })

  it("does not redirect to localhost if not in development", () => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "APP_URL":
          return "https://artsy.net"
        case "ALLOWED_REDIRECT_HOSTS":
          return "api.artsy.net,live.artsy.net,foo.test.com,localhost"
        case "NODE_ENV":
          return "production"
      }
    })
    const url = "http://localhost:3000/foo"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("https://artsy.net/")
  })

  it("redirects to localhost if in development", () => {
    const url = "http://localhost:3000/foo"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("http://localhost:3000/foo")
  })
})
