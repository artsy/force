/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Partner = require("../../../../models/partner.coffee")
const Profile = require("../../../../models/profile.coffee")
const PartnerShows = require("../../../../collections/partner_shows.coffee")
const PartnerArtists = require("../../../../collections/partner_artists.coffee")
const _ = require("underscore")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerOverviewView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("when initializing artists", function () {
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
          const PartnerOverviewView = (mod = benv.requireWithJadeify(
            resolve(__dirname, "../../client/overview"),
            ["template", "artistsGridTemplate"]
          ))

          this.pas = [
            // 7 represented artists
            // 4 non-represented artists with published_artworks_count > 0
            fabricate("partner_artist", { represented_by: false }),
            fabricate("partner_artist"),
            fabricate("partner_artist"),
            fabricate("partner_artist", { represented_by: false }),
            fabricate("partner_artist", { represented_by: false }),
            fabricate("partner_artist"),
            fabricate("partner_artist"),
            fabricate("partner_artist"),
            fabricate("partner_artist"),
            fabricate("partner_artist"),
            fabricate("partner_artist", { represented_by: false }),
          ]

          this.partnerArtists = new PartnerArtists()
          this.PartnerArtistsCollection = sinon.stub()
          this.PartnerArtistsCollection.returns(this.partnerArtists)
          mod.__set__("PartnerArtists", this.PartnerArtistsCollection)

          this.profile = new Profile(fabricate("partner_profile"))
          this.partner = this.profile.related().owner
          this.template = sinon.stub()
          this.artistsGridTemplate = sinon.stub()
          mod.__set__("template", this.template)
          mod.__set__("artistsGridTemplate", this.artistsGridTemplate)
          this.view = new PartnerOverviewView({
            profile: this.profile,
            partner: this.partner,
            numberOfShows: 6,
            el: $("body"),
          })
          return done()
        }
      )
    })

    afterEach(() => Backbone.sync.restore())

    return describe("#renderArtistsGrid", () =>
      it("fetches all the partner artists and renders them in grid", function () {
        this.partnerArtists.fetchUntilEndInParallel = options => {
          this.partnerArtists.add(this.pas)
          return typeof options.success === "function"
            ? options.success()
            : undefined
        }
        this.view.initializeArtists()
        this.artistsGridTemplate.calledOnce.should.be.ok()
        this.artistsGridTemplate.args[0][0].partner
          .get("name")
          .should.equal(this.partner.get("name"))
        this.artistsGridTemplate.args[0][0].groups.should.have.lengthOf(2)
        this.artistsGridTemplate.args[0][0].groups[0].label.should.equal(
          "represented artists"
        )
        this.artistsGridTemplate.args[0][0].groups[0].list.should.have.lengthOf(
          7
        )
        this.artistsGridTemplate.args[0][0].groups[1].label.should.equal(
          "works available by"
        )
        return this.artistsGridTemplate.args[0][0].groups[1].list.should.have.lengthOf(
          4
        )
      }))
  })

  return describe("when initializing partner or nonpartner overview", function () {
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
          this.PartnerOverviewView = mod = benv.requireWithJadeify(
            resolve(__dirname, "../../client/overview"),
            ["template", "artistsGridTemplate"]
          )

          this.partnerArtists = new PartnerArtists()
          this.partnerArtists.fetchUntilEndInParallel = options =>
            __guardMethod__(options, "success", o => o.success())
          this.PartnerArtistsCollection = sinon.stub()
          this.PartnerArtistsCollection.returns(this.partnerArtists)
          mod.__set__("PartnerArtists", this.PartnerArtistsCollection)

          this.profile = new Profile(fabricate("partner_profile"))
          this.partner = this.profile.related().owner
          this.template = sinon.stub()
          this.artistsGridTemplate = sinon.stub()
          this.partnerShowsGrid = sinon.stub()
          this.artistsListView = sinon.stub()
          mod.__set__("template", this.template)
          mod.__set__("artistsGridTemplate", this.artistsGridTemplate)
          mod.__set__("PartnerShowsGrid", this.partnerShowsGrid)
          mod.__set__("ArtistsListView", this.artistsListView)
          return done()
        }
      )
    })

    afterEach(() => Backbone.sync.restore())

    return describe("#initialize", function () {
      it("renders correct sections for partner galleries", function () {
        this.view = new this.PartnerOverviewView({
          profile: this.profile,
          partner: this.partner,
          numberOfShows: 6,
          el: $("body"),
        })

        _.last(this.template.args)[0].isPartner.should.be.ok()
        this.artistsGridTemplate.calledOnce.should.be.ok()
        this.partnerShowsGrid.calledOnce.should.be.ok()
        return this.artistsListView.called.should.not.be.ok()
      })

      it("renders correct sections for nonpartner galleries (top tier)", function () {
        this.partner.set("claimed", false)
        this.partner.set("show_promoted", true)
        this.view = new this.PartnerOverviewView({
          profile: this.profile,
          partner: this.partner,
          numberOfShows: 6,
          el: $("body"),
        })

        _.last(this.template.args)[0].isPartner.should.not.be.ok()
        _.last(this.template.args)[0].showBanner.should.not.be.ok()
        this.artistsGridTemplate.calledOnce.should.not.be.ok()
        this.partnerShowsGrid.calledOnce.should.be.ok()
        return this.artistsListView.called.should.be.ok()
      })

      return it("renders correct sections for nonpartner galleries (lower tier)", function () {
        this.partner.set("claimed", false)
        this.partner.set("show_promoted", false)
        this.view = new this.PartnerOverviewView({
          profile: this.profile,
          partner: this.partner,
          numberOfShows: 6,
          el: $("body"),
        })

        _.last(this.template.args)[0].isPartner.should.not.be.ok()
        _.last(this.template.args)[0].showBanner.should.be.ok()
        this.artistsGridTemplate.calledOnce.should.not.be.ok()
        this.partnerShowsGrid.calledOnce.should.be.ok()
        return this.artistsListView.called.should.be.ok()
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
