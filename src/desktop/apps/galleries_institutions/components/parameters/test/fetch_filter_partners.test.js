/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const Q = require("bluebird-q")
const _ = require("underscore")
const rewire = require("rewire")
const { fabricate } = require("@artsy/antigravity")
const Params = require("../filter_params.coffee")
const FetchFilterPartners = rewire("../fetch_filter_partners.coffee")
const aggregationsResponse = require("./aggregations_response.json")
const sinon = require("sinon")

const nPartners = n =>
  __range__(1, n, true).map(n =>
    fabricate("partner", { _id: _.uniqueId(), id: _.uniqueId() })
  )

FetchFilterPartners.__set__("Cities", [
  {
    slug: "new-york-ny-usa",
    name: "New York",
    full_name: "New York, NY, USA",
    coords: [40.71, -74.01],
  },
])

describe("FetchFilterPartners", function () {
  describe("#initialize", function () {
    beforeEach(function () {
      this.params = new Params({
        location: "new-york-ny-usa",
        category: "painting",
        type: "gallery",
      })
      return (this.filterPartners = new FetchFilterPartners({
        params: this.params,
        term: "test",
      }))
    })

    return it("sets all starting values", function () {
      this.filterPartners.page.should.equal(1)
      this.filterPartners.partners.length.should.equal(0)
      this.filterPartners.aggregations.attributes.should.be.empty()
      this.filterPartners.totalResults.should.equal(0)
      if (this.filterPartners.fetching != null) {
        this.filterPartners.fetching.should.be.false()
      }
      return this.filterPartners.allFetched != null
        ? this.filterPartners.allFetched.should.be.false()
        : undefined
    })
  })

  describe("#reset", function () {
    beforeEach(function () {
      this.params = new Params({
        location: "new-york-ny-usa",
        category: "painting",
        type: "gallery",
      })
      return (this.filterPartners = new FetchFilterPartners({
        params: this.params,
      }))
    })

    afterEach(function () {
      return this.filterPartners.off("reset")
    })

    it("resets all values", function () {
      this.filterPartners.page = 2
      this.filterPartners.partners = [{}]
      this.filterPartners.aggregations.set({ a: "b" })
      this.filterPartners.totalResults = 12
      this.filterPartners.allFetched = true

      this.filterPartners.reset()

      this.filterPartners.page.should.equal(1)
      this.filterPartners.partners.length.should.equal(0)
      this.filterPartners.aggregations.isEmpty().should.be.true()
      this.filterPartners.totalResults.should.equal(0)
      return this.filterPartners.allFetched.should.be.false()
    })

    return it("emits reset event", function (done) {
      this.filterPartners.on("reset", () => done())
      return this.filterPartners.reset()
    })
  })

  describe("formatVariables", function () {
    describe("with parameters", function () {
      beforeEach(function () {
        this.params = new Params({
          location: "new-york-ny-usa",
          category: "painting",
          type: "gallery",
        })
        this.filterPartners = new FetchFilterPartners({ params: this.params })
        return (this.filterPartnersWithSearch = new FetchFilterPartners({
          params: this.params,
          term: "search term",
        }))
      })

      it("includes correct types for galleries", function () {
        const variables = this.filterPartners.formatVariables()
        return variables.type.should.deepEqual(["GALLERY"])
      })

      it("includes correct types for institutions", function () {
        this.params.set({ type: "institution" })
        const variables = this.filterPartners.formatVariables()
        return variables.type.should.deepEqual([
          "INSTITUTION",
          "INSTITUTIONAL_SELLER",
        ])
      })

      it("formats city", function () {
        const variables = this.filterPartners.formatVariables()
        return variables.near.should.equal("40.71,-74.01")
      })

      it("includes term when it was initialized with term", function () {
        const variables = this.filterPartnersWithSearch.formatVariables()
        return variables.term.should.equal("search term")
      })

      it("should not include term when it was not initialized with term", function () {
        const variables = this.filterPartners.formatVariables()
        return variables.should.not.have.keys("term")
      })

      it("excludes keys absent from parameters", function () {
        this.filterPartners.unset("location", "category")
        const variables = this.filterPartners.formatVariables()
        return variables.should.not.have.keys(
          "near",
          variables.should.have.keys(
            "category",
            "near",
            "page",
            "includeAggregations",
            "includeResults",
            "type"
          )
        )
      })

      describe("first page", () =>
        it("requests aggregations and results", function () {
          const variables = this.filterPartners.formatVariables()
          variables.includeAggregations.should.be.true()
          variables.includeResults.should.be.true()
          return variables.page.should.equal(1)
        }))

      return describe("subsequent pages", () =>
        it("requests results only", function () {
          this.filterPartners.page = 2
          const variables = this.filterPartners.formatVariables()
          variables.includeAggregations.should.be.false()
          variables.includeResults.should.be.true()
          return variables.page.should.equal(2)
        }))
    })

    return describe("without facet parameters", function () {
      beforeEach(function () {
        this.params = new Params({ type: "gallery" })
        this.filterPartners = new FetchFilterPartners({ params: this.params })
        return (this.filterPartnersWithSearch = new FetchFilterPartners({
          params: this.params,
          term: "search term",
        }))
      })

      it("requests aggregations and not results", function () {
        const variables = this.filterPartners.formatVariables()
        variables.includeAggregations.should.be.true()
        variables.includeResults.should.be.false()
        variables.should.have.keys(
          "page",
          "includeAggregations",
          "includeResults",
          "type"
        )
        return variables.should.not.have.keys("near", "category")
      })

      it("should not include resutls when we dont have facet params and search term", function () {
        const variables = this.filterPartners.formatVariables()
        return variables.includeResults.should.be.false()
      })

      return it("should include results when we dont have facet params but we have term", function () {
        const variables = this.filterPartnersWithSearch.formatVariables()
        return variables.includeResults.should.be.true()
      })
    })
  })

  return describe("#fetch", function (done) {
    describe("with parameters", function () {
      describe("first page", function () {
        beforeEach(function () {
          const results = {
            results: {
              total: 15,
              hits: nPartners(10),
            },
          }

          this.stub = sinon.stub()
          FetchFilterPartners.__set__("metaphysics", this.stub)
          this.stub.returns(
            Q.promise((resolve, reject) =>
              resolve(_.extend({}, results, aggregationsResponse))
            )
          )

          this.params = new Params({
            location: "new-york-ny-usa",
            category: "painting",
            type: "gallery",
          })
          return (this.filterPartners = new FetchFilterPartners({
            params: this.params,
            term: "search term",
          }))
        })

        afterEach(function () {
          return this.filterPartners.off("partnerAdded")
        })

        it("increments page", function () {
          return this.filterPartners.fetch().then(() => {
            return this.filterPartners.page.should.equal(2)
          })
        })

        it("updates aggregations", function () {
          return this.filterPartners.fetch().then(() => {
            this.filterPartners.aggregations
              .get("location")
              .total.should.equal(12)
            this.filterPartners.aggregations
              .get("location")
              .countItems.length.should.equal(3)
            this.filterPartners.aggregations
              .get("category")
              .total.should.equal(13)
            return this.filterPartners.aggregations
              .get("category")
              .countItems.length.should.equal(5)
          })
        })

        it("updates partners", function () {
          return this.filterPartners.fetch().then(() => {
            return this.filterPartners.partners.length.should.equal(10)
          })
        })

        it("triggers partersAdded event", function () {
          this.filterPartners.on("partnersAdded", partners =>
            partners.length.should.equal(10)
          )
          return this.filterPartners.fetch()
        })

        it("includes correct default parameters in query", function () {
          return this.filterPartners.fetch().then(() => {
            this.stub.args[0][0].query.should.containEql(
              "eligible_for_listing:true"
            )
            return this.stub.args[0][0].query.should.containEql(
              "default_profile_public:true"
            )
          })
        })

        it("provides correct parameters to metaphysics", function () {
          return this.filterPartners.fetch().then(() => {
            return this.stub.args[0][0].variables.should.deepEqual({
              category: "painting",
              type: ["GALLERY"],
              near: "40.71,-74.01",
              term: "search term",
              page: 1,
              includeAggregations: true,
              includeResults: true,
            })
          })
        })

        return describe("allFetched", function () {
          it("is set to false if results are less than total", function () {
            return this.filterPartners.fetch().then(() => {
              return this.filterPartners.allFetched.should.be.false()
            })
          })

          return it("is set to true if results reaches total", function () {
            const results = {
              results: {
                total: 1,
                hits: nPartners(10),
              },
            }

            FetchFilterPartners.__set__("metaphysics", () =>
              Q.promise((resolve, reject) =>
                resolve(_.extend({}, results, aggregationsResponse))
              )
            )

            return this.filterPartners.fetch().then(() => {
              return this.filterPartners.allFetched.should.be.true()
            })
          })
        })
      })

      return describe("subsequent fetch for given params", function () {
        beforeEach(function () {
          this.stub = sinon.stub()
          FetchFilterPartners.__set__("metaphysics", this.stub)
          this.stub.returns(
            Q.promise((resolve, reject) =>
              resolve({ results: { hits: nPartners(10) } })
            )
          )

          this.params = new Params({
            location: "new-york-ny-usa",
            category: "painting",
            type: "gallery",
          })
          this.filterPartners = new FetchFilterPartners({ params: this.params })
          this.filterPartners.page = 2
          this.filterPartners.partners = nPartners(10)
          this.filterPartners.totalResults = 21
          return this.filterPartners.aggregations.set({
            category: {
              total: 1,
              countItems: [{ name: "name", id: "id", count: "1" }],
            },
            location: {
              total: 1,
              countItems: [{ name: "name", id: "id", count: "1" }],
            },
          })
        })

        it("increments page", function () {
          return this.filterPartners.fetch().then(() => {
            return this.filterPartners.page.should.equal(3)
          })
        })

        it("does not affect aggregations", function () {
          return this.filterPartners.fetch().then(() => {
            this.filterPartners.aggregations
              .get("location")
              .total.should.equal(1)
            this.filterPartners.aggregations
              .get("location")
              .countItems.length.should.equal(1)
            this.filterPartners.aggregations
              .get("category")
              .total.should.equal(1)
            return this.filterPartners.aggregations
              .get("category")
              .countItems.length.should.equal(1)
          })
        })

        it("updates partners", function () {
          return this.filterPartners.fetch().then(() => {
            return this.filterPartners.partners.length.should.equal(20)
          })
        })

        it("triggers partersAdded event", function () {
          this.filterPartners.on("partnersAdded", newPartners =>
            newPartners.length.should.equal(10)
          )
          return this.filterPartners.fetch()
        })

        it("provides correct parameters to metaphysics", function () {
          return this.filterPartners.fetch().then(() => {
            return this.stub.args[0][0].variables.should.deepEqual({
              category: "painting",
              type: ["GALLERY"],
              near: "40.71,-74.01",
              page: 2,
              includeAggregations: false,
              includeResults: true,
            })
          })
        })

        return describe("allFetched", function () {
          it("is set to false if results are less than total", function () {
            return this.filterPartners.fetch().then(() => {
              return this.filterPartners.allFetched.should.be.false()
            })
          })

          return it("is set to true if results reaches total", function () {
            this.filterPartners.totalResults = 20
            return this.filterPartners.fetch().then(() => {
              return this.filterPartners.allFetched.should.be.true()
            })
          })
        })
      })
    })

    return describe("without any params", function () {
      beforeEach(function () {
        this.stub = sinon.stub()
        FetchFilterPartners.__set__("metaphysics", this.stub)
        this.stub.returns(
          Q.promise((resolve, reject) => resolve(aggregationsResponse))
        )

        this.params = new Params({ type: "gallery" })
        return (this.filterPartners = new FetchFilterPartners({
          params: this.params,
        }))
      })

      it("updates aggregations", function () {
        return this.filterPartners.fetch().then(() => {
          this.filterPartners.aggregations
            .get("location")
            .total.should.equal(12)
          this.filterPartners.aggregations
            .get("location")
            .countItems.length.should.equal(3)
          this.filterPartners.aggregations
            .get("category")
            .total.should.equal(13)
          return this.filterPartners.aggregations
            .get("category")
            .countItems.length.should.equal(5)
        })
      })

      it("omits results", function () {
        return this.filterPartners.fetch().then(() => {
          return this.filterPartners.partners.length.should.equal(0)
        })
      })

      it("should be allFetched", function () {
        return this.filterPartners.fetch().then(() => {
          return this.filterPartners.allFetched.should.be.true()
        })
      })

      return it("provides correct parameters to metaphysics", function () {
        return this.filterPartners.fetch().then(() => {
          return this.stub.args[0][0].variables.should.deepEqual({
            type: ["GALLERY"],
            page: 1,
            includeAggregations: true,
            includeResults: false,
          })
        })
      })
    })
  })
})

function __range__(left, right, inclusive) {
  let range = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}
