benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
{ resolve }       = require 'path'
{ fabricate }     = require 'antigravity'
Genes             = require '../../../collections/genes'
Artist            = require '../../../models/artist'
RelatedGenesView  = benv.requireWithJadeify resolve(__dirname, '../client/genes'), ['genesTemplate']

describe 'RelatedGenesView', ->
  
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after -> 
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    artist = new Artist fabricate 'artist', id: 'bitty'
    benv.render resolve(__dirname, '../templates/index.jade'), {
      sd: {}
      artist: new Artist fabricate 'artist'
    }, =>
      @view = new RelatedGenesView { el: $('body'), model: artist }
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'makes the right API call', ->
      Backbone.sync.args[0][1].url.should.equal '/api/v1/related/genes?artist[]=bitty'

    it 'doesnt render anything if there are no results', ->
      Backbone.sync.args[0][2].success []
      @view.$el.find('.artist-related-genes').html().should.equal ''

    it 'renders the right content', ->
      Backbone.sync.args[0][2].success [
        fabricate 'gene', id: 'catitudeness', name: 'Catitudeness'
        fabricate 'gene', id: 'bittyness', name: 'Bittyness'
      ]
      @view.$el.html().should.include "<a data-id=\"catitudeness\" href=\"/gene/catitudeness\">Catitudeness</a>"
      @view.$el.html().should.include "<a data-id=\"bittyness\" href=\"/gene/bittyness\">Bittyness</a>"
      @view.$el.find('a').length.should.equal 2
