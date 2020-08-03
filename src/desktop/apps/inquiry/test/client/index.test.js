/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
let initializeInquiry = null

describe("mobile inquiry flow initialization", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      initializeInquiry = rewire("../../client/routes/inquiry")
      initializeInquiry.__set__("FastClick", sinon.stub())
      this.StateView = initializeInquiry.__get__("StateView")
      this.render = sinon.stub(this.StateView.prototype, "render", function () {
        return this
      })
      return done()
    })
  })

  after(function () {
    benv.teardown()
    return this.render.restore()
  })

  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    return ({ state: this.state } = this.questionnaire = initializeInquiry(
      "foobar-artwork-id"
    ))
  })

  afterEach(() => Backbone.sync.restore())

  return it("sets up the inquiry flow", function () {
    return this.state.current().should.equal("inquiry")
  })
})
