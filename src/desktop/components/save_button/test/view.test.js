const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const SaveButton = require("../view")
const mediator = require("../../../lib/mediator")
const { resolve } = require("path")

const model = new Backbone.Model({ id: "artwork" })
model.isSaved = sinon.stub()

describe("SaveButton", () =>
  describe("#save", function () {
    beforeEach(function (done) {
      benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          analytics: { track: sinon.stub() },
        })
        Backbone.$ = $
        this.view = new SaveButton({ saved: null, model, el: $("<a></a>") })
        done()
      })
    })

    afterEach(() => benv.teardown())

    it("triggers the register modal if theres no user", function () {
      sinon.spy(mediator, "trigger")
      this.view.$el.click()
      mediator.trigger.args[0][0].should.equal("open:auth")
      mediator.trigger.args[0][1].mode.should.equal("signup")
      mediator.trigger.restore()
    })

    describe("logged in behavior", function () {
      beforeEach(function (done) {
        benv.setup(() => {
          benv.expose({
            $: benv.require("jquery"),
            analytics: { track: sinon.stub() },
          })
          Backbone.$ = $
          const saved = new Backbone.Collection()
          saved.unsaveArtwork = sinon.stub()
          saved.saveArtwork = sinon.stub()
          this.view = new SaveButton({ saved, model, el: $("<a></a>") })
          done()
        })
      })

      afterEach(() => benv.teardown())

      it("saves the artwork if it is not in the collection", function () {
        this.view.model.isSaved = () => false
        this.view.$el.click()
        this.view.model.isSaved = () => true
        this.view.saved.trigger("add:artwork")
        this.view.saved.saveArtwork.called.should.be.ok()
        this.view.saved.saveArtwork.args[0][0].should.equal(model.id)
        this.view.$el.attr("data-state").should.equal("saved")
      })

      it("unsaves the artwork if it is in the collection", function () {
        this.view.model.isSaved = () => true
        this.view.$el.click()
        this.view.model.isSaved = () => false
        this.view.saved.trigger("remove:artwork")
        this.view.saved.unsaveArtwork.called.should.be.ok()
        this.view.saved.unsaveArtwork.args[0][0].should.equal(model.id)
        this.view.$el.attr("data-state").should.equal("unsaved")
      })
    })
  }))
