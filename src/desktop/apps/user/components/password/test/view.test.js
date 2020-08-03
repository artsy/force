/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../../../models/current_user")
const PasswordView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])

describe("PasswordView", function () {
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
    sinon.stub($, "ajax")
    sinon.stub(_, "delay", cb => cb())

    this.user = new CurrentUser(fabricate("user"))
    this.view = new PasswordView({ user: this.user })
    return this.view.render()
  })

  afterEach(function () {
    $.ajax.restore()
    Backbone.sync.restore()
    return _.delay.restore()
  })

  return describe("#submit", function () {
    beforeEach(function () {
      Backbone.sync.onCall(0).yieldsTo("success")
      return this.view.submit($.Event())
    })

    it("changes the password", () =>
      Backbone.sync.args[0][1].url.should.match(
        new RegExp(`api/v1/me/password`)
      ))

    return it("logs the user out", function () {
      $.ajax.args[0][0].method.should.equal("DELETE")
      return $.ajax.args[0][0].url.should.equal("/users/sign_out")
    })
  })
})
