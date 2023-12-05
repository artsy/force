/* eslint-disable jest/no-done-callback */
/* jshint expr: true */

const chai = require("chai")
const Strategy = require("../lib/strategy")

// FIXME:
describe.skip("Strategy", function () {
  describe("when otp needs to be verified", function () {
    describe("handling a request with valid credentials in body", function () {
      const strategy = new Strategy(function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret" && otp == "123456") {
          return done(null, { id: "1234" }, { scope: "read" })
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
            req.body = {}
            req.body.username = "johndoe"
            req.body.password = "secret"
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

    describe("handling a request with valid credentials in query", function () {
      const strategy = new Strategy(function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret" && otp == "123456") {
          return done(null, { id: "1234" }, { scope: "read" })
        }
        return done(null, false)
      })

      let user, info

      beforeAll(function (done) {
        chai.passport
          .use(strategy)
          .success(function (u, i) {
            user = u
            info = i
            done()
          })
          .request(function (req) {
            req.query = {}
            req.query.username = "johndoe"
            req.query.password = "secret"
            req.query.otp = "123456"
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

  describe("when otp does not need to be verified", function () {
    describe("handling a request with valid username and password (but no otp) in body", function () {
      const strategy = new Strategy(function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret") {
          return done(null, { id: "1234" }, { scope: "read" })
        }
        return done(null, false)
      })

      let user, info

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
    })

    describe("handling a request with valid username and password (but no otp) in query", function () {
      const strategy = new Strategy(function (username, password, otp, done) {
        if (username == "johndoe" && password == "secret") {
          return done(null, { id: "1234" }, { scope: "read" })
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
            req.query = {}
            req.query.username = "johndoe"
            req.query.password = "secret"
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

  describe("handling a request without a body", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

    beforeAll(function (done) {
      chai.passport
        .use(strategy)
        .fail(function (i, s) {
          info = i
          status = s
          done()
        })
        .authenticate()
    })

    it("should fail with info and status", function () {
      expect(info.message).toEqual("Missing credentials")
      expect(status).toEqual(400)
    })
  })

  describe("handling a request with a body, but no username and password", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

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
        .authenticate()
    })

    it("should fail with info and status", function () {
      expect(info.message).toEqual("Missing credentials")
      expect(status).toEqual(400)
    })
  })

  describe("handling a request with a body, but no password", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

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
          req.body.username = "johndoe"
        })
        .authenticate()
    })

    it("should fail with info and status", function () {
      expect(info.message).toEqual("Missing credentials")
      expect(status).toEqual(400)
    })
  })

  describe("handling a request with a body, but no username", function () {
    const strategy = new Strategy(function (username, password, otp, done) {
      throw new Error("should not be called")
    })

    let info, status

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
          req.body.password = "secret"
        })
        .authenticate()
    })

    it("should fail with info and status", function () {
      expect(info.message).toEqual("Missing credentials")
      expect(status).toEqual(400)
    })
  })
})
