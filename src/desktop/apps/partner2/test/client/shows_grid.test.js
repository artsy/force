/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const sinon = require("sinon")
const Partner = require("../../../../models/partner.coffee")
const Profile = require("../../../../models/profile.coffee")
const PartnerShows = require("../../../../collections/partner_shows.coffee")
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")

let PartnerShowsGridView = rewire("../../client/shows_grid")

describe("PartnerShowsGridView", function () {
  describe("#initializeShows", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $

        return benv.render(
          resolve(__dirname, "../../templates/shows_grid.jade"),
          {
            partner: { href() {} },
            params: {},
          },
          () => {
            // fabricated shows groundtruth
            // gallery => featured: 0, current: 3, upcoming: 2, past: 5 (total: 10)
            // institution => featured: 1, current: 3, upcoming: 2, past: 4 (total: 10)
            this.src = [
              fabricate("show", { name: "show1" }),
              fabricate("show", { name: "show2", featured: true }),
              fabricate("show", { name: "show3" }),
              fabricate("show", { name: "show4", status: "running" }),
              fabricate("show", { name: "show5" }),
              fabricate("show", { name: "show6", status: "running" }),
              fabricate("show", { name: "show7", status: "upcoming" }),
              fabricate("show", { name: "show8" }),
              fabricate("show", { name: "show9", status: "upcoming" }),
              fabricate("show", { name: "show10", status: "running" }),
              fabricate("show", { name: "show11", displayable: false }),
              fabricate("show", {
                name: "show12",
                status: "running",
                displayable: false,
              }),
              fabricate("show", {
                name: "show13",
                status: "upcoming",
                displayable: false,
              }),
            ]
            this.partnerShows = new PartnerShows()
            this.partnerShows.fetch = options => {
              const { page } = options.data
              const { size } = options.data
              this.partnerShows.reset()
              this.partnerShows.add(this.src)
              return typeof options.success === "function"
                ? options.success()
                : undefined
            }
            this.PartnerShows = sinon.stub()
            this.PartnerShows.returns(this.partnerShows)
            PartnerShowsGridView.__set__("PartnerShows", this.PartnerShows)

            this.template = sinon.stub()
            PartnerShowsGridView.__set__("template", this.template)

            this.profile = new Profile(fabricate("partner_profile"))
            this.partner = this.profile.related().owner
            return done()
          }
        )
      })
    })

    afterEach(() => benv.teardown())

    it("respects the dispalyable attribute of partner shows", function () {
      new PartnerShowsGridView({
        el: $(".partner2-shows"),
        partner: this.partner,
      }).startUp()

      this.template.args[0][0].current.should.have.lengthOf(3)
      this.template.args[0][0].upcoming.should.have.lengthOf(2)
      return this.template.args[0][0].past.should.have.lengthOf(4)
    })

    it("fetches 1 featured and all other shows and renders them by default", function () {
      new PartnerShowsGridView({
        el: $(".partner2-shows"),
        partner: this.partner,
      }).startUp()

      this.template.args[0][0].featured.get("name").should.equal("show2")
      this.template.args[0][0].current.should.have.lengthOf(3)
      this.template.args[0][0].upcoming.should.have.lengthOf(2)
      return this.template.args[0][0].past.should.have.lengthOf(4)
    })

    it("fetches 0 featued and all other shows and renders them", function () {
      new PartnerShowsGridView({
        el: $(".partner2-shows"),
        partner: this.partner,
        numberOfFeatured: 0,
      }).startUp()

      _.isUndefined(this.template.args[0][0].featured).should.be.ok()
      this.template.args[0][0].current.should.have.lengthOf(3)
      this.template.args[0][0].upcoming.should.have.lengthOf(2)
      return this.template.args[0][0].past.should.have.lengthOf(5)
    })

    return it("fetches 1 featued and combined other shows and renders them", function () {
      new PartnerShowsGridView({
        el: $(".partner2-shows"),
        partner: this.partner,
        isCombined: true,
        numberOfShows: 6,
      }).startUp()

      this.template.args[0][0].featured.get("name").should.equal("show2")
      this.template.args[0][0].current.should.have.lengthOf(6)
      this.template.args[0][0].upcoming.should.have.lengthOf(0)
      return this.template.args[0][0].past.should.have.lengthOf(0)
    })
  })

  return describe("#maybeFetchAndRenderShows", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        sinon.stub(Backbone, "sync")
        return benv.render(
          resolve(__dirname, "../../templates/shows_grid.jade"),
          {
            partner: { href() {} },
            params: {},
          },
          () => {
            let mod
            PartnerShowsGridView = mod = benv.requireWithJadeify(
              resolve(__dirname, "../../client/shows_grid"),
              ["template", "showFiguresTemplate"]
            )
            this.src = [
              fabricate("show", { name: "show1" }),
              fabricate("show", { name: "show2", featured: true }),
              fabricate("show", { name: "show3" }),
              fabricate("show", { name: "show4" }),
              fabricate("show", { name: "show5" }),
              fabricate("show", { name: "show6" }),
              fabricate("show", { name: "show7" }),
              fabricate("show", { name: "show8" }),
              fabricate("show", { name: "show9" }),
              fabricate("show", { name: "show10" }),
              fabricate("show", { name: "show11" }),
              fabricate("show", { name: "show12" }),
              fabricate("show", { name: "show13" }),
              fabricate("show", { name: "show14" }),
              fabricate("show", { name: "show15" }),
              fabricate("show", { name: "show16" }),
              fabricate("show", { name: "show17" }),
              fabricate("show", { name: "show18" }),
              fabricate("show", { name: "show19" }),
              fabricate("show", { name: "show20" }),
              fabricate("show", { name: "show21" }),
              fabricate("show", { name: "show22" }),
              fabricate("show", { name: "show23" }),
              fabricate("show", { name: "show24" }),
              fabricate("show", { name: "show25" }),
              fabricate("show", { name: "show26" }),
              fabricate("show", { name: "show27" }),
              fabricate("show", { name: "show28" }),
              fabricate("show", { name: "show29" }),
              fabricate("show", { name: "show30" }),
              fabricate("show", { name: "show31" }),
              fabricate("show", { name: "show32" }),
              fabricate("show", { name: "show33" }),
              fabricate("show", { name: "show34" }),
              fabricate("show", { name: "show35" }),
            ]

            this.partnerShows = new PartnerShows()
            this.partnerShows.fetch = options => {
              const { page } = options.data
              const { size } = options.data
              this.partnerShows.reset()
              this.partnerShows.add(this.src)
              return typeof options.success === "function"
                ? options.success()
                : undefined
            }
            this.PartnerShows = sinon.stub()
            this.PartnerShows.returns(this.partnerShows)
            PartnerShowsGridView.__set__("PartnerShows", this.PartnerShows)

            this.profile = new Profile(fabricate("partner_profile"))
            this.partner = this.profile.related().owner
            new PartnerShowsGridView({
              el: $(".partner2-shows"),
              partner: this.partner,
              isCombined: false,
              numberOfFeatured: 1,
            }).startUp()
            return done()
          }
        )
      })
    })

    afterEach(function () {
      Backbone.sync.restore()
      return benv.teardown()
    })

    it("displays up to 30 shows and a See More button if there are more", function () {
      $("figure").length.should.equal(31)
      return $(".js-partner-shows-more").length.should.equal(1)
    })

    it("tries to fetch more shows if there are not enough shows", function () {
      const src = []
      this.partnerShows.fetch = options => {
        const { page } = options.data
        const { size } = options.data
        this.partnerShows.reset()
        this.partnerShows.add(src)
        return typeof options.success === "function"
          ? options.success()
          : undefined
      }
      $(".js-partner-shows-more").click()
      return $("figure").length.should.equal(35)
    })

    return it("adds the fetched items if there are more", function () {
      const src = [fabricate("show", { name: "show36", status: "closed" })]
      this.partnerShows.fetch = options => {
        const { page } = options.data
        const { size } = options.data
        this.partnerShows.reset()
        this.partnerShows.add(src)
        return typeof options.success === "function"
          ? options.success()
          : undefined
      }
      $(".js-partner-shows-more").click()
      $("figure").length.should.equal(36)
      return $("body").html().should.not.containEql("See More")
    })
  })
})
