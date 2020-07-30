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
const EmailPreferencesView = benv.requireWithJadeify(
  require.resolve("../view"),
  ["template"]
)

describe("EmailPreferencesView", function () {
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

    this.user = new CurrentUser(fabricate("user", { receive_emails: true }))
    this.view = new EmailPreferencesView({ model: this.user, user: this.user })
    return this.view.render()
  })

  afterEach(() => Backbone.sync.restore())

  describe("#render", () =>
    it("renders the template", function () {
      this.view.$el.data("enabled").should.be.true()
      return this.view.render().$el.html().should.containEql("Receive Emails")
    }))

  describe("#submit", () =>
    it("saves the preferences", function () {
      this.view.$('[name="receive_weekly_email"]').click()
      this.view.$('[name="receive_weekly_email"]').click()
      this.view.$('[name="receive_personalized_email"]').click()
      this.view.$("button").click()
      Backbone.sync.args[0][1].attributes.receive_personalized_email.should.be.true()
      return Backbone.sync.args[0][1].attributes.receive_weekly_email.should.be.false()
    }))

  return describe("#toggleSubscriptions", function () {
    it("disables subscriptions checkboxes when we disable `receive_emails`")

    return it(
      "enables subscriptions checkboxes when we enable `receive_emails`"
    )
  })
})
