_ = require 'underscore'
$ = require 'cheerio'
benv = require 'benv'
jade = require 'jade'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'

templates =
  overlay: jade.compileFile(require.resolve '../templates/overlay.jade')

describe 'templates', ->
  before (done) ->
    benv.setup =>
      @artist = new Artist fabricate 'artist', name: 'Seth Clark', cta_image: thumb: url: 'http://thumb.jpg'
      benv.expose
        sd: AP: 'http://test.test'
      done()

  after ->
    benv.teardown()

  describe 'when there are null cta artists', ->
    beforeEach ->
      @artist.set cta_artists: null
      @data = _.extend {}, { artist: @artist }

    it 'renders correctly', ->
      $template = $(templates.overlay @data)
      $template.find('.artist-page-cta-overlay__feed__items__row').length.should.equal 1
      text = $template.find('.artist-page-cta-overlay__headline').text()
      text.should.equal 'Join Artsy to discover new works by Seth Clark and more artists you love'

  describe 'when there are null cta artists', ->
    beforeEach ->
      @artist.set cta_artists: []
      @data = _.extend {}, { artist: @artist }

    it 'renders correctly', ->
      $template = $(templates.overlay @data)
      $template.find('.artist-page-cta-overlay__feed__items__row').length.should.equal 1
      text = $template.find('.artist-page-cta-overlay__headline').text()
      text.should.equal 'Join Artsy to discover new works by Seth Clark and more artists you love'

  describe 'when there are some cta artists', ->
    beforeEach ->
      @artist.set cta_artists: [{ name: 'Drew Conrad', image: { thumb: { url: 'http://thumb1.jpg' } } }]
      @data = _.extend {}, { artist: @artist }

    it 'renders correctly', ->
      $template = $(templates.overlay @data)
      $template.find('.artist-page-cta-overlay__feed__items__row').length.should.equal 2
      text = $($template.find('.artist-page-cta-overlay__feed__items__row__artist-info')[1]).text()
      text.should.equal '3 New WorksTodayDrew Conrad'
