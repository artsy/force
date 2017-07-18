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
  console.log artwork
  html = render('index')(
    artwork: artwork
    sd: sd
    asset: (->)
    helpers:
      partner_stub:
        contacts: sinon.stub()
        location: sinon.stub()
        artistIds: sinon.stub()
  )

################## need to stub locations
# (this isn't a working spec and i should delete it probably)