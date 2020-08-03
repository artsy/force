/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const sd = require("sharify").data
const benv = require("benv")
const CurrentUser = require("../../../models/current_user")
const { fabricate } = require("@artsy/antigravity")

describe("UserSettingsView", function () {
  beforeEach(function (done) {
    this.user = new CurrentUser(fabricate("user"))
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")
      sinon.stub($, "ajax")
      global.location = { assign: sinon.stub() }
      const UserSettingsView = require("../client/view.coffee")
      this.view = new UserSettingsView.UserSettingsView({
        el: $(`<div id='settings'> \
<div id='#settings-generic-error'></div> \
<div class='js--settings-logout'></div> \
</div>`),
      })
      return done()
    })
  })

  afterEach(function () {
    $.ajax.restore()
    benv.teardown()
    return Backbone.sync.restore()
  })

  return describe("#logout", () =>
    it("logs out a user who was signed in", function () {
      this.view.$(".js--settings-logout").click()
      $.ajax.args[0][0].success()
      return global.location.assign.args[0][0].should.containEql("/")
    }))
})
