import { buildServerAppContext } from "../buildServerAppContext"

describe("buildServerAppContext", () => {
  let req, res
  beforeEach(() => {
    req = {
      user: {
        toJSON: () => ({ id: "user-id" }),
      },
      path: "/",
    }
    res = {
      locals: {
        sd: { EIGEN: false, IS_MOBILE: false },
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

  it("works without a user", () => {
    req.user = undefined
    const subject = buildServerAppContext(req, res)
    expect(subject.user).not.toBeDefined()
  })

  it("isEigen is false by default", () => {
    const subject = buildServerAppContext(req, res)
    expect(subject.isEigen).toBeFalsy()
  })

  it("isEigen is true when specified", () => {
    res.locals.sd.EIGEN = true
    const subject = buildServerAppContext(req, res)
    expect(subject.isEigen).toBeTruthy()
  })
})
