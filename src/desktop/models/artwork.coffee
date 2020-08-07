_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
Edition = require './edition.coffee'
Partner = require './partner.coffee'
AdditionalImage = require './additional_image.coffee'
{ compactObject } = require './mixins/compact_object.coffee'
{ Dimensions, Markdown, ArtworkHelpers } = require 'artsy-backbone-mixins'
Relations = require './mixins/relations/artwork.coffee'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Dimensions
  _.extend @prototype, Markdown
  _.extend @prototype, Relations
  _.extend @prototype, ArtworkHelpers

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
    @defaultImage().isDownloadable(user)

  downloadableFilename: ->
    _s.slugify(@toOneLine()) + '.jpg'

  downloadableUrl: (user) ->
    if user?.isAdmin()
      "#{@url()}/image/#{@defaultImage().id}/original.jpg"
    else
      @defaultImageUrl 'larger'

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

  # Outputs the [height, width, depth || height, width || diameter] in decimal/cm
  #
  # return {Array}
  normalizedDimensions: ->
    _.map @dimensions(metric: 'cm', format: 'decimal').replace('cm', '').split(' × '), parseFloat

  # Is any side larger than 1524 cm?
  #
  # return {Boolean}
  tooBig: ->
    _.any @normalizedDimensions(), (x) -> x > 1524

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

  isPartOfAuctionPromo: ->
    @related().sales.firstAuctionPromo()?

  # Should we include a form or button to contact the partner?
  #
  isContactable: ->
    return false if @isAtLimitedFairPartner()
    return true if @get('inquireable') or @get('is_inquireable')
    return true if @isPartOfContactableAuctionPromo()
    return false if @isPartOfAuction()
    @isArtworkContactable()

  isPartOfAuction: ->
    @related().sales.firstAuction()?

  # Independent of a related sale context: is the work contactable
  isArtworkContactable: ->
    @get('forsale') and @has('partner') and not @get('acquireable')

  # Works within promos can only be contactable if the promo is still a preview
  isPartOfContactableAuctionPromo: ->
    (auctionPromo = @related().sales.firstAuctionPromo())? and auctionPromo.isPreview()

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
    if @get('partner')?.type is 'Gallery' then 'gallery' else 'seller'

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

  limitedFairPartnershipMessage: ->
    "#{@partnerName()} is an art fair exhibitor, but not an Artsy partner."

  isAtLimitedFairPartner: ->
    @has('partner') and @get('partner').has_limited_fair_partnership

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

  partnerLinkTarget: ->
    if @get('partner').linkType() is 'external' then '_blank' else '_self'

  getTitle: ->
    if @get('title') then @get('title') else '(Untitled)'

  titleAndYear: ->
    _.compact([
      if @get('title')? and @get('title').length > 0 then "<em>#{@get('title')}</em>" else '',
      @get('date')
    ]).join(", ")

  toAltText: ->
    _.compact([
      (@related().artist?.get('name'))
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
      @artistsNames()
      @toTitleWithDateForSale()
      "Artsy"
    ]).join(" | ")

  # same as .to_s in Gravity
  toOneLine: ->
    _.compact([
      @related().artist.get('name')
      @toTitleWithDate()
    ]).join(" ")

  titleByArtist: ->
    _.compact([
      @getTitle()
      @related().artist.get('name')
    ]).join(' by ')

  partnerDescription: ->
    return undefined unless @get('partner')?.name
    if @get('forsale') then "Available for sale from #{@get('partner').name}" else "From #{@get('partner').name}"

  # for meta descriptions
  toPageDescription: ->
    _.compact([
      @partnerDescription()
      @related().artist.get('name')
      @toTitleWithDate()
      @get('medium')
      @dimensions()
    ]).join(", ")

  saleMessage: ->
    return if @get('availability_hidden')
    return if @get('sale_message') is 'Contact For Price'
    return if @get('availability') is 'not for sale' or @get('availability') is 'permanent collection'
    if @get('availability') is 'on hold'
      if @get('price')
        return "#{@get('price')}, on hold"
      return 'On hold'

    if @get('sale_message')?.indexOf('Sold') > - 1
      return 'Sold'

    if (@get('availability') is 'on loan')
      return 'On loan'

    @get 'sale_message'

  availabilityMessage: ->
    return if @get('availability_hidden')
    return if @get('partner')?.type is "Institutional Seller"
    return if @get('availability') is 'for sale' or @get('availability') is 'not for sale' or @get('availability') is 'permanent collection'
    if @get('partner')?.has_limited_fair_partnership
      'Not inquireable'
    else if @get('availability')?.indexOf('on hold') > - 1
      _.compact([
        'On hold'
        @get('price')
      ]).join(' - ')
    else
      _s(@get('availability')).capitalize().value()

  noPinAttr: ->
    if @get('can_share_image') then undefined else "nopin"

  showMoreInfo: ->
    not _.isFunction @saleMessage

  showActionsList: (user) ->
    @get('website') or @isDownloadable() or (user and user.isAdmin())

  toJSONLD: ->
    creator =
      compactObject {
        "@type": "Person"
        name: @related().artist.get('name')
        sameAs: "#{sd.APP_URL}/artist/#{@related().artist.get('id')}"
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
    @related().artist.get('name') or _.compact(@related().artists.pluck('name'))[0] or ''

  artistsNames: ->
    names = _.compact(@related().artists.pluck 'name')
    return @artistName() if not (names.length > 1)
    names.push names.splice(-2).join(' and ')
    names.join (', ')

  fetchPartnerAndSales: (options) ->
    Promise.allSettled([
      (partner = @related().partner).fetch()
      (sales = @related().sales).fetch()
    ]).catch(options.error).then -> options.success partner, sales
