import _ from 'underscore'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => (gene.display_name || gene.name))

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  return _.find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}
