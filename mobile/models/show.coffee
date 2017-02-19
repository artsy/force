Backbone = require 'backbone'
sd = require('sharify').data
Artworks = require '../collections/artworks.coffee'
FairLocation = require './fair_location.coffee'
PartnerLocation = require './partner_location.coffee'
_ = require 'underscore'
moment = require 'moment'
dateMixin = require './mixins/date.coffee'
Relations = require './mixins/relations/show.coffee'
AdditionalImage = require './additional_image.coffee'
{ Fetch, Markdown } = require 'artsy-backbone-mixins'
DateHelpers = require '../components/util/date_helpers.coffee'
{ fetchUntilEnd } = Fetch(sd.API_URL)

module.exports = class Show extends Backbone.Model
  _.extend @prototype, Fetch
  _.extend @prototype, dateMixin
  _.extend @prototype, Markdown
  _.extend @prototype, Relations

  url: ->
    if @has('partner')
      "#{sd.API_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get('id')}"
    else
      "#{sd.API_URL}/api/v1/show/#{@get('id')}"

  href: ->
    "/show/#{@get('id')}"

  artworksUrl: ->
    "#{sd.API_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get 'id'}/artworks"

  hasImage: (size = 'medium') ->
    size in (@get('image_versions') || [])

  imageUrl: (version = 'medium') ->
    if @hasImage(version)
      @get('image_url')?.replace ':version', version
    else if @has('artworks') and @get('artworks').length > 0
      @artworks().first().defaultImageUrl version
    else
     ''

  # Need this to handle the artworks case
  hasImageUrl: (size = 'medium') ->
    @imageUrl(size) isnt ''

  partnerProfileHref: ->
    if @has('partner') and @get('partner').default_profile_id
      "/#{@get('partner').default_profile_id}"
    else
      null

  partnerName: ->
    @get('partner')?.name

  artworks: ->
    new Artworks @get('artworks')

  fairHref: ->
    if @has('fair') and @get('fair').default_profile_id
      "/#{@get('fair').default_profile_id}"

  feedHeader: ->
    if @get('fair')
      @get('fair').name
    else
      @get('name') or _(@get('artists')).pluck('name').join ', '

  feedSubheaderAppend: ->
    if @get('fair')
      @get('fair_location')?.display
    else
      @get('location')?.city

  location: ->
    if @has 'location'
      new PartnerLocation @get 'location'
    else if @has 'fair_location'
      new FairLocation @get 'fair_location'
    else
      null

  # past / current / upcoming show
  # featuring works by {artists} on view
  # at {gallery name} {location} {dates}
  toPageDescription: ->
    artistText = @formatArtistText()
    if artistText
      artistText = "featuring works by #{artistText}"

    info = _.compact([
      'at'
      @partnerName()
      @get('fair')?.name or ''
      @location()?.singleLine() or ''
      @runningDates() or ''
    ]).join(' ')

    _.compact([
      @formatLeadHeading()
      artistText
      info
    ]).join(' ')

  runningDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  formatArtistText: ->
    artists = _.compact(@related().artists.pluck 'name')
    if artists.length > 1
      artistText = "#{artists[0...(artists.length - 1)].join(', ')} and #{artists[artists.length - 1]}"
    else if artists.length == 1
      artistText = "#{artists[0]}"

  formatLeadHeading: ->
    status =
      if @running() then 'Current'
      else if @upcoming() then 'Upcoming'
      else if @closed() then 'Past'
    type = if @get('fair') then 'fair booth' else 'show'
    "#{status} #{type}"

  formattedLocation: ->
    if @has('fair_location')
      return @get('fair_location').display
    if @get('location')
      return [
        @get('location')?.city
        (if address = @get('location')?.address then ', ' + address else '')
      ].join('')
    ''

  formattedStreetAddress: (options = {})->
    if @has('fair_location')
      return @get('fair_location').display
    if @get('location')
      return [
        (if address = @get('location')?.address then address else '')
        (if city = options.show_city then ', ' + @get('location')?.city else '')
      ].join('')
    ''

  whenAndWhere: ->
    [ @formattedDateRange(), @formattedLocation() ].join ', '

  mapsUrl: ->
    if @formattedStreetAddress() isnt ''
      return "https://maps.google.com?q=#{encodeURIComponent @formattedStreetAddress show_city: true}"
    ''

  fetchArtworks: (options = {}) ->
    new Artworks().fetch _.extend options,
      url: @artworksUrl()

  fetchAllArtworks: (options = {}) ->
    new Artworks().fetchUntilEnd _.extend options,
      url: @artworksUrl()

  fetchInstallShots: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @installShots = new Backbone.Collection [], { model: AdditionalImage }
    options =
      data: { default: false }
      url: "#{sd.API_URL}/api/v1/partner_show/#{@get('id')}/images"
    _.extend options, callbacks
    fetchUntilEnd.call @installShots, options

  # opens at any time between the previous and future weekend
  openingThisWeek: ->
    start = moment().day(-2).startOf('day')
    end = moment().day(8).startOf('day')
    startAt = @startAtDate()
    start < startAt && end > startAt

  date: (attr) ->
    moment(@get attr)

  startAtDate: ->
    new Date(@get('start_at'))

  endAtDate: ->
    new Date(@get('end_at'))

  formattedEndAt: ->
    if @date('end_at').format('YYYY') > moment().format('YYYY')
      return @date('end_at').format('MMM DD, YYYY')
    else
      return @date('end_at').format('MMM DD')

  upcoming: -> @get('status') is 'upcoming'
  running: -> @get('status') is 'running'
  closed: -> @get('status') is 'closed'
  renderable: -> @get('eligible_artworks_count') > 0 || @get('images_count') > 2

  # Defaults to 5 days
  isEndingSoon: (days = 5) ->
    soon = moment.duration(days, 'days').valueOf()
    diff = moment(@get('end_at')).diff(Date.new)
    diff <= soon and diff >= 0

  endingIn: ->
    days = moment(@get('end_at')).diff(Date.new, 'days')
    if days is 0 then 'today' else "in #{days} day#{if days is 1 then '' else 's'}"

  isOpeningToday: ->
    moment(@get('start_at')).diff(Date.new, 'days') is 0

  # TODO: when install shots are supported, add @get('images_count') > X
  featurable: ->
    @get('eligible_artworks_count') > 0 && (@hasImage('featured') || @hasImage('larger'))

  posterImage: ->
    return @imageUrl('featured') if @hasImage('featured')
    return @imageUrl('larger') if @hasImage('larger')
    false
