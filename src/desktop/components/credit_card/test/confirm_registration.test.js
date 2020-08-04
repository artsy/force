/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/auction")
const CurrentUser = require("../../../models/current_user")
const { resolve } = require("path")

describe("ConfirmRegistration", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      const ConfirmRegistration = benv.requireWithJadeify(
        resolve(__dirname, "../client/confirm_registration"),
        ["template"]
      )
      for (let method of [
        "initialize",
        "isLoading",
        "isLoaded",
        "updatePosition",
      ]) {
        sinon.stub(ConfirmRegistration.prototype, method)
      }
      this.view = new ConfirmRegistration({
        el: $(`\
<div>
  <div class='credit-card-unqualified-msg'>
    Warning, you are not qualified!
  </div>
</div>\
`),
      })
      this.view.auction = new Auction(
        fabricate("sale", { id: "foo-bar-auction" })
      )
      this.view.user = new CurrentUser(fabricate("user"))
      return done()
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  return xdescribe("#postRender", () =>
    it(`shows the unqualified bidder warning if the bidder for the auction \
is \`qualified_for_bidding\` false`, function () {
      this.view.postRender()
      _.last(Backbone.sync.args)[2].success([
        {
          id: "foo",
          sale: fabricate("sale", { id: "foo-bar-auction" }),
        },
      ])
      _.last(Backbone.sync.args)[2].success({
        id: "foo",
        sale: fabricate("sale", { id: "foo-bar-auction" }),
        qualified_for_bidding: false,
      })
      return this.view
        .$(".credit-card-unqualified-msg")
        .is(":visible")
        .should.be.ok()
    }))
})
