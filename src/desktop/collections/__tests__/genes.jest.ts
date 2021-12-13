import { fabricate } from "@artsy/antigravity"
const { Gene } = require("../../models/gene")
const { Genes } = require("../genes")

describe("Genes", () => {
  let brown
  let purple
  let green
  let round
  let squiggly

  beforeEach(() => {
    brown = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "brown",
        name: "Brown",
      })
    )
    purple = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "purple",
        name: "Purple",
      })
    )
    green = new Gene(
      fabricate("gene", {
        family: { id: "colors", name: "Colors" },
        id: "green",
        name: "Green",
      })
    )
    round = new Gene(
      fabricate("gene", {
        family: { id: "shapes", name: "Shapes" },
        id: "round",
        name: "Round",
      })
    )
    squiggly = new Gene(
      fabricate("gene", {
        family: { id: "shapes", name: "Shapes" },
        id: "squiggly",
        name: "Squiggly",
      })
    )
  })

  describe("#groupByFamily", () => {
    it('groups genes by gene family"', () => {
      const genes = new Genes([brown, purple, round, squiggly])
      const grouped = genes.groupByFamily()
      grouped.should.eql([
        { genes: [brown, purple], name: "Colors" },
        { genes: [round, squiggly], name: "Shapes" },
      ])
    })

    it("sorts each group of genes alphabetically", () => {
      const genes = new Genes([green, purple, brown])
      const grouped = genes.groupByFamily()
      grouped[0].genes.should.eql([brown, green, purple])
    })
  })
})
