/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Partners = require("../../../../../collections/partners")
const PartnerCellView = benv.requireWithJadeify(
  require.resolve("../../partner_cell/view"),
  ["template"]
)
const PartnerCellCarouselView = benv.requireWithJadeify(
  require.resolve("../view"),
  ["template"]
)

describe("PartnerCellCarouselView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      PartnerCellCarouselView.__set__("PartnerCellView", PartnerCellView)
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.category = {
      name: "Foo Bar",
      facet: "some-facet",
      id: "foo-bar",
      partners: [
        {
          name: "Gallery Foo",
          id: "gallery-foo",
          initials: "GF",
          locations: [{ city: "New York" }],
          profile: {
            id: "foo-gallery",
            href: "/foo-gallery",
            image: { cropped: { url: "/foo.jpeg" } },
          },
        },
        {
          name: "Gallery Bar",
          id: "gallery-bar",
          initials: "GB",
          locations: [{ city: "New York" }],
          profile: {
            id: "bar-gallery",
            href: "/bar-gallery",
            image: { cropped: { url: "/bar.jpeg" } },
          },
        },
      ],
    }

    return (this.view = new PartnerCellCarouselView({ model: this.category }))
  })

  return describe("#render", function () {
    beforeEach(function () {
      return this.view.render()
    })

    return it("renders correctly", function () {
      this.view
        .$(".partner-cell-name")
        .map(function () {
          return $(this).text()
        })
        .get()
        .should.eql(["Gallery Foo", "Gallery Bar"])
      this.view.$(".pcc-header-left").text().should.equal("Foo Bar")
      this.view.$(".pcc-see-all").data("id").should.equal("foo-bar")
      return this.view
        .$(".pcc-see-all")
        .data("facet")
        .should.equal("some-facet")
    })
  })
})
