/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")

describe("BorderedPulldown", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      const BorderedPulldown = require("../view")
      this.view = new BorderedPulldown({ el: $("<div></div>") })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  return it("moves the pulldown up when selecting some items", function () {
    sinon.spy($.fn, "css")
    sinon.stub($.fn, "outerHeight")
    $.fn.outerHeight.returns(100)
    const $fixture = $("<div><b></b><b id='a'></b><b></b></div>")
    this.view.select({ currentTarget: $fixture.find("#a") })
    $.fn.css.args[0][0]["margin-top"].should.equal(-100)
    return $.fn.outerHeight.restore()
  })
})
