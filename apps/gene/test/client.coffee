_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Gene = require '../../../models/gene'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'GeneView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: {}
        gene: new Gene fabricate 'gene'
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    { GeneView } = mod = benv.require resolve __dirname, '../client/index.coffee'
    mod.__set__ 'GeneFilter', class @GeneFilter
      initialize: ->
      reset: sinon.stub()
    mod.__set__ 'mediator', @mediator = { trigger: sinon.stub() }
    mod.__set__ 'ArtistFillwidthList', class @ArtistFillwidthList
      fetchAndRender: sinon.stub()
    sinon.stub Backbone, 'sync'
    @view = new GeneView el: $('body'), model: new Gene fabricate 'gene'

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up a share view', ->
      @view.shareButtons.$el.attr('id').should.equal 'gene-share-buttons'

    it 'does not setup artists if the gene is a subject matter gene', ->
      @view.renderArtistFillwidth = sinon.stub()
      @view.model.set type: { name: 'Technique' }
      @view.initialize {}
      @view.renderArtistFillwidth.called.should.not.be.ok

    it 'inits a follow button view', ->
      @view.followButton.model.get('id').should.equal @view.model.get('id')

  describe '#setupArtistFillwidth', ->

    it 'inits a artist fillwidth view', ->
      @view.setupArtistFillwidth()
      Backbone.sync.args[0][2].success [fabricate 'artist', name: 'Andy Foobar']
      @ArtistFillwidthList::fetchAndRender.called.should.be.ok

describe 'GeneFilter', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: {}
        gene: new Gene fabricate 'gene'
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()


  beforeEach ->
    GeneFilter = benv.require resolve(__dirname, '../client/filter.coffee')
    GeneFilter.__set__ 'FilterArtworksView', class @FilterSortCount
      render: sinon.stub()
      params: new Backbone.Model
      reset: sinon.stub()
    sinon.stub Backbone, 'sync'
    @view = new GeneFilter
      el: $('body')
      model: new Gene fabricate 'gene'

  afterEach ->
    Backbone.sync.restore()

  describe '#artworksMode', ->

    it 'sets the state to artwork mode', ->
      @view.artworksMode()
      @view.$el.data('state').should.equal 'artworks'

  describe '#artistMode', ->

    it 'switches back to artist mode', ->
      @view.$el.attr 'data-state', 'artworks'
      @view.artistMode()
      @view.$el.attr('data-state').should.equal 'artists'

  describe '#initialize', ->

    it 'switches to artwork mode when gene is subject matter', ->
      sinon.stub @view, 'artworksMode'
      @view.model.isSubjectMatter = -> true
      @view.initialize()
      @view.artworksMode.called.should.be.ok