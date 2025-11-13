const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", () => {
  describe("encountering an error during verification", () => {
    const strategy = new Strategy((_username, _password, _otp, done) => {
      done(new Error("something went wrong"))
    })

    let err

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .error(e => {
          err = e
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

    it("should error", () => {
      expect(err.message).toContain("something went wrong")
    })
  })

  describe("encountering an exception during verification", () => {
    const strategy = new Strategy((_username, _password, _otp, _done) => {
      throw new Error("something went horribly wrong")
    })

    let err

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .error(e => {
          err = e
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

    it("should error", () => {
      expect(err.message).toContain("something went horribly wrong")
    })
  })
})
