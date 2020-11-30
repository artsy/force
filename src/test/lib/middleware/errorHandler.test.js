import _ from "lodash"
import sinon from "sinon"
import rewire from "rewire"
import { IpDeniedError } from "express-ipfilter"
const rewiredErrorHandlerMiddleware = rewire(
  "../../../lib/middleware/errorHandler"
)
const { errorHandlerMiddleware } = rewiredErrorHandlerMiddleware

describe("errorHandler", function () {
  beforeEach(function () {
    this.renderStub = { render: sinon.stub() }
    this.res = {
      status: sinon.stub().returns(this.renderStub),
    }
    this.err = {
      status: 420,
      message: "When they go low, we go high",
      stack: "mad fat stacks",
    }
  })

  it("invokes the error handler template with the right parameters (and the right status code for the page)", function () {
    rewiredErrorHandlerMiddleware.__set__("NODE_ENV", "development")
    errorHandlerMiddleware(this.err, {}, this.res, {})
    this.res.status.args[0][0].should.equal(420)
    this.renderStub.render.args[0][0].should.containEql(
      "desktop/components/error_handler/index.jade"
    )
    this.renderStub.render.args[0][1].message.should.equal(
      "When they go low, we go high"
    )
    this.renderStub.render.args[0][1].code.should.equal(420)
    this.renderStub.render.args[0][1].detail.should.equal("mad fat stacks")
  })

  it("passes undefined in production", function () {
    rewiredErrorHandlerMiddleware.__set__("NODE_ENV", "production")
    errorHandlerMiddleware(this.err, {}, this.res, {})
    this.res.status.args[0][0].should.equal(420)
    this.renderStub.render.args[0][0].should.containEql(
      "desktop/components/error_handler/index.jade"
    )
    _.isUndefined(this.renderStub.render.args[0][1].message).should.be.ok()
    this.renderStub.render.args[0][1].code.should.equal(420)
    _.isUndefined(this.renderStub.render.args[0][1].detail).should.be.ok()
  })

  it("returns a 401 when an IP is denied", function () {
    errorHandlerMiddleware(
      new IpDeniedError("You've been blocked"),
      {},
      this.res,
      {}
    )
    this.res.status.args[0][0].should.equal(401)
    this.renderStub.render.args[0][1].code.should.equal(401)
  })
})
