const sinon = require("sinon")

let analytics = require("../../lib/app/analytics")
import options from "Server/passport/lib/options"

jest.mock("sharify", () => ({
  data: {
    SEGMENT_WRITE_KEY: "foobar",
  },
}))

describe("analytics", function () {
  let req, res, next

  beforeEach(function () {
    req = {
      session: {},
      body: {},
      user: { id: "foo" },
      query: {},
    }
    res = { locals: { sd: {} } }
    next = sinon.stub()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("tracks signup", function () {
    const spy = jest.spyOn(analytics.analytics, "track")
    analytics.trackSignup("email")(req, res, next)
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "Created account",
        properties: {
          acquisition_initiative: undefined,
          modal_id: undefined,
          signup_service: "email",
          user_id: "foo",
        },
        userId: "foo",
      })
    )
  })

  it("tracks login", function () {
    const spy = jest.spyOn(analytics.analytics, "track")
    analytics.trackLogin(req, res, next)
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "Successfully logged in",
        userId: "foo",
      })
    )
  })

  it("passes along modal_id and acquisition_initiative submitted fields", function () {
    const spy = jest.spyOn(analytics.analytics, "track")
    req.body.modal_id = "foo"
    req.body.acquisition_initiative = "bar"
    analytics.setCampaign(req, res, next)
    analytics.trackSignup("email")(req, res, next)

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "Created account",
        properties: {
          acquisition_initiative: "bar",
          modal_id: "foo",
          signup_service: "email",
          user_id: "foo",
        },
        userId: "foo",
      })
    )
  })

  it("passes along acquisition_initiative query params for OAuth links", function () {
    const spy = jest.spyOn(analytics.analytics, "track")
    req.query.modal_id = "foo"
    req.query.acquisition_initiative = "bar"
    analytics.setCampaign(req, res, next)
    analytics.trackSignup("email")(req, res, next)
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "Created account",
        properties: {
          acquisition_initiative: "bar",
          modal_id: "foo",
          signup_service: "email",
          user_id: "foo",
        },
        userId: "foo",
      })
    )
  })

  it("doesnt hold on to the temporary session variable", function () {
    req.body.modal_id = "foo"
    req.body.acquisition_initiative = "bar"
    analytics.setCampaign(req, res, next)
    analytics.trackSignup("email")(req, res, next)
    expect(Object.keys(req.session).length).toEqual(0)
  })
})
