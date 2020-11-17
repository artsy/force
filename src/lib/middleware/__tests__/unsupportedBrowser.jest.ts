import {
  getRedirectTo,
  isUnsupported,
  unsupportedBrowserCheck,
} from "../unsupportedBrowser"
import useragent from "useragent"

describe("unsupported browsers", () => {
  let req
  let res
  let next

  const validChrome =
    "Mozilla/5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_14_4%29%20AppleWebKit/537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome/74.0.3729.169%20Safari/537.36"
  const validSafari =
    "Mozilla/5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_14_4%29%20AppleWebKit/605.1.15%20%28KHTML%2C%20like%20Gecko%29%20Version/12.1%20Safari/605.1.15"
  const invalidSafari =
    "Mozilla/5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_14_4%29%20AppleWebKit/605.1.15%20%28KHTML%2C%20like%20Gecko%29%20Version/9.1%20Safari/605.1.15"
  const invalidIE =
    "Mozilla/5.0%20%28Windows%20NT%206.2%3B%20WOW64%3B%20Trident/7.0%3B%20rv%3A11.0%29%20like%20Gecko"

  beforeEach(() => {
    req = {
      body: {},
      cookies: {},
      headers: { "user-agent": validChrome },
      query: {},
      get: jest.fn(),
    }
    res = {
      headers: [],
      locals: { sd: {} },
      redirect: jest.fn(),
      send: jest.fn(),
      set: jest.fn(),
      status: jest.fn(),
    }
    next = jest.fn()
  })

  it("sets sd.BROWSER", () => {
    unsupportedBrowserCheck(req, res, next)
    expect(res.locals.sd.BROWSER.family).toBe("Chrome")
  })

  it("does not overwrite existing sd.BROWSER", () => {
    req.headers["user-agent"] = validSafari
    res.locals.sd.BROWSER = useragent.parse(validChrome)
    unsupportedBrowserCheck(req, res, next)
    expect(res.locals.sd.BROWSER.family).toBe("Chrome")
  })

  it("sets sd.UNSUPPORTED_BROWSER_REDIRECT if isUnsupported", () => {
    req.headers["user-agent"] = invalidSafari
    unsupportedBrowserCheck(req, res, next)
    expect(res.locals.sd.UNSUPPORTED_BROWSER_REDIRECT).toBe("/")
  })

  it("redirects if browser is unsupported", () => {
    req.headers["user-agent"] = invalidSafari
    unsupportedBrowserCheck(req, res, next)
    expect(res.redirect).toBeCalledWith("/unsupported-browser")
  })

  it("nexts if browser is supported", () => {
    unsupportedBrowserCheck(req, res, next)
    expect(next).toBeCalled()
  })

  it("ignores requests for fonts", () => {
    req.headers["user-agent"] = invalidSafari
    req.path = "/fonts/avante-garde.ttf"
    unsupportedBrowserCheck(req, res, next)
    expect(next).toBeCalled()
  })

  it("ignores requests for assets", () => {
    req.headers["user-agent"] = invalidSafari
    req.path = "/assets/css/all.css"
    unsupportedBrowserCheck(req, res, next)
    expect(next).toBeCalled()
  })

  it("ignores requests for images", () => {
    req.headers["user-agent"] = invalidSafari
    req.path = "/images/logo.png"
    unsupportedBrowserCheck(req, res, next)
    expect(next).toBeCalled()
  })

  it("ignores requests for /unsupported-browser", () => {
    req.headers["user-agent"] = invalidSafari
    req.path = "/unsupported-browser"
    unsupportedBrowserCheck(req, res, next)
    expect(next).toBeCalled()
  })

  describe("isUnsupported", () => {
    it("returns true for IE =< 11", () => {
      req.headers["user-agent"] = invalidIE
      expect(isUnsupported(useragent.parse(invalidIE), req)).toBeTruthy()
    })

    it("returns true for Safari < 10", () => {
      req.headers["user-agent"] = invalidSafari
      expect(isUnsupported(useragent.parse(invalidSafari), req)).toBeTruthy()
    })
    it("returns false for unsupported browsers if cookies.continue_with_bad_browser", () => {
      req.headers["user-agent"] = invalidSafari
      req.cookies.continue_with_bad_browser = true
      expect(isUnsupported(useragent.parse(invalidSafari), req)).toBeFalsy()
    })

    it("returns false for valid chrome", () => {
      req.headers["user-agent"] = validChrome
      expect(isUnsupported(useragent.parse(validChrome), req)).toBeFalsy()
    })

    it("returns false for valid safari", () => {
      req.headers["user-agent"] = validSafari
      expect(isUnsupported(useragent.parse(validSafari), req)).toBeFalsy()
    })
  })

  describe("getRedirectTo", () => {
    it("can handle body.redirect-to", () => {
      req.body["redirect-to"] = "/collect"
      expect(getRedirectTo(req)).toBe("/collect")
    })

    it("can handle query.redirect-to", () => {
      req.query["redirect-to"] = "/collect"
      expect(getRedirectTo(req)).toBe("/collect")
    })

    it("can handle req Referrer", () => {
      req.get.mockReturnValue("/collect")
      expect(getRedirectTo(req)).toBe("/collect")
    })

    it("does not send users back to /reset_password", () => {
      req.body["redirectTo"] = "/reset_password"
      expect(getRedirectTo(req)).toBe("/")
    })
  })
})
