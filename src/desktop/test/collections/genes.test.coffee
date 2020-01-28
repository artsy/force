Gene = require '../../models/gene'
Genes = require '../../collections/genes'
{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'

describe 'Genes', ->

  beforeEach ->

    @brown = new Gene fabricate 'gene', family: { id: 'colors', name: 'Colors' }, id: 'brown', name: 'Brown'
    @purple = new Gene fabricate 'gene', family: { id: 'colors', name: 'Colors' }, id: 'purple', name: 'Purple'
    @green = new Gene fabricate 'gene', family: { id: 'colors', name: 'Colors' }, id: 'green', name: 'Green'
    @round = new Gene fabricate 'gene', family: { id: 'shapes', name: 'Shapes' }, id: 'round', name: 'Round'
    @squiggly = new Gene fabricate 'gene', family: { id: 'shapes', name: 'Shapes' }, id: 'squiggly', name: 'Squiggly'

  describe '#groupByFamily', ->

    it 'groups genes by gene family"', ->
      genes = new Genes [ @brown, @purple, @round, @squiggly ]
      grouped = genes.groupByFamily()
      grouped.should.eql [
        { name: 'Colors', genes: [ @brown, @purple ] },
        { name: 'Shapes', genes: [ @round, @squiggly ] }
      ]

    it 'sorts each group of genes alphabetically', ->
      genes = new Genes [ @green, @purple, @brown ]
      grouped = genes.groupByFamily()
      grouped[0].genes.should.eql [ @brown, @green, @purple ]
