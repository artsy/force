_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
partner = require './fixture'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork partner templates', ->
  beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with partner', ->
    beforeEach ->
      @artwork.partner = partner

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should display the correct partner type', ->
      @$('.artwork-partner-module__section-title').text().should.equal 'About the Gallery'

    it 'should display the partner name', ->
      @$('.artwork-partner-name').text().should.equal 'Mariane Ibrahim Gallery'

    it 'should display partner biography', ->
      @$('.artwork-partner-module__bio').text().should.equal 'A very elaborate bio about a very prestigious gallery.'

  describe 'artwork with auction partner', ->
    beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with partner', ->
    beforeEach ->
      @artwork.partner = fabricate('partner', { type: 'Auction House' })

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should not display partner module', ->
      @$('.artwork-partner-name').text().should.equal ''
      @$('.artwork-partner-module').should.not.exist
