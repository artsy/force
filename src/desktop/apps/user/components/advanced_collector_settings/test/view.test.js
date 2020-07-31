/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../../../models/current_user")
const AdvancedCollectorSettingsFormView = benv.requireWithJadeify(
  require.resolve("../view"),
  ["template"]
)

describe("AdvancedCollectorSettingsFormView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    this.user = new CurrentUser(fabricate("user"))
    return (this.view = new AdvancedCollectorSettingsFormView({
      model: this.user,
    }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#render", () =>
    it("renders correctly", function () {
      const html = this.view.render().$el.html()
      return html.should.containEql(
        "Share followed artists, categories, and galleries with your inquiries"
      )
    }))

  return describe("#submit", () =>
    it("saves the attributes on the user", function () {
      this.view.render()

      this.view.$('[name="share_follows"]').click()
      this.view.$("button").click()
      Backbone.sync.args[0][1].attributes.share_follows.should.be.true()

      this.view.$('[name="share_follows"]').click()
      this.view.$("button").click()
      return Backbone.sync.args[1][1].attributes.share_follows.should.be.false()
    }))
})
