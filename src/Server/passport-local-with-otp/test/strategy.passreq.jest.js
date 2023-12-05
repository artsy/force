/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("passing request to verify callback", function () {
    const strategy = new Strategy({ passReqToCallback: true }, function (
      req,
      username,
      password,
      otp,
      done
    ) {
      if (username == "johndoe" && password == "secret") {
        return done(
          null,
          { id: "1234" },
          { scope: "read", foo: req.headers["x-foo"] }
        )
      }
      return done(null, false)
    })

    let user, info

    // eslint-disable-next-line jest/no-done-callback
    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .success(function (u, i) {
          user = u
          info = i
          done()
        })
        .request(function (req) {
          req.headers["x-foo"] = "hello"

          req.body = {}
          req.body.username = "johndoe"
          req.body.password = "secret"
        })
        .authenticate()
    })

    it("should supply user", function () {
      expect(user.id).toEqual("1234")
    })

    it("should supply info", function () {
      expect(info.scope).toEqual("read")
    })

    it("should supply request header in info", function () {
      expect(info.foo).toEqual("hello")
    })
  })
})
