_              = require 'underscore'
sd             = require('sharify').data
should         = require 'should'
sinon          = require 'sinon'
{ fabricate }  = require 'antigravity'
Backbone       = require 'backbone'
CurrentUser    = require '../../models/current_user.coffee'
FollowGenes  = require '../../collections/follow_genes'
FollowGene   = require '../../models/follow_gene'
Gene         = require '../../models/gene'

describe 'FollowGenes', ->

  beforeEach ->
    @followGene1 = new FollowGene { id: '111', gene: { id: 'gene-1' } }
    @followGene2 = new FollowGene { id: '222', gene: { id: 'gene-2' } }
    @followGenes = new FollowGenes()
    @followGenes.reset()
    @followGenes.add @followGene1

  describe "#initialize", ->

    it 'binds to add / remove callbacks to proxy model specific event triggers', ->
      onAdd = sinon.spy()
      onRemove = sinon.spy()
      @followGenes.on "add:#{@followGene2.getItem().get('id')}", onAdd
      @followGenes.on "remove:#{@followGene2.getItem().get('id')}", onRemove
      @followGenes.add @followGene2
      @followGenes.remove @followGene2
      onAdd.callCount.should.equal 1
      onRemove.callCount.should.equal 1

  describe "#isFollowing", ->

    it 'returns true if the gene is in this collection', ->
      gene = new Gene @followGene1.getItem()
      @followGenes.isFollowing(gene.id).should.be.true

    it 'returns false if the gene is not in this collection', ->
      gene = new Gene @followGene2.getItem()
      @followGenes.isFollowing(gene.id).should.be.false

  describe "#findByGeneId", ->

    it 'returns a FollowGene model from the collection with an gene id', ->
      geneId = @followGene1.get('gene').id
      followGene = @followGenes.findByItemId geneId
      followGene.should.equal @followGene1

  describe '#syncFollows', ->
    it 'returns without a current user', ->
      fetchSpy = sinon.spy @followGenes, 'fetch'
      @followGenes.syncFollows [@followGene2.getItem().get('id')]
      fetchSpy.callCount.should.equal 0

  describe "with a current user", ->

    beforeEach ->
      @geneId = @followGene2.getItem().get('id')
      sinon.stub Backbone, 'sync'
      sinon.stub CurrentUser, 'orNull', -> new CurrentUser(fabricate('user'))

    afterEach ->
      delete @geneId
      Backbone.sync.restore()
      CurrentUser.orNull.restore()

    describe '#syncFollows', ->

      it 'adds given gene to the collection if the current user follows them', ->
        onAdd = sinon.spy()
        @followGenes.on "add:#{@geneId}", onAdd
        @followGenes.syncFollows [@geneId]
        Backbone.sync.args[0][2].data.genes.should.include @followGene2.getItem().get('id')
        Backbone.sync.args[0][2].success [ @followGene2.attributes ]
        onAdd.callCount.should.equal 1
        @followGenes.should.have.lengthOf 2
        @followGenes.findByItemId(@geneId).get('id').should.equal @followGene2.get('id')

      it 'should not cache the result and retain models', ->
        @followGenes.syncFollows [@geneId]
        Backbone.sync.args[0][2].cache.should.be.false

      it 'should retain the models when fetching', ->
        @followGenes.syncFollows [@geneId]
        Backbone.sync.args[0][2].remove.should.be.false
        Backbone.sync.args[0][2].merge.should.be.true

    describe "#follow", ->

      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @followGenes.on "add:#{@geneId}", onAdd
        @followGenes.follow @geneId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][1].attributes.should.have.keys 'gene_id'
        Backbone.sync.args[0][2].success @followGene2.attributes
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followGenes.should.have.lengthOf 2

    describe "#unfollow", ->

      it 'destroys a follow through the API and updates the collection', ->
        @followGenes.add @followGene2
        @followGenes.should.have.lengthOf 2
        onRemove = sinon.spy()
        onSuccess = sinon.spy()
        @followGenes.on "remove:#{@geneId}", onRemove
        @followGenes.unfollow @geneId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].attributes.should.equal @followGene2.attributes
        Backbone.sync.args[0][2].success @followGene2.attributes
        onRemove.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followGenes.should.have.lengthOf 1
