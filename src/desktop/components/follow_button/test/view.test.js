/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const Profile = require("../../../models/profile.coffee")
const Artist = require("../../../models/artist.coffee")
const rewire = require("rewire")
const FollowButton = rewire("../view.coffee")
const { fabricate } = require("@artsy/antigravity")
const Following = require("../collection")
const mediator = require("../../../lib/mediator.coffee")

describe("FollowButton", function () {
  before(function (done) {
    this.mediatorSpy = sinon.spy(mediator, "trigger")
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        sd: {},
      })
      sinon.stub(Backbone, "sync")
      FollowButton.__set__(
        "mediator",
        (this.mediator = { trigger: sinon.stub() })
      )
      FollowButton.__set__(
        "ArtistSuggestions",
        (this.artistSuggestionSpy = sinon.spy())
      )
      Backbone.$ = $
      return done()
    })
  })

  after(function () {
    this.mediatorSpy.restore()
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("initializing artist suggestions", function () {
    before(function () {
      this.following = new Following(null, { kind: "profile" })
      return (this.view = new FollowButton({
        el: $("<div></div>"),
        model: new Artist(fabricate("artist")),
        modelName: "artist",
        following: this.following,
      }))
    })

    return it("initializes the suggestions view for an artist context with a following (logged-in) collection", function () {
      return this.artistSuggestionSpy.called.should.be.ok()
    })
  })

  describe("#toggle without label", function () {
    before(function () {
      return (this.view = new FollowButton({
        el: $("<div></div>"),
        model: new Profile(fabricate("fair_profile")),
        modelName: "profile",
      }))
    })

    return it("triggers an auth modal with the model name as the label", function () {
      this.view.$el.click()
      return _.last(this.mediatorSpy.args)[1].copy.should.equal(
        "Sign up to follow profiles"
      )
    })
  })

  return describe("#toggle with label", function () {
    before(function () {
      return (this.view = new FollowButton({
        el: $("<div></div>"),
        model: new Profile(fabricate("fair_profile")),
        modelName: "profile",
        label: "The Armory Show",
      }))
    })

    return it("triggers an auth modal with the passed in label", function () {
      this.view.$el.click()
      return _.last(this.mediatorSpy.args)[1].copy.should.equal(
        "Sign up to follow The Armory Show"
      )
    })
  })
})
