_ = require 'underscore'
{ compactObject } = require '../../models/mixins/compact_object.coffee'
moment = require 'moment'
Artist = require '../../models/artist.coffee'
{ timespanInWords } = require '../../components/util/date_helpers.coffee'
{ capitalize, numberFormat } = require 'underscore.string'
{ APP_URL } = require('sharify').data
showHelpers = require '../../components/show_cell/helpers.coffee'

module.exports =
  capitalize: capitalize
  showHelpers: showHelpers

  # TODO:: ARTIST_MARKET_DATA_TEST remove after test closes

  hasCarousel: (testGroup) -> testGroup is 'control'
  hasMarketData: (testGroup) -> testGroup is 'market_data_no_carousel'
  hasOverview: (testGroup) -> true

  nShowsByDate: (shows, n) ->
    _.sortBy(_.take(shows, n), 'start_at').reverse()

  pageTitle: (artist) ->
    artist = new Artist
      id: artist.id
      name: artist.name
      published_artworks_count: artist.counts.artworks
    artist.toPageTitle()

  formatAlternateNames: (artist) ->
    if alts = artist.alternate_names then artist.alternate_names.join('; ') else ''

  displayNationalityAndBirthdate: (artist) ->
    years = @formatBirthDeath artist
    _.compact([
      artist.nationality
      years if years.length
    ]).join ', '

  formatBirthDeath: (artist) ->
    return '' if not artist.birthday?.length
    deathday = artist.deathday?.match(/\d+/)

    if deathday?.length
      birthday = artist.birthday?.match(/\d+/)
      return '' if not birthday?.length
      "#{birthday}–#{deathday}"
    else
      if (/^(\s+)?((b|born|Born|B)\b)?(\.)?(\s+)?\d+/).test artist.birthday
        birthday = artist.birthday?.match(/\d+/)
        return '' if not birthday?.length
        "b. #{birthday}"
      else
        artist.birthday


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

  toJSONLD: (artist) ->
    compactObject {
      "@context": "http://schema.org"
      "@type": "Person"
      additionalType: 'Artist'
      image: artist.image?.url || ''
      name: artist.name
      url: "#{APP_URL}#{artist.href}"
      gender: artist.gender
      birthDate: artist.birthday
      deathDate: artist.deathday
      mainEntityOfPage: "#{APP_URL}#{artist.href}"
      description: artist.meta.description
      nationality:
        "@type": 'Country'
        name: artist.nationality
      makesOffer: _.map artist.artworks, @artworkJsonLD
    }

  artworkJsonLD: (artwork) ->
    compactObject {
      "@type": 'Offer'
      price: artwork.sale_message
      offeredBy:
        "@type": 'ArtGallery'
        name: artwork.partner.name
        url: artwork.partner.url
      itemOffered:
        "@type": 'Product'
        additionalType: artwork.medium
        name: artwork.title
        productionDate: ''
        url: "#{APP_URL}#{artwork.href}"
        image:
          "@type": 'ImageObject'
          thumbnailUrl: artwork.image?.url || ''
    }

  formatAuctionDetail: (auction) ->
    if auction.live_start_at and moment().isAfter(auction.live_start_at)
      'Live Bidding Now Open'
    else
      label = if auction.live_start_at then 'Live Bidding Opens' else 'Auction Closes'
      end = if auction.live_start_at then moment(auction.live_start_at) else moment(auction.end_at)
      minuteFormat = if end.minute() > 0 then ':mm' else ''
      end.format('[' + label + '] MMM D [at] h' + minuteFormat + ' A');

  hasOverviewHeaderMeta: (artist) -> artist.biography_blurb?.text?.length || @artistMeta(artist).length
