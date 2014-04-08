_                 = require 'underscore'
sd                = require('sharify').data
Backbone          = require 'backbone'
Edition           = require './edition.coffee'
AdditionalImage   = require './additional_image.coffee'

{ Image, Dimensions, Markdown } = require 'artsy-backbone-mixins'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Dimensions
  _.extend @prototype, Markdown

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/artwork"
  bidSuccessUrl: -> "#{@href()}/confirm-bid"

  initialize: ->
    # Defer Post model require to prevent circular dependency
    @relatedPosts = new Backbone.Collection [], model: require('./post.coffee')
    @relatedPosts.url = "#{sd.ARTSY_URL}/api/v1/related/posts"
    @setupRelatedCollections()

  fetchRelatedPosts: (options = {}) ->
    @relatedPosts.fetch _.extend
      remove: false
      data: _.extend (options.data ? {}), 'artwork[]': @id
    , options

  parse: (response, options) ->
    @editions   = new Backbone.Collection response?.edition_sets, model: Edition
    @setImagesCollection response?.images

    @setDefaultImage()

    response

  setImagesCollection: (images) ->
    @images = new Backbone.Collection images, model: AdditionalImage, comparator: 'position'

  # Ensure the default image is the first image
  setDefaultImage: ->
    @defaultImage().set 'position', 0
    @images?.sort silent: true

  defaultImage: ->
    # Create an images collection if one doesn't already exist (example: artworks in a post)
    if @get('images') and not @images
      @setImagesCollection @get('images')

    # Blank additionalImage is to handle works without images
    @images?.findWhere(is_default: true) or @images?.first() or new AdditionalImage()

  hasAdditionalImages: ->
    @images?.length > 1

  # return {Array} images without the default image
  additionalImages: ->
    @images?.reject (image) =>
      image.id is @defaultImage().id

  setActiveImage: (id) ->
    @__activeImage__ = @images.findWhere id: id

  activeImage: ->
    @__activeImage__ ?= @defaultImage()

  defaultImageUrl: (version = 'medium') ->
    @defaultImage().imageUrl version

  isSaved: (artworkCollection) ->
    artworkCollection and artworkCollection.isSaved(@)

  # Can the user download the default image
  #
  # return {Boolean}
  isDownloadable: ->
    @defaultImage().get('downloadable')

  downloadableFilename: ->
    _.slugify @toOneLine()

  # Are there comparable artworks;
  # such that we can display a link to auction results
  #
  # return {Boolean}
  isComparable: ->
    (@get('comparables_count') > 0) and (@get('category') isnt 'Architecture')

  # Can we display a price?
  #
  # return {Boolean}
  isPriceDisplayable: ->
    (@has('price')) and
    not @isMultipleEditions() and
    (@get('inquireable') or @get('sold')) and
    not @isUnavailableButInquireable() and
    @get('sale_message') isnt 'Contact For Price'

  # Should we render a full set of editions,
  # as opposed to a single string? (See: #editionStatus)
  #
  # return {Boolean}
  isMultipleEditions: ->
    @get('edition_sets')?.length > 1

  # Is the work two-dimensional and can be
  # used in conjunction with 'View in Room'?
  #
  # return {Boolean}
  isHangable: ->
    return false if @get('category')?.match /sculpture|installation|design/i
    return false if @hasDimension('depth')
    return true  if @hasDimension('width') and @hasDimension('height') # and @dimensions(metric: 'in', format: 'decimal') < 600 # todo
    return true  if @hasDimension('diameter')

    false

  # Should we include a button to contact the partner?
  #
  # return {Boolean}
  isContactable: ->
    @get('forsale') and @has('partner') and not @get('acquireable')

  # The work is not for sale but a buyer may be interested
  # in related works
  #
  # return {Boolean}
  isUnavailableButInquireable: ->
    not @get('forsale') and @get('inquireable') and not @get('sold')

  isEditionAcquireable: (edition) ->
    edition.get('forsale') and
    edition.get('acquireable') and
    @get('acquireable')

  # Assuming there is something *vaguely* numeric here
  # this will return true
  #
  # return {Boolean}
  hasDimension: (attr) ->
    parseFloat(@get(attr)) > 0

  # Can the more info toggle be displayed?
  #
  # return {Boolean}
  hasMoreInfo: ->
    not _.isEmpty(@get('provenance')) or
    not _.isEmpty(@get('exhibition_history')) or
    not _.isEmpty(@get('signature')) or
    not _.isEmpty(@get('additional_information')) or
    not _.isEmpty(@get('literature'))

  contactLabel: ->
    if @get('partner')?.type is 'Gallery' then 'Contact Gallery' else 'Contact Seller'

  hasCollectingInstitution: ->
    @get('collecting_institution')?.length > 0

  partnerName: ->
    if @hasCollectingInstitution()
      @get('collecting_institution')
    else if @has 'partner'
      @get('partner').name
    else
      ''

  priceLabel: ->
    if @get('sold') then 'Sold' else 'Price:'

  # If the price is hidden, contact for price.
  # Fallback on the sale message as well,
  # sometimes this will be 'Contact for Price'
  # without the price_hidden attribute being set
  #
  # return {String}
  priceDisplay: ->
    if (@get('availability') is 'for sale') and @get('price_hidden')
      'Contact For Price'
    else
      @get('price') or ((@get('sale_message') unless @get('sale_message') is 'Sold'))

  inquiryMicroCopy: ->
    if @isUnavailableButInquireable()
      'Interested in related works?'
    else if @get('acquireable')
      'Questions about this work?'

  artworkPageSaleMessage: ->
    if @isUnavailableButInquireable()
      'Work is Not for Sale'
    else
      @get('sale_message')

  # For edition sets larger than 1 we render the full list,
  # otherwise this string is displayed
  #
  # return {String}
  editionStatus: ->
    if @get('unique')
      'Unique'
    else if @editions?.length is 1
      @editions.first().get('editions')

  href: ->
    "/artwork/#{@id}"

  partnerLink: ->
    partner = @get 'partner'
    return unless partner
    if partner.default_profile_public and partner.default_profile_id
      return "/#{partner.default_profile_id}"
    if partner.website?.length > 0
      return partner.website

  partnerLinkTarget: ->
    if @get('partner').linkType() is 'external' then '_blank' else '_self'

  artistLink: ->
    "/artist/#{@get('artist').id}"

  getTitle: ->
    if @get('title') then @get('title') else '(Untitled)'

  titleAndYear: ->
    _.compact([
      if @get('title')? and @get('title').length > 0 then "<em>#{@get('title')}</em>" else '',
      @get('date')
    ]).join(", ")

  toAltText: ->
    _.compact([
      @get('title'),
      @get('date'),
      (if @get('artist')?.name then "by #{@get('artist')?.name}" else undefined)
    ]).join(", ")

  toTitleWithDate: ->
    _.compact([
      @get('title'),
      (if @get('date') then "(#{@get('date')})" else undefined),
    ]).join(" ")

  toTitleWithDateForSale: ->
    _.compact([
      @toTitleWithDate()
      (if @get('forsale') then 'Available for Sale' else undefined)
    ]).join(", ")

  toPageTitle: ->
    _.compact([
      @get('artist')?.name
      @toTitleWithDateForSale()
      "Artsy"
    ]).join(" | ")

  # same as .to_s in Gravity
  toOneLine: ->
    _.compact([
      @get('artist')?.name
      @toTitleWithDate()
    ]).join(" ")

  toAuctionResultsPageTitle: ->
    _.compact([
      (if @get('artist')?.name then "#{@get('artist').name}#{if @get('title') then ',' else ''}" else undefined)
      @toTitleWithDate()
      (if @get('artist')?.name or @get('title') then "| Related Auction Results" else "Related Auction Results")
      "| Artsy"
    ]).join(" ")

  titleByArtist: ->
    _.compact([
      @getTitle()
      @get('artist')?.name
    ]).join(' by ')

  partnerDescription: ->
    return undefined unless @get('partner')?.name
    if @get('forsale') then "Available for sale from #{@get('partner').name}" else "From #{@get('partner').name}"

  # for meta descriptions
  toPageDescription: ->
    _.compact([
      @partnerDescription()
      (if @get('artist')?.name then @get('artist').name else undefined)
      @toTitleWithDate()
      @get('medium')
      @dimensions()
    ]).join(", ")

  # for meta descriptions
  toAuctionResultsPageDescription: ->
    "Related auction results for #{@toPageDescription()}"

  saleMessage: ->
    return undefined if @get('sale_message') is 'Contact For Price'
    if @get('sale_message')?.indexOf('Sold') > - 1
      _.compact([
        "<span style='letter-spacing: 1px;'>SOLD</span>"
        @get('price')
      ]).join(' &ndash; ')
    else
      @get 'sale_message'

  salePrice: (isAuction = false) ->
    @saleMessage() if @saleMessage() and not isAuction

  noPinAttr: ->
    if @get('can_share_image') then undefined else "nopin"

  showMoreInfo: ->
    not _.isFunction @saleMessage

  # Sets up related collections and makes them available
  # under an object so we can access/iterate over them later
  #
  # e.g. @relatedCollections['sales'] # => Backbone.Collection
  setupRelatedCollections: ->
    @relatedCollections = _.reduce ['sales', 'fairs', 'features', 'shows'], (memo, aspect) =>
      memo[aspect] = @[aspect] = new Backbone.Collection
      @[aspect].url = "#{sd.ARTSY_URL}/api/v1/related/#{aspect}?artwork[]=#{@id}"
      @[aspect].kind = aspect
      memo
    , {}

  fetchRelatedCollections: (options = {}) ->
    _.map @relatedCollections, (collection) ->
      collection.fetch options
