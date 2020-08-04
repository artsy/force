/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sd = require("sharify").data
const should = require("should")
const Backbone = require("backbone")
const PartnerShow = require("../../models/partner_show")
const PartnerLocation = require("../../models/partner_location")
const FairLocation = require("../../models/partner_location")
const Fair = require("../../models/fair")
const sinon = require("sinon")
const moment = require("moment")

describe("PartnerShow", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.partnerShow = new PartnerShow(fabricate("show")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#url", function () {
    it("includes a partner in the url if the model has one", function () {
      const partnerShow = new PartnerShow({
        id: "slug-for-show",
        partner: fabricate("partner"),
      })
      return partnerShow
        .url()
        .should.equal(
          `${sd.API_URL}/api/v1/partner/${
            partnerShow.get("partner").id
          }/show/${partnerShow.get("id")}`
        )
    })

    return it("returns a URL with no id for new models", function () {
      const partnerShow = new PartnerShow({ id: "slug-for-show" })
      return partnerShow
        .url()
        .should.equal(`${sd.API_URL}/api/v1/show/${partnerShow.get("id")}`)
    })
  })

  describe("#toJSONLD", () =>
    it("returns valid json", function () {
      const artist = fabricate("artist")
      this.partnerShow.set({ artists: [artist] })
      const json = this.partnerShow.toJSONLD()
      json["@context"].should.equal("http://schema.org")
      json["@type"].should.equal("Event")
      json.name.should.equal("Inez & Vinoodh")
      json.location.name.should.equal("Gagosian Gallery")
      json.location.address.should.eql({
        "@type": "PostalAddress",
        streetAddress: "529 W 20th St.2nd Floor",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10011",
      })
      return json.performer[0].should.eql({
        "@type": "Person",
        image: "/images/missing_image.png",
        name: "Pablo Picasso",
        sameAs: `${sd.APP_URL}/artist/${artist.id}`,
      })
    }))

  describe("#toPageTitle", function () {
    it("creates a title defensively handling empty or missing values", function () {
      return this.partnerShow
        .toPageTitle()
        .should.containEql("Inez & Vinoodh | Gagosian Gallery |")
    })

    return it("omits the artworks for sale bit if the partner is not a gallery", function () {
      this.partnerShow.attributes.partner.name = "White Cube"
      this.partnerShow.attributes.partner.type = "Institution"
      return this.partnerShow
        .toPageTitle()
        .should.not.containEql(", Artwork for Sale")
    })
  })

  describe("#toPageDescription", function () {
    it("correctly renders the meta description", function () {
      return this.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })

    it("adds a single artist to the meta description", function () {
      this.partnerShow.set("artists", [fabricate("artist")])
      return this.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show featuring works by Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })

    return it("adds multiple artists to the meta description", function () {
      this.partnerShow.set("artists", [
        fabricate("artist"),
        fabricate("artist"),
      ])
      return this.partnerShow
        .toPageDescription()
        .should.containEql(
          "Past show featuring works by Pablo Picasso and Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor"
        )
    })
  })

  describe("#location", function () {
    it("returns a partner location", function () {
      const show = new PartnerShow(fabricate("show"))
      return show.location().should.be.instanceOf(PartnerLocation)
    })

    return it("returns a fair location", function () {
      const show = new PartnerShow(
        fabricate("show", {
          fair_location: {
            display: "Booth 1234",
          },
        })
      )
      return show.location().should.be.instanceOf(FairLocation)
    })
  })

  describe("#isOnlineExclusive", function () {
    it("returns false when there is partner location", function () {
      const show = new PartnerShow(
        fabricate("show", {
          location: new PartnerLocation({ fabricate: "partner_location" }),
          partner_city: null,
          fair: null,
        })
      )
      return show.isOnlineExclusive().should.be.false()
    })

    it("returns false when there is a partner_city", function () {
      const show = new PartnerShow(
        fabricate("show", {
          location: null,
          partner_city: "Tehran",
          fair: null,
        })
      )
      return show.isOnlineExclusive().should.be.false()
    })

    it("returns false when its a fair show", function () {
      const show = new PartnerShow(
        fabricate("show", {
          location: null,
          fair: new Fair({ fabricate: "fair" }),
          partner_city: null,
        })
      )
      return show.isOnlineExclusive().should.be.false()
    })

    return it("returns true when there is no location", function () {
      const show = new PartnerShow(
        fabricate("show", {
          location: null,
          partner_location: null,
          fair: null,
        })
      )
      return show.isOnlineExclusive().should.be.true()
    })
  })

  describe("#formatShowOrFairCity", () =>
    it("returns undefined without location and fair", function () {
      const show = new PartnerShow(
        fabricate("show", { fair: null, location: null })
      )
      return _.isUndefined(show.formatShowOrFairCity()).should.be.true()
    }))

  describe("#runningDates", () =>
    it("gives a formatted date span for the running dates", function () {
      return this.partnerShow
        .runningDates()
        .should.equal("Jul 12th – Aug 23rd 2013")
    }))

  describe("#shareTitle", function () {
    it("includes fair location", function () {
      this.partnerShow.set({
        fair_location: {
          display: "Booth 1234",
        },
      })

      return this.partnerShow
        .shareTitle()
        .should.equal("Inez & Vinoodh, Booth 1234 See it on @artsy")
    })

    return it("include partner name", function () {
      return this.partnerShow
        .shareTitle()
        .should.equal('See "Inez & Vinoodh" at Gagosian Gallery on @artsy')
    })
  })

  describe("#formatArtists", function () {
    beforeEach(function () {
      return this.partnerShow.set({
        artists: [
          fabricate("artist", { id: "picasso-1" }),
          fabricate("artist", { id: "picasso-2" }),
          fabricate("artist", { id: "picasso-3" }),
          fabricate("artist", { id: "picasso-4" }),
        ],
      })
    })

    it("correctly limits artists", function () {
      return this.partnerShow
        .formatArtists(2)
        .should.equal(
          "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a> and 2 more"
        )
    })

    return it("correctly limits artists", function () {
      return this.partnerShow
        .formatArtists()
        .should.equal(
          "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a>, <a href='/artist/picasso-3'>Pablo Picasso</a>, <a href='/artist/picasso-4'>Pablo Picasso</a>"
        )
    })
  })

  describe("#fairLocationDisplay", function () {
    it("Returns fair location", function () {
      this.partnerShow.set({
        fair_location: {
          display: "Booth 1234",
        },
      })

      return this.partnerShow
        .fairLocationDisplay()
        .should.equal("<i>New York</i> &ndash; Booth 1234")
    })

    return it("works with a missing fair location", function () {
      this.partnerShow.set({ fair_location: null })
      return this.partnerShow
        .fairLocationDisplay()
        .should.equal("<i>New York</i> &ndash; ")
    })
  })

  describe("#posterImageUrl", function () {
    it("returns an image", function () {
      return this.partnerShow
        .posterImageUrl()
        .should.containEql(
          "partner_show_images/51f6a51d275b24a787000c36/1/large.jpg"
        )
    })

    it("returns a featured image", function () {
      return this.partnerShow
        .posterImageUrl(true)
        .should.containEql(
          "/partner_show_images/51f6a51d275b24a787000c36/1/featured.jpg"
        )
    })

    it("returns larger if featured or large is unavailable", function (done) {
      this.partnerShow.on("fetch:posterImageUrl", function (url) {
        url.should.containEql(
          "additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg"
        )
        return done()
      })

      this.partnerShow.unset("image_versions")
      this.partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].url.should.containEql(
        `/api/v1/partner/${this.partnerShow.get("partner").id}/show/${
          this.partnerShow.id
        }/artworks`
      )
      return Backbone.sync.args[0][2].success([fabricate("artwork")])
    })

    return it("returns empty when there really is no image", function () {
      this.partnerShow.unset("image_versions")
      this.partnerShow.posterImageUrl()
      return Backbone.sync.args[0][2].success([])
    })
  })

  describe("#openingThisWeek", function () {
    beforeEach(function () {
      this.starting = "2015-04-09T04:00:00+00:00"
      return this.partnerShow.set("start_at", this.starting)
    })

    return xit('returns a boolean if the show opens within "this week"', function () {
      // if today is a tuesday and show is opening the next thursday
      this.today = moment("2015-04-08T04:00:00+00:00")
      this.partnerShow.openingThisWeek().should.be.false()
      // if today is the prior saturday and show is opening on a thursday
      this.today = moment("2015-04-04T04:00:00+00:00")
      this.partnerShow.openingThisWeek(this.today).should.be.true()
      // if today is the prior thursday and the show is opening on a thursday
      this.today = moment("2015-04-02T04:00:00+00:00")
      return this.partnerShow.openingThisWeek(this.today).should.be.false()
    })
  })

  describe("#isEndingSoon", function () {
    beforeEach(function () {
      this.ending = "2013-08-23T04:00:00+00:00"
      return this.partnerShow.set("end_at", this.ending)
    })

    it("returns a boolean if the show ends within the desired timeframe (default 5 days)", function () {
      this.partnerShow
        .isEndingSoon(5, moment(this.ending).subtract(3, "days"))
        .should.be.true()
      this.partnerShow
        .isEndingSoon(5, moment(this.ending).subtract(5, "days"))
        .should.be.true()
      this.partnerShow
        .isEndingSoon(5, moment(this.ending).subtract(5.5, "days"))
        .should.be.false()
      return this.partnerShow
        .isEndingSoon(5, moment(this.ending).subtract(6, "days"))
        .should.be.false()
    })

    return it('supports custom day values for "soon"', function () {
      this.partnerShow
        .isEndingSoon(2, moment(this.ending).subtract(3, "days"))
        .should.be.false()
      return this.partnerShow
        .isEndingSoon(3, moment(this.ending).subtract(3, "days"))
        .should.be.true()
    })
  })

  describe("#endingIn", function () {
    beforeEach(function () {
      this.ending = "2013-08-23T04:00:00+00:00"
      return this.partnerShow.set("end_at", this.ending)
    })

    return it("returns the correct string", function () {
      this.partnerShow
        .endingIn(moment(this.ending).subtract(3, "days"))
        .should.equal("in 3 days")
      this.partnerShow
        .endingIn(moment(this.ending).subtract(1, "day"))
        .should.equal("in 1 day")
      return this.partnerShow
        .endingIn(moment(this.ending))
        .should.equal("today")
    })
  })

  describe("#isOpeningToday", function () {
    beforeEach(function () {
      this.starting = "2013-07-12T04:00:00+00:00"
      return this.partnerShow.set("start_at", this.starting)
    })

    return it("returns a boolean value for whether or not the show opens *today*", function () {
      this.partnerShow
        .isOpeningToday(moment(this.starting).subtract(1, "day"))
        .should.be.false()
      this.partnerShow
        .isOpeningToday(moment(this.starting).add(1, "day"))
        .should.be.false()
      return this.partnerShow
        .isOpeningToday(moment(this.starting))
        .should.be.true()
    })
  })

  describe("#contextualLabel", function () {
    describe("with name", () =>
      it("returns the correct label", function () {
        new PartnerShow({ artists: [0, 0, 0], fair: null })
          .contextualLabel("Foobar")
          .should.equal("Group Show including Foobar")
        new PartnerShow({ artists: [0], fair: null })
          .contextualLabel("Foobar")
          .should.equal("Solo Show")
        new PartnerShow({ artists: [0], fair: "existy" })
          .contextualLabel("Foobar")
          .should.equal("Fair Booth including Foobar")
        return new PartnerShow({ artists: [0, 0, 0], fair: "existy" })
          .contextualLabel("Foobar")
          .should.equal("Fair Booth including Foobar")
      }))

    return describe("without name", () =>
      it("returns the correct label", function () {
        new PartnerShow({ artists: [0, 0, 0], fair: null })
          .contextualLabel()
          .should.equal("Group Show")
        new PartnerShow({ artists: [0], fair: null })
          .contextualLabel()
          .should.equal("Solo Show")
        new PartnerShow({ artists: [0], fair: "existy" })
          .contextualLabel()
          .should.equal("Fair Booth")
        return new PartnerShow({ artists: [0, 0, 0], fair: "existy" })
          .contextualLabel()
          .should.equal("Fair Booth")
      }))
  })

  describe("#daySchedules", function () {
    beforeEach(function () {
      return (this.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      ))
    })

    it("returns true if a show has day schedules", function () {
      return this.partnerShow.daySchedules().should.be.true()
    })

    return it("returns false if a show has no schedules", function () {
      this.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", { day_schedules: [] }),
        })
      )
      return this.partnerShow.daySchedules().should.be.false()
    })
  })

  describe("#formatDaySchedule", function () {
    beforeEach(function () {
      this.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
      return this.partnerShow.get("location").day_schedules.push({
        _id: "5543d89472616978f1e40100",
        start_time: 76000,
        end_time: 88400,
        day_of_week: "Tuesday",
      })
    })

    it("returns the formatted day schedule for a day of the week with a day schedule", function () {
      return this.partnerShow
        .formatDaySchedule("Monday")
        .should.match({ start: "Monday", hours: "10am–7pm" })
    })

    it("returns the formatted day schedule for a day of the week with no day schedule", function () {
      return this.partnerShow
        .formatDaySchedule("Friday")
        .should.match({ start: "Friday", hours: "Closed" })
    })

    return it("returns the formatted day schedule for a day with multiple schedule blocks", function () {
      return this.partnerShow
        .formatDaySchedule("Tuesday")
        .should.match({ start: "Tuesday", hours: "10am–7pm, 9:06pm–12:33am" })
    })
  })

  describe("#formatDaySchedules", function () {
    beforeEach(function () {
      this.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      )
      return this.partnerShow.get("location").day_schedules.push({
        _id: "5543d89472616978f1e40100",
        start_time: 76000,
        end_time: 88400,
        day_of_week: "Tuesday",
      })
    })

    return it("returns a formatted string describing the days open and hours for the show", function () {
      return this.partnerShow.formatDaySchedules().should.match([
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

  return describe("#formatModalDaySchedules", function () {
    beforeEach(function () {
      return (this.partnerShow = new PartnerShow(
        fabricate("show", { location: fabricate("partner_location") })
      ))
    })

    it("returns a formatted string describing the days open and hours for the show", function () {
      return this.partnerShow
        .formatModalDaySchedules()
        .should.match([{ days: "Monday–Thursday, Sunday", hours: "10am–7pm" }])
    })

    it("returns a correctly formatted string when a show has unusual hours", function () {
      this.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", {
            day_schedules: [
              {
                _id: "5543d893726169750b990100",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Wednesday",
              },
              {
                _id: "5543d8937261697591bd0100",
                start_time: 1800,
                end_time: 70250,
                day_of_week: "Monday",
              },
              {
                _id: "5543d89472616978f1e40100",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Tuesday",
              },
              {
                _id: "5543d8947261690f169d0100",
                start_time: 1800,
                end_time: 70250,
                day_of_week: "Saturday",
              },
              {
                _id: "5543d8947261695aea200200",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Thursday",
              },
            ],
          }),
        })
      )
      return this.partnerShow.formatModalDaySchedules().should.match([
        { days: "Monday, Saturday", hours: "12:30am–7:30pm" },
        { days: "Tuesday–Thursday", hours: "11:45am–7:09pm" },
      ])
    })

    return it("returns a correctly formatted string when a show has overlapping days and multiple time blocks", function () {
      this.partnerShow = new PartnerShow(
        fabricate("show", {
          location: fabricate("partner_location", {
            day_schedules: [
              {
                _id: "5543d893726169750b990100",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Wednesday",
              },
              {
                _id: "5543d8937261697591bd0100",
                start_time: 1800,
                end_time: 70250,
                day_of_week: "Monday",
              },
              {
                _id: "5543d89472616978f1e40100",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Tuesday",
              },
              {
                _id: "5543d89472616978f1e40100",
                start_time: 82359,
                end_time: 98992,
                day_of_week: "Tuesday",
              },
              {
                _id: "5543d8947261690f169d0100",
                start_time: 1800,
                end_time: 70250,
                day_of_week: "Saturday",
              },
              {
                _id: "5543d8947261695aea200200",
                start_time: 42359,
                end_time: 68992,
                day_of_week: "Thursday",
              },
              {
                _id: "5543d89472616978f1e40100",
                start_time: 82359,
                end_time: 98992,
                day_of_week: "Wednesday",
              },
            ],
          }),
        })
      )
      return this.partnerShow.formatModalDaySchedules().should.match([
        { days: "Monday, Saturday", hours: "12:30am–7:30pm" },
        { days: "Tuesday–Wednesday", hours: "11:45am–7:09pm, 10:52pm–3:29am" },
        { days: "Thursday", hours: "11:45am–7:09pm" },
      ])
    })
  })
})
