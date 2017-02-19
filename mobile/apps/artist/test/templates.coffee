jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Auction results', ->

  beforeEach ->
    @locals =
      auctionResults: new Backbone.Collection([fabricate 'auction_result']).models
      sd: { USER_AGENT: '' }
      asset: (->)
      totalCount: 420
      artist: new Artist fabricate('artist', id: 'bitty', name: 'Bitty Z')
      showAuctionLink: true

  it 'renders the prices if coming from the native app', ->
    @locals.sd.USER_AGENT = 'Artsy-Mobile'
    render('auction_results')(@locals).should.containEql 'Est.: €120,000'

  it 'hides the prices from normal logged out users', ->
    render('auction_results')(@locals).should.not.containEql 'Est.: €120,000'

  it 'includes the total count and artist name', ->
    render('auction_results')(@locals).should.containEql 'Bitty Z'
    render('auction_results')(@locals).should.containEql 'Displaying 420 results'

describe 'Main page', ->

  beforeEach ->
    @locals = { sd: {}, asset: (->) }

  it 'renders the bio link if there is a blurb', ->
    @locals.artist = new Artist fabricate('artist', blurb: 'blah')
    render('page')(@locals).should.containEql 'Biography'

  it 'does not render the bio link if there is no blurb', ->
    @locals.artist = new Artist fabricate('artist', blurb: null)
    render('page')(@locals).should.not.containEql 'Biography'

  it 'renders the auction results link if there are any', ->
    @locals.artist = new Artist fabricate('artist')
    @locals.showAuctionLink = true
    render('page')(@locals).should.containEql 'Auction Results'

  it 'does not render the auction results link if there are none', ->
    @locals.artist = new Artist fabricate('artist')
    @locals.showAuctionLink = false
    render('page')(@locals).should.not.containEql 'Auction Results'

describe 'Biography', ->

  beforeEach ->
    @locals = { sd: {}, asset: (->) }

  it 'renders the bio and credit if there is one', ->
    @locals.artist = { hometown: 'Heaven', years: '1995 - 2014', name: 'Bitty', id: 'bitty', biography_blurb: { credit: 'Submitted by Matt', text: 'Bitty was a cat.' } }
    render('biography')(@locals).should.containEql 'Bitty was a cat.'
    render('biography')(@locals).should.containEql 'Submitted by Matt'
  
