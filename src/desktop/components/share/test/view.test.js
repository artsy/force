/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const ShareView = benv.requireWithJadeify(require.resolve("../view.coffee"), [
  "template",
])

describe("ShareView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new ShareView({
      url: "foobar.html",
      media: "foobar.jpg",
      description: "Foo Bar",
    })

    return this.view.render()
  })

  describe("#render", () =>
    it("renders the template", function () {
      return this.view
        .render()
        .$el.html()
        .should.containEql(
          "https://www.facebook.com/sharer/sharer.php?u=foobar.html"
        )
    }))

  return xdescribe("#popUp", () =>
    it("opens a share popup", function () {
      const options = this.view.popUp($.Event("click"))
      return options.should.equal("status=1,width=750,height=400,top=0,left=0")
    }))
})
