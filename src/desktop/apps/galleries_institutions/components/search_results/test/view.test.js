/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const rewire = require("rewire")
const Backbone = require("backbone")
const ResultsView = rewire("../view.coffee")
const PartnerCellView = benv.requireWithJadeify(
  require.resolve("../../partner_cell/view"),
  ["template"]
)

describe("ResultsView", function () {
  const nPartners = range =>
    range.map(i => ({
      name: "Gallery" + i,
      id: "gallery-" + i,
      initials: "IDK",
      locations: [{ city: "New York" }],

      profile: {
        id: "gallery-" + i,
        href: "/gallery-" + i,
        image: { cropped: { url: `/gallery-${i}.jpeg` } },
      },
    }))

  before(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      ResultsView.__set__("PartnerCellView", PartnerCellView)
      $.onInfiniteScroll = sinon.stub()
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.filterPartners = new Backbone.Model()
    this.params = new Backbone.Model()
    $("body").html(`\
<div class=galleries-institutions-results-grid></div>
<div class=galleries-institutions-spinner>
  <div class=loading-spinner></div>
</div>'\
`)
    this.view = new ResultsView({
      params: this.params,
      filterPartners: this.filterPartners,
      el: "body",
    })

    return (this.view.fetch = sinon.stub())
  })

  describe("#render", function () {
    beforeEach(function () {
      return (this.partners = nPartners(_.range(1, 11)))
    })

    it("sets state for not all fetched yet", function () {
      this.filterPartners.allFetched = false
      this.view.render(this.partners)
      return this.view.$el.attr("data-state").should.equal("")
    })

    it("sets state for all fetched", function () {
      this.filterPartners.allFetched = true
      this.view.render(this.partners)
      return this.view.$el.attr("data-state").should.equal("finished-paging")
    })

    return it("renders grid", function () {
      this.view.render(this.partners)

      this.view.$gridContainer.children().length.should.equal(10)
      const names1 = _.pluck(this.partners, "name")
      this.view
        .$(".partner-cell-name")
        .map(function () {
          return $(this).text()
        })
        .get()
        .should.eql(names1)

      const partnersPage2 = nPartners(_.range(11, 21))
      const names2 = _.pluck(partnersPage2, "name")

      this.view.render(partnersPage2)
      this.view.$gridContainer.children().length.should.equal(20)
      return this.view
        .$(".partner-cell-name")
        .map(function () {
          return $(this).text()
        })
        .get()
        .should.eql(names1.concat(names2))
    })
  })

  describe("#reset", () =>
    it("clears the ui and starts a new fetch", function () {
      this.view.$gridContainer.html("<div></div>")
      this.view.reset()

      this.view.$gridContainer.html().should.equal("")
      return this.view.fetch.calledOnce.should.be.true()
    }))

  return describe("#fetchNextPage", function () {
    beforeEach(function () {
      return (this.params.hasSelection = sinon.stub())
    })

    it("does not fetch if no params selected", function () {
      this.params.hasSelection.returns(false)
      this.filterPartners.allFetched = false
      this.view.fetchNextPage()
      return this.view.fetch.called.should.be.false()
    })

    it("does not fetch if all results are fetched", function () {
      this.params.hasSelection.returns(true)
      this.filterPartners.allFetched = true
      this.view.fetchNextPage()
      return this.view.fetch.called.should.be.false()
    })

    return it("fetches otherwise", function () {
      this.params.hasSelection.returns(true)
      this.filterPartners.allFetched = false
      this.view.fetchNextPage()
      return this.view.fetch.calledOnce.should.be.true()
    })
  })
})
