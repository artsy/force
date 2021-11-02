import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const { PartnerShows } = require("../partner_shows")

describe("PartnerShows", () => {
  let partnerShows

  beforeEach(() => {
    partnerShows = new PartnerShows([
      // featured | currrent | upcoming | past
      fabricate("show", { name: "show1" }), //                                    x
      fabricate("show", { featured: true, name: "show2", status: "running" }), //   x          x
      fabricate("show", { name: "show3", status: "running" }), //              x
      fabricate("show", { name: "show4", status: "upcoming" }), //                         x
      fabricate("show", { name: "show5", status: "upcoming" }), //                         x
      fabricate("show", { name: "show6" }), //                                    x
    ])
  })

  describe("#current", () => {
    it("gets the featured show", () => {
      partnerShows.featured().get("name").should.equal("show2")
    })

    it("gets current shows", () => {
      partnerShows.current().should.have.lengthOf(2)
      partnerShows.current().at(0).get("name").should.equal("show2")
      partnerShows.current().at(1).get("name").should.equal("show3")
    })

    it("gets current shows without featured show", () => {
      const featured = partnerShows.featured()
      partnerShows.current([featured]).should.have.lengthOf(1)
      partnerShows.current([featured]).at(0).get("name").should.equal("show3")
    })

    it("gets upcoming shows", () => {
      partnerShows.upcoming().should.have.lengthOf(2)
      partnerShows.upcoming().at(0).get("name").should.equal("show4")
      partnerShows.upcoming().at(1).get("name").should.equal("show5")
    })

    it("gets past shows", () => {
      partnerShows.past().should.have.lengthOf(2)
      partnerShows.past().at(0).get("name").should.equal("show1")
      partnerShows.past().at(1).get("name").should.equal("show6")
    })
  })

  describe("#fetchUntilEnd", () => {
    beforeEach(() => {
      Backbone.sync = jest.fn()
      partnerShows.reset()
    })

    it("paginates correctly", () => {
      partnerShows.fetchUntilEnd()
      Backbone.sync.mock.calls[0][2].data.page.should.equal(1)
      Backbone.sync.mock.calls[0][2].success([fabricate("show")])
      Backbone.sync.mock.calls[0][2].data.page.should.equal(2)
      Backbone.sync.mock.calls[1][2].success([fabricate("show")])
      Backbone.sync.mock.calls[0][2].data.page.should.equal(3)
      Backbone.sync.mock.calls[2][2].success([fabricate("show")])
      Backbone.sync.mock.calls[0][2].data.page.should.equal(4)
      Backbone.sync.mock.calls[3][2].success([])
    })
  })
})
