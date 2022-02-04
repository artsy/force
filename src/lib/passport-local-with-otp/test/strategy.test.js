const expect = require("chai").expect

const Strategy = require("../lib/strategy")

describe("Strategy", function () {
  const strategy = new Strategy(function () {})

  it("should be named local-with-otp", function () {
    expect(strategy.name).to.equal("local-with-otp")
  })

  it("should throw if constructed without a verify callback", function () {
    expect(function () {
      const s = new Strategy()
    }).to.throw(TypeError, "LocalWithOtpStrategy requires a verify callback")
  })
})
