cheerio = require 'cheerio'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../../models/artwork'

render = ->
  filename = path.resolve __dirname, "../template.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fillwidth row', ->
  describe 'artwork with a partner', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork', { partner: name: 'House of Bitty' }]
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )

    it 'correctly renders and displays the partner name', ->
      @template.should.containEql 'House of Bitty'

  describe 'artwork with a partner', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork']
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )

    it 'correctly renders and displays the partner name', ->
      @template.should.containEql 'Gagosian'
