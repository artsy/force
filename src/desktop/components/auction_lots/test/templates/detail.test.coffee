_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
benv = require 'benv'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'

Artist = require '../../../../models/artist'
AuctionLot = require '../../../../models/auction_lot'
AuctionLots = require '../../../../collections/auction_lots'
Artworks = require '../../../../collections/artworks'
CurrentUser = require '../../../../models/current_user'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Detail auction lots template', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      @lot = new AuctionLot fabricate 'auction_result'
      @artist = new Artist fabricate 'artist', published_artworks_count: 2, forsale_artworks_count: 1
      @artworks = new Artworks [fabricate 'artwork']
      @auctionLots = new AuctionLots _.times(3, -> new AuctionLot fabricate 'auction_result'), state: totalRecords: 1

      benv.render resolve(__dirname, '../../templates/detail.jade'), {
        sd: {}
        lot: @lot
        artist: @artist
        artworks: @artworks
        auctionLots: @auctionLots
        asset: (->)
      }, =>
        @$template = $('body')
        @template = @$template.html()

        done()

  after ->
    benv.teardown()

  it 'has a single h1 tag describing the artist and title', ->
    (h1 = @$template.find('h1')).length.should.equal 1
    h1.text().should.equal 'Pablo Picasso, MADONNA PAINTING — Auction Result'

  it 'has a link to the lot on the external auction site', ->
    @$template.find('.ard-external').text().should.containEql 'Visit the lot on lempertz-online.de'

  it 'has an h3 tag describing the artist available/reference works', ->
    @$template.find('h3.ara-available-works-count').text().should.equal '1 available work & 1 reference work'

  it 'displays more auction results', ->
    $results = @$template.find('.auction-result-more-results')
    $results.find('h2').text().should.equal 'More auction results for Pablo Picasso'
    $results.find('tbody > tr').length.should.equal 3
