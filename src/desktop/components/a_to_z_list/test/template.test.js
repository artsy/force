/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { AToZ } = require("artsy-backbone-mixins")
const Backbone = require("backbone")
const cheerio = require("cheerio")
const fs = require("fs")
const jade = require("jade")
const path = require("path")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

class AToZCollectionModel extends Backbone.Model {
  alphaSortKey() {
    return this.get("sortable_id")
  }
  displayName() {
    return this.get("name")
  }
  href() {
    return `/${this.get("sortable_id")}`
  }
}

class AToZCollection extends Backbone.Collection {
  static initClass() {
    _.extend(this.prototype, AToZ)
    this.prototype.model = AToZCollectionModel
  }
}
AToZCollection.initClass()

describe("A to Z List Template", function () {
  beforeEach(function () {
    this.m1 = new AToZCollectionModel({
      sortable_id: "twenty-thirteen",
      name: "Twenty Thirteen",
    })
    this.m2 = new AToZCollectionModel({ sortable_id: "2014", name: "2014" })
    this.m3 = new AToZCollectionModel({
      sortable_id: "twenty-fourteen",
      name: "Twenty Fourteen",
    })
    this.m4 = new AToZCollectionModel({
      sortable_id: "fifteen-plus-twenty",
      name: "Fifteen + Twenty",
    })
    this.m5 = new AToZCollectionModel({
      sortable_id: "two-times",
      name: "Two Times",
      artworks_count: 0,
    })
    this.m6 = new AToZCollectionModel({
      sortable_id: "tim",
      name: "Tim",
      artworks_count: 1,
    })
    return (this.collection = new AToZCollection([
      this.m1,
      this.m2,
      this.m3,
      this.m4,
      this.m5,
      this.m6,
    ]))
  })

  return describe("template", () =>
    it("renders an A to Z list", function () {
      const html = render("template")({
        aToZGroup: this.collection.groupByAlphaWithColumns(3),
      })
      const $ = cheerio.load(html)
      $(".a-to-z-row").length.should.equal(3)

      // only link to 5 due to the 0 artworks count on @m5
      $(".a-to-z-row a").length.should.equal(5)

      $(".a-to-z-row-letter").eq(0).text().should.equal("0-9")
      $(".a-to-z-row").eq(0).html().should.containEql(this.m2.displayName())

      $(".a-to-z-row-letter").eq(1).text().should.equal("F")
      $(".a-to-z-row").eq(1).html().should.containEql(this.m4.displayName())

      $(".a-to-z-row-letter").eq(2).text().should.equal("T")
      $(".a-to-z-row").eq(2).html().should.containEql(this.m6.displayName())

      // three rows with the specified three cols each
      return $(".a-to-z-row .a-to-z-column").length.should.equal(9)
    }))
})
