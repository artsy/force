const analytics = require("../analytics")

describe("setAuthTrackingCookie", () => {
  let req: any
  let res: any
  let next: jest.Mock

  beforeEach(() => {
    req = {
      session: {},
      body: {},
      headers: {},
      user: { id: "foo" },
      query: {},
      artsyPassportSignedUp: false,
    }
    res = { cookie: jest.fn() }
    next = jest.fn()
  })

  it("sets a loggedIn cookie when not signed up", () => {
    analytics.setAuthTrackingCookie("google")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({ action: "loggedIn", service: "google" }),
      { httpOnly: false },
    )
    expect(next).toHaveBeenCalled()
  })

  it("sets a signedUp cookie when artsyPassportSignedUp is true", () => {
    req.artsyPassportSignedUp = true
    analytics.setAuthTrackingCookie("facebook")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({ action: "signedUp", service: "facebook" }),
      { httpOnly: false },
    )
  })

  it("maps google-one-tap to service: google, trigger: tap", () => {
    analytics.setAuthTrackingCookie("google-one-tap")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({ action: "loggedIn", service: "google", trigger: "tap" }),
      { httpOnly: false },
    )
  })

  it("includes context_page_path from Referer header for one-tap", () => {
    req.headers = { referer: "https://staging.artsy.net/artist/andy-warhol" }
    analytics.setAuthTrackingCookie("google-one-tap")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        trigger: "tap",
        context_page_path: "/artist/andy-warhol",
      }),
      { httpOnly: false },
    )
  })

  it("omits context_page_path for regular social auth", () => {
    req.headers = { referer: "https://accounts.google.com/o/oauth2/callback" }
    analytics.setAuthTrackingCookie("google")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({ action: "loggedIn", service: "google" }),
      { httpOnly: false },
    )
  })
})

describe("setCampaign", () => {
  let req: any
  let res: any
  let next: jest.Mock

  beforeEach(() => {
    req = { session: {}, body: {}, query: {} }
    res = {}
    next = jest.fn()
  })

  it("stores modal_id and acquisition_initiative from body", () => {
    req.body.modal_id = "modal-1"
    req.body.acquisition_initiative = "initiative-1"
    analytics.setCampaign(req, res, next)

    expect(req.session.modalId).toBe("modal-1")
    expect(req.session.acquisitionInitiative).toBe("initiative-1")
    expect(next).toHaveBeenCalled()
  })

  it("falls back to query params", () => {
    req.query.modal_id = "modal-q"
    req.query.acquisition_initiative = "initiative-q"
    analytics.setCampaign(req, res, next)

    expect(req.session.modalId).toBe("modal-q")
    expect(req.session.acquisitionInitiative).toBe("initiative-q")
  })
})
