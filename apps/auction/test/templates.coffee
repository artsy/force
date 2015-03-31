_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
Feature = require '../../../models/feature'
Profile = require '../../../models/profile'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
OrderedSets = require '../../../collections/ordered_sets'

describe 'auction templates', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'

      data =
        sd: {}
        asset: ->
        auction: @auction = new Auction fabricate 'auction'
        feature: @feature = new Feature fabricate 'feature', name: 'An Auction'
        profile: @profile = new Profile fabricate 'profile'
        artworks: @artworks = new Artworks _.times 2, -> fabricate 'artwork'
        saleArtworks: @saleArtworks = new SaleArtworks _.times 2, -> fabricate 'sale_artwork'
        user: @user = new CurrentUser
        sets: @sets = new OrderedSets

      benv.render resolve(__dirname, '../templates/index.jade'), data, =>
        done()

  after ->
    benv.teardown()

  describe 'index', ->
    xit 'renders correctly', ->
      $('.auction-title').text().should.equal 'An Auction'
      $('.js-register-button').text().should.equal 'Register to bid'
      $('.auction-grid-artwork').should.have.lengthOf 2
