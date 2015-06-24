_ = require 'underscore'
benv = require 'benv'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
Profile = require '../../../models/profile'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
Articles = require '../../../collections/articles'
State = require '../../../components/auction_artworks/models/state'
footerItems = require '../footer_items'

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
      footerItems: footerItems

  describe 'default auction', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction'

        benv.render require.resolve('../templates/index.jade'), data, ->
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
        $('.auction-associated-sale').should.have.lengthOf 0

  describe 'auction promo', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction Promo', sale_type: 'auction promo'

        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-sub-header').text().should.equal 'Sale Preview'
        $('.auction-title').text().should.equal 'An Auction Promo'
        $('.js-register-button').should.have.lengthOf 0
        $('.auction-grid-artwork').should.have.lengthOf 2
        $('.garamond-tab').should.have.lengthOf 4
        $('.auction-associated-sale').should.have.lengthOf 0
        $('.auction-header-metadata-cell')
          .text().should.containEql 'This is a sale preview. Bidding for this auction does not take place on Artsy'

  describe 'with associated sale', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction', associated_sale: fabricate 'sale', name: 'An Associated Sale'

        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    it 'renders the associated sale stub as well', ->
      $('.auction-associated-sale').should.have.lengthOf 1
      $('.aas-metadata-title').text().should.equal 'An Associated Sale'
