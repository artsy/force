benv = require 'benv'
moment = require 'moment'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
lastModified = benv.requireWithJadeify resolve(__dirname, '../../client/views/last_modified'), ['jsonLdTemplate']

describe 'setupLastModifiedDate', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $('body').html "<div id='artist-related-last-modified'></div>"
      @artist = new Artist fabricate 'artist'
      @artworks = new Backbone.Collection
      @baselineDate = '2014-06-17T20:49:00+00:00'
      done()

  describe 'no relevant data', ->
    it 'displays last modified date as N/A', ->
      lastModified @artist, @artworks
      text = $('.last-modified-section').text()
      text.should.containEql 'Page Last Modified:'
      text.should.containEql 'N/A'

  describe 'relevant data', ->
    beforeEach ->
      @artist.related().shows.add [
        fabricate('show', updated_at: moment(@baselineDate).subtract(2, 'days').format()) # June 15
        fabricate('show', updated_at: moment(@baselineDate).subtract(3, 'days').format()) # June 14
      ]

    it 'displays last modified date the most recent of the dates in the related data', ->
      lastModified @artist, @artworks
      text = $('.last-modified-section').text()
      text.should.containEql 'Page Last Modified:'
      text.should.containEql 'June 15th, 2014'

    it 'sets artist attributes properly', ->
      lastModified @artist, @artworks
      @artist.get('lastModified').should.eql '2014-06-15T20:49:00.000Z'
      @artist.get('createdAt').should.eql '2014-06-14T20:49:00.000Z'