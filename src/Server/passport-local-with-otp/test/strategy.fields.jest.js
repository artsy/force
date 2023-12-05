/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("handling a request with valid credentials in body using custom field names", function () {
    const strategy = new Strategy(
      { usernameField: "userid", passwordField: "passwd", otpField: "otp" }, // pragma: allowlist secret
      function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret" && otp == "123456") {
          return done(null, { id: "1234" }, { scope: "read" })
        }
        return done(null, false)
      }
    )

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
          req.body = {}
          req.body.userid = "johndoe"
          req.body.passwd = "secret"
          req.body.otp = "123456"
        })
        .authenticate()
    })

    it("should supply user", function () {
      expect(user.id).toEqual("1234")
    })

    it("should supply info", function () {
      expect(info.scope).toEqual("read")
    })
  })

  describe("handling a request with valid credentials in body using custom field names with object notation", function () {
    const strategy = new Strategy(
      {
        usernameField: "user[username]", // pragma: allowlist secret
        passwordField: "user[password]", // pragma: allowlist secret
        otpField: "user[otp]",
      },
      function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret" && otp == "123456") {
          return done(null, { id: "1234" }, { scope: "read" })
        }
        return done(null, false)
      }
    )

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
          req.body = {}
          req.body.user = {}
          req.body.user.username = "johndoe"
          req.body.user.password = "secret"
          req.body.user.otp = "123456"
        })
        .authenticate()
    })

    it("should supply user", function () {
      expect(user.id).toEqual("1234")
    })

    it("should supply info", function () {
      expect(info.scope).toEqual("read")
    })
  })
})
