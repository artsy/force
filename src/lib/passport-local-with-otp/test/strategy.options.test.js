/* jshint expr: true */

const chai = require("chai")
const expect = require("chai").expect
const Strategy = require("../lib/strategy")

describe("Strategy", function () {
  describe("handling a request without a body, but no username and password, with message option to authenticate", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

    before(function (done) {
      chai.passport
        .use(strategy)
        .fail(function (i, s) {
          info = i
          status = s
          done()
        })
        .req(function (req) {
          req.body = {}
        })
        .authenticate({
          badRequestMessage: "Something is wrong with this request",
        })
    })

    it("should fail with info and status", function () {
      expect(info).to.be.an("object")
      expect(info.message).to.equal("Something is wrong with this request")
      expect(status).to.equal(400)
    })
  })
})
