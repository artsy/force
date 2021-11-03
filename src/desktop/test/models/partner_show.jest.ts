import _ from "underscore"
import { fabricate } from "@artsy/antigravity"
const sd = require("sharify").data
import Backbone from "backbone"
const { PartnerShow } = require("../../models/partner_show")
const PartnerLocation = require("../../models/partner_location")
const FairLocation = require("../../models/partner_location")
const { Fair } = require("../../models/fair")
import sinon from "sinon"
const moment = require("moment")

describe("PartnerShow", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.partnerShow = new PartnerShow(fabricate("show"))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#url", () => {
    it("includes a partner in the url if the model has one", () => {
      const partnerShow = new PartnerShow({
        id: "slug-for-show",
        partner: fabricate("partner"),
      })
      partnerShow
        .url()
        .should.equal(
          `${sd.API_URL}/api/v1/partner/${
            partnerShow.get("partner").id
          }/show/${partnerShow.get("id")}`
        )
    })

    it("returns a URL with no id for new models", () => {
      const partnerShow = new PartnerShow({ id: "slug-for-show" })
      partnerShow
        .url()
        .should.equal(`${sd.API_URL}/api/v1/show/${partnerShow.get("id")}`)
    })
  })

  describe("#toJSONLD", () => {
    it("returns valid json", () => {
      const artist = fabricate("artist")
      testContext.partnerShow.set({ artists: [artist] })
      const json = testContext.partnerShow.toJSONLD()
      json["@context"].should.equal("http://schema.org")
      json["@type"].should.equal("Event")
      json.name.should.equal("Inez & Vinoodh")
      json.location.name.should.equal("Gagosian Gallery")
      json.location.address.should.eql({
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10011",
        streetAddress: "529 W 20th St.2nd Floor",
      })
      json.performer[0].should.eql({
        "@type": "Person",
        image: "/images/missing_image.png",
        name: "Pablo Picasso",
        sameAs: `${sd.APP_URL}/artist/${artist.id}`,
      })
    })
  })

  describe("#toPageTitle", () => {
    it("creates a title defensively handling empty or missing values", () => {
      testContext.partnerShow
        .toPageTitle()
        .should.containEql("Inez & Vinoodh | Gagosian Gallery |")
    })

    it("omits the artworks for sale bit if the partner is not a gallery", () => {
      testContext.partnerShow.attributes.partner.name = "White Cube"
      testContext.partnerShow.attributes.partner.type = "Institution"
      testContext.partnerShow
        .toPageTitle()
        .should.not.containEql(", Artwork for Sale")
    })
  })

  describe("#toPageDescription", () => {
    it("correctly renders the meta description", () => {
      testContext.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })

    it("adds a single artist to the meta description", () => {
      testContext.partnerShow.set("artists", [fabricate("artist")])
      testContext.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show featuring works by Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })

    it("adds multiple artists to the meta description", () => {
      testContext.partnerShow.set("artists", [
        fabricate("artist"),
        fabricate("artist"),
      ])
      testContext.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show featuring works by Pablo Picasso and Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })
  })

  describe("#location", () => {
    it("returns a partner location", () => {
      const show = new PartnerShow(fabricate("show"))
      show.location().should.be.instanceOf(PartnerLocation)
    })

    it("returns a fair location", () => {
      const show = new PartnerShow(
        fabricate("show", {
          fair_location: {
            display: "Booth 1234",
          },
        })
      )
      show.location().should.be.instanceOf(FairLocation)
    })
  })

  describe("#isOnlineExclusive", () => {
    it("returns false when there is partner location", () => {
      const show = new PartnerShow(
        fabricate("show", {
          fair: null,
          location: new PartnerLocation({ fabricate: "partner_location" }),
          partner_city: null,
        })
      )
      show.isOnlineExclusive().should.be.false()
    })

    it("returns false when there is a partner_city", () => {
      const show = new PartnerShow(
        fabricate("show", {
          fair: null,
          location: null,
          partner_city: "Tehran",
        })
      )
      show.isOnlineExclusive().should.be.false()
    })

    it("returns false when its a fair show", () => {
      const show = new PartnerShow(
        fabricate("show", {
          fair: new Fair({ fabricate: "fair" }),
          location: null,
          partner_city: null,
        })
      )
      show.isOnlineExclusive().should.be.false()
    })

    it("returns true when there is no location", () => {
      const show = new PartnerShow(
        fabricate("show", {
          fair: null,
          location: null,
          partner_location: null,
        })
      )
      show.isOnlineExclusive().should.be.true()
    })
  })

  describe("#formatShowOrFairCity", () => {
    it("returns undefined without location and fair", () => {
      const show = new PartnerShow(
        fabricate("show", { fair: null, location: null })
      )
      _.isUndefined(show.formatShowOrFairCity()).should.be.true()
    })
  })

  describe("#runningDates", () => {
    it("gives a formatted date span for the running dates", () => {
      testContext.partnerShow
        .runningDates()
        .should.equal("Jul 12th – Aug 23rd 2013")
    })
  })

  describe("#shareTitle", () => {
    it("includes fair location", () => {
      testContext.partnerShow.set({
        fair_location: {
          display: "Booth 1234",
        },
      })

      testContext.partnerShow
        .shareTitle()
        .should.equal("Inez & Vinoodh, Booth 1234 See it on @artsy")
    })

    it("include partner name", () => {
      testContext.partnerShow
        .shareTitle()
        .should.equal('See "Inez & Vinoodh" at Gagosian Gallery on @artsy')
    })
  })

  describe("#formatArtists", () => {
    beforeEach(() => {
      testContext.partnerShow.set({
        artists: [
          fabricate("artist", { id: "picasso-1" }),
          fabricate("artist", { id: "picasso-2" }),
          fabricate("artist", { id: "picasso-3" }),
          fabricate("artist", { id: "picasso-4" }),
        ],
      })
    })

    it("correctly limits artists", () => {
      testContext.partnerShow
        .formatArtists(2)
        .should.equal(
          "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a> and 2 more"
        )
    })

    it("correctly limits artists", () => {
      testContext.partnerShow
        .formatArtists()
        .should.equal(
          "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a>, <a href='/artist/picasso-3'>Pablo Picasso</a>, <a href='/artist/picasso-4'>Pablo Picasso</a>"
        )
    })
  })

  describe("#fairLocationDisplay", () => {
    it("Returns fair location", () => {
      testContext.partnerShow.set({
        fair_location: {
          display: "Booth 1234",
        },
      })

      testContext.partnerShow
        .fairLocationDisplay()
        .should.equal("<i>New York</i> &ndash; Booth 1234")
    })

    it("works with a missing fair location", () => {
      testContext.partnerShow.set({ fair_location: null })
      testContext.partnerShow
        .fairLocationDisplay()
        .should.equal("<i>New York</i> &ndash; ")
    })
  })

  describe("#posterImageUrl", () => {
    it("returns an image", () => {
      testContext.partnerShow
        .posterImageUrl()
        .should.containEql(
          "partner_show_images/51f6a51d275b24a787000c36/1/large.jpg"
        )
    })

    it("returns a featured image", () => {
      testContext.partnerShow
        .posterImageUrl(true)
        .should.containEql(
          "/partner_show_images/51f6a51d275b24a787000c36/1/featured.jpg"
        )
    })

    it("returns larger if featured or large is unavailable", done => {
      testContext.partnerShow.on("fetch:posterImageUrl", function (url) {
        url.should.containEql(
          "additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg"
        )
        done()
      })

      testContext.partnerShow.unset("image_versions")
      testContext.partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].url.should.containEql(
        `/api/v1/partner/${testContext.partnerShow.get("partner").id}/show/${
          testContext.partnerShow.id
        }/artworks`
      )
      Backbone.sync.args[0][2].success([fabricate("artwork")])
    })

    it("returns empty when there really is no image", () => {
      testContext.partnerShow.unset("image_versions")
      testContext.partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].success([])
    })
  })

  describe("#openingThisWeek", () => {
    beforeEach(() => {
      testContext.starting = "2015-04-09T04:00:00+00:00"
      testContext.partnerShow.set("start_at", testContext.starting)
    })

    xit('returns a boolean if the show opens within "this week"', function () {
      // if today is a tuesday and show is opening the next thursday
      this.today = moment("2015-04-08T04:00:00+00:00")
      this.partnerShow.openingThisWeek().should.be.false()
      // if today is the prior saturday and show is opening on a thursday
      this.today = moment("2015-04-04T04:00:00+00:00")
      this.partnerShow.openingThisWeek(this.today).should.be.true()
      // if today is the prior thursday and the show is opening on a thursday
      this.today = moment("2015-04-02T04:00:00+00:00")
      this.partnerShow.openingThisWeek(this.today).should.be.false()
    })
  })

  describe("#isEndingSoon", () => {
    beforeEach(() => {
      testContext.ending = "2013-08-23T04:00:00+00:00"
      testContext.partnerShow.set("end_at", testContext.ending)
    })

    it("returns a boolean if the show ends within the desired timeframe (default 5 days)", () => {
      testContext.partnerShow
        .isEndingSoon(5, moment(testContext.ending).subtract(3, "days"))
        .should.be.true()
      testContext.partnerShow
        .isEndingSoon(5, moment(testContext.ending).subtract(5, "days"))
        .should.be.true()
      testContext.partnerShow
        .isEndingSoon(5, moment(testContext.ending).subtract(5.5, "days"))
        .should.be.false()
      testContext.partnerShow
        .isEndingSoon(5, moment(testContext.ending).subtract(6, "days"))
        .should.be.false()
    })

    it('supports custom day values for "soon"', () => {
      testContext.partnerShow
        .isEndingSoon(2, moment(testContext.ending).subtract(3, "days"))
        .should.be.false()
      testContext.partnerShow
        .isEndingSoon(3, moment(testContext.ending).subtract(3, "days"))
        .should.be.true()
    })
  })

  describe("#endingIn", () => {
    beforeEach(() => {
      testContext.ending = "2013-08-23T04:00:00+00:00"
      testContext.partnerShow.set("end_at", testContext.ending)
    })

    it("returns the correct string", () => {
      testContext.partnerShow
        .endingIn(moment(testContext.ending).subtract(3, "days"))
        .should.equal("in 3 days")
      testContext.partnerShow
        .endingIn(moment(testContext.ending).subtract(1, "day"))
        .should.equal("in 1 day")
      testContext.partnerShow
        .endingIn(moment(testContext.ending))
        .should.equal("today")
    })
  })

  describe("#isOpeningToday", () => {
    beforeEach(() => {
      testContext.starting = "2013-07-12T04:00:00+00:00"
      testContext.partnerShow.set("start_at", testContext.starting)
    })

    it("returns a boolean value for whether or not the show opens *today*", () => {
      testContext.partnerShow
        .isOpeningToday(moment(testContext.starting).subtract(1, "day"))
        .should.be.false()
      testContext.partnerShow
        .isOpeningToday(moment(testContext.starting).add(1, "day"))
        .should.be.false()
      testContext.partnerShow
        .isOpeningToday(moment(testContext.starting))
        .should.be.true()
    })
  })

  describe("#contextualLabel", () => {
    describe("with name", () => {
      it("returns the correct label", () => {
        new PartnerShow({ artists: [0, 0, 0], fair: null })
          .contextualLabel("Foobar")
          .should.equal("Group Show including Foobar")
        new PartnerShow({ artists: [0], fair: null })
          .contextualLabel("Foobar")
          .should.equal("Solo Show")
        new PartnerShow({ artists: [0], fair: "existy" })
          .contextualLabel("Foobar")
          .should.equal("Fair Booth including Foobar")
        new PartnerShow({ artists: [0, 0, 0], fair: "existy" })
          .contextualLabel("Foobar")
          .should.equal("Fair Booth including Foobar")
      })
    })

    describe("without name", () => {
      it("returns the correct label", () => {
        new PartnerShow({ artists: [0, 0, 0], fair: null })
          .contextualLabel()
          .should.equal("Group Show")
        new PartnerShow({ artists: [0], fair: null })
          .contextualLabel()
          .should.equal("Solo Show")
        new PartnerShow({ artists: [0], fair: "existy" })
          .contextualLabel()
          .should.equal("Fair Booth")
        new PartnerShow({ artists: [0, 0, 0], fair: "existy" })
          .contextualLabel()
          .should.equal("Fair Booth")
      })
    })
  })

  describe("#daySchedules", () => {
    beforeEach(() => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
    })

    it("returns true if a show has day schedules", () => {
      testContext.partnerShow.daySchedules().should.be.true()
    })

    it("returns false if a show has no schedules", () => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", { day_schedules: [] }),
        })
      )
      testContext.partnerShow.daySchedules().should.be.false()
    })
  })

  describe("#formatDaySchedule", () => {
    beforeEach(() => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
      testContext.partnerShow.get("location").day_schedules.push({
        _id: "5543d89472616978f1e40100",
        day_of_week: "Tuesday",
        end_time: 88400,
        start_time: 76000,
      })
    })

    it("returns the formatted day schedule for a day of the week with a day schedule", () => {
      testContext.partnerShow
        .formatDaySchedule("Monday")
        .should.match({ hours: "10am–7pm", start: "Monday" })
    })

    it("returns the formatted day schedule for a day of the week with no day schedule", () => {
      testContext.partnerShow
        .formatDaySchedule("Friday")
        .should.match({ hours: "Closed", start: "Friday" })
    })

    it("returns the formatted day schedule for a day with multiple schedule blocks", () => {
      testContext.partnerShow
        .formatDaySchedule("Tuesday")
        .should.match({ hours: "10am–7pm, 9:06pm–12:33am", start: "Tuesday" })
    })
  })

  describe("#formatDaySchedules", () => {
    beforeEach(() => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
      testContext.partnerShow.get("location").day_schedules.push({
        _id: "5543d89472616978f1e40100",
        day_of_week: "Tuesday",
        end_time: 88400,
        start_time: 76000,
      })
    })

    it("returns a formatted string describing the days open and hours for the show", () => {
      testContext.partnerShow.formatDaySchedules().should.match([
        { hours: "10am–7pm", start: "Monday" },
        { hours: "10am–7pm, 9:06pm–12:33am", start: "Tuesday" },
        { hours: "10am–7pm", start: "Wednesday" },
        { hours: "10am–7pm", start: "Thursday" },
        { hours: "Closed", start: "Friday" },
        { hours: "Closed", start: "Saturday" },
        { hours: "10am–7pm", start: "Sunday" },
      ])
    })
  })

  describe("#formatModalDaySchedules", () => {
    beforeEach(() => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
    })

    it("returns a formatted string describing the days open and hours for the show", () => {
      testContext.partnerShow
        .formatModalDaySchedules()
        .should.match([{ days: "Monday–Thursday, Sunday", hours: "10am–7pm" }])
    })

    it("returns a correctly formatted string when a show has unusual hours", () => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", {
            day_schedules: [
              {
                _id: "5543d893726169750b990100",
                day_of_week: "Wednesday",
                end_time: 68992,
                start_time: 42359,
              },
              {
                _id: "5543d8937261697591bd0100",
                day_of_week: "Monday",
                end_time: 70250,
                start_time: 1800,
              },
              {
                _id: "5543d89472616978f1e40100",
                day_of_week: "Tuesday",
                end_time: 68992,
                start_time: 42359,
              },
              {
                _id: "5543d8947261690f169d0100",
                day_of_week: "Saturday",
                end_time: 70250,
                start_time: 1800,
              },
              {
                _id: "5543d8947261695aea200200",
                day_of_week: "Thursday",
                end_time: 68992,
                start_time: 42359,
              },
            ],
          }),
        })
      )
      testContext.partnerShow.formatModalDaySchedules().should.match([
        { days: "Monday, Saturday", hours: "12:30am–7:30pm" },
        { days: "Tuesday–Thursday", hours: "11:45am–7:09pm" },
      ])
    })

    it("returns a correctly formatted string when a show has overlapping days and multiple time blocks", () => {
      testContext.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", {
            day_schedules: [
              {
                _id: "5543d893726169750b990100",
                day_of_week: "Wednesday",
                end_time: 68992,
                start_time: 42359,
              },
              {
                _id: "5543d8937261697591bd0100",
                day_of_week: "Monday",
                end_time: 70250,
                start_time: 1800,
              },
              {
                _id: "5543d89472616978f1e40100",
                day_of_week: "Tuesday",
                end_time: 68992,
                start_time: 42359,
              },
              {
                _id: "5543d89472616978f1e40100",
                day_of_week: "Tuesday",
                end_time: 98992,
                start_time: 82359,
              },
              {
                _id: "5543d8947261690f169d0100",
                day_of_week: "Saturday",
                end_time: 70250,
                start_time: 1800,
              },
              {
                _id: "5543d8947261695aea200200",
                day_of_week: "Thursday",
                end_time: 68992,
                start_time: 42359,
              },
              {
                _id: "5543d89472616978f1e40100",
                day_of_week: "Wednesday",
                end_time: 98992,
                start_time: 82359,
              },
            ],
          }),
        })
      )
      testContext.partnerShow.formatModalDaySchedules().should.match([
        { days: "Monday, Saturday", hours: "12:30am–7:30pm" },
        { days: "Tuesday–Wednesday", hours: "11:45am–7:09pm, 10:52pm–3:29am" },
        { days: "Thursday", hours: "11:45am–7:09pm" },
      ])
    })
  })
})
