_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
{ ArtistData } = require '../../client/data'
HeaderView = benv.requireWithJadeify resolve(__dirname, '../../client/views/header'), ['navTemplate']

describe 'HeaderView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @model = new Artist fabricate 'artist', id: 'foo-bar'
      @data = new ArtistData model: @model
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}, artist: @model, sortBy: '-published_at'
      }, => done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new HeaderView el: $('#artist-page-header'), model: @model, data: @data
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#navData', ->
    it 'takes in sections then renders URLs and sets active and rels based on the active history fragment', ->
      # Navigate to 'Overview'
      Backbone.history.fragment = 'artist/foo-bar'
      navData = @view.navData @data.sections
      _.findWhere(navData, active: true).name.should.equal 'Overview'
      _.findWhere(navData, rel: 'next').name.should.equal 'Works'
      _.isUndefined(_.findWhere(navData, rel: 'prev')).should.be.true
      # Navigate to 'Posts'
      Backbone.history.fragment = 'artist/foo-bar/posts'
      navData = @view.navData @data.sections
      _.findWhere(navData, active: true).name.should.equal 'Posts'
      _.findWhere(navData, rel: 'prev').name.should.equal 'Works'
      _.findWhere(navData, rel: 'next').name.should.equal 'Shows'

  describe '#updateTags', ->
    before ->
      $('body').prepend @$head = $('<head></head>')

    it 'updates the "next" and "rel" tags', ->
      # Navigate to 'Overview'
      Backbone.history.fragment = 'artist/foo-bar'
      @view.updateHeadTags(@view.navData @view.data.sections)
      @$head.find('link[rel="next"]').length.should.equal 1
      @$head.find('link[rel="prev"]').length.should.equal 0
      @$head.find('link[rel="next"]').attr('href').should.containEql '/artist/foo-bar/works'
      # Navigate to 'Posts'
      Backbone.history.fragment = 'artist/foo-bar/posts'
      @view.updateHeadTags(@view.navData @view.data.sections)
      @$head.find('link[rel="next"]').length.should.equal 1
      @$head.find('link[rel="prev"]').length.should.equal 1
      @$head.find('link[rel="next"]').attr('href').should.containEql '/artist/foo-bar/shows'
      @$head.find('link[rel="prev"]').attr('href').should.containEql '/artist/foo-bar/works'
      # Navigate to 'Related Artists'
      Backbone.history.fragment = 'artist/foo-bar/related-artists'
      @view.updateHeadTags(@view.navData @view.data.sections)
      @$head.find('link[rel="next"]').length.should.equal 0
      @$head.find('link[rel="prev"]').length.should.equal 1
      @$head.find('link[rel="prev"]').attr('href').should.containEql '/artist/foo-bar/shows'

  describe '#renderNav', ->
    beforeEach ->
      @view.data.returns = @view.data.sections

    it 'renders the nav', ->
      Backbone.history.fragment = 'artist/foo-bar/shows'
      @view.renderNav()
      (_.map @view.$nav.find('a'), (el) -> $(el).attr('href')).should.eql [
        '/artist/foo-bar',
        '/artist/foo-bar/works',
        '/artist/foo-bar/posts',
        '/artist/foo-bar/shows',
        '/artist/foo-bar/related-artists'
      ]
      @view.$nav.find('.is-active').text().should.equal 'Shows'
