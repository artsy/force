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
      @view.$nav.find('[rel="prev"]').text().should.equal 'Posts'
      @view.$nav.find('[rel="next"]').text().should.equal 'Related Artists'
