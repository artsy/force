/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork")
const ViewInRoomView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])

describe("ViewInRoomView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.artwork = new Artwork(fabricate("artwork", { width: 20 }))

    const $img = $("<img>")
      .width(200)
      .height(200)
      .attr("src", "foobar.jpg")
      .css({
        top: "200px",
        left: "200px",
      })

    this.view = new ViewInRoomView({
      $img,
      dimensions: "40 × 40 cm",
    })

    this.view.__render__()
    return this.view.cacheSelectors()
  })

  describe("#injectImage", function () {
    beforeEach(function () {
      return this.view.injectImage()
    })

    it("creates two copies of the passed in image", function () {
      this.view.$placeholder
        .attr("src")
        .should.equal(this.view.$img.attr("src"))

      return this.view.$artwork
        .attr("src")
        .should.equal(this.view.$img.attr("src"))
    })

    return it("positions the artwork", function () {
      const style = this.view.$artwork.attr("style")

      style.should.containEql("top")
      style.should.containEql("left")
      style.should.containEql("width")
      return style.should.containEql("height")
    })
  })

  describe("#roomScalingFactor", function () {
    it("returns a non-zero value to scale the room by", function () {
      this.view.$room.width(2000)
      this.view.$room.height(1000)
      this.view.$el.width = () => 640
      this.view.$el.height = () => 480

      return this.view.roomScalingFactor().should.equal(0.48)
    })

    return it("returns a non-zero value to scale the room by", function () {
      this.view.$room.width(2000)
      this.view.$room.height(1000)
      this.view.$el.width = () => 480
      this.view.$el.height = () => 640

      return this.view.roomScalingFactor().should.equal(0.64)
    })
  })

  describe("#artworkScalingFactor", () =>
    it("returns a non-zero factor to scale the artwork by", function () {
      this.view.$placeholder.width(200)
      this.view.getArtworkDimensions = () => [20, 20]

      return this.view.artworkScalingFactor().should.equal(0.22)
    }))

  return describe("#scalePlaceholder", function () {
    it("scales the placeholder and sets it at eye level if the significant dimension is less than 254", function () {
      this.view.$placeholder.css = sinon.stub()
      this.view.scalePlaceholder()

      Object.keys(this.view.$placeholder.css.args[0][0]).should.eql([
        "bottom",
        "marginBottom",
        "marginLeft",
        "transform",
      ])

      return this.view.$placeholder.css.args[0][0].bottom.should.equal(
        "957.099px"
      )
    })

    return it("scales the placeholder and sets it at ground level if the significant dimension is greater than 254", function () {
      this.view.$placeholder.css = sinon.stub()
      this.view.dimensions = "255 x 20 x 30cm"
      this.view.scalePlaceholder()

      Object.keys(this.view.$placeholder.css.args[0][0]).should.eql([
        "bottom",
        "marginLeft",
        "transform",
        "transformOrigin",
      ])

      return this.view.$placeholder.css.args[0][0].bottom.should.equal(
        "667.6669999999999px"
      )
    })
  })
})
