Artist = require '../../models/artist.coffee'
_ = require 'underscore'
_s = require 'underscore.string'

module.exports =
  pageTitle: (artist) ->
    artist = new Artist _.pick artist, 'name', 'published_artworks_count'
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
      "#{_s.numberFormat(c)} Follower#{if c is 1 then '' else 's'}"

  mdToHtml: (artist, attr) ->
    artist = new Artist _.pick artist, attr
    artist.mdToHtml attr