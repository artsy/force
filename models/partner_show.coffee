_ = require 'underscore'
Q = require 'q'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
DateHelpers = require '../components/util/date_helpers.coffee'
{ compactObject } = require './mixins/compact_object.coffee'
FairLocation = require './fair_location.coffee'
PartnerLocation = require './partner_location.coffee'
Artworks = require '../collections/artworks.coffee'
ImageSizes = require './mixins/image_sizes.coffee'
Relations = require './mixins/relations/partner_show.coffee'

module.exports = class PartnerShow extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes
  _.extend @prototype, Markdown
  _.extend @prototype, Relations

  url: ->
    if @has('partner')
      "#{sd.API_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get('id')}"
    else
      "#{sd.API_URL}/api/v1/show/#{@get('id')}"

  href: ->
    "/show/#{@get('id')}"

  toPageTitle: ->
    _.compact([
      @title()
      @get('partner')?.name or ''
      "Artsy"
    ]).join(' | ')

  # past / current / upcoming show featuring works by {artists} on view at {gallery name} {location} {dates}
  toPageDescription: ->
    artistText = @formatArtistText()
    if artistText
      artistText = "featuring works by #{artistText}"

    info = _.compact([
      'at'
      @related().partner.get('name')
      @related().fair.get('name')
      @location()?.singleLine() or ''
      @runningDates() or ''
    ]).join(' ')

    _.compact([
      @formatLeadHeading()
      artistText
      info
    ]).join(' ')

  formatArtistText: ->
    artists = _.compact(@related().artists.pluck 'name')
    if artists.length > 1
      artistText = "#{artists[0...(artists.length - 1)].join(', ')} and #{artists[artists.length - 1]}"
    else if artists.length == 1
      artistText = "#{artists[0]}"

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
      data: { size: 10, published: true }
      url: "#{@url()}/artworks"
      cache: true
      success: =>
        if @artworks?.length
          imageUrl = @artworks.first().defaultImage().imageUrl size
          @trigger "fetch:posterImageUrl", imageUrl
    @artworks.fetch options
    false

  metaImageUrl: ->
    if @imageUrl 'large'
      @imageUrl 'large'
    else if @artworks?.length > 0 and @artworks.first().defaultImage()
      @artworks.first().defaultImage().imageUrl 'large'
    else
      null

  thumbImageUrl: ->
    return @imageUrl('general') if @hasImage('general')
    return @imageUrl('medium_rectangle') if @hasImage('medium_rectangle')

  title: ->
    if @get('name')?.length
      @get 'name'
    else
      @formatArtistText()

  shareTitle: ->
    if @has('fair_location')
      "#{@get('name')}, #{@get('fair_location').display} See it on @artsy"
    else if @has('partner')
      "See \"#{@get('name')}\" at #{@get('partner').name} on @artsy"
    else
      "See \"#{@get('name')}\" on @artsy"

  runningDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  date: (attr) ->
    moment(@get attr)

  isSameYear: (date) ->
    date.year() is moment().year()

  dateFormatted: (attr, formatString = 'MMM D') ->
    date = @date attr
    formatString += ', YYYY' unless @isSameYear(date)
    date.format formatString

  location: ->
    if @has 'location'
      new PartnerLocation @get 'location'
    else if @has 'fair_location'
      new FairLocation @get 'fair_location'
    else
      null

  partnerName: ->
    @related().partner.get('name')

  partnerHref: ->
    if @related().partner.get 'default_profile_public'
      @related().profile.href()

  fairName: ->
    @related().fair.get 'name'

  # Show json is different in the feed and includes an array of artist's short json
  formatArtists: (max = Infinity) ->
    return "" unless @has('artists')
    artists = @get('artists').map (artist) -> "<a href='/artist/#{artist.id}'>#{artist.name}</a>"
    if artists?.length <= max
      artists.join(', ')
    else
      "#{artists[0..(max-1)].join(', ')} and #{artists[(max-1)..].length - 1} more"

  artists: ->
    @related().artists

  formatCity: =>
    @get('location')?.city?.trim()

  formatStreetAddress: ->
    @get('location')?.address?.trim()

  formatFeedItemHeading: (max = 5) ->
    return @get('name') if @get('name')?.length > 0
    @formatArtists max

  formatLeadHeading: ->
    status =
      if @running() then 'Current'
      else if @upcoming() then 'Upcoming'
      else if @closed() then 'Past'
    type = if @get('fair') then 'fair booth' else 'show'
    "#{status} #{type}"

  fairLocationDisplay: ->
    city = @formatCity()
    if city
      city = "<i>#{city}</i> &ndash; "
    display = @get('fair_location')?.display or ''
    _.compact([city, display]).join('')

  upcoming: ->
    @get('status') is 'upcoming'

  running: ->
    @get('status') is 'running'

  closed: ->
    @get('status') is 'closed'

  # opens at any time between the previous monday and the next sunday if today is between monday and thursday,
  # if between friday and sunday opens between previous monday and friday of the next week
  openingThisWeek: (today = moment()) ->
    start = moment(today).startOf('week').startOf('day')
    startAt = @startAtDate()
    if moment(today).day() < 5
      end = moment(today).endOf('week').endOf('day')
    else
      end = moment(today).endOf('week').add(6, 'days').endOf('day')
    start < startAt && end > startAt

  startAtDate: ->
    new Date(@get('start_at'))

  endAtDate: ->
    new Date(@get('end_at'))

  # Defaults to 5 days
  isEndingSoon: (days = 5, today = moment().startOf('day')) ->
    soon = moment.duration(days, 'days').valueOf()
    diff = moment(@endAtDate()).diff(today)
    diff <= soon and diff >= 0

  endingIn: (today = moment().startOf('day')) ->
    days = moment(@get('end_at')).diff(today, 'days')
    if days is 0 then 'today' else "in #{days} day#{if days is 1 then '' else 's'}"

  isOpeningToday: (today = moment().startOf('day')) ->
    moment(@get('start_at')).diff(today, 'days') is 0

  performers: ->
    artist.toJSONLDShort() for artist in @artists().models

  toJSONLD: ->
    if @get('location')
      @get('location').name = @partnerName()

    compactObject {
      "@context": "http://schema.org"
      "@type": "Event"
      name: @title()
      image: @metaImageUrl()
      url: "#{sd.APP_URL}#{@href()}"
      startDate: @startAtDate().toISOString()
      endDate: @endAtDate().toISOString()
      location: @location()?.toJSONLD()
      performer: @performers()
    }

  isSolo: ->
    @get('artists')?.length is 1

  isGroup: ->
    not @isSolo()

  isFairBooth: ->
    @has 'fair'

  contextualLabel: (name) ->
    type = if @isFairBooth()
      'Fair Booth'
    else if @isSolo()
      'Solo Show'
    else
      'Group Show'
    if name? and (@isGroup() or @isFairBooth())
      "#{type} including #{name}"
    else
      type
