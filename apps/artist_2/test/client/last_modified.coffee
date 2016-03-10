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
      @old = {
        "@context": "http://schema.org"
        "@type": "Person"
        additionalType: "Artist"
        gender: 'male'
        birthDate: "1955"
        deathDate: ""
        image: "https://d32dm0rphc51dk.cloudfront.net/Uqad2mGhbNGhAUgb8bUvIA/large.jpg"
        name: "Jeff Koons"
        url: "http://localhost:5000/artist/jeff-koons-1"
      }
      done()

  describe 'no relevant data', ->
    it 'displays last modified date as N/A', ->
      lastModified @old, @artist, @artworks
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
      lastModified @old, @artist, @artworks
      text = $('.last-modified-section').text()
      text.should.containEql 'Page Last Modified:'
      text.should.containEql 'June 15th, 2014'

    it 'generates updated JSONLD', ->
      newJSONLD = lastModified @old, @artist, @artworks
      newJSONLD.should.eql {
        '@context': 'http://schema.org',
        '@type': 'Person',
        additionalType: 'Artist',
        gender: 'male',
        birthDate: '1955',
        deathDate: '',
        image: 'https://d32dm0rphc51dk.cloudfront.net/Uqad2mGhbNGhAUgb8bUvIA/large.jpg',
        name: 'Jeff Koons',
        url: 'http://localhost:5000/artist/jeff-koons-1',
        datePublished: '2014-06-14T20:49:00.000Z',
        dateModified: '2014-06-15T20:49:00.000Z'
      }


