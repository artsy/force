/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
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

describe("PartnerArtistsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  return describe("when displaying artists", function () {
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
          const PartnerArtistsView = (mod = benv.requireWithJadeify(
            resolve(__dirname, "../../client/artists"),
            ["template"]
          ))
          this.profile = new Profile(fabricate("partner_profile"))
          this.partner = this.profile.related().owner
          this.ArtistView = sinon.stub()
          this.ArtistView.returns(this.ArtistView)
          mod.__set__("ArtistView", this.ArtistView)
          this.ArtistsListView = sinon.stub()
          this.ArtistsListView.returns(this.ArtistsListView)
          mod.__set__("ArtistsListView", this.ArtistsListView)
          this.partnerArtists = new PartnerArtists([
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
            fabricate("partner_artist", {
              represented_by: false,
              published_artworks_count: 0,
            }),
            fabricate("partner_artist", { represented_by: false }),
          ])
          this.partnerArtists.fetchUntilEnd = sinon.stub()
          this.view = new PartnerArtistsView({
            profile: this.profile,
            partner: this.partner,
            cache: { artists: this.partnerArtists },
            artistsListColumnSize: 4,
            pageSize: 5,
            el: $("body"),
          })
          return done()
        }
      )
    })

    afterEach(() => Backbone.sync.restore())

    describe("#renderNextPageOfArtists", () =>
      it("displays the pages of artists who have published artworks until the end", function () {
        this.view.nextPage.should.equal(2)
        this.ArtistView.callCount.should.equal(5)
        this.view.renderNextPageOfArtists()
        this.view.nextPage.should.equal(3)
        this.ArtistView.callCount.should.equal(10)
        this.view.renderNextPageOfArtists()
        this.view.nextPage.should.equal(4)
        return this.ArtistView.callCount.should.equal(11)
      }))

    return describe("#fetchAllArtists", function () {
      it("uses the cached partner artists instead of fetching again", function () {
        return this.partnerArtists.fetchUntilEnd.called.should.not.be.ok()
      })

      return it("passes a parameter to filter partner artists that should not be displayed", function () {
        this.view.initialize({
          profile: this.profile,
          partner: this.partner,
          cache: {},
          artistsListColumnSize: 4,
          pageSize: 5,
          el: $("body"),
        })
        return this.view.collection.url
          .indexOf("display_on_partner_profile=1")
          .should.be.greaterThan(-1)
      })
    })
  })
})
