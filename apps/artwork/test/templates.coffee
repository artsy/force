_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Artwork = require '../../../models/artwork'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork', ->
  describe 'index template', ->
    after -> benv.teardown()

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        @sd =
          CANONICAL_MOBILE_URL: 'http://localhost:5000'
          API_URL: 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
        @artwork = new Artwork (fabricate 'artwork')
        @artist = new Artist (fabricate 'artist')
        done()

    it 'renders without errors', ->
      template = render('index')
        sd: @sd
        artwork: @artwork
        artist: @artist
      @$template = $(template)
      @$template.html().should.containEql @artwork.get('title')
      @$template.html().should.containEql @artist.get('name')

    it 'renders without errors', ->
      template = render('index')
        sd: @sd
        artwork: @artwork
      @$template = $(template)
      @$template.html().should.containEql @artwork.get('title')
