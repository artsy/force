/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const FooterView = require("../view")

xdescribe("FooterView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return benv.render(require.resolve("../template.jade"), {}, () => {
        this.view = new FooterView({ el: $("#main-layout-footer") })
        return done()
      })
    })
  })

  afterEach(() => benv.teardown())

  return it("knows what year it is", function () {
    return this.view.$el.html().should.containEql(new Date().getFullYear())
  })
})
