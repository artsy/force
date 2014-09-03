cheerio = require 'cheerio'
jade = require 'jade'
path = require 'path'
fs = require 'graceful-fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'

render = ->
  filename = path.resolve __dirname, "../template.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fillwidth row', ->
  describe 'artwork with a partner and a collecting institution field', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork', { collecting_institution: 'House of Bitty' }]
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
      @template.should.containEql 'MOMA'

  describe 'artwork with a partner and a collecting institution field', ->
    it 'correctly renders and does not display the partner name', ->
      @artworks = [new Artwork fabricate 'artwork', { collecting_institution: 'House of Bitty', partner: fabricate('partner') }]
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )
      @template.should.containEql 'House of Bitty'

  describe 'artwork with no partner and no collecting institution field', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork', { collecting_institution: '', partner: null }]
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )
    it 'correctly renders and does not display the partner name', ->
      $ = cheerio.load @template
      $('.artwork-item-partner').should.have.lengthOf 0
