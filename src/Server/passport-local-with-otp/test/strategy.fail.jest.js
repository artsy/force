/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("failing authentication", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      return done(null, false)
    })

    let info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .fail(function (i) {
          info = i
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

    it("should fail", function () {
      expect(info).toBeUndefined()
    })
  })

  describe("failing authentication with info", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      return done(null, false, { message: "authentication failed" })
    })

    let info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .fail(function (i) {
          info = i
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

    it("should fail", function () {
      expect(info.message).toEqual("authentication failed")
    })
  })
})
