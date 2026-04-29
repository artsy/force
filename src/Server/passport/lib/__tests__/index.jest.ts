describe("artsy passport factory", () => {
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it("merges runtime options into the shared options object and exposes it", () => {
    const setupApp = jest.fn(() => "passport-app")
    const setupPassport = jest.fn()

    jest.doMock("../options", () => ({ loginPagePath: "/log_in" }))
    jest.doMock("../app/index", () => setupApp)
    jest.doMock("../passport/index", () => setupPassport)

    const artsyPassport = require("../index")
    const options = require("../options")
    const app = artsyPassport({ APP_URL: "https://www.artsy.net" })

    expect(app).toEqual("passport-app")
    expect(setupPassport).toHaveBeenCalledTimes(1)
    expect(setupApp).toHaveBeenCalledTimes(1)
    expect(options.APP_URL).toEqual("https://www.artsy.net")
    expect(options.loginPagePath).toEqual("/log_in")
    expect(artsyPassport.options).toBe(options)
  })
})
