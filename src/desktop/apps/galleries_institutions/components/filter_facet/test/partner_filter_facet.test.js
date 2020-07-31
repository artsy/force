/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")

const PartnerFilterFacet = rewire("../partner_filter_facet.coffee")

describe("PartnerFilterFacet", function () {
  const aggreationsUpdate = {
    location: {
      total: 10,
      countItems: [
        { id: "location-1", name: "Location 1", count: 5 },
        { id: "location-2", name: "Location 2", count: 3 },
        { id: "location-5", name: "Location 5", count: 2 },
      ],
    },
  }

  beforeEach(function () {
    this.defaultItems = [
      {
        id: "location-1",
        name: "Location 1",
        extra_key: "something",
      },
      {
        id: "location-2",
        name: "Location 2",
        extra_key: "something",
      },
      {
        id: "location-3",
        name: "Location 3",
        extra_key: "something",
      },
      {
        id: "location-4",
        name: "Location 4",
        extra_key: "something",
      },
      {
        id: "st-petersburg",
        name: "St. Petersburg",
        extra_key: "something",
      },
    ]

    this.aggregations = new Backbone.Model()
    return (this.facet = new PartnerFilterFacet({
      allItems: this.defaultItems,
      facetName: "location",
      displayName: "Locations",
      aggregations: this.aggregations,
      synonyms: [["st", "saint"]],
    }))
  })

  describe("#initialize", function () {
    it("creates the item for all suggestions", function () {
      return this.facet.allItemsSuggestion.name.should.equal("All Locations")
    })
    return it("stores the defaultItems", function () {
      this.facet.allItems.should.deepEqual([
        { id: "location-1", name: "Location 1" },
        { id: "location-2", name: "Location 2" },
        { id: "location-3", name: "Location 3" },
        { id: "location-4", name: "Location 4" },
        { id: "st-petersburg", name: "St. Petersburg" },
      ])
      this.facet.countItems.should.equal(this.facet.allItems)
      return this.aggregations.set("location", "some value")
    })
  })

  describe("#updateSuggestions", function () {
    afterEach(function () {
      return this.aggregations.off("change:location")
    })

    it("updates `allItemSuggestion` count", function (done) {
      this.aggregations.on("change:location", (aggregations, changed) => {
        this.facet.allItemsSuggestion.should.deepEqual({
          name: "All Locations",
          count: 10,
        })
        return done()
      })

      return this.aggregations.set(aggreationsUpdate)
    })

    return it("updates countItems, excluding results not in `allItems`", function (done) {
      this.aggregations.on("change:location", (aggregations, changed) => {
        this.facet.countItems.should.deepEqual([
          { id: "location-1", name: "Location 1", count: 5 },
          { id: "location-2", name: "Location 2", count: 3 },
          { id: "location-3", name: "Location 3", count: 0 },
          { id: "location-4", name: "Location 4", count: 0 },
          { id: "st-petersburg", name: "St. Petersburg", count: 0 },
        ])
        return done()
      })

      return this.aggregations.set(aggreationsUpdate)
    })
  })

  describe("#matcher", function () {
    beforeEach(function () {
      return this.aggregations.set(aggreationsUpdate)
    })
    describe("empty query", function () {
      describe("with empty state item ids supplied", () =>
        it("returns `allItemsSuggestion` and limits results to those specified", function (done) {
          this.facet.emptyStateItemIDs = ["location-2", "location-3"]
          return this.facet.matcher("", matches => {
            matches.should.deepEqual([
              { name: "All Locations", count: 10 },
              { id: "location-2", name: "Location 2", count: 3 },
              { id: "location-3", name: "Location 3", count: 0 },
            ])
            return done()
          })
        }))

      return describe("without empty state item ids supplied", () =>
        it("returns `allItemsSuggestion` and all countItems", function (done) {
          return this.facet.matcher("", matches => {
            matches.should.deepEqual([
              { name: "All Locations", count: 10 },
              { id: "location-1", name: "Location 1", count: 5 },
              { id: "location-2", name: "Location 2", count: 3 },
              { id: "location-3", name: "Location 3", count: 0 },
              { id: "location-4", name: "Location 4", count: 0 },
              { id: "st-petersburg", name: "St. Petersburg", count: 0 },
            ])
            return done()
          })
        }))
    })

    return describe("with query", function () {
      it("matches name substrings", function (done) {
        return this.facet.matcher("2", matches => {
          matches.should.deepEqual([
            { name: "All Locations", count: 10 },
            { id: "location-2", name: "Location 2", count: 3 },
          ])
          return done()
        })
      })

      return it("matches strings with non-word characters around whitespaces", function (done) {
        return this.facet.matcher("St P", matches => {
          matches.should.deepEqual([
            { name: "All Locations", count: 10 },
            { id: "st-petersburg", name: "St. Petersburg", count: 0 },
          ])
          return done()
        })
      })
    })
  })

  describe("#isMatched", function () {
    it("does not match random substrings", function () {
      return this.facet.isMatched("ste", "St. Petersburg").should.not.be.ok()
    })

    it("matches strings case insensitively", function () {
      return this.facet
        .isMatched("st. petersburg", "St. Petersburg")
        .should.be.ok()
    })

    it("matches strings with hyphens", function () {
      this.facet
        .isMatched("Winchester-o", "Winchester-on-the-Severn")
        .should.be.ok()
      return this.facet
        .isMatched("Winchester-on-", "Winchester-on-the-Severn")
        .should.be.ok()
    })

    it("allows missing special characters around white spaces", function () {
      this.facet.isMatched("st petersburg", "St. Petersburg").should.be.ok()
      this.facet.isMatched("st petersburg", "St -Petersburg").should.be.ok()
      return this.facet
        .isMatched("st petersburg", "St- -Petersburg")
        .should.be.ok()
    })

    it("allows additinal whitespaces", function () {
      return this.facet
        .isMatched("  st   petersburg ", "St. Petersburg")
        .should.be.ok()
    })

    it("ignores diacritics", function () {
      return this.facet.isMatched("zur", "Zürich").should.be.ok()
    })

    return it("replaces synonyms", function () {
      return this.facet.isMatched("st ives", "Saint Ives").should.be.ok()
    })
  })

  return describe("#async_matcher", function () {
    beforeEach(function () {
      // stub methods for FetchFilterPartner
      this.fetch = sinon.stub()
      this.fetch.returns({ then: sinon.stub() })
      this.fetchFilterPartnersStub = sinon.stub()
      this.fetchFilterPartnersStub.returns({ fetch: this.fetch })
      PartnerFilterFacet.__set__(
        "FetchFilterPartners",
        this.fetchFilterPartnersStub
      )

      return this.aggregations.set(aggreationsUpdate)
    })

    describe("empty query", () =>
      it("returns empty list", function () {
        this.facet.emptyStateItemIDs = ["location-2", "location-3"]
        this.facet.async_matcher("", matches => {
          return matches.should.eql([])
        })
        return this.fetch.called.should.not.be.ok()
      }))
    return describe("with query", () =>
      it("does not call fetch", function () {
        this.facet.async_matcher("test", matches => {})
        return this.fetch.calledOnce.should.be.ok()
      }))
  })
})
