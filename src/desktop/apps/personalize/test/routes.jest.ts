import { index } from "../routes"
const CurrentUser = require("desktop/models/current_user")

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stichMock = require("@artsy/stitch").stitch as jest.Mock

describe("Personalize routes", () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: "interests" },
      redirect: jest.fn(),
      user: new CurrentUser({
        name: "user",
      }),
      app: { get: jest.fn() },
      query: {
        redirectTo: "",
      },
    }
    res = {
      send: jest.fn(),
      locals: {
        sd: {},
      },
    }
    next = jest.fn()
  })

  it("renders the personalize app", done => {
    index(req, res, next).then(() => {
      expect(stichMock.mock.calls[0][0].data.title).toBe("Personalize | Artsy")
      expect(stichMock.mock.calls[0][0].locals.assetPackage).toBe("onboarding")
      done()
    })
  })
})
