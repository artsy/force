/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const sinon = require("sinon")
const PartnerArtists = require("../../../../collections/partner_artists.coffee")
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")

const PartnerArtistsListView = rewire("../../client/artists_list")

describe("PartnerArtistsListView", function () {
  describe("#groupPartnerArtists", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        return benv.render(
          resolve(__dirname, "../../templates/artists_list.jade"),
          { groups: {} },
          () => {
            this.template = sinon.stub()
            PartnerArtistsListView.__set__("template", this.template)
            return done()
          }
        )
      })
    })

    afterEach(() => benv.teardown())

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
      new PartnerArtistsListView({
        collection: pas.models,
        el: $("body"),
        numberOfColumns: 4,
      })

      const { groups } = this.template.args[0][0]
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
      new PartnerArtistsListView({
        collection: pas.models,
        el: $("body"),
        numberOfColumns: 4,
      })

      const { groups } = this.template.args[0][0]
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
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
      new PartnerArtistsListView({
        collection: pas.models,
        el: $("body"),
        numberOfColumns: 4,
      })

      const { groups } = this.template.args[0][0]
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
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
      new PartnerArtistsListView({
        collection: pas.models,
        el: $("body"),
        numberOfColumns: 1,
      })

      const { groups } = this.template.args[0][0]
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
      groups[0].cols.should.have.lengthOf(1)
      return groups[0].cols[0].should.have.lengthOf(6)
    })

    return it("groups all artists together when partner has distinguish_represented_artists: false", function () {
      const pas = new PartnerArtists([
        fabricate("partner_artist", { represented_by: false }),
        fabricate("partner_artist"),
      ])
      new PartnerArtistsListView({
        collection: pas.models,
        el: $("body"),
        numberOfColumns: 4,
        distinguishRepresentedArtists: false,
      })

      const { groups } = this.template.args[0][0]
      groups.should.have.lengthOf(1)
      groups[0].label.should.equal("artists")
      groups[0].cols.should.have.lengthOf(4)
      groups[0].cols[0].should.have.lengthOf(1)
      groups[0].cols[1].should.have.lengthOf(1)
      return groups[0].cols[2].should.have.lengthOf(0)
    })
  })

  return describe("#render", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        return benv.render(
          resolve(__dirname, "../../templates/artists_list.jade"),
          { groups: {} },
          () => {
            let mod
            this.PartnerArtistsListView = mod = benv.requireWithJadeify(
              resolve(__dirname, "../../client/artists_list"),
              ["template"]
            )
            this.partner = fabricate("partner", {
              default_profile_id: "taipei-fine-art-museum",
            })
            this.pas = new PartnerArtists([
              fabricate("partner_artist", { partner: this.partner }),
              fabricate("partner_artist", {
                partner: this.partner,
                published_artworks_count: 0,
              }),
              fabricate("partner_artist", { partner: this.partner }),
            ])
            return done()
          }
        )
      })
    })

    afterEach(() => benv.teardown())

    describe("for partner galleries", function () {
      beforeEach(function (done) {
        this.view = new this.PartnerArtistsListView({
          el: $("body"),
          collection: this.pas.models,
        })
        return done()
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
      beforeEach(function (done) {
        this.view = new this.PartnerArtistsListView({
          el: $("body"),
          collection: this.pas.models,
          linkToPartnerArtist: false,
        })
        return done()
      })

      return it("links artists to their artists pages", function () {
        this.view.$(".artists-column > li > a").length.should.equal(3)
        return _.each(this.view.$(".artists-column > li > a"), a => {
          return $(a).attr("href").should.startWith("/artist/")
        })
      })
    })
  })
})
