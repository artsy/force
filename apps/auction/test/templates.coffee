_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
Profile = require '../../../models/profile'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
Articles = require '../../../collections/articles'
State = require '../../../components/auction_artworks/models/state'

describe 'auction templates', ->
  before ->
    @baseData =
      sd: {}
      asset: ->
      artworks: @artworks = new Artworks _.times 2, -> fabricate 'artwork'
      saleArtworks: @saleArtworks = new SaleArtworks _.times 2, -> fabricate 'sale_artwork'
      articles: @articles = new Articles
      user: @user = new CurrentUser
      state: @state = new State

  describe 'default auction', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction'

        benv.render resolve(__dirname, '../templates/index.jade'), data, =>
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-sub-header').should.have.lengthOf 0
        $('.auction-title').text().should.equal 'An Auction'
        $('.js-register-button').text().should.equal 'Register to bid'
        $('.auction-grid-artwork').should.have.lengthOf 2
        $('.garamond-tab').should.have.lengthOf 6

  describe 'auction promo', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction Promo', sale_type: 'auction promo'

        benv.render resolve(__dirname, '../templates/index.jade'), data, =>
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-sub-header').text().should.equal 'Sale Preview'
        $('.auction-title').text().should.equal 'An Auction Promo'
        $('.js-register-button').should.have.lengthOf 0
        $('.auction-grid-artwork').should.have.lengthOf 2
        $('.garamond-tab').should.have.lengthOf 2
        $('.auction-header-metadata-cell')
          .text().should.containEql 'This is a sale preview. Bidding for this auction does not take place on Artsy'
