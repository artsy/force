/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Form = require("../index")
const { template } = require("./fixture")

describe("Form", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.model = new Backbone.Model()
    this.model.url = "/foo/bar"
    this.$form = $(template)
    return (this.form = new Form({ model: this.model, $form: this.$form }))
  })

  describe("#submitting", function () {
    it("returns false the first time it is called, true every time after", function () {
      this.form.submitting().should.be.false()
      this.form.submitting().should.be.true()
      this.form.submitting().should.be.true()
      return this.form.submitting().should.be.true()
    })

    return it("disables the button", function (done) {
      this.form.submitting()
      return _.defer(() =>
        _.defer(() => {
          this.$form.find("button").prop("disabled").should.be.true()
          return done()
        })
      )
    })
  })

  describe("#submit", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      return this.$form
        .find("button")
        .on("click", _.bind(this.form.submit, this.form))
    })

    afterEach(function () {
      Backbone.sync.restore()
      return this.$form.find("button").off("click")
    })

    it("submits the form", function () {
      Backbone.sync.called.should.be.false()
      this.$form.find("button").click()
      Backbone.sync.called.should.be.true()
      return Backbone.sync.args[0][1].url.should.equal("/foo/bar")
    })

    it("submits the form one time until actually resolved", function () {
      Backbone.sync.called.should.be.false()
      this.$form.find("button").click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.callCount.should.equal(1)
      this.$form.find("button").click()
      this.$form.find("button").click()
      this.$form.find("button").click()
      return Backbone.sync.callCount.should.equal(1)
    })

    it("submits indpendent of a UI event", function () {
      Backbone.sync.called.should.be.false()
      this.form.submit()
      return Backbone.sync.called.should.be.true()
    })

    it("passes on the options to the model", function (done) {
      this.form.submit(null, {
        success() {
          true.should.be.true()
          return done()
        },
      })
      return Backbone.sync.args[0][2].success()
    })

    return describe("error", function () {
      beforeEach(function () {
        Backbone.sync.restore()
        return sinon.stub(Backbone, "sync").yieldsTo("error")
      })

      return it("moves the form into the error state; reenables the form", function () {
        Backbone.sync.called.should.be.false()
        this.$form.find("button").click()
        Backbone.sync.called.should.be.true()
        Backbone.sync.callCount.should.equal(1)
        this.$form.find("button").data("state").should.equal("error")
        this.$form.find("button").prop("disabled").should.be.false()
        this.$form.find("button").click()
        return Backbone.sync.callCount.should.equal(2)
      })
    })
  })

  return describe("#reenable", function () {
    it("reenables the form", function () {
      this.form.submitting().should.be.false()
      this.form.submitting().should.be.true()
      this.form.reenable()
      this.form.submitting().should.be.false()
      return this.form.submitting().should.be.true()
    })

    return it("removes the disabled attr from the button", function (done) {
      this.form.submitting()
      return _.defer(() =>
        _.defer(() => {
          this.$form.find("button").prop("disabled").should.be.true()
          this.form.reenable()
          this.$form.find("button").prop("disabled").should.be.false()
          return done()
        })
      )
    })
  })
})
