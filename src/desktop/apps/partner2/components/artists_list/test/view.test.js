/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const rewire = require("rewire")
const Backbone = require("backbone")
const Partner = require("../../../../../models/partner.coffee")
const PartnerArtists = require("../../../../../collections/partner_artists.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const PartnerArtistsListView = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("PartnerArtistsListView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      this.view = new PartnerArtistsListView({ partner: this.partner })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#fetch", function () {
    beforeEach(function () {
      this.partnerArtists = new PartnerArtists()
      _.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], () =>
        this.partnerArtists.add(
          fabricate("partner_artist", { partner: this.partner })
        )
      )
      return (this.fetchUntilEndInParallel = sinon.spy(
        PartnerArtists.prototype,
        "fetchUntilEndInParallel"
      ))
    })

    afterEach(function () {
      return this.fetchUntilEndInParallel.restore()
    })

    context("with empty collection", function () {
      it("makes proper requests to fetch partner artists", function () {
        this.view.fetch()
        return this.fetchUntilEndInParallel.calledOnce.should.be.ok()
      })

      it("returns a thenable promise", function () {
        return this.view.fetch().then.should.be.a.Function()
      })

      return it("fetches and returns partner artists", function () {
        Backbone.sync.onCall(0).yieldsTo("success", this.partnerArtists.models)

        return this.view.fetch().then(artists => {
          artists.length.should.equal(10)
          return artists.should.eql(this.partnerArtists.models)
        })
      })
    })

    context("with non-empty collection", function () {
      beforeEach(function () {
        return (this.view = new PartnerArtistsListView({
          partner: this.partner,
          collection: new PartnerArtists([fabricate("partner_artist")]),
        }))
      })

      it("does not make requests to fetch partner artists", function () {
        this.view.fetch()
        return this.fetchUntilEndInParallel.called.should.not.be.ok()
      })

      it("returns a thenable promise", function () {
        return this.view.fetch().then.should.be.a.Function()
      })

      return it("returns the collection", function () {
        return this.view.fetch().then(artists => {
          artists.length.should.equal(1)
          return artists.should.eql(this.view.collection.models)
        })
      })
    })

    return context("with non-empty collection and forced fetch", function () {
      beforeEach(function () {
        return (this.view = new PartnerArtistsListView({
          partner: this.partner,
          collection: new PartnerArtists([fabricate("partner_artist")]),
        }))
      })

      it("makes proper requests to fetch partner artists", function () {
        this.view.fetch(true)
        return this.fetchUntilEndInParallel.calledOnce.should.be.ok()
      })

      it("returns a thenable promise", function () {
        return this.view.fetch(true).then.should.be.a.Function()
      })

      return it("resets collection, fetches and returns partner artists", function () {
        Backbone.sync.onCall(0).yieldsTo("success", this.partnerArtists.models)

        return this.view.fetch(true).then(artists => {
          artists.length.should.equal(10)
          artists.length.should.not.equal(11)
          return artists.should.eql(this.partnerArtists.models)
        })
      })
    })
  })

  describe("#groupArtists", function () {
    it("groups partner artists into represented and nonrepresented groups", function () {
      const pas = new PartnerArtists([
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
      ])
      const view = new PartnerArtistsListView({
        partner: this.partner,
        numberOfColumns: 4,
      })

      const groups = view.groupArtists(pas.models)
      groups.should.have.lengthOf(2)
      groups[1].label.should.equal("works available by")
      groups[1].cols.should.have.lengthOf(2)
      groups[1].cols[0].should.have.lengthOf(2)
      groups[1].cols[1].should.have.lengthOf(2)
      groups[0].label.should.equal("represented artists")
      groups[0].cols.should.have.lengthOf(2)
      groups[0].cols[0].should.have.lengthOf(4)
      return groups[0].cols[1].should.have.lengthOf(3)
    })

    it("groups partner artists into one single group if no valid non-represented artists", function () {
      const pas = new PartnerArtists([
        // 7 represented artists
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
      ])
      const view = new PartnerArtistsListView({
        partner: this.partner,
        numberOfColumns: 4,
      })

      const groups = view.groupArtists(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("")
      groups[0].cols.should.have.lengthOf(4)
      groups[0].cols[0].should.have.lengthOf(2)
      groups[0].cols[1].should.have.lengthOf(2)
      groups[0].cols[2].should.have.lengthOf(2)
      return groups[0].cols[3].should.have.lengthOf(1)
    })

    it("groups partner artists into groups with correct number of items in each column", function () {
      const pas = new PartnerArtists([
        // 6 represented artists
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
      ])
      const view = new PartnerArtistsListView({
        partner: this.partner,
        numberOfColumns: 4,
      })

      const groups = view.groupArtists(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("")
      groups[0].cols.should.have.lengthOf(4)
      groups[0].cols[0].should.have.lengthOf(2)
      groups[0].cols[1].should.have.lengthOf(2)
      groups[0].cols[2].should.have.lengthOf(1)
      return groups[0].cols[3].should.have.lengthOf(1)
    })

    it("groups partner artists into groups with correct number of items in single column", function () {
      const pas = new PartnerArtists([
        // 6 represented artists
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
      ])
      const view = new PartnerArtistsListView({
        partner: this.partner,
        numberOfColumns: 1,
      })

      const groups = view.groupArtists(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("")
      groups[0].cols.should.have.lengthOf(1)
      return groups[0].cols[0].should.have.lengthOf(6)
    })

    return it("groups all artists together when partner has distinguish_represented_artists: false", function () {
      const pas = new PartnerArtists([
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist"),
      ])
      this.partner.set("distinguish_represented_artists", false)
      const view = new PartnerArtistsListView({
        partner: this.partner,
        numberOfColumns: 4,
      })

      const groups = view.groupArtists(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("")
      groups[0].cols.should.have.lengthOf(4)
      groups[0].cols[0].should.have.lengthOf(1)
      groups[0].cols[1].should.have.lengthOf(1)
      return groups[0].cols[2].should.have.lengthOf(0)
    })
  })

  describe("#render", function () {
    beforeEach(function () {
      return (this.pas = new PartnerArtists([
        fabricate("partner_artist", { partner: this.partner }),
        fabricate("partner_artist", {
          partner: this.partner,
          published_artworks_count: 0,
        }),
        fabricate("partner_artist", { partner: this.partner }),
      ]))
    })

    describe("for partner galleries", function () {
      beforeEach(function () {
        this.view = new PartnerArtistsListView({ partner: this.partner })
        return this.view.render(this.pas.models)
      })

      it("links artists to partner artist page if they have published artworks with this partner", function () {
        this.view.$(".artists-column > li > a").length.should.equal(2)
        return _.each(this.view.$(".artists-column > li > a"), a => {
          return $(a)
            .attr("href")
            .should.startWith(`/${this.partner.default_profile_id}/artist/`)
        })
      })

      return it("disables artists links if they do not have published artworks with this partner", function () {
        this.view.$(".artists-column > li > span").length.should.equal(1)
        return _.each(this.view.$(".artists-column > li > span"), span => {
          return $(span).hasClass("artist-name")
        })
      })
    })

    return describe("for non-partner galleries", function () {
      beforeEach(function () {
        this.view = new PartnerArtistsListView({
          partner: this.partner,
          linkToPartnerArtist: false,
        })
        return this.view.render(this.pas.models)
      })

      return it("links artists to their artists pages", function () {
        this.view.$(".artists-column > li > a").length.should.equal(3)
        return _.each(this.view.$(".artists-column > li > a"), a => {
          return $(a).attr("href").should.startWith("/artist/")
        })
      })
    })
  })

  return describe("#render", function () {
    beforeEach(function () {
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    return it("removes the view if no artists", function () {
      this.view.render([])
      return this.view.remove.calledOnce.should.be.ok()
    })
  })
})
