import { buildServerAppContext } from "../buildServerAppContext"

describe("buildServerAppContext", () => {
  let req, res
  let headers = {}
  beforeEach(() => {
    headers = {}
    req = {
      user: {
        toJSON: () => ({ id: "user-id" }),
      },
      path: "/",
      header: header => headers[header],
    }
    res = {
      locals: {
        sd: { EIGEN: false, IS_MOBILE: false, FEATURE_FLAGS: {} },
      },
    }
  })
  it("includes a mediator", () => {
    const subject = buildServerAppContext(req, res)
    expect(subject.mediator).toBeDefined()
  })

  it("includes xs media query for mobile", () => {
    res.locals.sd.IS_MOBILE = true
    const subject = buildServerAppContext(req, res)
    expect(subject.initialMatchingMediaQueries).toEqual(["xs"])
  })

  it("includes a user", () => {
    const subject = buildServerAppContext(req, res)
    expect(subject.mediator).toBeDefined()
  })

  it("includes featureFlags", () => {
    const subject = buildServerAppContext(req, res)
    expect(subject.featureFlags).toBeDefined()
  })

  it("works without a user", () => {
    req.user = undefined
    const subject = buildServerAppContext(req, res)
    expect(subject.user).not.toBeDefined()
  })

  it("isEigen is false by default", () => {
    const subject = buildServerAppContext(req, res)
    expect(subject.isEigen).toBeFalsy()
  })

  it("isEigen is true only when the user agent includes 'Artsy-Mobile'", () => {
    headers["User-Agent"] = "blah blah blah Artsy-Mobile blah blah blah"
    expect(buildServerAppContext(req, res).isEigen).toBeTruthy()

    headers["User-Agent"] = "Artsy-Mobile blah blah blah"
    expect(buildServerAppContext(req, res).isEigen).toBeTruthy()

    headers["User-Agent"] = "blah blah blah Artsy-Mobile"
    expect(buildServerAppContext(req, res).isEigen).toBeTruthy()

    headers["User-Agent"] = "blah blah blah"
    expect(buildServerAppContext(req, res).isEigen).toBeFalsy()

    delete headers["User-Agent"]
    expect(buildServerAppContext(req, res).isEigen).toBeFalsy()
  })
})
