/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")

describe("Logger", function () {
  beforeEach(function () {
    this.Logger = rewire("../index")
    this.Cookies = this.Logger.__get__("Cookies")

    const store = {}
    this.Cookies.set = (name, value) => (store[name] = value)
    this.Cookies.get = name => store[name]

    return (this.logger = new this.Logger("test-logger"))
  })

  it("initializes the value as empty array", function () {
    return this.logger.get().should.eql([])
  })

  it("logs things", function () {
    this.logger.log("foo")
    this.logger.get().should.eql(["foo"])
    this.logger.log("bar")
    this.logger.get().should.eql(["foo", "bar"])
    this.logger.log("baz")
    this.logger.get().should.eql(["foo", "bar", "baz"])

    this.logger.log("foo")
    return this.logger.get().should.eql(["foo", "bar", "baz"])
  })

  it("logs things across instances of the same name", function () {
    this.logger.log("foo")
    this.logger.get().should.eql(["foo"])

    const logger = new this.Logger("test-logger")
    const otherLogger = new this.Logger("other-test-logger")

    otherLogger.get().should.eql([])

    logger.get().should.eql(["foo"])

    logger.log("bar")
    this.logger.get().should.eql(["foo", "bar"])

    return otherLogger.get().should.eql([])
  })

  it("unlogs things", function () {
    this.logger.log("foo")
    this.logger.log("bar")
    this.logger.log("baz")
    this.logger.get().should.eql(["foo", "bar", "baz"])
    this.logger.unlog("bar")
    return this.logger.get().should.eql(["foo", "baz"])
  })

  describe("#hasLogged", function () {
    it("tells you if you logged something or not", function () {
      this.logger.log("foo")
      this.logger.log("bar")
      this.logger.get().should.eql(["foo", "bar"])

      this.logger.hasLogged("foo").should.be.true()
      this.logger.hasLogged("bar").should.be.true()
      return this.logger.hasLogged("baz").should.be.false()
    })

    return it("tells you if you logged a list of things", function () {
      this.logger.log("foo")
      this.logger.log("bar")

      this.logger.hasLogged("foo", "bar").should.be.true()
      return this.logger.hasLogged("foo", "bar", "baz").should.be.false()
    })
  })

  return describe("#hasLoggedThisSession, #hasLoggedAnythingThisSession", function () {
    beforeEach(function () {
      return sinon.stub(this.logger, "get").returns(["foo", "bar"])
    })

    afterEach(function () {
      return this.logger.get.restore()
    })

    return it("maintains a separate array of steps for logging things seen only this go around", function () {
      this.logger.hasLogged("foo", "bar").should.be.true()
      this.logger.hasLogged("baz").should.be.false()
      this.logger.hasLoggedAnythingThisSession().should.be.false()
      this.logger.hasLoggedThisSession("foo").should.be.false()

      this.logger.log("baz")

      this.logger.hasLoggedAnythingThisSession().should.be.true()
      this.logger.hasLogged("baz").should.be.true()
      return this.logger.hasLoggedThisSession("baz").should.be.true()
    })
  })
})
