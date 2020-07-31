/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const FilterableListView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["filtersTemplate", "itemsTemplate", "headerTemplate", "itemTemplate"]
)

describe("FilterableListView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("with grouping", function () {
    describe("with some undefined groupings / bad data", function () {
      beforeEach(function () {
        const types = [
          "catalogue",
          "catalogue",
          "review",
          "interview",
          "review",
        ]
        const years = ["", undefined, "2005-01-01", "2003-01-01", "2010-01-01"]
        this.collection = new Backbone.Collection(
          _.times(5, i => fabricate("show", { type: types[i], year: years[i] }))
        )
        this.view = new FilterableListView({
          collection: this.collection,
          group_by: "year",
          filter_by: "type",
          filters: {
            catalogue: "Exhibition Catalogues",
            review: "Exhibition Reviews",
            interview: "Interviews",
            monograph: "Monographs",
            biography: "Biographies",
          },
        })
        return $("body").html(this.view.render().$el)
      })

      return it("renders a grouped list", function () {
        this.view.$(".filterable-list-item-header").length.should.equal(4)
        this.view
          .$(".filterable-list-item-header")
          .first()
          .text()
          .should.equal("2010")
        return this.view
          .$(".filterable-list-item-header")
          .last()
          .text()
          .should.equal("Unknown")
      })
    })

    return describe("with expected data", function () {
      beforeEach(function () {
        const types = [
          "catalogue",
          "catalogue",
          "review",
          "interview",
          "review",
        ]
        const years = [
          "2005-01-01",
          "2005-01-01",
          "2005-01-01",
          "2003-01-01",
          "2010-01-01",
        ]
        this.collection = new Backbone.Collection(
          _.times(5, i => fabricate("show", { type: types[i], year: years[i] }))
        )
        this.view = new FilterableListView({
          collection: this.collection,
          group_by: "year",
          filter_by: "type",
          filters: {
            catalogue: "Exhibition Catalogues",
            review: "Exhibition Reviews",
            interview: "Interviews",
            monograph: "Monographs",
            biography: "Biographies",
          },
        })
        return $("body").html(this.view.render().$el)
      })

      it("renders a grouped list", function () {
        this.view.$(".filterable-list-item-header").length.should.equal(3)
        this.view
          .$(".filterable-list-item-header")
          .first()
          .text()
          .should.equal("2010")
        return this.view
          .$(".filterable-list-item-header")
          .last()
          .text()
          .should.equal("2003")
      })

      it("renders the relevant filters", function () {
        this.view
          .$(".filterable-list-filter")
          .first()
          .text()
          .should.equal("All")
        this.view.$(".filterable-list-filter").first().hasClass("is-active")
        this.view
          .$(".filterable-list-filter")
          .first()
          .data("filter")
          .should.equal("all")
        return this.view
          .$(".filterable-list-filter")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql([
            "All",
            "Exhibition Catalogues",
            "Exhibition Reviews",
            "Interviews",
          ])
      })

      return it("filters the view when filters are clicked", function () {
        // Click interviews
        this.view.$('.filterable-list-filter[data-filter="interview"]').click()
        this.view
          .$('.filterable-list-filter[data-filter="interview"]')
          .hasClass("is-active")
        this.view.$(".filterable-list-filter.is-active").length.should.equal(1)
        this.view.$(".filterable-list-item-header").length.should.equal(1)
        this.view.$(".filterable-list-item").length.should.equal(1)
        this.view
          .$(".filterable-list-item")
          .data("value")
          .should.equal("interview")
        // Click reviews
        this.view.$('.filterable-list-filter[data-filter="review"]').click()
        this.view
          .$('.filterable-list-filter[data-filter="review"]')
          .hasClass("is-active")
        this.view.$(".filterable-list-filter.is-active").length.should.equal(1)
        this.view.$(".filterable-list-item-header").length.should.equal(2)
        this.view.$(".filterable-list-item").length.should.equal(2)
        return this.view
          .$(".filterable-list-item")
          .data("value")
          .should.equal("review")
      })
    })
  })

  return describe("without grouping", function () {
    beforeEach(function () {
      const types = ["catalogue", "catalogue", "review", "interview", "review"]
      this.collection = new Backbone.Collection(
        _.times(5, i => fabricate("show", { type: types[i] }))
      )
      this.view = new FilterableListView({
        collection: this.collection,
        filter_by: "type",
        filters: {
          catalogue: "Exhibition Catalogues",
          review: "Exhibition Reviews",
          interview: "Interviews",
          monograph: "Monographs",
          biography: "Biographies",
        },
      })
      return $("body").html(this.view.render().$el)
    })

    it("renders a flat list", function () {
      this.view.$(".filterable-list-item-header").length.should.equal(0)
      return this.view.$(".filterable-list-item").length.should.equal(5)
    })

    it("renders the relevant filters", function () {
      this.view.$(".filterable-list-filter").first().text().should.equal("All")
      this.view.$(".filterable-list-filter").first().hasClass("is-active")
      this.view
        .$(".filterable-list-filter")
        .first()
        .data("filter")
        .should.equal("all")
      return this.view
        .$(".filterable-list-filter")
        .map(function () {
          return $(this).text()
        })
        .get()
        .should.eql([
          "All",
          "Exhibition Catalogues",
          "Exhibition Reviews",
          "Interviews",
        ])
    })

    return it("filters the view when filters are clicked", function () {
      // Click interviews
      this.view.$('.filterable-list-filter[data-filter="interview"]').click()
      this.view
        .$('.filterable-list-filter[data-filter="interview"]')
        .hasClass("is-active")
      this.view.$(".filterable-list-filter.is-active").length.should.equal(1)
      this.view.$(".filterable-list-item").length.should.equal(1)
      this.view
        .$(".filterable-list-item")
        .data("value")
        .should.equal("interview")
      // Click reviews
      this.view.$('.filterable-list-filter[data-filter="review"]').click()
      this.view
        .$('.filterable-list-filter[data-filter="review"]')
        .hasClass("is-active")
      this.view.$(".filterable-list-filter.is-active").length.should.equal(1)
      this.view.$(".filterable-list-item").length.should.equal(2)
      return this.view
        .$(".filterable-list-item")
        .data("value")
        .should.equal("review")
    })
  })
})
