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

  it("maps google-one-tap to service: google, trigger: one-tap", () => {
    analytics.setAuthTrackingCookie("google-one-tap")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        trigger: "one-tap",
      }),
      { httpOnly: false },
    )
  })

  it("includes analytics context from session when present", () => {
    req.session.contextModule = "artworkPage"
    req.session.sign_up_intent = "follow"
    req.session.trigger = "click"
    analytics.setAuthTrackingCookie("apple")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({
        action: "loggedIn",
        service: "apple",
        analytics: {
          contextModule: "artworkPage",
          intent: "follow",
          trigger: "click",
        },
      }),
      { httpOnly: false },
    )
  })

  it("omits analytics when no session context is present", () => {
    analytics.setAuthTrackingCookie("apple")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({ action: "loggedIn", service: "apple" }),
      { httpOnly: false },
    )
  })

  it("does not include session trigger in analytics for google-one-tap", () => {
    req.session.contextModule = "header"
    req.session.trigger = "click"
    analytics.setAuthTrackingCookie("google-one-tap")(req, res, next)

    expect(res.cookie).toHaveBeenCalledWith(
      "useSocialAuthTracking",
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        trigger: "one-tap",
        analytics: { contextModule: "header" },
      }),
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
