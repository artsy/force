import _ from "underscore"
import benv from "benv"
import sinon from "sinon"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const CurrentUser = require("../../../../models/current_user.coffee")
const LoggedOutUser = require("../../../../models/logged_out_user.coffee")
const Artwork = require("../../../../models/artwork.coffee")
const ArtworkInquiry = require("../../../../models/artwork_inquiry.coffee")
const State = require("../../../branching_state/index.coffee")

export const setup = cb =>
  _.wrap(cb, function(cb) {
    // @ts-ignore
    before(function(done) {
      sinon.stub(_, "defer", cb => cb())
      return benv.setup(function() {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
          sd: {
            AP: { loginPagePath: "/login" },
          },
          grecaptcha: {
            ready(cb) {
              return cb()
            },
            execute: sinon.stub().returns("test-token"),
          },
        })
        // @ts-ignore
        Backbone.$ = $
        return done()
      })
    })

    // @ts-ignore
    after(function() {
      _.defer.restore()
      return benv.teardown()
    })

    beforeEach(function() {
      this.currentUser = new CurrentUser(fabricate("user"))
      this.loggedOutUser = new LoggedOutUser(fabricate("user"))
      this.artwork = new Artwork(fabricate("artwork"))
      this.inquiry = new ArtworkInquiry()
      return (this.state = new State())
    })

    return cb()
  })
