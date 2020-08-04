/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const FlickityZoomSequence = require("../index")

describe("FlickityZoomSequence", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.flickity = { select: sinon.stub() }
    return (this.seq = new FlickityZoomSequence(this.flickity))
  })

  describe("#click", () =>
    it("engages the clicked mode", function () {
      this.seq.clicked.should.be.false()
      this.seq.click(null, null, null, 2)
      this.seq.clicked.should.be.true()
      return this.flickity.select.args[0][0].should.equal(2)
    }))

  return describe("#select", function () {
    beforeEach(function () {
      sinon.stub(this.seq, "zoom").returns({ view: new Backbone.View() })
      return sinon.stub(this.seq, "src").returns("foobar.jpg")
    })

    afterEach(function () {
      this.seq.zoom.restore()
      return this.seq.src.restore()
    })

    it("opens the modal if clicked is engaged", function () {
      this.seq.select()
      ;(this.seq.modal === undefined).should.be.true()
      this.seq.clicked = true
      this.seq.select()
      return (this.seq.modal === undefined).should.be.false()
    })

    return it("turns off clicked mode when modal is closed via UI event", function () {
      this.seq.clicked = true
      this.seq.select()
      this.seq.clicked.should.be.true()
      this.seq.modal.view.trigger("closed", null) // Synthetic close
      this.seq.clicked.should.be.true() // Reamins true
      this.seq.modal.view.trigger("closed", { target: "existy" }) // UI event close
      return this.seq.clicked.should.be.false()
    })
  })
})
