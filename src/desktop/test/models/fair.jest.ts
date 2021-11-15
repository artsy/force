import _ from "underscore"
import { fabricate } from "@artsy/antigravity"
import sinon from "sinon"
import Backbone from "backbone"
const Fair = require("../../models/fair.coffee")
const moment = require("moment")

describe("Fair", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.fair = new Fair(fabricate("fair"))
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#isNotOver", () => {
    it("checks the UTC timezone of a fair's end_at field compared to now", () => {
      const fair = new Fair(
        fabricate("fair", { end_at: "2018-12-13T22:00:00-05:00" })
      )
      const utcMoment = moment.utc("2018-12-14T07:00:00-00:00")
      const realNow = Date.now
      Date.now = () => utcMoment
      fair.isNotOver().should.equal(true)
      Date.now = realNow
    })
  })

  describe("#nameSansYear", () => {
    it("returns the name without the year", () => {
      new Fair({ name: "Foo Fair 2015" })
        .nameSansYear()
        .should.equal("Foo Fair")
      new Fair({ name: "Bar Fair" }).nameSansYear().should.equal("Bar Fair")
      new Fair({ name: "Baz 2015 Fair" })
        .nameSansYear()
        .should.equal("Baz 2015 Fair")
    })
  })

  describe("#href", () => {
    it("returns the client link to this fair", () => {
      testContext.fair.href().should.equal("/fair/armory-show-2013")
    })
  })

  describe("#fairOrgHref", () => {
    const dt = moment().utc().format()
    const testContext2 = {
      fair: new Fair(fabricate("fair", { autopublish_artworks_at: dt })),
    }

    it("returns the client link to this fair", () => {
      testContext2.fair
        .fairOrgHref()
        .should.equal(
          `/${testContext.fair.get("organizer").profile_id}/${moment(
            dt
          ).year()}`
        )
    })
  })

  describe("#fetchShowForPartner", () => {
    it("handles api resposne", done => {
      const show = fabricate("show")
      testContext.fair.fetchShowForPartner("partner-id", {
        success(fetchedShow) {
          fetchedShow.id.should.equal(show.id)
          done()
        },
      })

      Backbone.sync.args[0][2].success([
        {
          next: "foo",
          results: [show],
        },
      ])
    })
  })

  describe("#fetchOverviewData", () => {
    it("fetches a ton of data in parallel for the fair page", () => {
      testContext.fair.fetchOverviewData({})
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      _.last(Backbone.sync.args)[2].success(
        new Backbone.Model(fabricate("profile"))
      )
      const urls = Array.from(Backbone.sync.args).map(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        call => _.result(call[1], "url") || call[2].url
      )
      urls[0].should.match(new RegExp(`api/v1/fair/.*`))
      urls[1].should.match(new RegExp(`api/v1/fair/.*/sections`))
      urls[2].should.match(new RegExp(`api/v1/fair/.*/partners`))
      urls[3].should.match(new RegExp(`api/v1/fair/.*/artists`))
    })
  })

  describe("#itemsToColumns", () => {
    it("doesnt chop off items", () => {
      const items = [
        {
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=20th-century-design",
          name: "20th Century Design",
        },
        {
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=contemporary-design",
          name: "Contemporary Design",
        },
        {
          href:
            "/fog-fair-design-plus-art/browse/artworks?related_gene=west-coast-galleries",
          name: "West Coast Galleries",
        },
      ]
      _.flatten(testContext.fair.itemsToColumns(items, 2)).length.should.equal(
        3
      )
    })
  })
})
