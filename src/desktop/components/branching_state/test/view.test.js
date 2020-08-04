/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const State = require("../index")
const StateView = require("../view")

describe("StateView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    let FirstView, SecondView, ThirdView
    this.FirstView = FirstView = class FirstView extends Backbone.View {}
    this.SecondView = SecondView = class SecondView extends Backbone.View {}
    this.ThirdView = ThirdView = class ThirdView extends Backbone.View {}

    for (let view of Array.from(
      (this.views = [FirstView, SecondView, ThirdView])
    )) {
      sinon.stub(view.prototype, "render", function () {
        return this
      })
      sinon.stub(view.prototype, "remove")
    }

    this.state = new State({ steps: ["first", "second", "noview", "third"] })

    return (this.stateView = new StateView({
      state: this.state,
      views: {
        first: FirstView,
        second: SecondView,
        third: ThirdView,
      },
    }))
  })

  afterEach(function () {
    return (() => {
      const result = []
      for (let view of Array.from(this.views)) {
        view.prototype.render.restore()
        result.push(view.prototype.remove.restore())
      }
      return result
    })()
  })

  return it("constructs and tearsdown views following the path determined by the state object", function () {
    this.stateView.render()

    this.stateView.view.constructor.name.should.equal("FirstView")
    this.FirstView.prototype.remove.called.should.be.false()
    this.FirstView.prototype.render.called.should.be.true()

    this.state.next()

    this.stateView.view.constructor.name.should.equal("SecondView")
    this.FirstView.prototype.remove.called.should.be.true()
    this.SecondView.prototype.remove.called.should.be.false()
    this.SecondView.prototype.render.called.should.be.true()

    // It also works on steps without views
    this.state.on("next", step => {
      if (step === "noview") {
        step.should.equal("noview")
        return this.state.next()
      }
    })

    this.state.next()

    this.stateView.view.constructor.name.should.equal("ThirdView")
    this.SecondView.prototype.remove.called.should.be.true()
    this.ThirdView.prototype.remove.called.should.be.false()
    this.ThirdView.prototype.render.called.should.be.true()

    this.state.next()

    // No where to go, re-renders the ThirdView
    this.stateView.view.constructor.name.should.equal("ThirdView")
    this.ThirdView.prototype.remove.called.should.be.true()
    return this.ThirdView.prototype.render.called.should.be.true()
  })
})
