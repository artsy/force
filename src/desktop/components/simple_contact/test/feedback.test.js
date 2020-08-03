/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../models/current_user")
const FeedbackView = benv.requireWithJadeify(
  require.resolve("../views/feedback"),
  ["template"]
)

describe("FeedbackView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new FeedbackView()
    return sinon.stub(Backbone, "sync").yieldsTo("success")
  })

  afterEach(() => Backbone.sync.restore())

  describe("logged out", function () {
    beforeEach(function () {
      return this.view.render()
    })

    it("renders correctly", function () {
      this.view.$("h1").text().should.equal("Send feedback to Artsy")
      this.view
        .$("textarea")
        .attr("placeholder")
        .should.equal("Leave your comments")
      this.view.$(".scontact-from").should.have.lengthOf(0)
      this.view.$('input[name="user_name"]').should.have.lengthOf(1)
      return this.view.$('input[name="user_email"]').should.have.lengthOf(1)
    })

    return it("submits the feedback", function () {
      Backbone.sync.called.should.be.false()
      this.view.$('input[name="user_name"]').val("Iam Loggedout")
      this.view.$('input[name="user_email"]').val("foo@bar.com")
      this.view.$('textarea[name="message"]').val("My message")
      this.view.$("button").click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][1].url.should.containEql("/api/v1/feedback")
      Backbone.sync.args[0][1].attributes.should.have.keys(
        "url",
        "message",
        "user_name",
        "user_email"
      )
      Backbone.sync.args[0][1].attributes.user_name.should.equal(
        "Iam Loggedout"
      )
      return Backbone.sync.args[0][1].attributes.message.should.equal(
        "My message"
      )
    })
  })

  return describe("logged in", function () {
    before(() =>
      sinon
        .stub(CurrentUser, "orNull")
        .returns(new CurrentUser(fabricate("user", { name: "Iam Loggedin" })))
    )

    after(() => CurrentUser.orNull.restore())

    beforeEach(function () {
      return this.view.render()
    })

    it("renders correctly", function () {
      this.view.$("h1").text().should.equal("Send feedback to Artsy")
      this.view
        .$("textarea")
        .attr("placeholder")
        .should.equal("Leave your comments")
      return this.view
        .$(".scontact-from")
        .text()
        .should.equal("From: Iam Loggedin (craigspaeth@gmail.com)")
    })

    return it("submits the feedback", function () {
      Backbone.sync.called.should.be.false()
      this.view.$('textarea[name="message"]').val("My message")
      this.view.$("button").click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][1].url.should.containEql("/api/v1/feedback")
      Backbone.sync.args[0][1].attributes.should.have.keys(
        "url",
        "message",
        "user_name",
        "user_email"
      )
      return Backbone.sync.args[0][1].attributes.message.should.equal(
        "My message"
      )
    })
  })
})
