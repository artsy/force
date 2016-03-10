_ = require 'underscore'
_s = require 'underscore.string'
Artist = require '../../models/artist.coffee'
sd = require('sharify').data

module.exports =
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
      "#{_s.numberFormat(c)} Follower#{if c is 1 then '' else 's'}"

  mdToHtml: (artist, attr) ->
    artist = new Artist _.pick artist, attr
    artist.mdToHtml attr

  toJSONLD: (artist) ->
    return {
      "@context": "http://schema.org"
      "@type": "Person"
      image: artist.image.large
      name: artist.name
      url: "#{sd.APP_URL}#{artist.href}"
      gender: artist.gender
      birthDate: artist.birthday
      deathDate: artist.deathday
      additionalType: 'Artist'
    }