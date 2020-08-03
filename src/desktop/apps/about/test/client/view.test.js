/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const rewire = require("rewire")
const sinon = require("sinon")
const Backbone = require("backbone")
const mediator = require("../../../../lib/mediator.coffee")

describe("AboutView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      sinon.spy(mediator, "trigger")
      return done()
    })
  )

  after(function () {
    mediator.trigger.restore()
    return benv.teardown()
  })

  beforeEach(function () {
    this.AboutView = rewire("../../client/view")
    sinon.stub(this.AboutView.prototype, "initialize")
    return (this.view = new this.AboutView({ el: $("body") }))
  })

  afterEach(function () {
    return this.view.initialize.restore()
  })

  return it("#signup opens auth modal", function () {
    const e = { preventDefault: sinon.stub() }
    this.AboutView.prototype.signup(e)
    e.preventDefault.called.should.be.true()
    mediator.trigger.args[0][0].should.containEql("open:auth")
    mediator.trigger.args[0][1].mode.should.containEql("signup")
    return mediator.trigger.args[0][1].copy.should.containEql(
      "Sign up to save artworks"
    )
  })
})
