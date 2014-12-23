_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
ArtworkHelpers = require '../lib/artwork_helpers'

describe 'ArtworkHelpers Mixin', ->

  beforeEach ->

    class Artwork extends Backbone.Model
       _.extend @prototype, ArtworkHelpers

    @artwork = new Artwork
      comparables_count: 2
      category: 'Painting'
      price: 'exists'
      edition_sets: 0
      inquireable: true
      partner: 'exists'
      sold: false
      forsale: true

  describe "#artwork", ->

    it 'can check if comparable', ->
      @artwork.isComparable().should.equal.true
      @artwork.set('category', 'Architecture')
      @artwork.isComparable().should.equal.false

    it 'can check if artwork price is displayable', ->
      @artwork.isPriceDisplayable().should.equal true
      @artwork.set('sale_message', 'Contact For Price')
      @artwork.isPriceDisplayable().should.equal false

    it 'can check if artwork is unavailable but inquireable', ->
      @artwork.isUnavailableButInquireable().should.equal false

    it 'can check if artwork is contactable', ->
      @artwork.isContactable().should.equal true

    it 'can check if artwork has multiple editions', ->
      @artwork.isMultipleEditions().should.equal false