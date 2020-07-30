/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { extend } = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../../../models/current_user")
const LinkedAccountsView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])
LinkedAccountsView.__set__("sd", {
  AP: {
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
  },
})

describe("LinkedAccountsView", function () {
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
    this.view = new LinkedAccountsView({ user: this.user })

    return this.view.render()
  })

  afterEach(() => Backbone.sync.restore())

  describe("apple feature flag", function () {
    it("does not render apple by default", function () {
      return this.view.$("#apple-svg-icon").length.should.eql(0)
    })

    return it("renders apple when feature flag is enabled", function () {
      const sd = LinkedAccountsView.__get__("sd")
      LinkedAccountsView.__set__(
        "sd",
        extend({}, sd, { ENABLE_SIGN_IN_WITH_APPLE: true })
      )
      const enabled_view = new LinkedAccountsView({ user: this.user })
      enabled_view.render()
      return enabled_view.$("#apple-svg-icon").length.should.eql(1)
    })
  })

  return describe("#toggleService", () =>
    ["apple", "facebook"].map(provider =>
      describe(`unlink ${provider}`, function () {
        beforeEach(function () {
          sinon.stub(this.user, "isLinkedTo").returns(true)

          return this.view
            .$(
              `.js-settings-linked-accounts__service__toggle[data-service='${provider}']`
            )
            .click()
        })

        afterEach(function () {
          return this.user.isLinkedTo.restore()
        })

        it("destroys the authentication", function () {
          Backbone.sync.args[0][0].should.equal("delete")
          return Backbone.sync.args[0][1].url.should.containEql(
            `/api/v1/me/authentications/${provider}`
          )
        })

        describe("success", function () {
          beforeEach(function () {
            Backbone.sync.yieldsTo("success")
            return this.view
              .$(
                `.js-settings-linked-accounts__service__toggle[data-service=${provider}]`
              )
              .click()
          })

          return it("sets the correct button state", function () {
            return this.view
              .$(
                `.js-settings-linked-accounts__service__toggle[data-service=${provider}]`
              )
              .data()
              .should.eql({ service: `${provider}`, connected: "disconnected" })
          })
        })

        describe("error", function () {
          beforeEach(function () {
            Backbone.sync.yieldsTo("error", {
              responseJSON: { error: "Something bad." },
            })
            return this.view
              .$(
                `.js-settings-linked-accounts__service__toggle[data-service=${provider}]`
              )
              .click()
          })

          return it("renders any errors", function () {
            return this.view
              .$(".js-form-errors")
              .text()
              .should.equal("Something bad.")
          })
        })

        return describe("callback error", function () {
          beforeEach(function () {
            const sd = LinkedAccountsView.__get__("sd")
            return LinkedAccountsView.__set__(
              "sd",
              extend({}, sd, {
                ERROR: "Some arbitrary error message (probably).",
              })
            )
          })

          return it("renders the ERROR", function () {
            return this.view
              .render()
              .$(".js-form-errors")
              .text()
              .should.equal("Some arbitrary error message (probably).")
          })
        })
      })
    ))
})
