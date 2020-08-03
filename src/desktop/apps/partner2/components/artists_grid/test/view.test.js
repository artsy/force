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

const PartnerArtistsGridView = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("PartnerArtistsGridView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      this.view = new PartnerArtistsGridView({ partner: this.partner })
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

    it("makes proper requests to fetch partner artists", function () {
      this.view.fetch()
      return this.fetchUntilEndInParallel.calledOnce.should.be.ok()
    })

    it("returns a thenable promise", function () {
      return _.isFunction(this.view.fetch().then).should.be.ok()
    })

    return it("fetches and returns partner artists", function () {
      Backbone.sync.onCall(0).yieldsTo("success", this.partnerArtists.models)

      return this.view.fetch().then(artists => {
        artists.length.should.equal(10)
        return artists.should.eql(this.partnerArtists.models)
      })
    })
  })

  describe("#group", function () {
    it("groups partner artists by represented_by", function () {
      const pas = new PartnerArtists([
        // 2 represented artists
        // 3 non-represented artists with published_artworks_count > 0
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist"),
        fabricate("partner_artist"),
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist", { represented_by: false }),
      ])
      const groups = this.view.group(pas.models)
      groups.should.have.lengthOf(2)
      groups[0].label.should.equal("represented artists")
      groups[0].list.should.have.lengthOf(2)
      groups[0].list.should.eql(pas.slice(1, 3))
      groups[1].label.should.equal("works available by")
      groups[1].list.should.have.lengthOf(3)
      return groups[1].list.should.eql([pas.at(0), pas.at(3), pas.at(4)])
    })

    it("returns 1 group with proper label if all represented artists", function () {
      const pas = new PartnerArtists([
        fabricate("partner_artist"),
        fabricate("partner_artist"),
      ])
      const groups = this.view.group(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
      groups[0].list.should.have.lengthOf(2)
      return groups[0].list.should.eql(pas.models)
    })

    return it("returns 1 group with proper label if no represented artists", function () {
      const pas = new PartnerArtists([
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist", { represented_by: false }),
      ])
      const groups = this.view.group(pas.models)
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
      groups[0].list.should.have.lengthOf(3)
      return groups[0].list.should.eql(pas.models)
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
