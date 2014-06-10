_               = require 'underscore'
sd              = require('sharify').data
Artworks        = require '../collections/artworks.coffee'
Backbone        = require 'backbone'
Fair            = require './fair.coffee'
FairLocation    = require './fair_location.coffee'
InstallShot     = require './install_shot.coffee'
Partner         = require './partner.coffee'
Artists         = require '../collections/artists.coffee'
PartnerLocation = require './partner_location.coffee'
DateHelpers     = require '../components/util/date_helpers.coffee'
{ Image }       = require 'artsy-backbone-mixins'
{ compactObject } = require './mixins/compact_object.coffee'
fetchUntilEnd   = require('artsy-backbone-mixins').Fetch(sd.API_URL).fetchUntilEnd

module.exports = class PartnerShow extends Backbone.Model

  maxDisplayedArtists: 5
  fairDisplayUpdatedDayLimit: 14
  maxFeedArtworks: 8

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  url: ->
    if @has('partner')
      "#{sd.API_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get('id')}"
    else
      "#{sd.API_URL}/api/v1/show/#{@get('id')}"

  href: -> "/show/#{@get('id')}"

  metaImage: ->
    if @has 'image_url' and @get 'image_versions' and @hasImage 'large'
      @imageUrl 'large'
    else if @artworks?.length > 0 and @artworks.first().hasImage 'large'
      @artworks.first().imageUrl 'large'
    else
      null

  toPageTitle: ->
    _.compact([
      @get 'name' || ''
      @get('partner')?.name || ''
      @get('fair')?.name || ''
      @location()?.singleLine() || ''
      @runningDates() || ''
      "Artsy"
    ]).join(' | ')

  # past / current / upcomming show featuring works by {artists} on view at {gallery name} {location} {dates}
  toPageDescription: ->
    artists =
      _.compact(for artist in @get('artists')
        artist.name
      )

    if artists.length > 1
      artistText = "featuring works by #{artists[0...(artists.length - 1)].join(', ')} and #{artists[artists.length - 1]}"
    else if artists.length == 1
      artistText = "featuring works by #{artists[0]}"

    info = _.compact([
      @get('partner')?.name || ''
      @get('fair')?.name || ''
      @location()?.singleLine() || ''
      @runningDates() || ''
    ]).join(' ')

    _.compact([
      @formatLeadHeading()
      artistText
      info
    ]).join(' ')

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
    if @artworks?.length
      return @artworks.first().defaultImage().imageUrl size

    # if not, fetch some artworks and use one of their images
    @artworks = new Artworks []
    options =
      data    : { size: 10, published: true }
      url     : "#{@url()}/artworks"
      cache   : true
      success : =>
        if @artworks?.length
          imageUrl = @artworks.first().defaultImage().imageUrl size
          @trigger "fetch:posterImageUrl", imageUrl
    @artworks.fetch options
    false

  thumbImageUrl: ->
    return @imageUrl('general') if @hasImage('general')
    return @imageUrl('medium_rectangle') if @hasImage('medium_rectangle')

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
  canonicalUrl: -> sd.APP_URL + @href()

  runningDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  fetchInstallShots: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @installShots = new Backbone.Collection [], { model: InstallShot }
    options =
      data   : { default: false }
      url    : "#{sd.API_URL}/api/v1/partner_show/#{@get('id')}/images"
    _.extend options, callbacks
    fetchUntilEnd.call @installShots, options

  fetchArtworks: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @artworks = new Artworks []
    options =
      data   : { size: 10, published: true }
      url    : "#{@url()}/artworks"
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

  # Show json is different in the feed and includes an array of artist's short json
  formatArtists: (max=Infinity) ->
    return "" unless @has('artists')
    artists = @get('artists').map (artist) -> "<a href='/artist/#{artist.id}'>#{artist.name}</a>"
    if artists?.length <= max
      artists.join(', ')
    else
      "#{artists[0..(max-1)].join(', ')} and #{artists[(max-1)..].length - 1} more"

  artists: -> new Artists(@get('artists'))

  formatCity: =>
    @get('location')?.city

  formatFeedItemHeading: ->
    return @get('name') if @get('name')?.length > 0
    @formatArtists @maxDisplayedArtists

  formatLeadHeading: ->
    if @running() then return 'Current show'
    if @upcoming() then return 'Upcoming show'
    if @closed() then return 'Past show'

  fairLocationDisplay: ->
    city = @formatCity()
    if city
      city = "<i>#{city}</i> &ndash; "
    display = @get('fair_location').display
    _.compact([city, display]).join('')

  upcoming: -> @get('status') is 'upcoming'
  running: -> @get('status') is 'running'
  closed: -> @get('status') is 'closed'
  renderable: -> @get('eligible_artworks_count') > 0 || @get('images_count') > 2

  toJSONLD: ->
    if @get('location')
      @get('location').name = @partnerName()

    compactObject {
      "@context" : "http://schema.org"
      "@type" : "Event"
      name : @get('name')
      image: @metaImage()?.imageUrl()
      url: "#{sd.APP_URL}#{@href()}"
      startDate: new Date(@get('start_at')).toISOString()
      endDate: new Date(@get('end_at')).toISOString()
      location: @location()?.toJSONLD()
      performer: artist.toJSONLDShort() for artist in @artists().models
    }
