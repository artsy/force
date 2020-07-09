import {
  alphabetizeGenes,
  featuredGenesForFamily,
  geneFamiliesFromConnection,
} from "../utils"

describe("#alphabetizeGenes", () => {
  it("alphabetizes genes by name", () => {
    const genes = [
      {
        id: "gold",
        name: "Gold",
      },
      {
        id: "copper",
        name: "Copper",
      },
    ]
    const result = alphabetizeGenes(genes)
    result[0].id.should.eql("copper")
    result[1].id.should.eql("gold")
  })

  it("it prefers display names when available", () => {
    const genes = [
      {
        id: "gold",
        name: "Gold",
        display_name: "Bigly Gold",
      },
      {
        id: "copper",
        name: "Copper",
      },
    ]

    const result = alphabetizeGenes(genes)

    result[0].id.should.eql("gold")
    result[1].id.should.eql("copper")
  })
})

describe("#geneFamiliesFromConnection", () => {
  it("maps the connection to a simple list of gene families", () => {
    const dataFromGeneFamilyConnection = {
      gene_families: {
        edges: [
          {
            node: {
              id: "subject-matter",
              name: "Subject Matter",
            },
          },
          {
            node: {
              id: "styles-and-movements",
              name: "Styles and Movements",
            },
          },
        ],
      },
    }

    const expectedFamilies = [
      {
        id: "subject-matter",
        name: "Subject Matter",
      },
      {
        id: "styles-and-movements",
        name: "Styles and Movements",
      },
    ]

    const result = geneFamiliesFromConnection(dataFromGeneFamilyConnection)
    result.should.deepEqual(expectedFamilies)
  })
})
