import { redirectPostAuth } from "../redirectPostAuth"

describe("redirectPostAuth", () => {
  const redirectSpy = jest.fn()
  let originalEnv

  beforeAll(() => {
    originalEnv = process.env
    process.env = Object.assign({}, originalEnv, {
      ALLOWED_REDIRECT_HOSTS:
        "api.artsy.net,live.artsy.net,foo.test.com,localhost",
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    process.env = originalEnv!
  })

  const setup = ({ req = {}, res = {} }) => {
    redirectPostAuth({
      req: {
        get: (() => "") as any,
        header: (() => "") as any,
        body: {},
        ...req,
      },
      res: {
        locals: { sd: { APP_URL: "https://artsy.net" } },
        redirect: redirectSpy,
        ...res,
      },
    })
  }

  it("redirects to an allowed external URL", () => {
    const url = "https://api.artsy.net/foo"
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
    process.env.NODE_ENV = "production"
    const url = "http://localhost:3000/foo"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("https://artsy.net/")
  })

  it("redirects to localhost if in development", () => {
    process.env.NODE_ENV = "development"
    const url = "http://localhost:3000/foo"

    setup({
      req: { query: { redirectTo: encodeURI(url) } },
    })

    expect(redirectSpy).toHaveBeenCalledWith("http://localhost:3000/foo")
  })
})
