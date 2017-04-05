_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
CurrentUser = require '../../../../../models/current_user'
{ fabricate, fabricate2 } = require 'antigravity'
{ resolve } = require 'path'
artists = require './fixture'
Helpers = require '../../../helpers'

describe 'ArtworkArtistView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artwork = fabricate('artwork')
    @artwork.artists = artists
    benv.render resolve(__dirname, '../templates/index.jade'), {
      artwork: @artwork
      sd: ARTWORK: @artwork
      _: _
      asset: (->)
      helpers: Helpers
    }, =>
      ArtworkArtistView = rewire '../view.coffee'

      @view = new ArtworkArtistView
        artwork: @artwork
        el: $('.artwork-artist-module')

      done()

  describe '#toggleTabContent', ->

    it 'expands biography tab', ->
      @view.$('.js-aama-accordion-link').filter("[data-id=biography-#{@artwork.artists[0].id}]").first().click()
      @view.$('.aama-tab-content').filter("[data-id=biography-#{@artwork.artists[0].id}]").first().hasClass('is-active').should.equal true

    it 'expands overview tab', ->
      @view.$('.js-aama-accordion-link').filter("[data-id=overview-#{@artwork.artists[0].id}]").first().click()
      @view.$('.aama-tab-content').filter("[data-id=overview-#{@artwork.artists[0].id}]").first().hasClass('is-active').should.equal false
