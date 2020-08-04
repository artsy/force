/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const rewire = require("rewire")
const CurrentUser = require("../../../models/current_user")
const Artwork = require("../../../models/artwork")
const State = require("../../branching_state")
let map = null
const benv = require("benv")

describe("decisions", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      map = require("../map")
      this.Logger = rewire("../../logger")
      this.Cookies = this.Logger.__get__("Cookies")
      const store = {}
      this.Cookies.set = (name, value) => (store[name] = value)
      this.Cookies.get = name => store[name]
      this.logger = new this.Logger("map")

      this.state = new State(map)
      this.user = new CurrentUser() // logged in user
      this.artwork = new Artwork()
      this.state.inject({
        user: this.user,
        state: this.state,
        artwork: this.artwork,
        logger: this.logger,
      })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return this.logger.reset()
  })

  describe("has_completed_profile", () =>
    it("returns true when the user has met all relevant conditions, otherwise false", function () {
      this.state.decide("has_completed_profile").should.be.false()

      this.user.isCollector().should.be.false()

      this.logger.log("commercial_interest")

      this.state.decide("has_completed_profile").should.be.false()

      this.user.set({
        profession: "Foo",
        location: { existy: true },
        phone: "555-555-5555",
      })

      this.state.decide("has_completed_profile").should.be.false()

      this.user.set("share_follows", false) // Finally completed basic_info

      return this.state.decide("has_completed_profile").should.be.true()
    }))

  return describe("has_basic_info", () =>
    it("returns true when the user has all basic info false when some or all is missing", function () {
      this.state.decide("has_basic_info").should.be.false()

      this.user.set({
        profession: "Foo",
        location: { existy: true },
        phone: "555-555-5555",
        share_follows: false,
      })

      this.state.decide("has_basic_info").should.be.true()

      this.user.unset("share_follows")

      return this.state.decide("has_basic_info").should.be.false()
    }))
})
