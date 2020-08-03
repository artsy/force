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
const Partner = require("../../../../../models/partner.coffee")
const PartnerShow = require("../../../../../models/partner_show.coffee")
const PartnerShows = require("../../../../../collections/partner_shows.coffee")
const PartnerShowEvents = require("../../../../../collections/partner_show_events.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const NewsView = benv.requireWithJadeify(resolve(__dirname, "../view.coffee"), [
  "template",
])

describe("NewsView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      this.view = new NewsView({ partner: this.partner })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#fetch", function () {
    before(function () {
      this.partnerShowEvents = new PartnerShowEvents([fabricate("show_event")])
      return (this.fairBooths = new PartnerShows([
        fabricate("show", { fair: fabricate("fair") }),
      ]))
    })

    it("makes proper requests to fetch partner artists", function () {
      let requests
      this.view.fetch()
      ;(requests = Backbone.sync.args).length.should.equal(2)
      requests[0][1].url.should.endWith("/api/v1/partner_show_events")
      requests[0][2].data.should.eql({
        partner_id: this.partner.get("_id"),
        status: "current",
        sort: "start_at",
        size: 3,
      })
      requests[1][1].url.should.endWith("/api/v1/shows")
      return requests[1][2].data.should.eql({
        partner_id: this.partner.get("_id"),
        status: "current",
        sort: "start_at",
        size: 3,
        at_a_fair: true,
      })
    })

    it("returns a thenable promise", function () {
      return _.isFunction(this.view.fetch().then).should.be.ok()
    })

    return it("fetches and returns partner artists", function () {
      Backbone.sync.onCall(0).yieldsTo("success", this.partnerShowEvents.models)

      Backbone.sync.onCall(1).yieldsTo("success", this.fairBooths.models)

      return this.view.fetch().spread((showEvents, fairBooths) => {
        showEvents.length.should.equal(1)
        fairBooths.length.should.equal(1)
        showEvents.models.should.eql(this.partnerShowEvents.models)
        return fairBooths.models.should.eql(this.fairBooths.models)
      })
    })
  })

  describe("#consolidate", function () {
    before(function () {
      this.partnerShowEvents = new PartnerShowEvents([
        fabricate("show_event", {
          start_at: "2015-02-11T02:00:00+00:00",
          event_type: "Opening Receiption",
        }),
        fabricate("show_event", {
          start_at: "2015-02-09T02:00:00+00:00",
          event_type: "Artist Talk",
        }),
      ])
      return (this.fairBooths = new PartnerShows([
        fabricate("show", {
          fair: fabricate("fair"),
          start_at: "2015-02-10T02:00:00+00:00",
          end_at: "2015-02-17T02:00:00+00:00",
        }),
      ]))
    })

    it("combines show events and fair booths and sorts them by start_at", function () {
      return this.view
        .consolidate(this.partnerShowEvents, this.fairBooths)
        .should.eql([
          {
            start_at: "2015-02-09T02:00:00+00:00",
            subtitle: "Artist Talk",
            time: "Monday, Feb 9th, 2am – Thursday, Feb 9th, 8pm",
            title: this.partnerShowEvents.at(1).get("partner_show").name,
            titleLink: new PartnerShow(
              this.partnerShowEvents.at(1).get("partner_show")
            ).href(),
          },
          {
            start_at: "2015-02-10T02:00:00+00:00",
            subtitle: "Fair Booth",
            time: "Feb 10th – 17th 2015",
            title: this.fairBooths.at(0).get("name"),
            titleLink: this.fairBooths.at(0).href(),
          },
          {
            start_at: "2015-02-11T02:00:00+00:00",
            subtitle: "Opening Receiption",
            time: "Wednesday, Feb 11th, 2am – Thursday, Feb 9th, 8pm",
            title: this.partnerShowEvents.at(0).get("partner_show").name,
            titleLink: new PartnerShow(
              this.partnerShowEvents.at(0).get("partner_show")
            ).href(),
          },
        ])
    })

    it("returns only show events if no fair booths", function () {
      return this.view
        .consolidate(this.partnerShowEvents, new PartnerShows())
        .should.eql([
          {
            start_at: "2015-02-09T02:00:00+00:00",
            subtitle: "Artist Talk",
            time: "Monday, Feb 9th, 2am – Thursday, Feb 9th, 8pm",
            title: this.partnerShowEvents.at(1).get("partner_show").name,
            titleLink: new PartnerShow(
              this.partnerShowEvents.at(1).get("partner_show")
            ).href(),
          },
          {
            start_at: "2015-02-11T02:00:00+00:00",
            subtitle: "Opening Receiption",
            time: "Wednesday, Feb 11th, 2am – Thursday, Feb 9th, 8pm",
            title: this.partnerShowEvents.at(0).get("partner_show").name,
            titleLink: new PartnerShow(
              this.partnerShowEvents.at(0).get("partner_show")
            ).href(),
          },
        ])
    })

    it("returns only fair booths if no show events", function () {
      return this.view
        .consolidate(new PartnerShowEvents(), this.fairBooths)
        .should.eql([
          {
            start_at: "2015-02-10T02:00:00+00:00",
            subtitle: "Fair Booth",
            time: "Feb 10th – 17th 2015",
            title: this.fairBooths.at(0).get("name"),
            titleLink: this.fairBooths.at(0).href(),
          },
        ])
    })

    return it("returns an empty array if no show events and fair booths", function () {
      return this.view
        .consolidate(new PartnerShowEvents(), new PartnerShows())
        .should.eql([])
    })
  })

  return describe("#render", function () {
    beforeEach(function () {
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    return it("removes the view if no news", function () {
      this.view.render([])
      return this.view.remove.calledOnce.should.be.ok()
    })
  })
})
