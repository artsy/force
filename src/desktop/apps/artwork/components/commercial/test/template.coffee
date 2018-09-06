_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
sinon = require 'sinon'
Backbone = require 'backbone'
helpers = require '../helpers.coffee'
inquireableArtwork = require '../../../test/fixtures/inquireable_artwork.json'
render = (templateName) ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

renderArtwork = (artworkOptions = {}, sdOptions = {}) ->
  artwork = _.clone inquireableArtwork.data.artwork
  _.extend artwork, artworkOptions
  sd = _.extend { CLIENT: artwork: artwork }, sdOptions

  html = render('index')(
    artwork: artwork
    sd: sd
    asset: (->)
    helpers:
      partner_stub:
        contacts: sinon.stub()
        location: sinon.stub()
        artistIds: sinon.stub()
      commercial:
        isWithConsignableArtists: sinon.stub()
  )

describe 'Commercial template', ->

  it 'name and password display for prequalified work', ->
    html = renderArtwork { partner: is_pre_qualify: true }
    $ = cheerio.load(html)
    $('input[name=email]').length.should.eql 1

  it 'correctly displays on loan without pricing info', ->
    html = renderArtwork { availability: 'on loan', sale_message: 'On loan', price: '$5,000' }
    $ = cheerio.load(html)
    $('.artwork-commercial__sale-message').text().should.eql 'On loan'
    $('.artwork-commercial__shipping-info').length.should.eql 0

  it 'correctly displays permanent collection without pricing info', ->
    html = renderArtwork { availability: 'permanent collection', price: '$5,000' }
    $ = cheerio.load(html)
    $('.artwork-commercial__sale-message').text().should.eql 'Permanent collection'
    $('.artwork-commercial__shipping-info').length.should.eql 0


