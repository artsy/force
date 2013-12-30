_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Artist          = require '../../../models/artist'
AuctionLots     = require '../../../collections/auction_lots'
User            = require '../../../models/user'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artist auction lots template', ->
  describe 'Sparse results', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots(_.times(10, (-> fabricate 'auction_result')), { state: { totalRecords: 10 }})
      @template     = render('artist')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
      )

    it 'Displays the <h1>', ->
      @template.should.include @artist.get('name')

    it 'Shows only the number of results and not the number of pages', ->
      @template.should.include '10 Results'
      @template.should.not.include 'Page 1 of'

    it 'Does *not* render the pagination nav', ->
      @template.should.not.include 'pagination'

  describe 'Dense results', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots(_.times(26, (-> fabricate 'auction_result')), { state: { totalRecords: 26 }})
      @template     = render('artist')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
      )

    it 'Shows the number of results and the number of pages', ->
      @template.should.not.include "Page 1 of #{@auctionLots.totalPages}"

    it 'Renders the pagination nav', ->
      @template.should.include 'pagination'

  describe 'Not logged in', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots([fabricate 'auction_result'], { state: { totalRecords: 1 }})
      @template     = render('artist')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
      )

    it 'Displays the sign up link instead of the sale price in the sale column', ->
      @template.should.include 'Sign up to see sale price'

    it 'Should not have a link to sort by sale price', ->
      @template.should.not.include '<a href="?sort=-price_realized_dollar,-auction_date">Sale</a>'

  describe 'Logged in', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots([fabricate 'auction_result'], { state: { totalRecords: 1 }})
      @user         = new User fabricate 'user'
      @template     = render('artist')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
        user: @user
      )

    it 'Does not display the sign up call to action', ->
      @template.should.not.include '<a class="auction-lot-sale-signup">Sign up to see sale price</a>'

    it 'Has a link to sort by sale price', ->
      @template.should.include '<a href="?sort=-price_realized_dollar,-auction_date">Sale Price</a>'
