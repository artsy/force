_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Genes = require '../../../collections/genes'
Gene = require '../../../models/gene'
Artist = require '../../../models/artist'
RelatedGenesView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['genesTemplate']

describe 'RelatedGenesView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'for a gene', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      @gene = new Gene fabricate 'gene', id: 'bitty'
      benv.render resolve(__dirname, '../templates/template.jade'), {
        sd: {}
        gene: new Gene fabricate 'gene'
        genes: []
      }, =>
        $('body').html '<div id="genes"></div>'
        @view = new RelatedGenesView { el: $('#genes'), model: @gene, modelName: 'gene' }
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      beforeEach ->
        @view.initialize({ el: $('body'), model: @gene, modelName: 'gene' })

      it 'makes the right API call', ->
        _.last(Backbone.sync.args)[1].url.should.containEql 'api/v1/search/filtered/gene/bitty/options'

      it 'doesnt render anything if there are no results', ->
        _.last(Backbone.sync.args)[2].success {}
        if @view.$el.find('.related-genes').length
          @view.$el.find('.related-genes').html().should.equal ''
        else
          @view.$el.find('.related-genes').length.should.equal 0

      it 'renders the right content', ->
        genes = {
          'Catitudeness': 'catitudeness'
          'Bittyness': 'bittyness'
        }
        _.last(Backbone.sync.args)[2].success {related_genes: genes}
        @view.$el.html().should.containEql "<a href=\"/gene/catitudeness\">Catitudeness</a>"
        @view.$el.html().should.containEql "<a href=\"/gene/bittyness\">Bittyness</a>"
        @view.$el.find('a').length.should.equal 2
        @view.$el.html().should.containEql 'Related Categories'

  describe 'for an artist', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      @artist = new Artist fabricate 'artist', id: 'bitty'
      benv.render resolve(__dirname, '../templates/template.jade'), {
        sd: {}
        artist: new Artist fabricate 'artist'
        genes: []
      }, =>
        $('body').html '<div id="genes"></div>'
        @view = new RelatedGenesView { el: $('#genes'), model: @artist, modelName: 'artist' }
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      beforeEach ->
        @view.initialize({ el: $('body'), model: @artist, modelName: 'artist' })

      it 'makes the right API call', ->
        _.last(Backbone.sync.args)[1].url.should.containEql '/api/v1/related/genes?artist[]=bitty'

      it 'doesnt render anything if there are no results', ->
        _.last(Backbone.sync.args)[2].success []
        if @view.$el.find('.related-genes').length
          @view.$el.find('.related-genes').html().should.equal ''
        else
          @view.$el.find('.related-genes').length.should.equal 0

      it 'renders the right content', ->
        _.last(Backbone.sync.args)[2].success [
          fabricate 'gene', id: 'catitudeness', name: 'Catitudeness'
          fabricate 'gene', id: 'bittyness', name: 'Bittyness'
        ]
        @view.$el.html().should.containEql "<a href=\"/gene/catitudeness\">Catitudeness</a>"
        @view.$el.html().should.containEql "<a href=\"/gene/bittyness\">Bittyness</a>"
        @view.$el.find('a').length.should.equal 2
        @view.$el.html().should.containEql 'Related Categories'
