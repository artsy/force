import _ from "underscore"

export const alphabetizeGenes = genes =>
  _.sortBy(genes, gene => gene.display_name || gene.name)

export const geneFamiliesFromConnection = connectionData =>
  connectionData.gene_families.edges.map(edge => edge.node)
