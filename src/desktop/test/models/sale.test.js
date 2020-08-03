/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const moment = require("moment")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../models/artwork")
const Sale = require("../../models/sale")

describe("Sale", function () {
  beforeEach(function () {
    this.sale = new Sale(fabricate("sale"))

    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("reminder states", function () {
    beforeEach(function () {
      this.liveOpenSale = new Sale(
        fabricate("sale", {
          end_at: moment().add(1, "hours").format(),
          live_start_at: moment().subtract(1, "hours").format(),
          auction_state: "open",
        })
      )
      this.liveSoonSale = new Sale(
        fabricate("sale", {
          end_at: moment().add(13, "hours").format(),
          live_start_at: moment().add(8, "minutes").format(),
          auction_state: "open",
        })
      )
      this.closingSoonSale = new Sale(
        fabricate("sale", {
          end_at: moment().add(12, "hours"),
          auction_state: "open",
        })
      )
      this.closedSale = new Sale(
        fabricate("sale", {
          end_at: moment().subtract(1, "day").format(),
          auction_state: "closed",
        })
      )
      return (this.liveClosedSale = new Sale(
        fabricate("sale", {
          end_at: moment().add(1, "day").format(),
          live_start_at: moment().subtract(1, "hours").format(),
          auction_state: "closed",
        })
      ))
    })

    describe("#reminderStatus", function () {
      it("returns a string for a valid reminder state", function () {
        this.liveOpenSale.reminderStatus().should.equal("live_open")
        this.liveSoonSale.reminderStatus().should.equal("live_open_soon")
        return this.closingSoonSale
          .reminderStatus()
          .should.equal("closing_soon")
      })
      it("returns undefined if no reminder is needed", function () {
        return (typeof this.closedSale.reminderStatus()).should.equal(
          "undefined"
        )
      })
      return it('returns undefined for a sale that would be "closing soon" if it were not also live', function () {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(8, "hours").format(),
          })
        )
        return (typeof sale.reminderStatus()).should.equal("undefined")
      })
    })

    describe("#isClosingSoon", function () {
      it("returns true if the sale is closing soon", function () {
        this.closingSoonSale.isClosingSoon().should.be.true()
        new Sale(
          fabricate("sale", { end_at: moment().add(20, "minutes").format() })
        )
          .isClosingSoon()
          .should.be.true()
        return new Sale(
          fabricate("sale", { end_at: moment().add(30, "seconds").format() })
        )
          .isClosingSoon()
          .should.be.true()
      })
      it("returns false if the sale is a live auction", function () {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(8, "hours").format(),
          })
        )
        return sale.isClosingSoon().should.be.false()
      })
      return it("returns false if the sale is not closing soon or is already over", function () {
        new Sale(
          fabricate("sale", { end_at: moment().add(5, "second").format() })
        )
          .isClosingSoon()
          .should.be.false()
        new Sale(
          fabricate("sale", { end_at: moment().add(2, "days").format() })
        )
          .isClosingSoon()
          .should.be.false()
        return this.closedSale.isClosingSoon().should.be.false()
      })
    })

    describe("#isLiveOpenSoon", function () {
      it("returns true if the sale is opening within 10 minutes", function () {
        return this.liveSoonSale.isLiveOpenSoon().should.be.true()
      })
      it("returns false if the sale is closed", () =>
        new Sale(
          fabricate("sale", {
            end_at: moment().subtract(1, "hours").format(),
            live_start_at: moment().subtract(2, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false())
      it("returns false if a live auction is not opening within 10 minutes", () =>
        new Sale(
          fabricate("sale", {
            end_at: moment().add(36, "hours").format(),
            live_start_at: moment().add(25, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false())

      // could this happen? Should this throw or log somewhere?
      return it("returns false if for some reason the sale ends before live starts", () =>
        new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(12, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false())
    })

    describe("#isLiveOpen", function () {
      it("returns true if sale is currently open for live bidding", function () {
        return this.liveOpenSale.isLiveOpen().should.be.true()
      })
      it("returns false if it is not live_start_at time yet", function () {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(1, "hours").format(),
            live_start_at: moment().add(30, "minutes").format(),
            auction_state: "open",
          })
        )
        return sale.isLiveOpen().should.be.false()
      })
      it("returns false if sale has a live property of false", function () {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().subtract(30, "minutes").format(),
            auction_state: "closed",
          })
        )
        return sale.isLiveOpen().should.be.false()
      })
      return it("returns false if sale is not a live auction", function () {
        const sale = new Sale(
          fabricate("sale", { end_at: moment().add(1, "hours").format() })
        )
        return sale.isLiveOpen().should.be.false()
      })
    })

    return describe("#isRegistrationEnded", function () {
      it("returns false if there is no registration_ends_at", function () {
        this.sale.set({ is_auction: true, registration_ends_at: null })
        return this.sale.isRegistrationEnded().should.be.false()
      })
      it("returns false if the registration_ends_at is in the future", function () {
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().add(2, "days").format(),
        })
        return this.sale.isRegistrationEnded().should.be.false()
      })
      return it("returns true if the registration_ends_at is in the past", function () {
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        return this.sale.isRegistrationEnded().should.be.true()
      })
    })
  })

  describe("actionButtonState", function () {
    beforeEach(function () {
      this.artwork = new Artwork()
      return (this.user = new Backbone.Model())
    })

    describe("contact", () =>
      it("returns the correct button attributes", function () {
        this.sale.set("sale_type", "auction promo")
        return this.sale
          .contactButtonState(this.user, this.artwork)
          .label.should.equal("Contact Auction House")
      }))

    describe("buy now", () =>
      it("returns the correct button attributes", function () {
        this.sale.set({ sale_type: "default", auction_state: "open" })
        this.artwork.set({ acquireable: true, sold: false })
        this.sale
          .buyButtonState(this.user, this.artwork)
          .label.should.equal("Buy now")
        this.artwork.set("sold", true)
        return this.sale
          .buyButtonState(this.user, this.artwork)
          .label.should.equal("Sold")
      }))

    return describe("bid", function () {
      it("shows Register to bid if auction is a preview", function () {
        this.sale.set({ sale_type: "default", auction_state: "preview" })
        this.user.set("registered_to_bid", false)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Register to bid")
      })

      it("shows Registered to Bid if user has already registered", function () {
        this.sale.set({ sale_type: "default", auction_state: "preview" })
        this.user.set("registered_to_bid", true)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Registered to bid")
      })

      it("shows Bid if the auction is open", function () {
        this.sale.set({ sale_type: "default", auction_state: "preview" })
        this.sale.set("auction_state", "open")
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Bid")
      })

      it("shows Auction Closed if the auction is closed", function () {
        this.sale.set({ sale_type: "default", auction_state: "preview" })
        this.sale.set("auction_state", "closed")
        this.artwork.set({ sold: true, acquireable: false })
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Auction Closed")
      })

      it("shows Sold if the artwork is sold", function () {
        // If the artwork is sold, then it's sold
        this.sale.set("auction_state", "open")
        this.user.set("registered_to_bid", true)
        this.artwork.set("sold", true)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Sold")
      })

      it("shows Registration Closed when registration is closed", function () {
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Registration Closed")
      })

      it("shows Registration Pending if user is awaiting approval and registration closed", function () {
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        this.user.set("registered_to_bid", true)
        this.user.set("qualified_for_bidding", false)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Registration Pending")
      })

      it("shows Registration Pending if user is awaiting approval", function () {
        this.user.set("registered_to_bid", true)
        this.user.set("qualified_for_bidding", false)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Registration Pending")
      })

      it("shows Bid if user has been qualified, even if registration is closed", function () {
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        this.user.set("registered_to_bid", true)
        this.user.set("qualified_for_bidding", true)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Bid")
      })

      return it("shows Enter Live Auction if live auction has opened", function () {
        this.sale.set({
          is_auction: true,
          live_start_at: moment().subtract(2, "days").format(),
          end_at: moment().add(1, "days").format(),
          auction_state: "open",
        })
        this.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        this.user.set("registered_to_bid", true)
        this.user.set("qualified_for_bidding", true)
        return this.sale
          .bidButtonState(this.user, this.artwork)
          .label.should.equal("Enter Live Auction")
      })
    })
  })

  describe("endedTime", function () {
    it("returns the end_at if the sale has an end_at", function () {
      this.sale.set({ end_at: moment("2016-12-30") })
      return this.sale
        .endedTime()
        .format("MMM D, YYYY")
        .should.equal("Dec 30, 2016")
    })

    return it("returns the ended_at if the sale has no end_at", function () {
      this.sale.set({ end_at: null, ended_at: moment("2016-12-30") })
      return this.sale
        .endedTime()
        .format("MMM D, YYYY")
        .should.equal("Dec 30, 2016")
    })
  })

  describe("#fetchArtworks", () =>
    it("fetches the sale artworks", function () {
      this.sale.fetchArtworks()
      return Backbone.sync.args[0][1]
        .url()
        .should.match(new RegExp(`/api/v1/sale/.*/sale_artworks`))
    }))

  describe("#registerUrl", function () {
    it("points to the secure auction registration page")
    return it("points to the signup page when not logged in")
  })

  describe("#redirectUrl", () =>
    it("redirects to the bid page if the sale is bidable and it has an artwork and fallback to the auction page", function () {
      this.sale.set({ is_auction: true, auction_state: "open" })
      this.sale
        .redirectUrl({ id: "my-artwork-id" })
        .should.equal("/auction/whtney-art-party/bid/my-artwork-id")
      this.sale.redirectUrl().should.equal("/auction/whtney-art-party")
      this.sale.set({ auction_state: "preview" })
      return this.sale
        .redirectUrl({ id: "my-artwork-id" })
        .should.equal("/auction/whtney-art-party")
    }))

  describe("#calculateOffsetTimes", function () {
    describe("client time preview", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        return this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("start_at")).unix())
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).unix())
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).subtract(2, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("end_at")).subtract(2, "minutes").unix()
          )
        return this.sale.get("clockState").should.equal("open")
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(4, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).subtract(4, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("end_at")).subtract(4, "minutes").unix()
          )
        return this.sale.get("clockState").should.equal("closed")
      })
    })

    describe("client time open", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
        return this.clock.tick(120000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).add(2, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).add(2, "minutes").unix())
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale.get("clockState").should.equal("open")
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("start_at")).unix())
        return this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).unix())
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).subtract(2, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("end_at")).subtract(2, "minutes").unix()
          )
        return this.sale.get("clockState").should.equal("closed")
      })
    })

    return describe("client time closed", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
        return this.clock.tick(240000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(4, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).add(4, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).add(4, "minutes").unix())
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.sale.get("start_at")).add(2, "minutes").unix()
          )
        this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).add(2, "minutes").unix())
        return this.sale.get("clockState").should.equal("open")
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale.get("clockState").should.equal("closed")
        this.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("start_at")).unix())
        return this.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.sale.get("end_at")).unix())
      })
    })
  })

  describe("#event", function () {
    it("returns an event in the correct timezone for an online sale", function () {
      const time = moment("2017-02-11T17:00:00+00:00").utc()
      this.sale.set({
        start_at: moment("2017-02-11T17:00:00+00:00"),
        end_at: moment("2017-02-13T17:00:00+00:00"),
      })
      this.sale.event().get("start_at").should.eql("2017-02-11T12:00:00")
      return this.sale.event().get("end_at").should.eql("2017-02-13T12:00:00")
    })

    return it("returns an event in the correct timezone for a live sale", function () {
      const time = moment("2017-02-11T17:00:00+00:00").utc()
      this.sale.set({
        start_at: moment("2017-02-09T17:00:00+00:00"),
        live_start_at: moment("2017-02-11T17:00:00+00:00"),
        end_at: moment("2017-02-13T17:00:00+00:00"),
      })
      this.sale.event().get("start_at").should.eql("2017-02-11T12:00:00")
      return this.sale.event().get("end_at").should.eql("2017-02-11T16:00:00")
    })
  })

  describe("#upcomingLabel", function () {
    it("renders the correct opening label when EDT", function () {
      const time = moment("2016-11-02 12:00:00", "YYYY-MM-DD HH:mm:ss").utc()
      this.sale.isPreviewState = () => true
      this.sale.set({
        start_at: time,
        end_at: time.add(2, "days"),
      })
      this.sale.upcomingLabel().should.containEql("Auction opens Nov 4")
      return this.sale.upcomingLabel().should.containEql("EDT")
    })

    return it("renders the correct opening label when EST", function () {
      const time = moment("2016-1-02 12:00:00", "YYYY-MM-DD HH:mm:ss").utc()
      this.sale.isPreviewState = () => true
      this.sale.set({
        start_at: time,
        end_at: time.add(2, "days"),
      })
      this.sale.upcomingLabel().should.containEql("Auction opens Jan 4")
      return this.sale.upcomingLabel().should.containEql("EST")
    })
  })

  return describe("#sortableDate", function () {
    it("returns the live_start_at if it exists", function () {
      this.sale.set({
        end_at: moment().add(2, "days"),
        live_start_at: moment().add(1, "days"),
      })
      return this.sale.sortableDate().should.eql(this.sale.get("live_start_at"))
    })

    return it("returns the end_at if no live_start_at exists", function () {
      this.sale.set({
        end_at: moment().add(2, "days"),
      })
      return this.sale.sortableDate().should.eql(this.sale.get("end_at"))
    })
  })
})
