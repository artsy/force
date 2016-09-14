_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
sinon = require 'sinon'
Backbone = require 'backbone'
helpers = require '../helpers.coffee'
inquireableArtwork = require './fixtures/inquireable.json'

render = (templateName) ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

renderArtwork = (artworkOptions = {}, sdOptions = {}) ->
  artwork = _.extend(inquireableArtwork.data.artwork, artworkOptions)
  sd = _.extend { CLIENT: artwork: artwork }, sdOptions

  html = render('index')(
    artwork: artwork
    sd: sd
    asset: (->)
    helpers:
      partner_stub:
        contacts: sinon.stub()
        location: sinon.stub()
      commercial:
        isWithConsignableArtists: sinon.stub()
  )

describe 'Commercial template', ->

  it 'name and password display for prequalified work (with forced log in test result as "forced_login")', ->
    html = renderArtwork { partner: is_pre_qualify: true }, { FORCE_INQUIRY_LOGIN: 'forced_login' }
    $ = cheerio.load(html)
    $('input[name=email]').length.should.eql 1

  it 'does not display name and password for prequalified work (with forced log in test result as default)', ->
    html = renderArtwork { partner: is_pre_qualify: true }, { FORCE_INQUIRY_LOGIN: 'default' }
    $ = cheerio.load(html)
    $('input[name=email]').length.should.eql 0


