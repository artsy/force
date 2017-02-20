_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
{ Dimensions, Markdown, ArtworkHelpers } = require 'artsy-backbone-mixins'
Artworks = require '../collections/artworks.coffee'
EditionSets = require '../collections/edition_sets.coffee'
Sale = require './sale.coffee'
SaleArtwork = require './sale_artwork.coffee'
Images = require '../collections/images.coffee'
AdditionalImage = require './additional_image.coffee'
Relations = require './mixins/relations/artwork.coffee'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Dimensions
  _.extend @prototype, Markdown
  _.extend @prototype, ArtworkHelpers
  _.extend @prototype, Relations

  urlRoot: ->
    "#{sd.API_URL}/api/v1/artwork"

  href: ->
    "/artwork/#{@id}"

  images: ->
    new Images @get('images')

  defaultImageUrl: (version = 'medium') ->
    @defaultImage().imageUrl(version)

  setImagesCollection: (images) ->
    @images = new Backbone.Collection images, model: AdditionalImage, comparator: 'position'

  defaultImage: ->
    # Blank additionalImage is to handle works without images
    @images().findWhere(is_default: true) or @images?.first?() or new AdditionalImage()

  fetchRelatedArtworks: (options = {}) =>
    artworks = new Artworks
    artworks.url = "#{sd.API_URL}/api/v1/related/layer/" +
                   "synthetic/main/artworks?artwork[]=#{@get 'id'}"
    artworks.fetch options

  showPriceLabel: ->
    (@get('edition_sets')?.length <= 1 and
    (@get('inquireable') or @get('sold'))) or false

  showNotForSaleLabel: ->
    @get('inquireable') and !(@get('availability') in ['sold', 'for sale'])

  editionSets: ->
    new EditionSets @get 'edition_sets'

  partnerHref: ->
    (
      if @get('partner').has_full_profile
        '/' + @get('partner').default_profile_id
      else
        @get('partner').website
    ) or ''

  hasCollectingInstitution: ->
    @get('collecting_institution')?.length > 0

  hasMoreInfo: ->
    [
      @get('provenance')
      @get('exhibition_history')
      @get('signature')
      @get('additional_information')
      @get('literature')
    ].join('').length > 0

  partnerName: ->
    if @hasCollectingInstitution()
      @get('collecting_institution')
    else
      @get('partner').name

  fetchRelatedSales: (options = {}) ->
    new Backbone.Collection(null,
      model: Sale
    ).fetch
      url: "#{sd.API_URL}/api/v1/related/sales?artwork[]=#{@get 'id'}"
      success: options.success

  fetchCurrentSale: (options = {}) ->
    @fetchRelatedSales
      success: (sales) =>
        options.success(sales.models[0])

  fetchSaleArtwork: (sale, options = {}) ->
    new SaleArtwork({ sale: sale, artwork: @}).fetch
      success: options.success

  # Fetches an auction and the sale artwork associated with this artwork.
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  #                         success calls back with (auction, saleArtwork)

  fetchAuctionAndSaleArtwork: (options = {}) ->
    @fetchRelatedSales
      success: (sales) =>
        auction = sales.select((sale) -> sale.get 'is_auction')[0]
        return options.success() unless auction
        @fetchSaleArtwork auction,
          success: (saleArtwork) =>
            options.success auction, saleArtwork
          error: options.error
      error: options.error

  saleMessage: ->
    return undefined if @get('sale_message') is 'Contact For Price'
    if @get('sale_message')?.indexOf('Sold') > - 1
      _.compact(['Sold', @get('price')]).join ' — '
    else
      @get 'sale_message'

  availableForSale: ->
    @get('availability') not in ['not for sale', 'sold', 'on hold']
