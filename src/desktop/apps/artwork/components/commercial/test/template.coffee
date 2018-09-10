_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
sinon = require 'sinon'
Backbone = require 'backbone'
helpers = require '../helpers.coffee'
inquireableArtwork = (require '../../../test/fixtures/inquireable_artwork.json').data.artwork
acquireableArtwork = (require '../../../test/fixtures/acquireable_artwork.json').data.artwork
render = (templateName) ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

renderArtwork = ({ artwork = {}, artworkOptions = {}, sdOptions = {}, templateOptions = {} }) ->
  artworkConfig = {}
  _.extend artworkConfig, artwork, artworkOptions
  sd = _.extend { CLIENT: artwork: artworkConfig }, sdOptions

  config =
    artwork: artworkConfig
    sd: sd
    asset: (->)
    helpers:
      partner_stub:
        contacts: sinon.stub()
        location: sinon.stub()
        artistIds: sinon.stub()
      commercial:
        isWithConsignableArtists: sinon.stub()

  _.extend config, templateOptions

  html = render('index') config

describe 'Commercial template', ->

  it 'name and password display for prequalified work', ->
    html = renderArtwork
      artwork: inquireableArtwork
      artworkOptions:
        partner:
          is_pre_qualify: true
    $ = cheerio.load(html)
    $('input[name=email]').length.should.eql 1

  it 'correctly displays on loan without pricing info', ->
    html = renderArtwork
      artwork: inquireableArtwork
      artworkOptions:
        availability: 'on loan'
        sale_message: 'On loan'
        price: '$5,000'
    $ = cheerio.load(html)
    $('.artwork-commercial__sale-message').text().should.eql 'On loan'
    $('.artwork-commercial__shipping-info').length.should.eql 0

  it 'correctly displays permanent collection without pricing info', ->
    html = renderArtwork
      artwork: inquireableArtwork
      artworkOptions:
        availability: 'permanent collection'
        price: '$5,000'
    $ = cheerio.load(html)
    $('.artwork-commercial__sale-message').text().should.eql 'Permanent collection'
    $('.artwork-commercial__shipping-info').length.should.eql 0

  it 'shows the buy button when ecommerce and the buy now flow lab feature are enabled', ->
    html = renderArtwork
      artwork: acquireableArtwork
      templateOptions:
        user:
          hasLabFeature: (feature) -> feature == "New Buy Now Flow"
    $ = cheerio.load html
    $('.js-artwork-acquire-button').length.should.eql 1

  it 'does not show the buy button when the buy now flow lab feature is disabled', ->
    html = renderArtwork
      artwork: acquireableArtwork
    $ = cheerio.load html
    $('.js-artwork-acquire-button').length.should.eql 0

  it 'shows the buy button when ecommerce and the partner is an auction partner', ->
    html = renderArtwork
      artwork: acquireableArtwork
      artworkOptions:
        partner:
          type: 'Auction'
    $ = cheerio.load html
    $('.js-artwork-acquire-button').length.should.eql 1


