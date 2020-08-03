/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const sd = require("sharify").data
const mediator = require("../../../lib/mediator")
const rewire = require("rewire")
const { resolve } = require("path")

describe("PublishModal", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.PublishModal = benv.require(resolve(__dirname, "../view.coffee"))
      this.PublishModal.__set__("Cookies", {
        get: (this.cookie = sinon.stub()),
        set() {},
      })
      sinon.stub(this.PublishModal.prototype, "initialize")
      return done()
    })
  })

  after(() => benv.teardown())

  return describe("#makePublic", function () {
    beforeEach(function () {
      this.e = $.Event("click")
      this.close = sinon.stub(this.PublishModal.prototype, "close")
      this.trigger = sinon.stub(mediator, "trigger")
      return (this.view = new this.PublishModal())
    })

    afterEach(function () {
      this.close.restore()
      return this.trigger.restore()
    })

    it("triggers the publishEvent event and close the modal after making public", function () {
      this.view.publishEvent = "foo:bar"
      this.view.makePublic(this.e)
      this.trigger.args[0][0].should.equal("foo:bar")
      return this.close.calledOnce.should.be.ok()
    })

    it("closes the modal after canceling", function () {
      this.view.cancel(this.e)
      return this.close.calledOnce.should.be.ok()
    })

    return describe("cookie behavior", function () {
      beforeEach(function () {
        this.cookie.returns(true)
        sinon.stub(this.PublishModal.prototype, "remove")
        return this.PublishModal.prototype.initialize.restore()
      })

      return it("if cancelled then the modal should not present itself again", function () {
        this.view = new this.PublishModal({
          persist: true,
          name: "foobar",
          publishEvent: "foo:bar",
          message: "Foo Bar",
        })
        return this.PublishModal.prototype.remove.called.should.be.true()
      })
    })
  })
})
