/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")

describe("SelectView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const filename = path.resolve(__dirname, "../client/select_view.coffee")
      const SelectView = benv.requireWithJadeify(filename, ["template"])

      this.triggerSpy = sinon.stub()
      SelectView.__set__("mediator", { trigger: this.triggerSpy })

      this.view = new SelectView({
        $container: $("body"),
        name: "cabbie",
        label: "cabbie label",
        filterOptions: {
          label1: "value1",
          label2: "value2",
        },
        filterParam: "cabbie_label",
      })

      return done()
    })
  })

  afterEach(() => benv.teardown())

  return xdescribe("#initialRender", () =>
    xit("renders the select box properly", () =>
      $("#select-group__select-cabbie option").length.should.equal(2)))
})
