_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
sinon = require 'sinon'
Backbone = require 'backbone'
helpers = require '../helpers.coffee'
inAuctionArtwork = require '../../../test/fixtures/in_auction_artwork.json'

render = (templateName) ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

renderArtwork = (artworkOptions = {}, sdOptions = {}) ->
  artwork = _.clone inAuctionArtwork.artwork
  _.extend artwork, artworkOptions
  sd = _.extend { CLIENT: artwork: artwork }, sdOptions

  html = render('index')(
    artwork: artwork
    sd: sd
    asset: (->)
  )

describe 'actions template', ->
  describe 'auction artwork', ->
    it 'renders a favorite button if artwork is in a closed auction', ->
      html = renderArtwork { sale: {is_closed: true} }
      $ = cheerio.load(html)
      $('.artwork-actions .artwork-action--watch-lot').should.have.lengthOf 0
    it 'renders a watch lot button if artwork is in a not-closed auction', ->
      html = renderArtwork { sale: {is_closed: false} }
      $ = cheerio.load(html)
      $('.artwork-actions .artwork-action--watch-lot').should.have.lengthOf 1

  describe 'not auction artwork', ->
    it 'does render a favorite button if artwork is not in an auction', ->
      html = renderArtwork { sale: null }
      $ = cheerio.load(html)
      $('.artwork-actions .artwork-action--save i').should.have.lengthOf 1



