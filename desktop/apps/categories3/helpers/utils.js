import _ from 'underscore'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => gene.name)
