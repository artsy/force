/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")

describe("ModalView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const filename = path.resolve(__dirname, "../view.coffee")
      const ModalView = benv.requireWithJadeify(filename, ["template"])

      this.triggerSpy = sinon.stub()
      ModalView.__set__("mediator", { on: sinon.stub() })

      this.view = new ModalView({
        el: $("body"),
      })

      this.view.remove = sinon.stub()
      sinon.stub(_, "delay", cb => cb())
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return _.delay.restore()
  })

  return describe("#fadeOut", () =>
    it("removes the view after is-fadeout is applied", function (done) {
      this.view.fadeOut()

      this.view.remove.called.should.equal(true)
      return done()
    }))
})
