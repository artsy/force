jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork partner template', ->

  describe 'partner with zero follows', ->
    @artwork = fabricate 'artwork'
    @artwork.partner.profile = fabricate('profile', counts: follows: '0 followers')

    @html = render('index')(
      artwork: @artwork
      sd: {}
      helpers: partner: require('../helpers.coffee')
    )

    $ = cheerio.load(@html)

    it 'should not display zero followers count', ->
      $('.artwork-partner__metadata__actions__followers').should.have.lengthOf 0

  describe 'partner with follows', ->
    @artwork = fabricate 'artwork'
    @artwork.partner.profile = fabricate('profile', counts: follows: '1,111 followers')

    @html = render('index')(
      artwork: @artwork
      sd: {}
      helpers: partner: require('../helpers.coffee')
    )

    $ = cheerio.load(@html)

    it 'should display followers count', ->
      $('.artwork-partner__metadata__actions__followers').text().should.equal '1,111 followers'