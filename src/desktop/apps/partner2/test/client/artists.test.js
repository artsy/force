/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
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

const ArtistsListView = benv.requireWithJadeify(
  resolve(__dirname, "../../components/artists_list/view"),
  ["template"]
)
const PartnerArtistsView = benv.requireWithJadeify(
  resolve(__dirname, "../../client/artists"),
  ["template"]
)

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
          this.profile = new Profile(fabricate("partner_profile"))
          this.partner = this.profile.related().owner
          PartnerArtistsView.__set__(
            "ArtistView",
            (this.ArtistView = sinon.stub())
          )
          PartnerArtistsView.__set__("ArtistsListView", ArtistsListView)
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

    describe("#initializeArtistsList", function () {
      it("returns a thenable promise", function () {
        return this.view.initializeArtistsList().then.should.be.a.Function()
      })

      return it("initializes the ArtistsListView view with cached collection", function () {
        return this.view.collection.models.should.eql(
          this.partnerArtists.models
        )
      })
    })

    describe("#initializeArtistOrArtists", function () {
      it("renders the artist if @artistId", function () {
        const view = new PartnerArtistsView({
          profile: this.profile,
          partner: this.partner,
          artistId: "henry-moore",
          el: $("body"),
        })
        const renderArtist = sinon.stub(view, "renderArtist")
        const infiniteScrollingArtists = sinon.stub(
          view,
          "infiniteScrollingArtists"
        )
        view.initializeArtistOrArtists()
        renderArtist.calledOnce.should.be.ok()
        return infiniteScrollingArtists.called.should.not.be.ok()
      })

      return it("initializes infinite scrolling artists if no @artistId", function () {
        const view = new PartnerArtistsView({
          profile: this.profile,
          partner: this.partner,
          el: $("body"),
        })
        const renderArtist = sinon.stub(view, "renderArtist")
        const infiniteScrollingArtists = sinon.stub(
          view,
          "infiniteScrollingArtists"
        )
        view.initializeArtistOrArtists()
        renderArtist.calledOnce.should.not.be.ok()
        return infiniteScrollingArtists.called.should.be.ok()
      })
    })

    return describe("#renderNextPageOfArtists", () =>
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
  })
})
