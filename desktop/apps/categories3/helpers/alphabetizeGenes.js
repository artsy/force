import _ from 'underscore'

export default genes => _.sortBy(genes, gene => gene.name)
