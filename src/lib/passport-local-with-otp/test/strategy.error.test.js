const chai = require("chai")
const expect = require("chai").expect
const Strategy = require("../lib/strategy")

describe("Strategy", function () {
  describe("encountering an error during verification", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      done(new Error("something went wrong"))
    })

    let err

    before(function (done) {
      chai.passport
        .use(strategy)
        .error(function (e) {
          err = e
          done()
        })
        .req(function (req) {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should error", function () {
      expect(err).to.be.an.instanceof(Error)
      expect(err.message).to.equal("something went wrong")
    })
  })

  describe("encountering an exception during verification", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("something went horribly wrong")
    })

    let err

    before(function (done) {
      chai.passport
        .use(strategy)
        .error(function (e) {
          err = e
          done()
        })
        .req(function (req) {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should error", function () {
      expect(err).to.be.an.instanceof(Error)
      expect(err.message).to.equal("something went horribly wrong")
    })
  })
})
