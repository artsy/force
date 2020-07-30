/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const errorHandler = rewire("../../../lib/middleware/error_handler")
const { IpDeniedError } = require("express-ipfilter")

describe("errorHandler", function () {
  beforeEach(function () {
    this.renderStub = { render: sinon.stub() }
    this.res = {
      status: sinon.stub().returns(this.renderStub),
    }
    return (this.err = {
      status: 420,
      message: "When they go low, we go high",
      stack: "mad fat stacks",
    })
  })

  it("invokes the error handler template with the right parameters (and the right status code for the page)", function () {
    errorHandler.__set__("NODE_ENV", "development")
    errorHandler(this.err, {}, this.res, {})
    this.res.status.args[0][0].should.equal(420)
    this.renderStub.render.args[0][0].should.containEql(
      "desktop/components/error_handler/index.jade"
    )
    this.renderStub.render.args[0][1].message.should.equal(
      "When they go low, we go high"
    )
    this.renderStub.render.args[0][1].code.should.equal(420)
    return this.renderStub.render.args[0][1].detail.should.equal(
      "mad fat stacks"
    )
  })

  it("passes undefined in production", function () {
    errorHandler.__set__("NODE_ENV", "production")
    errorHandler(this.err, {}, this.res, {})
    this.res.status.args[0][0].should.equal(420)
    this.renderStub.render.args[0][0].should.containEql(
      "desktop/components/error_handler/index.jade"
    )
    _.isUndefined(this.renderStub.render.args[0][1].message).should.be.ok()
    this.renderStub.render.args[0][1].code.should.equal(420)
    return _.isUndefined(
      this.renderStub.render.args[0][1].detail
    ).should.be.ok()
  })

  return it("returns a 401 when an IP is denied", function () {
    errorHandler(new IpDeniedError("You've been blocked"), {}, this.res, {})
    this.res.status.args[0][0].should.equal(401)
    return this.renderStub.render.args[0][1].code.should.equal(401)
  })
})
