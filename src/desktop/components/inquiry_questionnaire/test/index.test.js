/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../models/current_user")
const Artwork = require("../../../models/artwork")
const ArtworkInquiry = require("../../../models/artwork_inquiry")
let openInquiryQuestionnaireFor = null

describe("openInquiryQuestionnaireFor", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }
      sinon.stub(_, "defer", cb => cb())
      openInquiryQuestionnaireFor = rewire("../index")

      this.StateView = openInquiryQuestionnaireFor.__get__("StateView")
      this.render = sinon.stub(this.StateView.prototype, "render", function () {
        return this
      })

      this.Logger = openInquiryQuestionnaireFor.__get__("Logger")

      return done()
    })
  })

  after(function () {
    _.defer.restore()
    benv.teardown()
    return this.render.restore()
  })

  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    this.user = new CurrentUser(fabricate("user"))
    this.artwork = new Artwork(fabricate("artwork"))
    this.inquiry = new ArtworkInquiry()

    return (this.modal = openInquiryQuestionnaireFor({
      user: this.user,
      inquiry: this.inquiry,
      artwork: this.artwork,
    }))
  })

  afterEach(() => Backbone.sync.restore())

  return it("opens the modal", function () {
    return this.modal.opened.should.be.true()
  })
})
