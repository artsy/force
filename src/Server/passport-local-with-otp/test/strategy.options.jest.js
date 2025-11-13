/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", () => {
  describe("handling a request without a body, but no username and password, with message option to authenticate", () => {
    const strategy = new Strategy((_username, _password, _otp, _done) => {
      throw new Error("should not be called")
    })

    let info, status

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .fail((i, s) => {
          info = i
          status = s
          done()
        })
        .request(req => {
          req.body = {}
        })
        .authenticate({
          badRequestMessage: "Something is wrong with this request",
        })
    })

    it("should fail with info and status", () => {
      expect(info.message).toEqual("Something is wrong with this request")
      expect(status).toEqual(400)
    })
  })
})
