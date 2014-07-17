_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../models/artwork.coffee'
Artworks = require '../../../../collections/artworks.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Featured Links', ->

  beforeEach ->
    @sd =
      API_URL: 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @groups = [
      [
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Matthew Abbott' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Leo Da Vinci' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Pablo Picasso' } }
      ],
      [
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Frank Calloway' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Ellen Eagle' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Andy Warhol' } }
      ]
    ]

  describe 'template', ->

    it 'renders artists names linked to artworks from arrays of artwork models', ->
        $ = cheerio.load render('artists')({ artworkGroups: @groups })
        works = _.flatten @groups, true
        $('.feature-set-item-artist-list').should.have.lengthOf 1
        $('.feature-set-item-artist-list-heading').text().should.equal 'Jump to Artist'
        for work in works
          $(".feature-set-item-artist-link[href='#{work.href()}']").text().should.equal work.get('artist').name
