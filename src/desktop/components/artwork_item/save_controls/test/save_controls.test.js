/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const SaveControls = require("../view")
const mediator = require("../../../../lib/mediator")
const { resolve } = require("path")

const model = new Backbone.Model({ id: "artwork" })
model.isSaved = sinon.stub()
model.href = () => "/foo/bar"

const artworkCollection = new Backbone.Collection()
artworkCollection.unsaveArtwork = sinon.stub()
artworkCollection.saveArtwork = sinon.stub()

describe("SaveControls", () =>
  describe("#save", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        return benv.render(resolve(__dirname, "../template.jade"), {}, () => {
          this.view = new SaveControls({
            artworkCollection: null,
            model,
            el: $(".overlay-container"),
          })
          return done()
        })
      })
    })

    afterEach(() => benv.teardown())

    it("triggers the register modal if theres no artworkCollection", function () {
      sinon.spy(mediator, "trigger")
      this.view.$(".overlay-button-save").click()
      mediator.trigger.args[0][0].should.equal("open:auth")
      mediator.trigger.args[0][1].mode.should.equal("signup")
      return mediator.trigger.restore()
    })

    return describe("logged in behavior", function () {
      beforeEach(function (done) {
        return benv.setup(() => {
          benv.expose({ $: benv.require("jquery") })
          Backbone.$ = $
          return benv.render(resolve(__dirname, "../template.jade"), {}, () => {
            this.view = new SaveControls({
              artworkCollection,
              model,
              el: $(".overlay-container"),
            })
            return done()
          })
        })
      })

      afterEach(() => benv.teardown())

      it("saves the artwork if it is not in the collection", function () {
        this.view.model.isSaved = () => false
        this.view.$button.click()
        this.view.model.isSaved = () => true
        this.view.artworkCollection.trigger("add:artwork")
        this.view.artworkCollection.saveArtwork.called.should.be.ok()
        this.view.artworkCollection.saveArtwork.args[0][0].should.equal(
          model.id
        )
        return this.view.$button.attr("data-state").should.equal("saved")
      })

      it("unsaves the artwork if it is in the collection", function () {
        this.view.model.isSaved = () => true
        this.view.$button.click()
        this.view.model.isSaved = () => false
        this.view.artworkCollection.trigger("remove:artwork")
        this.view.artworkCollection.unsaveArtwork.called.should.be.ok()
        this.view.artworkCollection.unsaveArtwork.args[0][0].should.equal(
          model.id
        )
        return this.view.$button.attr("data-state").should.equal("unsaved")
      })

      return xit("shows the control if the work is saved", function () {
        this.view.model.isSaved = () => true
        return this.view
          .$(".overlay-button-save")
          .is(":visible")
          .should.be.true()
      })
    })
  }))
