/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const PartnerShow = require("../../models/partner_show")
const PartnerShows = require("../../collections/partner_shows")

describe("PartnerShows", function () {
  beforeEach(function () {
    return (this.partnerShows = new PartnerShows([
      // featured | currrent | upcoming | past
      fabricate("show", { name: "show1" }), //                                    x
      fabricate("show", { name: "show2", status: "running", featured: true }), //   x          x
      fabricate("show", { name: "show3", status: "running" }), //              x
      fabricate("show", { name: "show4", status: "upcoming" }), //                         x
      fabricate("show", { name: "show5", status: "upcoming" }), //                         x
      fabricate("show", { name: "show6" }), //                                    x
    ]))
  })

  describe("#current", function () {
    it("gets the featured show", function () {
      return this.partnerShows.featured().get("name").should.equal("show2")
    })

    it("gets current shows", function () {
      this.partnerShows.current().should.have.lengthOf(2)
      this.partnerShows.current().at(0).get("name").should.equal("show2")
      return this.partnerShows.current().at(1).get("name").should.equal("show3")
    })

    it("gets current shows without featured show", function () {
      const featured = this.partnerShows.featured()
      this.partnerShows.current([featured]).should.have.lengthOf(1)
      return this.partnerShows
        .current([featured])
        .at(0)
        .get("name")
        .should.equal("show3")
    })

    it("gets upcoming shows", function () {
      this.partnerShows.upcoming().should.have.lengthOf(2)
      this.partnerShows.upcoming().at(0).get("name").should.equal("show4")
      return this.partnerShows
        .upcoming()
        .at(1)
        .get("name")
        .should.equal("show5")
    })

    return it("gets past shows", function () {
      this.partnerShows.past().should.have.lengthOf(2)
      this.partnerShows.past().at(0).get("name").should.equal("show1")
      return this.partnerShows.past().at(1).get("name").should.equal("show6")
    })
  })

  return describe("#fetchUntilEnd", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      return this.partnerShows.reset()
    })

    afterEach(() => Backbone.sync.restore())

    return it("paginates correctly", function () {
      this.partnerShows.fetchUntilEnd()
      Backbone.sync.args[0][2].data.page.should.equal(1)
      Backbone.sync.args[0][2].success([fabricate("show")])
      Backbone.sync.args[0][2].data.page.should.equal(2)
      Backbone.sync.args[1][2].success([fabricate("show")])
      Backbone.sync.args[0][2].data.page.should.equal(3)
      Backbone.sync.args[2][2].success([fabricate("show")])
      Backbone.sync.args[0][2].data.page.should.equal(4)
      return Backbone.sync.args[3][2].success([])
    })
  })
})
