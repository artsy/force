import {
  alphabetizeGenes,
  featuredGenesForFamily,
  geneFamiliesFromConnection
} from '../utils'

describe('#alphabetizeGenes', () => {
  it('alphabetizes genes by name', () => {
    const genes = [
      {
        id: 'gold',
        name: 'Gold'
      },
      {
        id: 'copper',
        name: 'Copper'
      }
    ]
    const result = alphabetizeGenes(genes)
    result[0].id.should.eql('copper')
    result[1].id.should.eql('gold')
  })

  it('it prefers display names when available', () => {
    const genes = [
      {
        id: 'gold',
        name: 'Gold',
        display_name: 'Bigly Gold'
      },
      {
        id: 'copper',
        name: 'Copper'
      }
    ]

    const result = alphabetizeGenes(genes)

    result[0].id.should.eql('gold')
    result[1].id.should.eql('copper')
  })
})

describe('#featuredGenesForFamily', () => {
  it('pulls out featured genes for the given family', () => {
    const featuredGenesByFamily = [
      {
        name: 'Materials',
        genes: [
          { id: 'aluminum', href: '/gene/aluminum' },
          { id: 'gold', href: '/gene/gold' }
        ]
      },
      {
        name: 'Styles',
        genes: [
          { id: 'impressionism', href: '/gene/impressionism' },
          { id: 'photorealism', href: '/gene/photorealism' }
        ]
      }
    ]

    const result = featuredGenesForFamily('Materials', featuredGenesByFamily)
    result.should.be.of.type.Object
    result.name.should.equal('Materials')
    result.genes[0].id.should.equal('aluminum')
    result.genes[1].id.should.equal('gold')
  })
})

describe('#geneFamiliesFromConnection', () => {
  it("maps the connection to a simple list of gene families", () => {
    const dataFromGeneFamilyConnection = {
      gene_families: {
        edges: [
          {
            node: {
              id: 'subject-matter',
              name: 'Subject Matter'
            }
          },
          {
            node: {
              id: 'styles-and-movements',
              name: 'Styles and Movements'
            }
          }
        ]
      }
    }

    const expectedFamilies = [
      {
        id: 'subject-matter',
        name: 'Subject Matter'
      },
      {
        id: 'styles-and-movements',
        name: 'Styles and Movements'
      }
    ]

    const result = geneFamiliesFromConnection(dataFromGeneFamilyConnection)
    result.should.deepEqual(expectedFamilies)
  })
})
