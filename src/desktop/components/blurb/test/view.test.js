/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")

describe("BlurbView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      this.dotdotdot = $.fn.dotdotdot = sinon.stub()
      Backbone.$ = $
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    const BlurbView = require("../view.coffee")
    $("body").append('<div class="blurb"></div>')
    this.view = new BlurbView({ el: $(".blurb") })
    return (this.view.detachEllipsis = sinon.stub())
  })

  return describe("#attachEllipsis", () =>
    it("attaches ellipsis using dotdotdot", function () {
      return this.dotdotdot.calledOnce.should.be.ok()
    }))
})
