import moment from "moment"
import sinon from "sinon"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const { Artwork } = require("../../models/artwork")
const { Sale } = require("../../models/sale")

describe("Sale", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.sale = new Sale(fabricate("sale"))

    sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("reminder states", () => {
    beforeEach(() => {
      testContext.liveOpenSale = new Sale(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(1, "hours").format(),
          live_start_at: moment().subtract(1, "hours").format(),
        })
      )
      testContext.liveSoonSale = new Sale(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(13, "hours").format(),
          live_start_at: moment().add(8, "minutes").format(),
        })
      )
      testContext.closingSoonSale = new Sale(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(12, "hours"),
        })
      )
      testContext.closedSale = new Sale(
        fabricate("sale", {
          auction_state: "closed",
          end_at: moment().subtract(1, "day").format(),
        })
      )
      testContext.liveClosedSale = new Sale(
        fabricate("sale", {
          auction_state: "closed",
          end_at: moment().add(1, "day").format(),
          live_start_at: moment().subtract(1, "hours").format(),
        })
      )
    })

    describe("#reminderStatus", () => {
      it("returns a string for a valid reminder state", () => {
        testContext.liveOpenSale.reminderStatus().should.equal("live_open")
        testContext.liveSoonSale.reminderStatus().should.equal("live_open_soon")
        testContext.closingSoonSale
          .reminderStatus()
          .should.equal("closing_soon")
      })
      it("returns undefined if no reminder is needed", () => {
        ;(typeof testContext.closedSale.reminderStatus()).should.equal(
          "undefined"
        )
      })
      it('returns undefined for a sale that would be "closing soon" if it were not also live', () => {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(8, "hours").format(),
          })
        )
        const type = typeof sale.reminderStatus()
        type.should.equal("undefined")
      })
    })

    describe("#isClosingSoon", () => {
      it("returns true if the sale is closing soon", () => {
        testContext.closingSoonSale.isClosingSoon().should.be.true()
        new Sale(
          fabricate("sale", { end_at: moment().add(20, "minutes").format() })
        )
          .isClosingSoon()
          .should.be.true()
        new Sale(
          fabricate("sale", { end_at: moment().add(30, "seconds").format() })
        )
          .isClosingSoon()
          .should.be.true()
      })
      it("returns false if the sale is a live auction", () => {
        const sale = new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(8, "hours").format(),
          })
        )
        sale.isClosingSoon().should.be.false()
      })
      it("returns false if the sale is not closing soon or is already over", () => {
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
        testContext.closedSale.isClosingSoon().should.be.false()
      })
    })

    describe("#isLiveOpenSoon", () => {
      it("returns true if the sale is opening within 10 minutes", () => {
        testContext.liveSoonSale.isLiveOpenSoon().should.be.true()
      })
      it("returns false if the sale is closed", () => {
        new Sale(
          fabricate("sale", {
            end_at: moment().subtract(1, "hours").format(),
            live_start_at: moment().subtract(2, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false()
      })
      it("returns false if a live auction is not opening within 10 minutes", () => {
        new Sale(
          fabricate("sale", {
            end_at: moment().add(36, "hours").format(),
            live_start_at: moment().add(25, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false()
      })

      // could this happen? Should this throw or log somewhere?
      it("returns false if for some reason the sale ends before live starts", () => {
        new Sale(
          fabricate("sale", {
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().add(12, "hours").format(),
          })
        )
          .isLiveOpenSoon()
          .should.be.false()
      })
    })

    describe("#isLiveOpen", () => {
      it("returns true if sale is currently open for live bidding", () => {
        testContext.liveOpenSale.isLiveOpen().should.be.true()
      })
      it("returns false if it is not live_start_at time yet", () => {
        const sale = new Sale(
          fabricate("sale", {
            auction_state: "open",
            end_at: moment().add(1, "hours").format(),
            live_start_at: moment().add(30, "minutes").format(),
          })
        )
        sale.isLiveOpen().should.be.false()
      })
      it("returns false if sale has a live property of false", () => {
        const sale = new Sale(
          fabricate("sale", {
            auction_state: "closed",
            end_at: moment().add(10, "hours").format(),
            live_start_at: moment().subtract(30, "minutes").format(),
          })
        )
        sale.isLiveOpen().should.be.false()
      })
      it("returns false if sale is not a live auction", () => {
        const sale = new Sale(
          fabricate("sale", { end_at: moment().add(1, "hours").format() })
        )
        sale.isLiveOpen().should.be.false()
      })
    })

    describe("#isRegistrationEnded", () => {
      it("returns false if there is no registration_ends_at", () => {
        testContext.sale.set({ is_auction: true, registration_ends_at: null })
        testContext.sale.isRegistrationEnded().should.be.false()
      })
      it("returns false if the registration_ends_at is in the future", () => {
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().add(2, "days").format(),
        })
        testContext.sale.isRegistrationEnded().should.be.false()
      })
      it("returns true if the registration_ends_at is in the past", () => {
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        testContext.sale.isRegistrationEnded().should.be.true()
      })
    })
  })

  describe("actionButtonState", () => {
    beforeEach(() => {
      testContext.artwork = new Artwork()
      testContext.user = new Backbone.Model()
    })

    describe("contact", () => {
      it("returns the correct button attributes", () => {
        testContext.sale.set("sale_type", "auction promo")
        testContext.sale
          .contactButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Contact Auction House")
      })
    })

    describe("buy now", () => {
      it("returns the correct button attributes", () => {
        testContext.sale.set({ auction_state: "open", sale_type: "default" })
        testContext.artwork.set({ acquireable: true, sold: false })
        testContext.sale
          .buyButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Buy now")
        testContext.artwork.set("sold", true)
        testContext.sale
          .buyButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Sold")
      })
    })

    describe("bid", () => {
      it("shows Register to bid if auction is a preview", () => {
        testContext.sale.set({ auction_state: "preview", sale_type: "default" })
        testContext.user.set("registered_to_bid", false)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Register to bid")
      })

      it("shows Registered to Bid if user has already registered", () => {
        testContext.sale.set({ auction_state: "preview", sale_type: "default" })
        testContext.user.set("registered_to_bid", true)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Registered to bid")
      })

      it("shows Bid if the auction is open", () => {
        testContext.sale.set({ auction_state: "preview", sale_type: "default" })
        testContext.sale.set("auction_state", "open")
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Bid")
      })

      it("shows Auction Closed if the auction is closed", () => {
        testContext.sale.set({ auction_state: "preview", sale_type: "default" })
        testContext.sale.set("auction_state", "closed")
        testContext.artwork.set({ acquireable: false, sold: true })
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Auction Closed")
      })

      it("shows Sold if the artwork is sold", () => {
        // If the artwork is sold, then it's sold
        testContext.sale.set("auction_state", "open")
        testContext.user.set("registered_to_bid", true)
        testContext.artwork.set("sold", true)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Sold")
      })

      it("shows Registration Closed when registration is closed", () => {
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Registration Closed")
      })

      it("shows Registration Pending if user is awaiting approval and registration closed", () => {
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        testContext.user.set("registered_to_bid", true)
        testContext.user.set("qualified_for_bidding", false)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Registration Pending")
      })

      it("shows Registration Pending if user is awaiting approval", () => {
        testContext.user.set("registered_to_bid", true)
        testContext.user.set("qualified_for_bidding", false)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Registration Pending")
      })

      it("shows Bid if user has been qualified, even if registration is closed", () => {
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        testContext.user.set("registered_to_bid", true)
        testContext.user.set("qualified_for_bidding", true)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Bid")
      })

      it("shows Enter Live Auction if live auction has opened", () => {
        testContext.sale.set({
          auction_state: "open",
          end_at: moment().add(1, "days").format(),
          is_auction: true,
          live_start_at: moment().subtract(2, "days").format(),
        })
        testContext.sale.set({
          is_auction: true,
          registration_ends_at: moment().subtract(2, "days").format(),
        })
        testContext.user.set("registered_to_bid", true)
        testContext.user.set("qualified_for_bidding", true)
        testContext.sale
          .bidButtonState(testContext.user, testContext.artwork)
          .label.should.equal("Enter Live Auction")
      })
    })
  })

  describe("endedTime", () => {
    it("returns the end_at if the sale has an end_at", () => {
      testContext.sale.set({ end_at: moment("2016-12-30") })
      testContext.sale
        .endedTime()
        .format("MMM D, YYYY")
        .should.equal("Dec 30, 2016")
    })

    it("returns the ended_at if the sale has no end_at", () => {
      testContext.sale.set({ end_at: null, ended_at: moment("2016-12-30") })
      testContext.sale
        .endedTime()
        .format("MMM D, YYYY")
        .should.equal("Dec 30, 2016")
    })
  })

  describe("#fetchArtworks", () => {
    it("fetches the sale artworks", () => {
      testContext.sale.fetchArtworks()
      Backbone.sync.args[0][1]
        .url()
        .should.match(new RegExp(`/api/v1/sale/.*/sale_artworks`))
    })
  })

  describe("#registerUrl", () => {
    it.skip("points to the secure auction registration page", () => {})
    it.skip("points to the signup page when not logged in", () => {})
  })

  describe("#redirectUrl", () => {
    it("redirects to the bid page if the sale is bidable and it has an artwork and fallback to the auction page", () => {
      testContext.sale.set({ auction_state: "open", is_auction: true })
      testContext.sale
        .redirectUrl({ id: "my-artwork-id" })
        .should.equal("/auction/whtney-art-party/bid/my-artwork-id")
      testContext.sale.redirectUrl().should.equal("/auction/whtney-art-party")
      testContext.sale.set({ auction_state: "preview" })
      testContext.sale
        .redirectUrl({ id: "my-artwork-id" })
        .should.equal("/auction/whtney-art-party")
    })
  })

  describe("#calculateOffsetTimes", () => {
    describe("client time preview", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.sale.set({
          end_at: moment().add(3, "minutes").format(),
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
        })
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("start_at")).unix())
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("end_at")).unix())
        testContext.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at"))
              .subtract(2, "minutes")
              .unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).subtract(2, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("open")
      })

      it("reflects server closed state", () => {
        testContext.sale.set({ auction_state: "closed" })
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(4, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at"))
              .subtract(4, "minutes")
              .unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).subtract(4, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("closed")
      })
    })

    describe("client time open", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.sale.set({
          end_at: moment().add(3, "minutes").format(),
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
        })
        testContext.clock.tick(120000)
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at")).add(2, "minutes").unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).add(2, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        testContext.sale.get("clockState").should.equal("open")
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("start_at")).unix())
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("end_at")).unix())
      })

      it("reflects server closed state", () => {
        testContext.sale.set({ auction_state: "closed" })
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at"))
              .subtract(2, "minutes")
              .unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).subtract(2, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("closed")
      })
    })

    describe("client time closed", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.sale.set({
          end_at: moment().add(3, "minutes").format(),
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
        })
        testContext.clock.tick(240000)
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(4, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at")).add(4, "minutes").unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).add(4, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("start_at")).add(2, "minutes").unix()
          )
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.sale.get("end_at")).add(2, "minutes").unix()
          )
        testContext.sale.get("clockState").should.equal("open")
      })

      it("reflects server closed state", () => {
        testContext.sale.set({ auction_state: "closed" })
        testContext.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        testContext.sale.get("clockState").should.equal("closed")
        testContext.sale
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("start_at")).unix())
        testContext.sale
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.sale.get("end_at")).unix())
      })
    })
  })

  describe("#event", () => {
    it("returns an event in the correct timezone for an online sale", () => {
      // const time = moment("2017-02-11T17:00:00+00:00").utc()
      testContext.sale.set({
        end_at: moment("2017-02-13T17:00:00+00:00"),
        start_at: moment("2017-02-11T17:00:00+00:00"),
      })
      testContext.sale.event().get("start_at").should.eql("2017-02-11T12:00:00")
      testContext.sale.event().get("end_at").should.eql("2017-02-13T12:00:00")
    })

    it("returns an event in the correct timezone for a live sale", () => {
      // const time = moment("2017-02-11T17:00:00+00:00").utc()
      testContext.sale.set({
        end_at: moment("2017-02-13T17:00:00+00:00"),
        live_start_at: moment("2017-02-11T17:00:00+00:00"),
        start_at: moment("2017-02-09T17:00:00+00:00"),
      })
      testContext.sale.event().get("start_at").should.eql("2017-02-11T12:00:00")
      testContext.sale.event().get("end_at").should.eql("2017-02-11T16:00:00")
    })
  })

  describe("#upcomingLabel", () => {
    it("renders the correct opening label when EDT", () => {
      const time = moment("2016-11-02 12:00:00", "YYYY-MM-DD HH:mm:ss").utc()
      testContext.sale.isPreviewState = () => true
      testContext.sale.set({
        end_at: time.add(2, "days"),
        start_at: time,
      })
      testContext.sale.upcomingLabel().should.containEql("Auction opens Nov 4")
      testContext.sale.upcomingLabel().should.containEql("EDT")
    })

    it("renders the correct opening label when EST", () => {
      const time = moment("2016-1-02 12:00:00", "YYYY-MM-DD HH:mm:ss").utc()
      testContext.sale.isPreviewState = () => true
      testContext.sale.set({
        end_at: time.add(2, "days"),
        start_at: time,
      })
      testContext.sale.upcomingLabel().should.containEql("Auction opens Jan 4")
      testContext.sale.upcomingLabel().should.containEql("EST")
    })
  })

  describe("#sortableDate", () => {
    it("returns the live_start_at if it exists", () => {
      testContext.sale.set({
        end_at: moment().add(2, "days"),
        live_start_at: moment().add(1, "days"),
      })
      testContext.sale
        .sortableDate()
        .should.eql(testContext.sale.get("live_start_at"))
    })

    it("returns the end_at if no live_start_at exists", () => {
      testContext.sale.set({
        end_at: moment().add(2, "days"),
      })
      testContext.sale.sortableDate().should.eql(testContext.sale.get("end_at"))
    })
  })
})
