/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
let sd = require("sharify").data
const Profile = require("../../../../models/profile.coffee")
const Fair = require("../../../../models/fair.coffee")
const { resolve } = require("path")
const sinon = require("sinon")
const mediator = require("../../../../lib/mediator.coffee")
const CurrentUser = require("../../../../models/current_user.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("HeaderView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("user is signed out", function () {
    beforeEach(function (done) {
      sinon.stub(Backbone, "sync")
      sinon.stub($, "ajax")
      this.mediatorSpy = sinon.spy(mediator, "trigger")
      this.fair = new Fair(fabricate("fair"))
      this.profile = new Profile(fabricate("fair_profile"))
      return benv.render(
        resolve(__dirname, "../../templates/header.jade"),
        { sd: {}, _ },
        () => {
          const FairHeaderView = benv.require(
            resolve(__dirname, "../../client/header")
          )
          this.view = new FairHeaderView({
            el: $(".fair-layout-header-right"),
            model: this.profile,
            fair: this.fair,
          })
          this.$template = $("body")
          return done()
        }
      )
    })

    afterEach(function () {
      Backbone.sync.restore()
      this.mediatorSpy.restore()
      return $.ajax.restore()
    })

    describe("#login", () =>
      it("triggers the mediator", function () {
        this.view.$(".mlh-login").click()
        this.mediatorSpy.args[0][0].should.equal("open:auth")
        return this.mediatorSpy.args[0][1].mode.should.equal("login")
      }))

    return describe("#signup", () =>
      it("triggers the mediator", function () {
        this.view.$(".mlh-signup").click()
        this.mediatorSpy.args[0][0].should.equal("open:auth")
        return this.mediatorSpy.args[0][1].mode.should.equal("signup")
      }))
  })

  return describe("user signed in", function () {
    beforeEach(function (done) {
      sinon.stub(Backbone, "sync")
      sinon.stub($, "ajax")
      this.fair = new Fair(fabricate("fair"))
      this.profile = new Profile(fabricate("fair_profile"))
      this.user = new CurrentUser(fabricate("user"))
      sd = { CURRENT_USER: this.user }
      return benv.render(
        resolve(__dirname, "../../templates/header.jade"),
        { sd, _, user: this.user },
        () => {
          const FairHeaderView = benv.require(
            resolve(__dirname, "../../client/header")
          )
          this.view = new FairHeaderView({
            el: $(".fair-layout-header-right"),
            model: this.profile,
            fair: this.fair,
          })
          this.$template = $("body")
          return done()
        }
      )
    })

    afterEach(function () {
      Backbone.sync.restore()
      return $.ajax.restore()
    })

    return describe("#logout", () =>
      it("signs out user with ajax", function () {
        this.view.$(".mlh-logout").click()
        $.ajax.args[0][0].type.should.equal("DELETE")
        return $.ajax.args[0][0].url.should.equal("/users/sign_out")
      }))
  })
})
