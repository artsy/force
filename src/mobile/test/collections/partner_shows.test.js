/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const PartnerShows = require("../../collections/partner_shows")
const moment = require("moment")

describe("PartnerShows", function () {
  beforeEach(function () {
    return (this.shows = new PartnerShows(null, { partnerId: "foobar" }))
  })

  describe("#url", () =>
    it("sorts by most recent", function () {
      return this.shows
        .url()
        .should.containEql(
          "/api/v1/partner/foobar/shows?sort=-featured,-end_at"
        )
    }))

  return ["featured", "larger"].map(version =>
    describe("#featuredShow", function () {
      beforeEach(function () {
        const futureShow = fabricate("show", {
          status: "upcoming",
          id: "future-show",
          featured: false,
          start_at: moment().add(30, "days").toJSON(),
          end_at: moment().add(37, "days").toJSON(),
          eligible_artworks_count: 4,
          image_versions: [version],
        })
        const currentShow = fabricate("show", {
          status: "running",
          id: "running-show",
          featured: false,
          start_at: moment().subtract(7, "days").toJSON(),
          end_at: moment().add(7, "days").toJSON(),
          eligible_artworks_count: 4,
          image_versions: [version],
        })
        const currentShow2 = fabricate("show", {
          status: "running",
          id: "running-show-2",
          featured: false,
          start_at: moment().subtract(5, "days").toJSON(),
          end_at: moment().add(2, "days").toJSON(),
          eligible_artworks_count: 4,
          image_versions: [version],
        })
        const pastShow = fabricate("show", {
          status: "closed",
          id: "closed-show",
          featured: false,
          start_at: moment().subtract(37, "days").toJSON(),
          end_at: moment().subtract(30, "days").toJSON(),
          eligible_artworks_count: 4,
          image_versions: [version],
        })
        return this.shows.reset([
          futureShow,
          currentShow,
          currentShow2,
          pastShow,
        ])
      })

      describe("with a featured show", () =>
        it("selects the featured show regardless of its running dates", function () {
          this.shows.findWhere({ status: "upcoming" }).set("featured", true)
          this.shows.featuredShow().get("id").should.equal("future-show")
          this.shows.findWhere({ status: "upcoming" }).set("featured", false)
          this.shows.findWhere({ status: "closed" }).set("featured", true)
          return this.shows.featuredShow().get("id").should.equal("closed-show")
        }))

      return describe("without a featured show", function () {
        describe("with multiple running shows", () =>
          it("selects the running show that ends closest to now", function () {
            return this.shows
              .featuredShow()
              .get("id")
              .should.equal("running-show-2")
          }))

        describe("with no running shows and multiple upcoming shows", () =>
          it("selects the upcoming show with the nearest start date", function () {
            const farFutureShow = fabricate("show", {
              status: "upcoming",
              id: "far-future-show",
              featured: false,
              start_at: moment().add(90, "days").toJSON(),
              end_at: moment().add(97, "days").toJSON(),
              eligible_artworks_count: 4,
              image_versions: [version],
            })
            const nearFutureShow = fabricate("show", {
              status: "upcoming",
              id: "future-show",
              featured: false,
              start_at: moment().add(30, "days").toJSON(),
              end_at: moment().add(37, "days").toJSON(),
              eligible_artworks_count: 4,
              image_versions: [version],
            })
            this.shows.reset([farFutureShow, nearFutureShow])
            return this.shows
              .featuredShow()
              .get("id")
              .should.equal("future-show")
          }))

        return describe("with no running shows and no upcoming shows", () =>
          it("selects the past show with the nearest end date", function () {
            const recentClosedShow = fabricate("show", {
              status: "closed",
              id: "closed-show",
              featured: false,
              start_at: moment().subtract(37, "days").toJSON(),
              end_at: moment().subtract(30, "days").toJSON(),
              eligible_artworks_count: 4,
              image_versions: [version],
            })
            const madOldShow = fabricate("show", {
              status: "closed",
              id: "another-closed-show",
              featured: false,
              start_at: moment().subtract(67, "days").toJSON(),
              end_at: moment().subtract(60, "days").toJSON(),
              eligible_artworks_count: 4,
              image_versions: [version],
            })
            this.shows.reset([recentClosedShow, madOldShow])
            return this.shows
              .featuredShow()
              .get("id")
              .should.equal("closed-show")
          }))
      })
    })
  )
})
