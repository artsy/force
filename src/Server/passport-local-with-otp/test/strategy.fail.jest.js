/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", () => {
  describe("failing authentication", () => {
    const strategy = new Strategy((_username, _password, _otp, done) =>
      done(null, false)
    )

    let info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .fail(i => {
          info = i
          done()
        })
        .request(req => {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should fail", () => {
      expect(info).toBeUndefined()
    })
  })

  describe("failing authentication with info", () => {
    const strategy = new Strategy((_username, _password, _otp, done) =>
      done(null, false, { message: "authentication failed" })
    )

    let info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .fail(i => {
          info = i
          done()
        })
        .request(req => {
          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should fail", () => {
      expect(info.message).toEqual("authentication failed")
    })
  })
})
