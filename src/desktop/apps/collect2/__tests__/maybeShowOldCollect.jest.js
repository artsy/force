import { maybeShowOldCollect } from "../maybeShowOldCollect"

describe("maybeShowOldCollect", () => {
  let req = null,
    res = null,
    next = null

  beforeEach(() => {
    res = {
      locals: {
        sd: {
          NEW_COLLECT_PAGE: "old",
        },
      },
    }

    next = jest.fn()
  })

  it("routes properly to the old collect page", () => {
    maybeShowOldCollect(req, res, next)
    expect(next).toBeCalledWith("route")
  })

  it("routes properly to the new collect page", () => {
    res.locals.sd.NEW_COLLECT_PAGE = "new"
    maybeShowOldCollect(req, res, next)
    expect(next).toBeCalled()
  })
})
