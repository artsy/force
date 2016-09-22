sinon = require 'sinon'
Backbone = require 'backbone'

describe 'Genes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    # @articles = new Articles [fixtures.articles]

  afterEach ->
    Backbone.sync.restore()

  describe '#groupByFamily', ->

    it 'groups genes by "gene family"', ->
      'foo'.should.equal 'foo'
