import sinon from "sinon"
import rewire from "rewire"
import should from "should"
const rewiredMarketingModalsMiddleware = rewire(
  "../../../lib/middleware/marketingModals"
)
const { marketingModalsMiddleware } = rewiredMarketingModalsMiddleware

describe("showMarketingSignupModal", function () {
  beforeEach(function () {
    let MockJSONPage
    const data = [
      {
        slug: "foo",
        copy: "welcome to artsy",
        image: "img.jpg",
        photoCredit: "Photo by Artsy",
      },
    ]
    this.req = { query: { "m-id": "foo" } }
    this.res = {
      locals: {
        sd: {
          IS_MOBILE: true,
          APP_URL: "http://www.artsy.net",
          MOBILE_MARKETING_SIGNUP_MODALS: data,
          MARKETING_SIGNUP_MODALS: data,
        },
        modal: { slug: "foo", copy: "welcome to artsy", image: "img.jpg" },
      },
    }
    rewiredMarketingModalsMiddleware.__set__(
      "JSONPage",
      (MockJSONPage = class MockJSONPage {
        get() {
          return new Promise((resolve, reject) => resolve({ modals: data }))
        }
      })
    )
  })

  it("shows the modal if coming from a campaign", function () {
    marketingModalsMiddleware(this.req, this.res, () => {
      should(this.res.locals.showMarketingSignupModal).be.ok()
    })
  })

  it("does not show the modal if coming from artsy", function () {
    this.req.query = {}
    marketingModalsMiddleware(this.req, this.res, () => {
      should(this.res.locals.showMarketingSignupModal).not.be.ok()
    })
  })

  it("does not show the modal if logged in", function () {
    this.req.user = { name: "Andy" }
    this.req.path = "/foo"
    this.req.get = sinon.stub().returns("google.com")
    marketingModalsMiddleware(this.req, this.res, () => {
      should(this.res.locals.showMarketingSignupModal).not.be.ok()
    })
  })
})
