_ = require 'underscore'
{ slugify } = require 'underscore.string'
{ compactObject } = require '../../../models/mixins/compact_object.coffee'
sd = require('sharify').data

module.exports =

  toJSONLD: (show) ->
    compactObject {
      "@context": "http://schema.org"
      "@type": "Event"
      name: show.get('name')
      image: show.get('image_url')
      url: "#{sd.APP_URL}/show/#{show.get('id')}"
      startDate: (new Date(show.get('start_at'))).toISOString()
      endDate: (new Date(show.get('end_at'))).toISOString()
      location: @toJSONLDLocation(show.location()) if show.location()
      performer: @performers(show)
    } if show.location()?

  performers: (show) ->
    @toJSONLDShortArtist(artist) for artist in show.get('artists') if show.get('artists')?

  toJSONLDShortArtist: (artist) ->
    compactObject {
      "@type": "Person"
      image: artist.image_url
      name: artist.name
      sameAs: "#{sd.APP_URL}/artist/#{artist.sortable_id}"
    }

  toJSONLDLocation: (location) ->
    address = [location.get('address') or '', location.get('address_2') or ''].join('')
    compactObject {
      "@type": "Place"
      name: location.get('name')
      address: compactObject {
        "@type": "PostalAddress"
        streetAddress: address
        addressLocality: location.get('city')
        addressRegion: location.get('state')
        postalCode: location.get('postal_code')
        addressCountry: if location.get('country')?.length > 0 then location.get('country')
      }
    }
