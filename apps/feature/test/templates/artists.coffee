_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../models/artwork.coffee'
benv = require 'benv'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Featured Links', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @sd = API_URL: 'http://localhost:5000', ASSET_PATH: 'http://localhost:5000'
    @groups = [[
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Matthew Abbott' } }
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Leo Da Vinci' } }
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Pablo Picasso' } }
    ], [
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Frank Calloway' } }
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Ellen Eagle' } }
      new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Andy Warhol' } }
    ]]

  describe 'template', ->
    it 'renders artists names linked to artworks from arrays of artwork models', ->
      $html = $(render('artists')(artworkGroups: @groups))
      $html.filter('.feature-set-item-artist-list').should.have.lengthOf 1
      $html.find('.feature-set-item-artist-list-heading').text().should.equal 'Jump to Artist'
      for work in _.flatten @groups, true
        $html.find(".feature-set-item-artist-link[href='#{work.href()}']").text().should.equal work.get('artist').name
