/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const rewire = require("rewire")
const sinon = require("sinon")
const Backbone = require("backbone")

describe("JSONPageEditor", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        Blob: sinon.stub(),
      })
      jQuery.widget = sinon.stub()
      $.hulk = sinon.stub()
      Backbone.$ = $
      this.JSONPageEditor = rewire("../client/editor")
      this.view = new this.JSONPageEditor({
        $el: $("<div></div>"),
        data: {
          jobs: [{ category: "engineering" }, { category: "finance" }],
        },
        paths: [],
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  return describe("#addSortingArrows", function () {
    it("adds arrows for sorting array items", function () {
      this.view.setup()
      this.view.$el
        .find(".hulk-editor")
        .append('<div class="hulk-array-element"></div>')
      this.view.addSortingArrows()
      return this.view.$el
        .find(".json-page-array-header-up")
        .length.should.be.above(0)
    })

    return it("moves items around in arrays", function () {
      this.view.setup()
      this.view.$el.find(".hulk-editor").html(`\
<div class="hulk-map"> \
<div class="hulk-map"> \
<div class="hulk-map-value-container"></div> \
<input class="hulk-map-key" value="jobs" /> \
<div class="hulk-array"> \
<div class="hulk-array-element">engineering</div> \
<div class="hulk-array-element">finance</div> \
</div> \
</div> \
</div>\
`)
      this.view.addSortingArrows()
      this.view.$el.find(".json-page-array-header-down").click()
      return this.view.data.jobs
        .map(j => j.category)
        .join(",")
        .should.equal("finance,engineering")
    })
  })
})
