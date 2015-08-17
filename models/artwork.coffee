_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'q'
sd = require('sharify').data
Backbone = require 'backbone'
Edition = require './edition.coffee'
Partner = require './partner.coffee'
AdditionalImage = require './additional_image.coffee'
{ compactObject } = require './mixins/compact_object.coffee'
{ Image, Dimensions, Markdown } = require 'artsy-backbone-mixins'
Relations = require './mixins/relations/artwork.coffee'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Dimensions
  _.extend @prototype, Markdown
  _.extend @prototype, Relations

  urlRoot: ->
    "#{sd.API_URL}/api/v1/artwork"

  bidSuccessUrl: -> "#{@href()}/confirm-bid"

  initialize: ->
    Articles = require '../collections/articles.coffee'
    @relatedArticles = new Articles
    @relatedArticles.url += "?artwork_id=#{@get '_id'}&published=true"

  parse: (response, options) ->
    @editions = new Backbone.Collection response?.edition_sets, model: Edition
    response

  defaultImage: ->
    @related().images.default() or
    new AdditionalImage

  defaultImageUrl: (version = 'medium') ->
    @defaultImage().imageUrl version

  isSaved: (artworkCollection) ->
    artworkCollection and artworkCollection.isSaved(@)

  # Can the user download the default image
  #
  # return {Boolean}
  isDownloadable: (user) ->
    @defaultImage().get('downloadable') or !!user?.isAdmin()

  downloadableFilename: ->
    _s.slugify(@toOneLine()) + '.jpg'

  downloadableUrl: (user) ->
    if user?.isAdmin()
      "#{@url()}/image/#{@defaultImage().id}/original.jpg"
    else
      @defaultImageUrl 'larger'

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

  # Outputs the [height, width, depth || height, width || diameter] in decimal/inches
  #
  # return {Array}
  normalizedDimensions: ->
    _.map @dimensions(metric: 'in', format: 'decimal').replace('in', '').split(' × '), parseFloat

  # Is any side larger than 600 inches?
  #
  # return {Boolean}
  tooBig: ->
    _.any @normalizedDimensions(), (x) -> x > 600

  # Is the work two-dimensional and can be
  # used in conjunction with 'View in Room'?
  #
  # return {Boolean}
  isHangable: ->
    return false if @get('category')?.match /sculpture|installation|design/i
    return false if @hasDimension('depth')
    return false if @hasDimension('diameter')
    return true if @hasDimension('width') and @hasDimension('height') and not @tooBig()
    false

  # Should we include a button to contact the partner?
  #
  # return {Boolean}
  isContactable: ->
    (@get('forsale') and @has('partner') and not @get('acquireable')) or
    @isPartOfAuctionPromo()

  isPartOfAuctionPromo: ->
    @related().sales.firstAuctionPromo()?

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

  # Can we show more info
  #
  # return {Boolean}
  hasMoreInfo: ->
    not _.isEmpty(@get('blurb')) or
    not _.isEmpty(@get('provenance')) or
    not _.isEmpty(@get('exhibition_history')) or
    not _.isEmpty(@get('signature')) or
    not _.isEmpty(@get('additional_information')) or
    not _.isEmpty(@get('literature'))

  contactLabel: ->
    if @get('partner')?.type is 'Gallery' then 'Gallery' else 'Seller'

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
  # sometimes this will be 'Contact For Price'
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
    return unless partner and partner.type isnt 'Auction'
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
      (if @get('artist')?.name then @get('artist')?.name else undefined)
      (", '#{@get 'title'},' " if @get 'title'),
      ("#{@get 'date'}" if @get 'date'),
      (", #{@get('partner')?.name}" if @get 'partner')
    ]).join('')

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
    return if @get('sale_message') is 'Contact For Price'
    if @get('sale_message')?.indexOf('Sold') > - 1
      _.compact([
        'SOLD'
        @get('price')
      ]).join(' – ')
    else
      @get 'sale_message'

  salePrice: (isAuction = false) ->
    @saleMessage() if @saleMessage() and not isAuction

  noPinAttr: ->
    if @get('can_share_image') then undefined else "nopin"

  showMoreInfo: ->
    not _.isFunction @saleMessage

  showActionsList: (user) ->
    @get('website') or @isDownloadable() or (user and user.isAdmin())

  toJSONLD: ->
    if @get('artist')
      creator =
        compactObject {
          "@type": "Person"
          name: @get('artist').name
          sameAs: "#{sd.APP_URL}/artist/#{@get('artist').id}"
        }

    compactObject {
      "@context": "http://schema.org"
      "@type": "CreativeWork"
      image: @defaultImageUrl('large')
      name: @getTitle()
      url: "#{sd.APP_URL}#{@href()}"
      creator: creator
      depth: @get('depth')
      width: @get('width')
      height: @get('height')
      duration: @get('duration')
      medium: @get('medium')
      description: @get('blurb')
    }

  artistName: ->
    @get('artist')?.name or ''

  fetchPartnerAndSales: (options) ->
    Q.allSettled([
      (partner = @related().partner).fetch()
      (sales = @related().sales).fetch()
    ]).fail(options.error).then -> options.success partner, sales
