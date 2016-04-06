_ = require 'underscore'
Artist = require '../../models/artist.coffee'
sd = require('sharify').data
{ timespanInWords } = require '../../components/util/date_helpers.coffee'
{ capitalize, numberFormat } = require 'underscore.string'

module.exports =
  capitalize: capitalize

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
    _.compact([
      artist.nationality
      artist.years
    ]).join ', '

  displayFollowers: (artist) ->
    if c = artist.counts.follows
      "#{numberFormat(c)} Follower#{if c is 1 then '' else 's'}"

  mdToHtml: (artist, attr) ->
    artist = new Artist _.pick artist, attr
    artist.mdToHtml attr

  currentItemDetail: (item) ->
    _.compact([
      item.city
      timespanInWords(item.start_at, item.end_at, day: 'D')
    ]).join ', '

