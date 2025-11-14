const Strategy = require("../lib/strategy")

describe("Strategy", () => {
  const strategy = new Strategy(() => {})

  it("should be named local-with-otp", () => {
    expect(strategy.name).toEqual("local-with-otp")
  })

  it("should throw if constructed without a verify callback", () => {
    expect(() => {
      const _s = new Strategy()
    }).toThrow(TypeError, "LocalWithOtpStrategy requires a verify callback")
  })
})
