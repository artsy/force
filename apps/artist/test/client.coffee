benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
sinon = require 'sinon'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'

describe 'ArtistView', ->
  
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    benv.render '../template.jade', {
      sd: {}
      artist: new Artist fabricate 'artist'
    }, =>
      { ArtistView, @init } = mod = rewire '../client'
      mod.__set__ 'FillwidthView', @fillwidthViewStub = sinon.stub()
      mod.__set__ 'BlurbView', @blurbStub = sinon.stub()
      @view = new ArtistView
        el: $ 'body'
        model: new Artist fabricate 'artist'
      done()

  describe '#initialize', ->

    it 'sets up fillwidth views with collections pointing to for sale and not for sale works', ->
      view1Opts = @fillwidthViewStub.args[0][0]
      view2Opts = @fillwidthViewStub.args[1][0]
      view1Opts.fetchOptions['filter[]'].should.equal 'for_sale'
      view2Opts.fetchOptions['filter[]'].should.equal 'not_for_sale'
      view1Opts.collection.url.should.include '/artworks'
      view2Opts.collection.url.should.include '/artworks'

    it 'sets up the blurb view if there is one', ->
      viewBlurbOpts = @blurbStub.args[0][0]
      viewBlurbOpts.updateOnResize.should.equal true
      viewBlurbOpts.lineCount.should.equal 6
      @view.$el.html().should.include @view.model.get('blurb')