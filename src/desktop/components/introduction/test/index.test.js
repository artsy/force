/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const IntroductionView = require("../index")

describe("IntroductionView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("#render", function () {
    beforeEach(function () {
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", { introduction: "Foo is bar" })
      return (this.view = new IntroductionView())
    })

    afterEach(() => Backbone.sync.restore())

    return it("renders the introduction", function () {
      return this.view.$el.html().should.equal("Foo is bar")
    })
  })

  describe("#syncing, #update", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      this.view = new IntroductionView()
      return this.view.model.trigger("request")
    }) // What's up with this not triggering in specs?

    afterEach(() => Backbone.sync.restore())

    it("requests an updated introduction", () =>
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/me/inquiry_introduction"
      ))

    it("displays a spinner", function () {
      return this.view.$el.html().should.containEql("loading-spinner")
    })

    it("removes the spinner and rerenders when sync is complete", function () {
      Backbone.sync.args[0][2].success({ introduction: "Foo is baz" })
      this.view.$el.html().should.not.containEql("loading-spinner")
      return this.view.$el.html().should.equal("Foo is baz")
    })

    return it("only attempts one update at a time", function () {
      this.view.update()
      this.view.update()
      Backbone.sync.callCount.should.equal(1)
      Backbone.sync.args[0][2].success({})
      this.view.update()
      this.view.update()
      Backbone.sync.callCount.should.equal(2)
      Backbone.sync.args[0][2].error({})
      this.view.update()
      this.view.update()
      return Backbone.sync.callCount.should.equal(3)
    })
  })

  return describe("XSS", function () {
    beforeEach(function () {
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", { introduction: "Foo is bar" })
      return (this.view = new IntroductionView())
    })

    afterEach(() => Backbone.sync.restore())

    return it("prevents HTML from being injected", function () {
      Backbone.sync.args[0][2].success({
        introduction: 'Foo is baz<script>alert("hi");</script>',
      })
      return this.view.$el
        .html()
        .should.equal('Foo is baz&lt;script&gt;alert("hi");&lt;/script&gt;')
    })
  })
})
