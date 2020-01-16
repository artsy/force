_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Gene = require '../../models/gene.coffee'
sinon = require 'sinon'

describe "Gene", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @gene = new Gene(fabricate 'gene')

  afterEach ->
    Backbone.sync.restore()

  describe '#displayName', ->

    it 'returns display name when available', ->
      @gene = new Gene(fabricate 'gene', display_name: 'A different name for display')
      @gene.displayName().should.equal 'A different name for display'


    it 'returns the regular name when no display name is available', ->
      @gene = new Gene(fabricate 'gene', display_name: '')
      @gene.displayName().should.equal @gene.get('name')
      @gene = new Gene(fabricate 'gene', display_name: null)
      @gene.displayName().should.equal @gene.get('name')

  describe '#isSubjectMatter', ->

    it 'checks against the gene type name', ->
      @gene.set type: { name: 'D3 - Photography/Film Technique' }
      @gene.isSubjectMatter().should.be.ok()

  describe '#fetchFilterSuggest', ->

    it 'fetches the filter meta data', (done) ->
      @gene.fetchFilterSuggest { sort: '-foo' }, success: (m, res) ->
        res.total.should.equal 100
        done()
      Backbone.sync.args[0][2].data.sort.should.equal '-foo'
      Backbone.sync.args[0][2].success { total: 100 }

  describe '#familyName', ->

    it 'returns the name of the related GeneFamily', ->
      @gene = new Gene fabricate 'gene', family: { name: 'Materials' }
      @gene.familyName().should.equal 'Materials'
