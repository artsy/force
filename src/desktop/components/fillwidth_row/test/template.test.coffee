cheerio = require 'cheerio'
pug = require 'pug'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'

render = ->
  filename = path.resolve __dirname, "../template.pug"
  pug.compile(
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
