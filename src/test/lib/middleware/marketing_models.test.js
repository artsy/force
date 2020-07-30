/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const middleware = rewire("../../../lib/middleware/marketing_modals")

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
    return middleware.__set__(
      "JSONPage",
      (MockJSONPage = class MockJSONPage {
        get() {
          return new Promise((resolve, reject) => resolve({ modals: data }))
        }
      })
    )
  })

  it("shows the modal if coming from a campaign", function () {
    return middleware(this.req, this.res, () => {
      return (this.res.locals.showMarketingSignupModal != null).should.be.ok()
    })
  })

  it("does not show the modal if coming from artsy", function () {
    this.req.query = {}
    return middleware(this.req, this.res, () => {
      return (
        this.res.locals.showMarketingSignupModal != null
      ).should.not.be.ok()
    })
  })

  return it("does not show the modal if logged in", function () {
    this.req.user = { name: "Andy" }
    this.req.path = "/foo"
    this.req.get = sinon.stub().returns("google.com")
    return middleware(this.req, this.res, () => {
      return (
        this.res.locals.showMarketingSignupModal != null
      ).should.not.be.ok()
    })
  })
})
