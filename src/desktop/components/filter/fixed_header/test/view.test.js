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

describe("FilterFixedHeader", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      const FilterFixedHeader = benv.require(resolve(__dirname, "../view"))
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      FilterFixedHeader.__set__(
        "JumpView",
        (this.JumpView = class JumpView extends Backbone.View {
          initialize() {}
        })
      )
      this.view = new FilterFixedHeader({
        el: $("<div></div>"),
        params: new Backbone.Model(),
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("wraps the view in a container that locks the height", function () {
    const spy = sinon.spy($.fn, "height")
    this.view.wrap()
    return spy.called.should.be.ok()
  })

  it("scrolls back up if the user has scrolled past the header", function () {
    this.view.$bodyHtml.scrollTop = sinon.stub()
    this.view.$window.scrollTop = () => 300
    this.view.$el.offset = () => ({
      top: 200,
    })
    this.view.scrollToTop()
    return this.view.$bodyHtml.scrollTop.args[0][0].should.be.above(0)
  })

  it("doenst scroll back up if the user hasnt scrolled past the header", function () {
    this.view.document = { scrollTop: 0 }
    this.view.$window.scrollTop = () => 200
    this.view.$el.offset = () => ({
      top: 300,
    })
    this.view.scrollToTop()
    return this.view.document.scrollTop.should.not.be.above(0)
  })

  return describe("#squeeze", function () {
    it("doesnt choke if the filter UI is missing a left portion", function () {
      return this.view.squeeze()
    })

    return it(
      "toggles the visiblity of the left info when the screen is smaller"
    )
  })
})
