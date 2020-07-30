/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const Notice = require("../index")

describe("Notice", function () {
  beforeEach(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  afterEach(() => benv.teardown())

  return describe("#render", () =>
    it("renders the message", function () {
      const notice = new Notice({ message: "A caesura" })
      return notice.render().$el.html().should.containEql("A caesura")
    }))
})
