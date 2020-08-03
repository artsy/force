/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Gene = require("../../models/gene")
const Genes = require("../../collections/genes")
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")

describe("Genes", function () {
  beforeEach(function () {
    this.brown = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "brown",
        name: "Brown",
      })
    )
    this.purple = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "purple",
        name: "Purple",
      })
    )
    this.green = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "green",
        name: "Green",
      })
    )
    this.round = new Gene(
      fabricate("gene", {
        family: { id: "shapes", name: "Shapes" },
        id: "round",
        name: "Round",
      })
    )
    return (this.squiggly = new Gene(
      fabricate("gene", {
        family: { id: "shapes", name: "Shapes" },
        id: "squiggly",
        name: "Squiggly",
      })
    ))
  })

  return describe("#groupByFamily", function () {
    it('groups genes by gene family"', function () {
      const genes = new Genes([
        this.brown,
        this.purple,
        this.round,
        this.squiggly,
      ])
      const grouped = genes.groupByFamily()
      return grouped.should.eql([
        { name: "Colors", genes: [this.brown, this.purple] },
        { name: "Shapes", genes: [this.round, this.squiggly] },
      ])
    })

    return it("sorts each group of genes alphabetically", function () {
      const genes = new Genes([this.green, this.purple, this.brown])
      const grouped = genes.groupByFamily()
      return grouped[0].genes.should.eql([this.brown, this.green, this.purple])
    })
  })
})
