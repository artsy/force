/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const benv = require("benv")
const { resolve } = require("path")
const sinon = require("sinon")

describe("Location Search", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        google: {
          maps: {
            event: { addListener: sinon.stub() },
            places: { Autocomplete: sinon.stub() },
          },
        },
      })
      Backbone.$ = $
      benv.render(resolve(__dirname, "../template.jade"), () => {})
      ;({
        LocationSearchView: this.LocationSearchView,
      } = benv.requireWithJadeify(resolve(__dirname, "../index"), ["template"]))
      return done()
    })
  })

  afterEach(() => benv.teardown())

  beforeEach(function () {
    return (this.view = new this.LocationSearchView())
  })

  it("should render the template", function () {
    return this.view.render().$el.html().should.containEql("Enter your city")
  })

  it("attach a listener", function () {
    const spy = sinon.spy(this.view, "attach")
    this.view.render()
    return spy.called.should.be.ok()
  })

  return it("should announce it's location", function () {
    const spy = sinon.spy()
    this.view.on("location:update", spy)
    this.view.announce({})
    return spy.called.should.be.ok()
  })
})
