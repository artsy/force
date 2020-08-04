/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Sale = require("../../../models/sale")

describe("Auctions template", function () {
  before(function () {
    let auctions
    return (auctions = [
      (this.openSale = new Sale(
        fabricate("sale", { auction_state: "open", id: "open-sale" })
      )),
      (this.closedSale = new Sale(
        fabricate("sale", { auction_state: "closed", id: "closed-sale" })
      )),
      (this.previewSale = new Sale(
        fabricate("sale", { auction_state: "preview", id: "preview-sale" })
      )),
    ])
  })

  return describe("with auctions", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        return benv.render(
          resolve(__dirname, "../templates/index.jade"),
          {
            sd: {},
            _: require("underscore"),
            asset() {},
            pastAuctions: [this.closedSale],
            currentAuctions: [this.openSale],
            upcomingAuctions: [this.previewSale],
          },
          () => done()
        )
      })
    })

    after(() => benv.teardown())

    return it("renders correctly", function () {
      $(".auctions-page-list[data-list=current]").length.should.equal(1)
      $(".auctions-page-list[data-list=past]").length.should.equal(1)
      return $(".auctions-page-list[data-list=upcoming]").length.should.equal(1)
    })
  })
})
