const Strategy = require("../lib/strategy")

describe("Strategy", function () {
  const strategy = new Strategy(function () {})

  it("should be named local-with-otp", function () {
    expect(strategy.name).toEqual("local-with-otp")
  })

  it("should throw if constructed without a verify callback", function () {
    expect(function () {
      const s = new Strategy()
    }).toThrow(TypeError, "LocalWithOtpStrategy requires a verify callback")
  })
})
