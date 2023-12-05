const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("encountering an error during verification", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      done(new Error("something went wrong"))
    })

    let err

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .error(function (e) {
          err = e
          done()
        })
        .request(function (req) {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should error", function () {
      expect(err.message).toContain("something went wrong")
    })
  })

  describe("encountering an exception during verification", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("something went horribly wrong")
    })

    let err

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .error(function (e) {
          err = e
          done()
        })
        .request(function (req) {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should error", function () {
      expect(err.message).toContain("something went horribly wrong")
    })
  })
})
