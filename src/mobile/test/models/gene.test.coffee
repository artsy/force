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
