import { marketingModalsMiddleware } from "../../../lib/middleware/marketingModals"

jest.mock("../../../desktop/components/json_page/index.coffee", () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: () => {
        const data = [
          {
            slug: "foo",
            copy: "welcome to artsy",
            image: "img.jpg",
            photoCredit: "Photo by Artsy",
          },
        ]

        return new Promise((resolve, reject) => resolve({ modals: data }))
      },
    }
  })
})

describe("showMarketingSignupModal", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    const data = [
      {
        slug: "foo",
        copy: "welcome to artsy",
        image: "img.jpg",
        photoCredit: "Photo by Artsy",
      },
    ]
    testContext.req = { query: { "m-id": "foo" } }
    testContext.res = {
      locals: {
        sd: {
          IS_MOBILE: true,
          APP_URL: "http://www.artsy.net",
          MARKETING_SIGNUP_MODALS: data,
        },
        modal: { slug: "foo", copy: "welcome to artsy", image: "img.jpg" },
      },
    }
  })

  it("shows the modal if coming from a campaign", () => {
    marketingModalsMiddleware(testContext.req, testContext.res, () => {
      expect(testContext.res.locals.showMarketingSignupModal).toBeTruthy()
    })
  })

  it("does not show the modal if coming from artsy", () => {
    testContext.req.query = {}
    marketingModalsMiddleware(testContext.req, testContext.res, () => {
      expect(testContext.res.locals.showMarketingSignupModal).toBeFalsy()
    })
  })

  it("does not show the modal if logged in", () => {
    testContext.req.user = { name: "Andy" }
    testContext.req.path = "/foo"
    testContext.req.get = jest.fn(() => "google.com")
    marketingModalsMiddleware(testContext.req, testContext.res, () => {
      expect(testContext.res.locals.showMarketingSignupModal).toBeTruthy()
    })
  })
})
