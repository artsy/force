import { splitTestMiddleware } from "../splitTestMiddleware"

jest.mock("desktop/components/split_test/running_tests.coffee", () => {
  return {
    decayed_merch_v3: {
      outcomes: {
        control: 0,
        experiment: 100,
      },
      key: "decayed_merch_v3",
    },
  }
})

describe("splitTestMiddleware", () => {
  it("sets locals and cookies", async () => {
    const spy = jest.fn()
    const req = {
      cookies: {},
    }
    const res = { cookie: spy, locals: { sd: {} } }
    const next = jest.fn()

    await splitTestMiddleware(req, res, next)

    expect(res.locals.sd).toEqual({ DECAYED_MERCH_V3: "experiment" })
    expect(res.cookie).toHaveBeenCalledWith(
      "split_test--decayed_merch_v3",
      "experiment",
      expect.anything()
    )
    expect(next).toHaveBeenCalled()
  })

  it("respects query params and sets locals and cookies", async () => {
    const spy = jest.fn()
    const req = {
      query: {
        split_test: {
          decayed_merch_v3: "control",
        },
      },
      cookies: {},
    }
    const res = { cookie: spy, locals: { sd: {} } }
    const next = jest.fn()

    await splitTestMiddleware(req, res, next)

    expect(res.locals.sd).toEqual({ DECAYED_MERCH_V3: "control" })
    expect(res.cookie).toHaveBeenCalledWith(
      "split_test--decayed_merch_v3",
      "control",
      expect.anything()
    )
    expect(next).toHaveBeenCalled()
  })
})
