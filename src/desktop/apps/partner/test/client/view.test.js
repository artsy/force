/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Profile = require("../../../../models/profile.coffee")
const Articles = require("../../../../collections/articles.coffee")
const _ = require("underscore")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  return describe("when setting up tabs", function () {
    beforeEach(function (done) {
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/index.jade"),
        {
          profile: new Profile(fabricate("partner_profile")),
          sd: { PROFILE: fabricate("partner_profile") },
          asset() {},
          params: {},
        },
        () => {
          let mod
          const PartnerView = (mod = benv.requireWithJadeify(
            resolve(__dirname, "../../client/view"),
            ["tablistTemplate"]
          ))
          this.profile = new Profile(fabricate("partner_profile"))
          this.partner = this.profile.related().owner
          this.tablistTemplate = sinon.stub()
          mod.__set__("sectionToView", {})
          mod.__set__("tablistTemplate", this.tablistTemplate)

          this.view = new PartnerView({
            model: this.profile,
            partner: this.partner,
            el: $("body"),
          })
          this.view.partner.set("displayable_shows_count", 1)
          return done()
        }
      )
    })

    afterEach(() => Backbone.sync.restore())

    describe("#getDisplayableSections", function () {
      describe("with minimal data to display", function () {
        beforeEach(function () {
          return this.partner.set({
            partner_artists_count: 0,
            displayable_shows_count: 0,
            published_not_for_sale_artworks_count: 0,
            published_for_sale_artworks_count: 0,
          })
        })
        it("gallery", function () {
          this.partner.set({ type: "Gallery" })
          this.partner.set({ claimed: true })
          this.profile.set({ owner_type: "PartnerGallery" })
          const sections = this.view.getDisplayableSections(
            this.view.getSections()
          )
          return sections.should.eql(["overview", "contact"])
        })

        return it("institution", function () {
          this.partner.set({ type: "Institution" })
          this.profile.set({ owner_type: "PartnerInstitution" })
          const sections = this.view.getDisplayableSections(
            this.view.getSections()
          )
          return sections.should.eql(["about"])
        })
      })

      return describe("with maximum data to display", function () {
        beforeEach(function () {
          return this.partner.set({
            partner_artists_count: 1,
            displayable_shows_count: 1,
            published_not_for_sale_artworks_count: 1,
            published_for_sale_artworks_count: 1,
          })
        })

        describe("gallery", function () {
          beforeEach(function () {
            this.partner.set({ type: "Gallery" })
            this.partner.set({ claimed: true })
            return this.profile.set({ owner_type: "PartnerGallery" })
          })

          it("display works section is disabled", function () {
            this.partner.set({ display_works_section: false })
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql([
              "overview",
              "shows",
              "artists",
              "contact",
            ])
          })

          it("display work section is enabled", function () {
            this.partner.set({ display_works_section: true })
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql([
              "overview",
              "shows",
              "works",
              "artists",
              "contact",
            ])
          })

          it("includes articles when @partnerArticlesCount > 0", function () {
            this.view.partnerArticlesCount = 1
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql([
              "overview",
              "shows",
              "artists",
              "articles",
              "contact",
            ])
          })

          return it("does not include articles when @partnerArticlesCount is 0", function () {
            this.view.partnerArticlesCount = 0
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql([
              "overview",
              "shows",
              "artists",
              "contact",
            ])
          })
        })

        return describe("institution", function () {
          beforeEach(function () {
            this.partner.set({ type: "Institution" })
            return this.profile.set({ owner_type: "PartnerInstitution" })
          })

          it("display works section is disabled", function () {
            this.partner.set({ display_works_section: false })
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql(["shows", "shop", "about"])
          })

          it("display work section is enabled", function () {
            this.partner.set({ display_works_section: true })
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql(["shows", "collection", "shop", "about"])
          })

          it("includes articles when @partnerArticlesCount > 0", function () {
            this.view.partnerArticlesCount = 1
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql(["shows", "articles", "shop", "about"])
          })

          return it("does not include articles when @partnerArticlesCount is 0", function () {
            this.view.partnerArticlesCount = 0
            const sections = this.view.getDisplayableSections(
              this.view.getSections()
            )
            return sections.should.eql(["shows", "shop", "about"])
          })
        })
      })
    })

    describe("#initializeTablistAndContent", () =>
      it("renders correct tabs", function () {
        sinon.stub(this.view.partner, "fetch", options =>
          __guardMethod__(options, "success", o => o.success())
        )
        this.view.initializeTablistAndContent()
        _.last(this.tablistTemplate.args)[0]
          .profile.get("id")
          .should.equal(this.profile.get("id"))
        return _.last(this.tablistTemplate.args)[0].sections.should.eql([
          "shows",
          "about",
        ])
      }))

    return describe("#initializePartnerAndCounts", function () {
      it("returns a thenable promise", function () {
        return this.view
          .initializePartnerAndCounts()
          .then.should.be.a.Function()
      })

      it("makes proper requests to fetch partner and articles", function () {
        this.view.initializePartnerAndCounts()
        const requests = _.last(Backbone.sync.args, 2)
        requests[0][1]
          .url()
          .should.endWith(`/api/v1/partner/${this.partner.get("id")}`)
        requests[1][1].url.should.endWith("/api/articles")
        return requests[1][2].data.should.eql({
          partner_id: this.partner.get("_id"),
          limit: 1,
          published: true,
          count: true,
        })
      })

      return it("fetches and returns partner and articles and sets articles count", function () {
        const nextSyncCall = Backbone.sync.args.length
        const articles = new Articles([
          fabricate("article"),
          fabricate("article"),
        ])
        articles.count = 2
        Backbone.sync.onCall(nextSyncCall).yieldsTo("success", this.partner)

        Backbone.sync.onCall(nextSyncCall + 1).yieldsTo("success", articles)

        return this.view.initializePartnerAndCounts().then(() => {
          return this.view.partnerArticlesCount.should.equal(2)
        })
      })
    })
  })
})

function __guardMethod__(obj, methodName, transform) {
  if (
    typeof obj !== "undefined" &&
    obj !== null &&
    typeof obj[methodName] === "function"
  ) {
    return transform(obj, methodName)
  } else {
    return undefined
  }
}
