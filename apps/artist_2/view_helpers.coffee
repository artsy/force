_ = require 'underscore'
moment = require 'moment'
Artist = require '../../models/artist.coffee'
{ timespanInWords } = require '../../components/util/date_helpers.coffee'
{ capitalize, numberFormat } = require 'underscore.string'
showHelpers = require '../../components/show_cell/helpers.coffee'

module.exports =
  capitalize: capitalize
  showHelpers: showHelpers

  pageTitle: (artist) ->
    artist = new Artist
      id: artist.id
      name: artist.name
      published_artworks_count: artist.counts.artworks
    artist.toPageTitle()

  pageDescription: (artist, limit) ->
    artist = new Artist _.pick artist, 'id', 'name', 'gender', 'blurb'
    artist.toPageDescription(limit)

  formatAlternateNames: (artist) ->
    if alts = artist.alternate_names then artist.alternate_names.join('; ') else ''

  displayNationalityAndBirthdate: (artist) ->
    years = @formatBirthDeath artist
    _.compact([
      artist.nationality
      years if years.length
    ]).join ', '

  formatBirthDeath: (artist) ->
    birthday = artist.birthday?.match(/\d+/)
    deathday = artist.deathday?.match(/\d+/)
    return '' if not birthday?.length

    if deathday?.length
      "#{birthday}–#{deathday}"
    else
      "b. #{birthday}"

  artistMeta: (artist) ->
    return '' if not (artist.hometown or artist.location)
    years = @formatBirthDeath artist
    _.compact([
      artist.nationality if artist.nationality?.length
      years if years.length
      artist.hometown if artist.hometown?.length
      "based in #{artist.location}" if artist.location?.length
    ]).join ', '

  displayFollowers: (artist) ->
    "#{numberFormat(c)}" if c = artist.counts.follows

  mdToHtml: (artist, attr) ->
    artist = new Artist _.pick artist, attr
    artist.mdToHtml attr

  formatAuctionDetail: (end) ->
    minuteFormat = if end.minute() > 0 then ':mm' else ''
    end.format('[Auction Closes] MMM D [at] h' + minuteFormat + ' A');

