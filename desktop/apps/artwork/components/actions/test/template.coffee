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
  artwork = _.clone inAuctionArtwork.data.artwork
  _.extend artwork, artworkOptions
  sd = _.extend { CLIENT: artwork: artwork }, sdOptions

  html = render('index')(
    artwork: artwork
    sd: sd
    asset: (->)
  )

describe 'actions template', ->
  it 'renders a save button if artwork is not in auction', ->
    html = renderArtwork { is_in_auction: false }
    $ = cheerio.load(html)
    $('.artwork-actions .artwork-action--save').should.have.lengthOf 1
  it 'does not render a save button if artwork is in auction', ->
    html = renderArtwork { is_in_auction: true }
    $ = cheerio.load(html)
    $('.artwork-actions .artwork-action--save').should.have.lengthOf 0


