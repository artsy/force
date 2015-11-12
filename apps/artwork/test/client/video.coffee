_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
Artist = require '../../../../models/artist'
Artwork = require '../../../../models/artwork'

describe 'VideoView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
        artist: new Artist fabricate 'artist'
        artwork: @artwork = new Artwork fabricate 'artwork'
        artists: new Backbone.Collection
        asset: (->)
      }, =>
        Backbone.$ = $
        VideoView = require '../../client/video'
        @view = new VideoView
          el: $('<div><div class="artwork-image"></div></div>')
          artwork: @artwork
        done()

  afterEach ->
    benv.teardown()

  describe '#play', ->

    it 'appends a vimeo iframe for vimeo websites', ->
      @artwork.set website: 'http://vimeo.com/foobar'
      @view.render()
      @view.play()
      @view.$el.html().should.containEql 'iframe src="//player.vimeo.com/video/foobar'

    it 'appends a youtube iframe for youtube websites', ->
      @artwork.set website: 'http://youtu.be/foobar'
      @view.render()
      @view.play()
      @view.$el.html().should.containEql 'iframe src="//www.youtube.com/embed/foobar'

