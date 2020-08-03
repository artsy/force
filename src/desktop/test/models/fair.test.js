/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const should = require("should")
const Backbone = require("backbone")
const Fair = require("../../models/fair")
const moment = require("moment")

describe("Fair", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.fair = new Fair(fabricate("fair")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#isNotOver", () =>
    it("checks the UTC timezone of a fair's end_at field compared to now", function () {
      const fair = new Fair(
        fabricate("fair", { end_at: "2018-12-13T22:00:00-05:00" })
      )
      const utcMoment = moment.utc("2018-12-14T07:00:00-00:00")
      const realNow = Date.now
      Date.now = () => utcMoment
      fair.isNotOver().should.equal(true)
      return (Date.now = realNow)
    }))

  describe("#nameSansYear", () =>
    it("returns the name without the year", function () {
      new Fair({ name: "Foo Fair 2015" })
        .nameSansYear()
        .should.equal("Foo Fair")
      new Fair({ name: "Bar Fair" }).nameSansYear().should.equal("Bar Fair")
      return new Fair({ name: "Baz 2015 Fair" })
        .nameSansYear()
        .should.equal("Baz 2015 Fair")
    }))

  describe("#href", () =>
    it("returns the client link to this fair", function () {
      return this.fair
        .href()
        .should.equal(`/${this.fair.get("organizer").profile_id}`)
    }))

  describe("#fairOrgHref", function () {
    const dt = moment().utc().format()
    this.fair = new Fair(fabricate("fair", { autopublish_artworks_at: dt }))

    return it("returns the client link to this fair", function () {
      return this.fair
        .fairOrgHref()
        .should.equal(
          `/${this.fair.get("organizer").profile_id}/${moment(dt).year()}`
        )
    })
  })

  describe("#fetchShowForPartner", () =>
    it("handles api resposne", function (done) {
      const show = fabricate("show")
      this.fair.fetchShowForPartner("partner-id", {
        success(fetchedShow) {
          fetchedShow.id.should.equal(show.id)
          return done()
        },
      })

      return Backbone.sync.args[0][2].success([
        {
          results: [show],
          next: "foo",
        },
      ])
    }))

  describe("#fetchOverviewData", () =>
    it("fetches a ton of data in parallel for the fair page", function () {
      this.fair.fetchOverviewData({})
      _.last(Backbone.sync.args)[2].success(
        new Backbone.Model(fabricate("profile"))
      )
      const urls = Array.from(Backbone.sync.args).map(
        call => _.result(call[1], "url") || call[2].url
      )
      urls[0].should.match(new RegExp(`api/v1/fair/.*`))
      urls[1].should.match(new RegExp(`api/v1/fair/.*/sections`))
      urls[2].should.match(new RegExp(`api/v1/fair/.*/partners`))
      return urls[3].should.match(new RegExp(`api/v1/fair/.*/artists`))
    }))

  return describe("#itemsToColumns", () =>
    it("doesnt chop off items", function () {
      const items = [
        {
          name: "20th Century Design",
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=20th-century-design",
        },
        {
          name: "Contemporary Design",
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=contemporary-design",
        },
        {
          name: "West Coast Galleries",
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=west-coast-galleries",
        },
      ]
      return _.flatten(this.fair.itemsToColumns(items, 2)).length.should.equal(
        3
      )
    }))
})
