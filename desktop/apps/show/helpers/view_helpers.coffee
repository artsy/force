_ = require 'underscore'
{ slugify } = require 'underscore.string'
moment = require 'moment'
DateHelpers = require '../../../components/util/date_helpers'
{ compactObject } = require '../../../models/mixins/compact_object'
sd = require('sharify').data

module.exports =

  formatShowEventDateRange: (start_at, end_at, format = 'dddd, MMM. Do, h:mma') ->
    start = moment.utc(start_at)
    end = moment.utc(end_at)

    output = "#{start.format(format)} -"
    output += end.format(if start.isSame(end, 'day') then 'h:mma' else format)

    output.replace /:00/g, ''

  titleAndYear: (artwork) ->
    _.compact([
      if artwork.title? and artwork.title.length > 0 then "<em>#{artwork.title}</em>" else '',
      artwork.date
    ]).join(', ')

  factor: (image, favor = 'width', precision = 3) ->
    disfavor = if favor is 'width' then 'height' else 'width'
    factor = image["#{disfavor}"] / image["#{favor}"]
    x = Math.pow 10, precision
    Math.floor(factor * x) / x

  noPinAttr: (artwork) ->
    if artwork.can_share_image then undefined else 'nopin'

  partnerName: (artwork) ->
    if artwork.collecting_institution
      artwork.collecting_institution
    else
      artwork.partner.name

  toAltText: (artwork) ->
    _.compact([
      (artwork.artists[0].name if artwork.artists.size > 0),
      (", '#{artwork.title},' " if artwork.title),
      ("#{artwork.date}" if artwork.date),
      (", #{artwork.partner.name}" if artwork.partner)

    ]).join('')

  # Groups models in to an array of n arrays where n is the numberOfColumns requested.
  # For a collection of eight artworks
  # [
  #   [artworks.at(0), artworks.at(3), artworks.at(6)]
  #   [artworks.at(1), artworks.at(4), artworks.at(7)]
  #   [artworks.at(2), artworks.at(5)]
  # ]
  #
  # @param {Number} numberOfColumns The number of columns of models to return in an array
  groupByColumnsInOrder: (artworks, numberOfColumns = 3) ->
    return [artworks] if numberOfColumns < 2
    # Set up the columns to avoid a check in every model pass
    columns = []
    for column in [0..numberOfColumns-1]
      columns[column] = []
    # Put models in each column in order
    column = 0
    for artwork in artworks
      columns[column].push artwork
      column = column + 1
      if column is numberOfColumns
        column = 0
    columns

  # Takes a day of the week as a string and returns a formatted schedule for a day of the week or closed:
  # { start: 'Monday', hours: '10:30am–7pm' } or { start: 'Tuesday', hours: 'Closed'}
  formatDaySchedule: (location, day) ->
    if location.day_schedules && location.day_schedules.length > 0
      if _.contains ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], day
        daySchedules = _.where (location.day_schedules), day_of_week: day
        if daySchedules.length
          hours = []
          for daySchedule in daySchedules
            startHour = moment().hour(daySchedule['start_time'] / 60 / 60)
            startMinute = moment().minutes(daySchedule['start_time'] / 60)
            endHour = moment().hour(daySchedule['end_time'] / 60 / 60)
            endMinute = moment().minutes(daySchedule['end_time'] / 60 )
            hours.push "#{startHour.format('h')}\
                    #{ if startMinute.format('mm') == '00' then '' else startMinute.format(':mm')}\
                    #{startHour.format('a')}–\
                    #{endHour.format('h')}\
                    #{if endMinute.format('mm') == '00' then '' else endMinute.format(':mm')}\
                    #{endHour.format('a')}"
          start: day
          hours: hours.join(', ')
        else
          start: day
          hours: 'Closed'

  # Returns an array of formatted 'day schedule' objects for a 7 day week:
  # [{ start: 'Monday', hours: '10am – 7pm'}, {start: 'Tuesday, hours: 'Closed'}, ... ]
  formatDaySchedules: (location) ->
    if location.day_schedules && location.day_schedules.length > 0
      _.map ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], (day) =>
        @formatDaySchedule(location, day)

  # returns an array of grouped and formatted 'day schedules' objects in the format:
  # [{ days: 'Monday–Thursday, Sunday', hours: '10am - 7pm' }, { days: 'Friday', hours: '6:30am - 7pm' }]
  formatModalDaySchedules: (location) ->
    if location.day_schedules && location.day_schedules.length > 0
      daysOpen = [@formatDaySchedules(location)[0]]
      _.each @formatDaySchedules(location).slice(1), (daySchedule) ->
        if daySchedule['hours'] is _.last(daysOpen)['hours']
          _.extend _.last(daysOpen), end: "#{daySchedule['start']}"
        else
          daysOpen.push {start: daySchedule['start'], hours: daySchedule['hours']}
      _.chain (daysOpen)
        .groupBy 'hours'
        .map (schedule) ->
          _.chain(schedule)
            .map (day) ->
              days: if day['end'] then "#{day['start']}–#{day['end']}" else "#{day['start']}"
              hours: schedule[0]['hours']
            .reduce (memo, iteratee) ->
              memo['days'] = memo['days'] + ", #{iteratee['days']}"
              return memo
            .value()
        .reject (day_schedule) -> day_schedule['hours'] is 'Closed'
        .value()

  getMetaphysicsLocation: (location) ->
    { lat: location.coordinates.lat, lng: location.coordinates.lng }

  getMapsLocation: (location) ->
    if location.coordinates
      "#{location.coordinates.lat},#{location.coordinates.lng}"
    else
      @displayAddress(location)

  displayAddress: (location) ->
    if @lines(location) then @lines(location).join(", ") else ""

  lines: (location) ->
    _.compact([
      location.address or ''
      location.address_2 or ''
      @cityStatePostalCode(location) or ''
      location.country or ''
    ])

  cityStatePostalCode: (location) ->
    _.compact([
      @cityState(location) or ''
      location.postal_code or ''
    ]).join(' ')

  cityState: (location) ->
    _.compact([
      location.city or ''
      location.state or ''
    ]).join(', ')

  hasCaptions: (installShots) ->
    _.any _.map(_.pluck(installShots, 'caption'), _.negate _.isEmpty)

  toPageTitle: (show) ->
    _.compact([
      @title(show)
      show.partner?.name or ''
      "Artsy"
    ]).join(' | ')

  toJSONLD: (show) ->
    if show.location
      show.location.name = show.partner.name

    compactObject {
      "@context": "http://schema.org"
      "@type": "Event"
      name: @title(show)
      image: show.meta_image?.meta_image_url
      url: "#{sd.APP_URL}#{show.href}"
      startDate: (new Date(show.start_at)).toISOString()
      endDate: (new Date(show.end_at)).toISOString()
      location: @toJSONLDLocation(show.location) if show.location
      performer: @performers(show)
    }

  performers: (show) ->
    @toJSONLDShortArtist(artist) for artist in show.artists

  toJSONLDShortArtist: (artist) ->
    compactObject {
      "@type": "Person"
      image: artist.image?.url
      name: artist.name
      sameAs: "#{sd.APP_URL}#{artist.href}"
    }

  toJSONLDLocation: (location) ->
    address = [location.address or '', location.address_2 or ''].join('')
    compactObject {
      "@type": "Place"
      name: location.name
      address: compactObject {
        "@type": "PostalAddress"
        streetAddress: address
        addressLocality: location.city
        addressRegion: location.state
        postalCode: location.postal_code
        addressCountry: if location.country?.length > 0 then location.country
      }
    }

  shareTitle: (show) ->
    if show.fair
      "#{show.name}, #{show.location.display} See it on @artsy"
    else if show.partner
      "See \"#{show.name}\" at #{show.partner.name} on @artsy"
    else
      "See \"#{show.name}\" on @artsy"

  title: (show) ->
    if show.name?.length
      show.name
    else
      @formatArtistText(show)

  formatArtistText: (show) ->
    artists = _.pluck(show.artists, 'name')
    if artists.length > 1
      artistText = "#{artists[0...(artists.length - 1)].join(', ')} and #{artists[artists.length - 1]}"
    else if artists.length == 1
      artistText = "#{artists[0]}"

  singleLine: (location) ->
    _.compact([
      location?.city or ''
      _.compact([
        location?.address or ''
        location?.address_2 or ''
      ]).join(' ')
    ]).join(', ')

  fairOrShowLocation: (show) ->
    if show.fair?
      show.fair.location
    else
      show.location

  runningDates: (show) ->
    DateHelpers.timespanInWords show.start_at, show.end_at

  formatLeadHeading: (show) ->
    status =
      if show.status is 'current' or show.status is 'running' then 'Current'
      else if show.status is 'upcoming' then 'Upcoming'
      else if show.status is 'closed' then 'Past'
    type = if show.fair then 'fair booth' else 'show'
    "#{status} #{type}"

  # past / current / upcoming show featuring works by {artists} on view at {gallery name} {location} {dates}
  toPageDescription: (show) ->
    artistText = @formatArtistText(show)
    if artistText
      artistText = "featuring works by #{artistText}"

    info = _.compact([
      'at'
      show.partner.name
      show.fair?.name or ''
      @singleLine(show.location) or ''
      @runningDates(show) or ''
    ]).join(' ')

    _.compact([
      @formatLeadHeading(show)
      artistText
      info
    ]).join(' ')

  bestAddress: (location) ->
    location.display or @displayAddress(location)

  sailthruShowType: (show) ->
    if show.fair then 'fair-booth' else 'partner-show'

  sailthruTags: (show) ->
    location = @fairOrShowLocation(show)
    artists = _.pluck(show.artists, 'id')
    _.compact artists.concat([
      show.partner?.id
      slugify "#{show.partner?.type} Show"
      slugify location?.city
      slugify location?.country
    ])
