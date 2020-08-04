/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const teleport = rewire("../../client/teleport.coffee")

describe("teleport", function () {
  beforeEach(done =>
    benv.setup(() => {
      benv.expose({ Event: window.Event })
      teleport.__set__("sd", { EIGEN: true })
      return done()
    })
  )

  afterEach(() => benv.teardown())

  return it("creates a link to click", function () {
    const teleportation = teleport("http://google.com/")
    teleportation.event.target.href.should.equal("http://google.com/")
    return teleportation.didDispatch.should.equal(true)
  })
})
