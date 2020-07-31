/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Notifications = require("../../../../collections/notifications.coffee")
const Artworks = require("../../../../collections/artworks.coffee")
const CurrentUser = require("../../../../models/current_user.coffee")
const Artist = require("../../../../models/artist.coffee")
const Artists = require("../../../../collections/artists.coffee")
const { stubChildClasses } = require("../../../../test/helpers/stubs")
let SidebarView = null

// FIXME: cannot set location on undefined (window) in benv setup
xdescribe("NotificationsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })

      Backbone.$ = $
      SidebarView = require("../../client/sidebar.coffee")
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    sinon.stub(CurrentUser, "orNull")
    CurrentUser.orNull.returns(new CurrentUser(fabricate("user")))
    const artists = null
    location.search = ""
    return benv.render(
      resolve(__dirname, "../../templates/index.jade"),
      { sd: {}, asset() {}, artists },
      () => {
        let mod
        ;({ NotificationsView: this.NotificationsView } = mod = rewire(
          "../../client/index.coffee"
        ))
        mod.__set__("SidebarView", sinon.stub())
        mod.__set__("scrollFrame", sinon.stub())
        mod.__set__("UrlUpdater", sinon.stub())
        mod.__set__("Cookies", { expire() {} })
        return done()
      }
    )
  })

  afterEach(function () {
    Backbone.sync.restore()
    return CurrentUser.orNull.restore()
  })

  describe("#initialize", function () {
    beforeEach(function () {
      return (this.view = new this.NotificationsView({ el: $("body") }))
    })

    return it("should create a filterState model with defaults", function () {
      this.view.filterState.get("forSale").should.equal(true)
      this.view.filterState.get("loading").should.equal(true)
      return (this.view.filterState.get("artist") === null).should.equal(true)
    })
  })

  return describe("#render", function () {
    beforeEach(function () {
      return (this.view = new this.NotificationsView({ el: $("body") }))
    })

    it("should set the data-state when loading", function () {
      this.view.filterState.set("loading", true)
      this.view.render()
      return $("#notifications-page").attr("data-state").should.equal("loading")
    })

    it("should set the data-state when an artist is selected", function () {
      this.view.filterState.set({
        artist: "andy-warhol",
        loading: false,
      })
      this.view.render()
      return $("#notifications-page").attr("data-state").should.equal("artist")
    })

    it("should set the data-state when no artist is selected and not loading", function () {
      this.view.filterState.set({
        loading: false,
        artist: null,
      })
      this.view.render()
      return $("#notifications-page")
        .attr("data-state")
        .should.equal("recent-works")
    })

    return it("sets the data-forsale when filtering", function () {
      this.view.filterState.set({
        forSale: true,
      })
      this.view.render()
      return $("#notifications-page").attr("data-forsale").should.equal("true")
    })
  })
})
