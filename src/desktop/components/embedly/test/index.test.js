/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Embedly = require("../index")

describe("Embedly", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.embedly = new Embedly())
  })

  afterEach(() => Backbone.sync.restore())

  return it("assembles the passed in URLs in format that Embedly expects", function () {
    this.embedly.fetch({
      data: { urls: ["http://artsy.net", "http://artsy.pizza"] },
    })
    return Backbone.sync.args[0][2].data.should.containEql(
      "urls=http%3A%2F%2Fartsy.net&urls=http%3A%2F%2Fartsy.pizza"
    )
  })
})
