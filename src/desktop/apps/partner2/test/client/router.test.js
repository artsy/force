/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const CurrentUser = require("../../../../models/current_user.coffee")
const Artworks = require("../../../../collections/artworks.coffee")
const Partner = require("../../../../models/partner.coffee")
const Profile = require("../../../../models/profile.coffee")
const fixtures = require("../../../../test/helpers/fixtures")

const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { stubChildClasses } = require("../../../../test/helpers/stubs")

describe("PartnerRouter", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      this.PartnerRouter = benv.require(
        resolve(__dirname, "../../client/router.coffee")
      )
      return done()
    })
  })

  after(() => benv.teardown())

  return describe("filterArtworks", function () {
    beforeEach(function (done) {
      sinon.stub(Backbone, "sync")

      this.profile = new Profile(fabricate("partner_profile"))

      return benv.render(
        resolve(__dirname, "../../templates/index.jade"),
        {
          sd: {},
          profile: this.profile,
          asset() {},
          params: {},
        },
        () => {
          stubChildClasses(
            this.PartnerRouter,
            this,
            ["PartnerView"],
            ["renderSection"]
          )
          return done()
        }
      )
    })

    afterEach(() => Backbone.sync.restore())

    return it("renders correct section with parameters", function () {
      this.router = new this.PartnerRouter({
        profile: this.profile,
        partner: this.profile.related().owner,
      })

      const settings = {
        aggregations: [
          "dimension_range",
          "medium",
          "price_range",
          "total",
          "for_sale",
        ],
        forSale: false,
        hideForSaleButton: false,
        filterRoot: "/partner-id/section-id",
      }

      this.router.filterArtworks("section-name", settings)
      const { counts } = fixtures

      Backbone.sync.args[0][2].success({ aggregations: counts })

      this.router.baseView.renderSection.called.should.be.ok()
      this.router.baseView.renderSection.args[0][0].should.equal("section-name")
      this.router.baseView.renderSection.args[0][1].aggregations.should.equal(
        settings.aggregations
      )
      this.router.baseView.renderSection.args[0][1].forSale.should.equal(
        settings.forSale
      )
      this.router.baseView.renderSection.args[0][1].hideForSaleButton.should.equal(
        settings.hideForSaleButton
      )
      return this.router.baseView.renderSection.args[0][1].filterRoot.should.equal(
        settings.filterRoot
      )
    })
  })
})
