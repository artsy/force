/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("handling a request without a body, but no username and password, with message option to authenticate", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .fail(function (i, s) {
          info = i
          status = s
          done()
        })
        .request(function (req) {
          req.body = {}
        })
        .authenticate({
          badRequestMessage: "Something is wrong with this request",
        })
    })

    it("should fail with info and status", function () {
      expect(info.message).toEqual("Something is wrong with this request")
      expect(status).toEqual(400)
    })
  })
})
