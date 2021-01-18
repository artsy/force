const routes = require("../routes.coffee")

jest.mock("../../../components/json_page/index.coffee", () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: cb => {
        cb(null, { sections: [] })
      },
    }
  })
})

describe("About routes", () => {
  describe("#index", () => {
    let res
    beforeEach(function () {
      res = {
        redirect: jest.fn(),
        locals: { sd: { IS_MOBILE: true } },
        render: jest.fn(),
      }
    })

    it("redirects to buying-with-artsy if it is mobile", () => {
      routes.index({}, res)
      expect(res.redirect).toBeCalledWith("/buying-with-artsy")
    })

    it("doesnt redirect if not mobile", () => {
      res.locals.sd.IS_MOBILE = false
      routes.index({}, res)
      expect(res.redirect).toBeCalledTimes(0)
      expect(res.render).toBeCalled()
    })
  })
})

// Fixes import/export error
// eslint-disable-next-line
export {}
