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
const { resolve } = require("path")
const FollowingView = benv.requireWithJadeify(
  resolve(__dirname, "../../client/following"),
  ["profilesTemplate"]
)

describe("Follows client-side code", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.onInfiniteScroll = function () {}
      return benv.render(
        resolve(__dirname, "../../templates/index.jade"),
        { sd: {} },
        () => {
          this.profiles = () =>
            _.times(5, () => ({
              profile: fabricate("profile", { id: _.uniqueId() }),
            }))
          sinon.stub(Backbone, "sync").yieldsTo("success", this.profiles())
          this.view = new FollowingView({ el: $("body") })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  it("fetches the following profiles and renders them immediately", function () {
    this.view.$list.length.should.equal(1)
    return this.view.$(".profile-item").length.should.equal(5)
  })

  return it("appends new profiles once they are fetched", function () {
    this.view.following.fetch()
    this.view.$list.length.should.equal(1)
    return this.view.$(".profile-item").length.should.equal(10)
  })
})
