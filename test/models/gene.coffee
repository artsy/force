_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Gene = require '../../models/gene.coffee'
sinon = require 'sinon'

describe "Gene", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @gene = new Gene(fabricate 'gene')

  afterEach ->
    Backbone.sync.restore()

  describe '#isSubjectMatter', ->

    it 'returns true if there is a Subject Matter property', ->
      @gene.set type: { properties: [{ value: 'Subject Matter' }] }
      @gene.isSubjectMatter()