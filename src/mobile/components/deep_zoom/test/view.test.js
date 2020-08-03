/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const rewire = require("rewire")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const Artwork = require("../../../models/artwork")
const OpenSeadragon = () => ({
  addHandler: sinon.stub(),
})

describe("DeepZoomView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        OpenSeadragon,
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.model = new Artwork(fabricate("artwork"))
    this.OpenSeadragon = OpenSeadragon()
    const DeepZoomView = benv.requireWithJadeify(
      resolve(__dirname, "../view"),
      ["template"]
    )
    DeepZoomView.__set__("getScript", (x, cb) => cb())
    this.view = new DeepZoomView({ el: $("body"), model: this.model })
    return done()
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#render", () =>
    describe("when model#canDeepZoom is true", function () {
      beforeEach(function () {
        return this.view.render()
      })

      it("renders the template", function () {
        const html = this.view.$el.html()
        html.should.containEql("dz-spinner")
        return html.should.containEql("dz-close")
      })

      it("sets up the OpenSeadragon viewer", function () {
        return _.isObject(this.view.viewer).should.be.ok()
      })

      return describe("#postRender", () =>
        it("attaches a handler to the viewer that removes the loading state", function () {
          return this.view.viewer.addHandler.args[0][0].should.equal(
            "tile-drawn"
          )
        }))
    }))
})
