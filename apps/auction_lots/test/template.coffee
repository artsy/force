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
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Auction lots template', ->
  describe 'Sparse results', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots(_.times(10, (-> fabricate 'auction_result')), { state: { totalRecords: 10 }})
      @template     = render('template')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
      )

    it 'Displays the <h1>', ->
      @template.should.include "Auction results for #{@artist.get('name')}"

    it 'Shows only the number of results and not the number of pages', ->
      @template.should.include '10 Results'
      @template.should.not.include 'Page 1 of'

    it 'Does *not* render the pagination nav', ->
      @template.should.not.include 'pagination'

  describe 'Dense results', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots(_.times(26, (-> fabricate 'auction_result')), { state: { totalRecords: 26 }})
      @template     = render('template')(
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
      @template     = render('template')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
      )

    it 'Does not display the sale column', ->
      @template.should.not.include '<th>Sale</th>'

    it 'Should have a more specific details link', ->
      @template.should.include 'See sale price & details'

    it 'Should not have a link to sort by sale price', ->
      @template.should.not.include '<a href="?sort=-price_realized_dollar,-auction_date">Sale</a>'

  describe 'Logged in', ->
    beforeEach ->
      @artist       = new Artist fabricate 'artist'
      @auctionLots  = new AuctionLots([fabricate 'auction_result'], { state: { totalRecords: 1 }})
      @user         = new User fabricate 'user'
      @template     = render('template')(
        sd: {}
        artist: @artist
        auctionLots: @auctionLots
        user: @user
      )

    it 'Displays the sale column', ->
      @template.should.include '<th>Sale</th>'

    it 'Has a less specific details link', ->
      @template.should.include 'See details'

    it 'Has a link to sort by sale', ->
      @template.should.include '<a href="?sort=-price_realized_dollar,-auction_date">Sale</a>'
