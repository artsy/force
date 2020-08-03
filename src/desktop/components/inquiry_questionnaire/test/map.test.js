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

xdescribe("map", function () {
  // FIXME: not sure, at State.decide
  // TypeError: this.get(...)[key] is not a function
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

      this.state.on("next", step => {
        return this.logger.log(step)
      })

      return done()
    })
  })

  afterEach(function () {
    this.logger.reset()
    this.state.off("next")
    return benv.teardown()
  })

  return describe("logged in user", function () {
    beforeEach(function () {
      return this.user.related().collectorProfile.set({ collector_level: 1 })
    }) // 'Looking and learning' or default

    describe("default (partner does not have pre-qualification on)", () =>
      it("follows the path to the end", function () {
        this.state.current().should.equal("inquiry")
        this.state.next().should.equal("confirmation")

        this.state.next().should.equal("commercial_interest")
        this.user.related().collectorProfile.set({ collector_level: 3 }) // 'Yes'
        this.user.isCollector().should.be.true()

        this.state.next().should.equal("basic_info")
        this.state.next().should.equal("artists_in_collection")
        this.state.next().should.equal("galleries_you_work_with")
        this.state.next().should.equal("auction_houses_you_work_with")
        this.state.next().should.equal("fairs_you_attend")
        this.state.next().should.equal("institutional_affiliations")

        this.state.next().should.equal("done")
        return this.state.isEnd().should.be.true()
      }))

    describe("the partner has turned on pre-qualification", function () {
      beforeEach(function () {
        return this.artwork.related().partner.set("pre_qualify", true)
      })

      return describe('a user that responseds "Not yet" to the commercial_interest step', () =>
        it("follows the path to the end", function () {
          this.state.current().should.equal("commercial_interest")
          this.user.related().collectorProfile.set({ collector_level: 2 }) // 'Not yet'
          this.user.isCollector().should.be.false()

          this.state.next().should.equal("how_can_we_help")
          this.state.set("value", "purchase") // 'I want to purchase this work'

          // Dispatch to basic_info + inquiry
          this.state.next().should.equal("basic_info")
          this.state.next().should.equal("inquiry")

          // No more steps, skips confirmation, move straight to `done`
          this.state.next().should.equal("done")
          return this.state.isEnd().should.be.true()
        }))
    })

    describe("the partner belongs to an auction", function () {
      beforeEach(function () {
        return this.artwork.set("is_in_auction", true)
      })

      return describe("starts with a specialist inquiry", () =>
        it("and ends after the specialist step", function () {
          this.state.current().should.equal("specialist")
          this.state.next().should.equal("done")
          return this.state.isEnd().should.be.true()
        }))
    })

    describe("the work should only show the specialist modal", function () {
      beforeEach(function () {
        return this.state.inject({ ask_specialist: true })
      })

      afterEach(function () {
        return this.state.inject({ ask_specialist: false })
      })

      return it("and ends after the specialist step", function () {
        this.state.current().should.equal("specialist")
        this.state.next().should.equal("done")
        return this.state.isEnd().should.be.true()
      })
    })

    return describe("A user that has previously seen some steps", function () {
      beforeEach(function () {
        this.logger.log("artists_in_collection")
        return this.logger.log("auction_houses_you_work_with")
      })

      return it("follows the path to the end", function () {
        this.state.current().should.equal("inquiry")
        this.state.next().should.equal("confirmation")

        this.state.next().should.equal("commercial_interest")
        this.user.related().collectorProfile.set({ collector_level: 3 }) // 'Yes'
        this.user.isCollector().should.be.true()

        this.state.next().should.equal("basic_info")

        // Skips over `artists_in_collection`
        this.state.next().should.equal("galleries_you_work_with")
        // Skips over `auction_houses_you_work_with`
        this.state.next().should.equal("fairs_you_attend")
        this.state.next().should.equal("institutional_affiliations")

        this.state.next().should.equal("done")
        return this.state.isEnd().should.be.true()
      })
    })
  })
})
