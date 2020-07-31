/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const RelatedLinksView = require("../view")
const Genes = require("../../../collections/genes")

describe("RelatedLinksView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("with a pre-fetched collection", function () {
    beforeEach(function () {
      return (this.collection = new Genes(_.times(5, () => fabricate("gene"))))
    })

    describe("with bare attributes", function () {
      beforeEach(function () {
        return (this.view = new RelatedLinksView({
          collection: this.collection,
          displayKey: "name",
          displayValue: "id",
        }))
      })

      return it("generates links HTML", function () {
        const html = this.view.render().$el.html()
        html.should.containEql('<a href="pop-art')
        html.should.containEql(">Pop Art</a>, ")
        return html.should.containEql("</a></div>")
      })
    })

    describe("with functions", function () {
      beforeEach(function () {
        return (this.view = new RelatedLinksView({
          collection: this.collection,
          displayKey: "name",
          displayValue: "href",
        }))
      })

      return it("generates links HTML", function () {
        const html = this.view.render().$el.html()
        html.should.containEql('<a href="/gene/pop-art')
        html.should.containEql(">Pop Art</a>, ")
        return html.should.containEql("</a></div>")
      })
    })

    return describe("with custom templates", function () {
      beforeEach(function () {
        class GeneLinksView extends RelatedLinksView {}
        GeneLinksView.prototype.headerTemplate = _.template(
          "<h2>Related Genes</h2>"
        )
        GeneLinksView.prototype.wrapperTemplate = _.template(
          '<div class="related-genes-links"><%= links %></div>'
        )
        return (this.view = new GeneLinksView({
          collection: this.collection,
          displayKey: "name",
          displayValue: "href",
        }))
      })

      return it("generates links HTML", function () {
        const html = this.view.render().$el.html()
        html.should.containEql(
          '<h2>Related Genes</h2><div class="related-genes-links"><a href="'
        )
        html.should.containEql('<a href="/gene/pop-art')
        html.should.containEql(">Pop Art</a>, ")
        return html.should.containEql("</a></div>")
      })
    })
  })

  return describe("with a collection not yet fetched", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      this.collection = new Genes()
      this.response = _.times(5, () => fabricate("gene"))
      return (this.view = new RelatedLinksView({
        collection: this.collection,
        displayKey: "name",
        displayValue: "href",
      }))
    })

    afterEach(() => Backbone.sync.restore())

    it("renders after collection sync", function () {
      this.collection.fetch()
      Backbone.sync.args[0][2].success(this.response)
      const html = this.view.$el.html()
      html.should.containEql('<a href="/gene/pop-art')
      html.should.containEql(">Pop Art</a>, ")
      return html.should.containEql("</a></div>")
    })

    return describe("when fetch returns no results", function () {
      beforeEach(function () {
        return (this.removeSpy = sinon.spy(
          RelatedLinksView.prototype,
          "remove"
        ))
      })

      afterEach(function () {
        return this.view.remove.restore()
      })

      return it("renders nothing + removes itself", function () {
        this.collection.fetch()
        Backbone.sync.args[0][2].success()
        this.view.remove.called.should.be.true()
        return this.view.$el.html().should.be.empty
      })
    })
  })
})
