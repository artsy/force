_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artworks = require '../../../../collections/artworks'

describe 'FilterView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterView = require '../../client/filter'
      @view = new FilterView el: $('body')
      done()

  after ->
    benv.teardown()

  describe '#sortArtworks', ->

    it 'sorts least bids by putting sold works after', ->
      @view.setArtworks new Artworks [
        fabricate('artwork', { id: 'a', sold: false, sale_artwork: bidder_positions_count: 1 })
        fabricate('artwork', { id: 'b', sold: true, sale_artwork: bidder_positions_count: 0 })
        fabricate('artwork', { id: 'c', sold: false, sale_artwork: bidder_positions_count: 3 })
        fabricate('artwork', { id: 'd', sold: false, sale_artwork: bidder_positions_count: 0 })
      ]
      @view.sortArtworks('least-bids')
      @view.artworks.pluck('id').join('').should.equal 'dbac'

    it 'sorts by opening bids too', ->
      @view.setArtworks new Artworks [
        fabricate('artwork', { id: 'a', sold: false, sale_artwork: highest_bid_amount_cents: null, opening_bid_cents: 10 })
        fabricate('artwork', { id: 'b', sold: true, sale_artwork: highest_bid_amount_cents: null, opening_bid_cents: 40 })
        fabricate('artwork', { id: 'c', sold: false, sale_artwork: highest_bid_amount_cents: null, opening_bid_cents: 20 })
        fabricate('artwork', { id: 'd', sold: false, sale_artwork: highest_bid_amount_cents: null, opening_bid_cents: 30 })
      ]
      @view.sortArtworks('lowest-bid')
      @view.artworks.pluck('id').join('').should.equal 'acdb'
