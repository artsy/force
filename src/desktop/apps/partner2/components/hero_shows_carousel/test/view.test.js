/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const benv = require("benv")
const Partner = require("../../../../../models/partner.coffee")
const PartnerShow = require("../../../../../models/partner_show.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const HeroShowsCarousel = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("HeroShowsCarousel", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      this.view = new HeroShowsCarousel({ partner: this.partner })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#fetchShows", function () {
    it("makes proper requests to fetch shows", function () {
      let requests
      this.view.fetchShows()
      ;(requests = Backbone.sync.args).length.should.equal(4)
      _.each(requests, request => {
        return request[2].url.should.endWith(`${this.partner.url()}/shows`)
      })
      requests[0][2].data.should.eql({
        size: 1,
        sort: "-featured,-end_at",
        displayable: true,
      })
      requests[1][2].data.should.eql({
        size: 50,
        status: "running",
        sort: "end_at",
        displayable: true,
      })
      requests[2][2].data.should.eql({
        size: 50,
        status: "upcoming",
        sort: "start_at",
        displayable: true,
      })
      return requests[3][2].data.should.eql({
        size: 50,
        status: "closed",
        sort: "-end_at",
        displayable: true,
      })
    })

    it("returns a thenable promise", function () {
      return _.isFunction(this.view.fetchShows().then).should.be.ok()
    })

    describe("with featured, current, and upcoming shows", function () {
      before(function () {
        this.featured = [new PartnerShow(fabricate("show", { featured: true }))]
        this.current = [this.featured[0]]
        this.upcoming = []
        this.past = []
        _.each([1, 2, 3], () =>
          this.current.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "running" })
            )
          )
        )
        _.each([0, 1, 2, 3], () =>
          this.upcoming.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "upcoming" })
            )
          )
        )
        _.each([0, 1, 2, 3], () =>
          this.past.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "closed" })
            )
          )
        )
        return (this.expected = this.featured
          .concat(this.current.slice(1, 4))
          .concat(this.upcoming))
      })

      beforeEach(function () {
        return _.each(
          [this.featured, this.current, this.upcoming, this.past],
          (collection, index) =>
            Backbone.sync.onCall(index).yieldsTo("success", collection)
        )
      })

      it("fetches shows and organizes them in proper order without past shows", function () {
        return this.view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(8)
          return partnerShows.should.eql(this.expected)
        })
      })

      return it("returns @maxNumberOfShows shows without past shows", function () {
        const view = new HeroShowsCarousel({
          partner: this.partner,
          maxNumberOfShows: 2,
        })
        return view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(2)
          return partnerShows.should.eql(this.expected.slice(0, 2))
        })
      })
    })

    describe("with current and upcoming shows but without featured", function () {
      before(function () {
        this.featured = [
          new PartnerShow(fabricate("show", { featured: false })),
        ]
        this.current = []
        this.upcoming = []
        this.past = []
        _.each([0, 1, 2], () =>
          this.current.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "running" })
            )
          )
        )
        _.each([0, 1, 2, 3], () =>
          this.upcoming.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "upcoming" })
            )
          )
        )
        _.each([0, 1, 2, 3], () =>
          this.past.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "closed" })
            )
          )
        )
        return (this.expected = this.current.concat(this.upcoming))
      })

      beforeEach(function () {
        return _.each(
          [this.featured, this.current, this.upcoming, this.past],
          (collection, index) =>
            Backbone.sync.onCall(index).yieldsTo("success", collection)
        )
      })

      it("fetches shows and organizes them in proper order without past shows", function () {
        return this.view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(7)
          return partnerShows.should.eql(this.expected)
        })
      })

      return it("returns @maxNumberOfShows shows without past shows", function () {
        const view = new HeroShowsCarousel({
          partner: this.partner,
          maxNumberOfShows: 2,
        })
        return view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(2)
          return partnerShows.should.eql(this.expected.slice(0, 2))
        })
      })
    })

    return describe("with only past shows", function () {
      before(function () {
        this.featured = []
        this.current = []
        this.upcoming = []
        this.past = []
        _.each([0, 1, 2, 3], () =>
          this.past.push(
            new PartnerShow(
              fabricate("show", { featured: false, status: "closed" })
            )
          )
        )
        return (this.expected = this.past)
      })

      beforeEach(function () {
        return _.each(
          [this.featured, this.current, this.upcoming, this.past],
          (collection, index) =>
            Backbone.sync.onCall(index).yieldsTo("success", collection)
        )
      })

      it("fetches shows and returns only 2 past shows", function () {
        return this.view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(2)
          return partnerShows.should.eql(this.expected.slice(0, 2))
        })
      })

      return it("returns @maxNumberOfShows past shows", function () {
        const view = new HeroShowsCarousel({
          partner: this.partner,
          maxNumberOfShows: 1,
        })
        return view.fetchShows().then(partnerShows => {
          partnerShows.should.have.lengthOf(1)
          return partnerShows.should.eql(this.expected.slice(0, 1))
        })
      })
    })
  })

  describe("#initCarousel", function () {
    beforeEach(function () {
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    return it("removes the view if no partner shows", function () {
      this.view.initCarousel([])
      return this.view.remove.calledOnce.should.be.ok()
    })
  })

  return describe("#swipeDots", function () {
    beforeEach(() => sinon.stub($.fn, "offset"))

    afterEach(() => $.fn.offset.restore())

    describe("move right", function () {
      it("selects non-de-emphasized dot without moving the rail", function () {
        const html = `\
<div class="mgr-dots">
  <div class="mgr-dot is-active"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-deemphasized"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
</div>\
`
        const $el = $(html)
        this.view.swipeDots($el, 3, 1)
        return $el[0].outerHTML.should.equal(`\
<div class="mgr-dots">
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-active"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-deemphasized"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
</div>\
`)
      })

      return it("selects de-emphasized dot, re-styles dots and moves the rail", function () {
        const html = `\
<div class="mgr-dots">
  <div class="mgr-dot is-deemphasized" style="left: 0px;"></div>
  <div class="mgr-dot" style="left: 1px;"></div>
  <div class="mgr-dot" style="left: 2px;"></div>
  <div class="mgr-dot is-active" style="left: 3px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 4px;"></div>
  <div class="mgr-dot is-deemphasized is-hidden" style="left: 5px;"></div>
</div>\
`
        $.fn.offset
          .onFirstCall()
          .returns({ top: 0, left: 2 })
          .onSecondCall()
          .returns({ top: 0, left: 3 })

        const $el = $(html)
        this.view.swipeDots($el, 3, 4)
        return $el[0].outerHTML.should.equal(`\
<div class="mgr-dots">
  <div class="mgr-dot is-deemphasized is-hidden" style="left: -1px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 0px;"></div>
  <div class="mgr-dot" style="left: 1px;"></div>
  <div class="mgr-dot" style="left: 2px;"></div>
  <div class="mgr-dot is-active" style="left: 3px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 4px;"></div>
</div>\
`)
      })
    })

    return describe("move left", function () {
      it("selects non-de-emphasized dot without moving the rail", function () {
        const html = `\
<div class="mgr-dots">
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-active"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-deemphasized"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
</div>\
`
        const $el = $(html)
        this.view.swipeDots($el, 3, 0)
        return $el[0].outerHTML.should.equal(`\
<div class="mgr-dots">
  <div class="mgr-dot is-active"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot"></div>
  <div class="mgr-dot is-deemphasized"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
  <div class="mgr-dot is-deemphasized is-hidden"></div>
</div>\
`)
      })

      return it("selects de-emphasized dot, re-styles dots and moves the rail", function () {
        const html = `\
<div class="mgr-dots">
  <div class="mgr-dot is-deemphasized is-hidden" style="left: 0px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 1px;"></div>
  <div class="mgr-dot is-active" style="left: 2px;"></div>
  <div class="mgr-dot" style="left: 3px;"></div>
  <div class="mgr-dot" style="left: 4px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 5px;"></div>
</div>\
`
        $.fn.offset
          .onFirstCall()
          .returns({ top: 0, left: 2 })
          .onSecondCall()
          .returns({ top: 0, left: 1 })

        const $el = $(html)
        this.view.swipeDots($el, 3, 1)
        return $el[0].outerHTML.should.equal(`\
<div class="mgr-dots">
  <div class="mgr-dot is-deemphasized" style="left: 1px;"></div>
  <div class="mgr-dot is-active" style="left: 2px;"></div>
  <div class="mgr-dot" style="left: 3px;"></div>
  <div class="mgr-dot" style="left: 4px;"></div>
  <div class="mgr-dot is-deemphasized" style="left: 5px;"></div>
  <div class="mgr-dot is-deemphasized is-hidden" style="left: 6px;"></div>
</div>\
`)
      })
    })
  })
})
