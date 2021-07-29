/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")
const fetchLocationCarousel = rewire("../index")

describe("fetchLocationCarousel", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    const data = {
      primary: {
        hits: [
          fabricate("partner", { id: "primary", default_profile_public: true }),
        ],
      },
      secondary: {
        hits: [
          fabricate("partner", {
            id: "secondary",
            default_profile_public: true,
          }),
        ],
      },
    }
    sinon.stub($, "get").yields({
      name: "Providence",
      latitude: 41.82,
      longitude: -71.41,
    })

    this.metaphysics = sinon.stub()
    fetchLocationCarousel.__set__("metaphysics", this.metaphysics)
    return this.metaphysics.returns(
      new Promise((resolve, reject) => resolve(data))
    )
  })

  afterEach(() => $.get.restore())

  describe("type gallery", function () {
    it("fetches location and primary and secondary buckets", function () {
      return fetchLocationCarousel("gallery").then(() => {
        $.get.args[0][0].should.equal("/geo/nearest")
        this.metaphysics.args[0][0].query.should.containEql(
          "primary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForPrimaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type)"
        )
        return this.metaphysics.args[0][0].query.should.containEql(
          "secondary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForSecondaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type)"
        )
      })
    })

    it("fetches with correct variables", function () {
      return fetchLocationCarousel("gallery").then(() => {
        $.get.args[0][0].should.equal("/geo/nearest")
        return this.metaphysics.args[0][0].variables.should.deepEqual({
          near: "41.82,-71.41",
          type: ["GALLERY"],
        })
      })
    })

    return it("resolves with the data", () =>
      fetchLocationCarousel("gallery").then(category => {
        category.name.should.equal("Featured Galleries near Providence")
        category.partners.should.have.lengthOf(2)
        return category.partners[0].name.should.equal("Gagosian Gallery")
      }))
  })

  return describe("type institution", function () {
    it("fetches location and primary and secondary buckets", function () {
      return fetchLocationCarousel("gallery").then(() => {
        $.get.args[0][0].should.equal("/geo/nearest")
        this.metaphysics.args[0][0].query.should.containEql(
          "primary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForPrimaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type)"
        )
        return this.metaphysics.args[0][0].query.should.containEql(
          "secondary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForSecondaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type)"
        )
      })
    })

    it("fetches with correct variables", function () {
      return fetchLocationCarousel("institution").then(() => {
        $.get.args[0][0].should.equal("/geo/nearest")
        return this.metaphysics.args[0][0].variables.should.deepEqual({
          near: "41.82,-71.41",
          type: ["INSTITUTION", "INSTITUTIONAL_SELLER"],
        })
      })
    })

    return it("resolves with the data", () =>
      fetchLocationCarousel("institution").then(category => {
        category.name.should.equal("Featured Institutions near Providence")
        category.partners.should.have.lengthOf(2)
        return category.partners[0].name.should.equal("Gagosian Gallery")
      }))
  })
})
