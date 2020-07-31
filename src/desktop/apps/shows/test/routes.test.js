/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const moment = require("moment")
const Backbone = require("backbone")
const PartnerShow = require("../../../models/partner_show")
const PartnerCities = require("../../../collections/partner_cities")
const PartnerFeaturedCities = require("../../../collections/partner_featured_cities")
const { fabricate } = require("@artsy/antigravity")
const routes = require("../routes")

describe("Shows routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.cities = [
      {
        slug: "new-york-ny-usa",
        name: "New York",
        full_name: "New York, NY, USA",
        coords: [40.71, -74.01],
      },
    ]
    return (this.featuredCities = [
      {
        slug: "new-york-ny-usa",
        name: "New York",
        full_name: "New York, NY, USA",
        coords: [40.71, -74.01],
      },
    ])
  })

  afterEach(() => Backbone.sync.restore())

  describe("#index", function () {
    beforeEach(function () {
      this.res = { render: sinon.stub() }

      Backbone.sync.onCall(0).yieldsTo("success", this.cities)
      Backbone.sync.onCall(1).yieldsTo("success", this.featuredCities)
      return Backbone.sync.onCall(2).yieldsTo(
        "success",
        _.times(10, () => fabricate("show"))
      )
    })

    return it("fetches the cities & featured shows and renders the index template", function () {
      return routes.index({}, this.res).then(() => {
        Backbone.sync.args[2][1].id.should.equal("530ebe92139b21efd6000071")
        Backbone.sync.args[2][1].item_type.should.equal("PartnerShow")
        Backbone.sync.args[2][2].url.should.containEql(
          "api/v1/set/530ebe92139b21efd6000071/items"
        )
        this.res.render.args[0][0].should.equal("index")
        this.res.render.args[0][1].shows.should.have.length(8)
        this.res.render.args[0][1].cities.should.have.length(1)
        this.res.render.args[0][1].featuredCities.should.have.length(1)
        this.res.render.args[0][1].cities[0].should.have.properties(
          "name",
          "slug",
          "coords"
        )
        return this.res.render.args[0][1].featuredCities[0].should.have.properties(
          "name",
          "slug",
          "coords"
        )
      })
    })
  })

  describe("#online", function () {
    beforeEach(function () {
      this.req = {
        params: {},
        query: { page: 1 },
      }
      this.res = { render: sinon.stub() }
      return (this.next = sinon.stub())
    })

    return it("fetches the cities & shows and renders the location_based", function () {
      this.upcomingShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().add(8, "days").format(),
          end_at: moment().add(15, "days").format(),
        })
      )
      this.openingShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().add(1, "days").format(),
          end_at: moment().add(10, "days").format(),
        })
      )
      this.currentShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().subtract(5, "days").format(),
          end_at: moment().add(5, "days").format(),
        })
      )
      this.pastShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().subtract(15, "days").format(),
          end_at: moment().subtract(5, "days").format(),
        })
      )
      Backbone.sync.onCall(0).yieldsTo("success", this.cities)
      Backbone.sync.onCall(1).yieldsTo("success", this.featuredCities)
      Backbone.sync
        .onCall(2)
        .yieldsTo("success", [this.openingShow, this.upcomingShow])
      Backbone.sync.onCall(3).yieldsTo("success", [this.currentShow])
      Backbone.sync.onCall(4).yieldsTo("success", [this.pastShow])

      return routes.onlineExlusive(this.req, this.res, this.next).then(() => {
        Backbone.sync.args[2][2].data.has_location.should.equal(false)
        Backbone.sync.args[3][2].data.has_location.should.equal(false)
        Backbone.sync.args[4][2].data.has_location.should.equal(false)
        this.res.render.called.should.be.true()
        this.res.render.getCall(0).args[0].should.equal("location_based")
        this.res.render.getCall(0).args[1].cities.should.have.length(1)
        this.res.render.getCall(0).args[1].featuredCities.should.have.length(1)
        this.res.render.getCall(0).args[1].opening.should.have.length(1)
        this.res.render.getCall(0).args[1].upcoming.should.have.length(1)
        this.res.render.getCall(0).args[1].current.should.have.length(1)
        return this.res.render.getCall(0).args[1].past.should.have.length(1)
      })
    })
  })

  describe("#city", function () {
    beforeEach(function () {
      this.req = {
        params: { city: "new-york-ny-usa" },
        query: { page: 1 },
      }
      this.res = { render: sinon.stub() }
      return (this.next = sinon.stub())
    })

    it("nexts with an unrecognized city", function () {
      Backbone.sync.onCall(0).yieldsTo("success", this.cities)
      Backbone.sync.onCall(1).yieldsTo("success", this.featuredCities)

      return routes
        .city({ params: { city: "nowheresville" } }, this.res, this.next)
        .then(() => {
          return this.next.called.should.be.true()
        })
    })

    it("fetches the cities & shows and renders the location_based template", function () {
      this.upcomingShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().add(8, "days").format(),
          end_at: moment().add(15, "days").format(),
        })
      )
      this.openingShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().add(1, "days").format(),
          end_at: moment().add(10, "days").format(),
        })
      )
      this.currentShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().subtract(5, "days").format(),
          end_at: moment().add(5, "days").format(),
        })
      )
      this.pastShow = new PartnerShow(
        fabricate("show", {
          start_at: moment().subtract(15, "days").format(),
          end_at: moment().subtract(5, "days").format(),
        })
      )
      Backbone.sync.onCall(0).yieldsTo("success", this.cities)
      Backbone.sync.onCall(1).yieldsTo("success", this.featuredCities)
      Backbone.sync
        .onCall(2)
        .yieldsTo("success", [this.openingShow, this.upcomingShow])
      Backbone.sync.onCall(3).yieldsTo("success", [this.currentShow])
      Backbone.sync.onCall(4).yieldsTo("success", [this.pastShow])

      return routes.city(this.req, this.res, this.next).then(() => {
        this.res.render.called.should.be.true()
        this.res.render.getCall(0).args[0].should.equal("location_based")
        this.res.render.getCall(0).args[1].city.name.should.equal("New York")
        this.res.render.getCall(0).args[1].cities.should.have.length(1)
        this.res.render.getCall(0).args[1].featuredCities.should.have.length(1)
        this.res.render.getCall(0).args[1].opening.should.have.length(1)
        this.res.render.getCall(0).args[1].upcoming.should.have.length(1)
        this.res.render.getCall(0).args[1].current.should.have.length(1)
        return this.res.render.getCall(0).args[1].past.should.have.length(1)
      })
    })

    return xit("sorts the shows", function (done) {
      let showEndingFirst, showEndingLast, showOpeningFirst, showOpeningLast
      const shows = [
        (showOpeningFirst = new PartnerShow(
          fabricate("show", {
            start_at: moment().add(5, "days").format(),
            end_at: moment().add(15, "days").format(),
          })
        )),
        (showOpeningLast = new PartnerShow(
          fabricate("show", {
            start_at: moment().add(15, "days").format(),
            end_at: moment().add(20, "days").format(),
          })
        )),
        (showEndingFirst = new PartnerShow(
          fabricate("show", {
            start_at: moment().add(7, "days").format(),
            end_at: moment().add(10, "days").format(),
          })
        )),
        (showEndingLast = new PartnerShow(
          fabricate("show", {
            start_at: moment().add(6, "days").format(),
            end_at: moment().add(25, "days").format(),
          })
        )),
      ]

      routes.city({ params: { city: "new-york" } }, this.res, this.next)
      Backbone.sync.args[0][2].success(shows)
      Backbone.sync.args[1][2].success(shows)
      Backbone.sync.args[2][2].success(shows)

      return _.defer(() =>
        _.defer(() => {
          _.first(this.res.render.args[0][1].upcoming).should.equal(
            showOpeningFirst
          )
          _.last(this.res.render.args[0][1].upcoming).should.equal(
            showOpeningLast
          )

          _.first(this.res.render.args[0][1].current).should.equal(
            showEndingFirst
          )
          _.last(this.res.render.args[0][1].current).should.equal(
            showEndingLast
          )

          _.first(this.res.render.args[0][1].past).should.equal(showEndingLast)
          _.last(this.res.render.args[0][1].past).should.equal(showEndingFirst)

          return done()
        })
      )
    })
  })

  return describe("#redirectFromCity", () =>
    it("redirects to /shows/... path", function () {
      const req = { url: "localhost:5000/city/new-york-ny-usa" }
      const res = { render: sinon.stub(), redirect: sinon.stub() }
      routes.redirectFromCity(req, res)
      res.redirect.args[0][0].should.equal(302)
      return res.redirect.args[0][1].should.equal(
        "localhost:5000/shows/new-york-ny-usa"
      )
    }))
})
