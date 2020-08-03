/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("ShowsFeed", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const ShowsFeed = benv.require(resolve(__dirname, "../client/shows_feed"))
      ShowsFeed.__set__(
        "PartnerShowButtons",
        (this.PartnerShowButtons = sinon.stub())
      )
      ShowsFeed.prototype.initialize = sinon.stub()
      const model = new Backbone.Model()
      model.childModel = new Backbone.Model(
        fabricate("show", { id: "gagosian" })
      )
      this.view = new ShowsFeed()
      this.view.latestItems = new Backbone.Collection([model])
      return done()
    })
  })

  afterEach(() => benv.teardown())

  return describe("#handleDoneFetching", function () {
    it("inits a show button for each show", function () {
      this.view.handleDoneFetching()
      return this.PartnerShowButtons.calledWithNew.should.be.ok()
    })

    return it("syncs follows from the show ids", function () {
      this.view.followProfiles = { syncFollows: sinon.stub() }
      this.view.handleDoneFetching()
      return this.view.followProfiles.syncFollows.args[0][0][0].should.equal(
        "gagosian"
      )
    })
  })
})
