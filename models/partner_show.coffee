_               = require 'underscore'
sd              = require('sharify').data
Artworks        = require '../collections/artworks.coffee'
AdditionalImage = require './additional_image.coffee'
Backbone        = require 'backbone'
Fair            = require './fair.coffee'
FairLocation    = require './fair_location.coffee'
Partner         = require './partner.coffee'
PartnerLocation = require './partner_location.coffee'
DateHelpers     = require '../components/util/date_helpers.coffee'
{ Image }       = require 'artsy-backbone-mixins'

module.exports = class PartnerShow extends Backbone.Model

  maxDisplayedArtists: 5
  fairDisplayUpdatedDayLimit: 14
  maxFeedArtworks: 8

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  url: ->
    if @has('partner')
      "#{sd.ARTSY_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get('id')}"
    else
      "#{sd.ARTSY_URL}/api/v1/show/#{@get('id')}"

  clientUrl: -> "/show/#{@get('id')}"

  metaImage: ->
    if @has 'image_url' and @get 'image_versions' and @hasImage 'large'
      @imageUrl 'large'
    else if @artworks?.length > 0 and @artworks.first().hasImage 'large'
      @artworks.first().imageUrl 'large'
    else
      null

  metaTitle: ->
    _.compact([
      @get 'name' || ''
      @get('partner')?.name || ''
      @get('fair')?.name || ''
      @location()?.singleLine() || ''
      @runningDates() || ''
    ]).join ' | '

  #
  # Get the poster image url of the show (e.g. used in the shows tab in
  # partner profile.)
  #
  # If no available images, it will fetch one for you and trigger a
  # `fetch:posterImageUrl` event on success with the image url.
  posterImageUrl: (featured=false) ->
    # try the image of the show
    size = if featured then 'featured' else 'large'
    return @imageUrl size if @hasImage(size)

    # if not, try the image of its first artwork, if we already have some
    size = 'larger' if featured
    if @artworks?.length > 0
      return @artworks.first().defaultImage().imageUrl size

    # if not, fetch some artworks and use one of their images
    @artworks = new Artworks []
    options =
      data    : { size: 10, published: true }
      url     : "#{@url()}/artworks"
      cache   : true
      success : =>
        imageUrl = @artworks.first().defaultImage().imageUrl size
        @trigger "fetch:posterImageUrl", imageUrl
    @artworks.fetch options
    false

  title: ->
    @get 'name'

  shareTitle: ->
    if @has('fair_location')
      "#{@get('name')}, #{@get('fair_location').display} See it on @artsy"
    else if @has('partner')
      "See \"#{@get('name')}\" at #{@get('partner').name} on @artsy"
    else
      "See \"#{@get('name')}\" on @artsy"

  href: -> "/show/#{@get('id')}"

  runningDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  fetchInstallShots: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @installShots = new Backbone.Collection [], { model: AdditionalImage }
    options =
      data   : { default: false }
      url    : "#{sd.ARTSY_URL}/api/v1/partner_show/#{@get('id')}/images"
      cache  : true
    _.extend options, callbacks
    @installShots.fetch options

  fetchArtworks: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @artworks = new Artworks []
    options =
      data   : { size: 10, published: true }
      url    : "#{@url()}/artworks"
      cache  : true
    _.extend options, callbacks
    @artworks.fetchUntilEnd options

  #
  # Related model generators... factories... ?
  #
  fair: ->
    if @has 'fair'
      new Fair @get 'fair'
    else
      null

  location: ->
    if @has 'location'
      new PartnerLocation @get 'location'
    else if @has 'fair_location'
      new FairLocation @get 'fair_location'
    else
      null

  partner: ->
    if @has 'partner'
      new Partner @get 'partner'
    else
      null

  partnerName: ->
    @get('partner')?.name

  fairName: ->
    @get('fair').name

  formatArtists: (max=Infinity) ->
    return "" unless @has('artists')
    artists = @get('artists').map (artist) -> "<a href='/artist/#{artist.id}'>#{artist.name}</a>"
    if artists?.length <= max
      artists.join(', ')
    else
      "#{artists[0..(max-1)].join(', ')} and #{artists[(max-1)..].length - 1} more"

  formatCity: =>
    @get('location')?.city

  formatFeedItemHeading: ->
    return @get('name') if @get('name')?.length > 0
    @formatArtists @maxDisplayedArtists

  formatLeadHeading: ->
    if @running() then return 'Current Show'
    if @upcoming() then return 'Upcoming Show'
    if @closed() then return 'Past Show'

  fairLocationDisplay: ->
    city = @formatCity()
    if city
      city = "<i>#{city}</i> &ndash; "
    display = @get('fair_location').display
    _.compact([city, display]).join('')

  carouselDisplay: -> if @get('images_count') > 0 then "block" else "none"
  artworksDisplay: -> if @get('eligible_artworks_count') > 0 then "block" else "none"

  upcoming: -> @get('status') is 'upcoming'
  running: -> @get('status') is 'running'
  closed: -> @get('status') is 'closed'
  renderable: -> @get('eligible_artworks_count') > 0 || @get('images_count') > 2
  featurable: -> @renderable()
  linkable: -> @renderable()
