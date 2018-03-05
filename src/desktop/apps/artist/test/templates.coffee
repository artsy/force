_ = require 'underscore'
jade = require 'jade'
fs = require 'fs'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Nav = require '../nav'
artistJSON = require './fixtures'
helpers = require '../view_helpers'

describe 'Artist header', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  describe 'artist with some artworks', ->
    before (done) ->
      @artist = artistJSON
      @nav = new Nav artist: @artist

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        viewHelpers: helpers
        showSections:
          header: true
          info: true
      }, done

    it 'should not display the no works message if there is more than 0 artworks', ->
      @artist.statuses.artworks.should.be.true()
      $('body').html().should.not.containEql "There are no #{@artist.name} works on Artsy yet."

    it 'should not display an auction results link', ->
      $('body').html().should.not.containEql 'artist-auction-results-link'

    it 'renders the appropriate nav', ->
      $navLinks = $('.garamond-bordered-tablist a')
      $navLinks.length.should.equal 7
      $navLinks.text().should.containEql ('Related Artists')
      $navLinks.text().should.containEql ('CV')
      $navLinks.text().should.containEql ('Overview')
      $navLinks.text().should.containEql ('Works')
      $navLinks.text().should.containEql ('Articles')
      $navLinks.text().should.containEql ('Auction Results')
      $navLinks.text().should.containEql ('Shows')

  describe 'artist with some artworks (on the overview page)', ->
    beforeEach (done) ->
      @artist = artistJSON
      @nav = new Nav artist: @artist

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        viewHelpers: helpers
        showSections:
          header: true
          info: true
      }, done

    it 'should not display the no works message if there is more than 0 artworks', ->
      @artist.statuses.artworks.should.be.true()
      $('body').html().should.not.containEql "There are no #{@artist.name} works on Artsy yet."

    it 'renders the appropriate nav', ->
      $navLinks = $('.garamond-bordered-tablist a')
      $navLinks.length.should.equal 7
      $navLinks.text().should.containEql ('Related Artists')
      $navLinks.text().should.containEql ('CV')
      $navLinks.text().should.containEql ('Overview')
      $navLinks.text().should.containEql ('Works')
      $navLinks.text().should.containEql ('Articles')
      $navLinks.text().should.containEql ('Auction Results')
      $navLinks.text().should.containEql ('Shows')

    it 'should display an artworks section with artworks', ->
      $('body').html().should.containEql 'artwork-section'


  describe 'artist with no artworks (on the overview page)', ->
    beforeEach (done) ->
      @artist = _.clone artistJSON
      @artist.statuses = _.clone artistJSON.statuses
      @artist.statuses.artworks = false
      @nav = new Nav artist: @artist

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        viewHelpers: helpers
        showSections:
          header: true
          info: true
      }, done

    it 'should display the no works message if there are no artworks', ->
      @artist.statuses.artworks.should.be.false()
      $('body').html().should.containEql "There are no #{@artist.name} works on Artsy yet."

    it 'renders the appropriate nav', ->
      $navLinks = $('.garamond-bordered-tablist a')
      $navLinks.length.should.equal 6
      $navLinks.text().should.containEql ('Related Artists')
      $navLinks.text().should.containEql ('CV')
      $navLinks.text().should.containEql ('Overview')
      $navLinks.text().should.not.containEql ('Works')
      $navLinks.text().should.containEql ('Articles')
      $navLinks.text().should.containEql ('Auction Results')
      $navLinks.text().should.containEql ('Shows')

    it 'should display an artworks section with artworks', ->
      $('body').html().should.not.containEql 'artwork-section'
