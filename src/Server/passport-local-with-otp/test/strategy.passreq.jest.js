/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", () => {
  describe("passing request to verify callback", () => {
    const strategy = new Strategy(
      { passReqToCallback: true },
      (req, username, password, _otp, done) => {
        if (username === "johndoe" && password === "secret") {
          return done(
            null,
            { id: "1234" },
            { scope: "read", foo: req.headers["x-foo"] },
          )
        }
        return done(null, false)
      },
    )

    let user, info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(done => {
      chai.passport
        .use(strategy)
        .success((u, i) => {
          user = u
          info = i
          done()
        })
        .request(req => {
          req.headers["x-foo"] = "hello"

          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
        })
        .authenticate()
    })

    it("should supply user", () => {
      expect(user.id).toEqual("1234")
    })

    it("should supply info", () => {
      expect(info.scope).toEqual("read")
    })

    it("should supply request header in info", () => {
      expect(info.foo).toEqual("hello")
    })
  })
})
