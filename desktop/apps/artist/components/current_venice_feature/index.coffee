_ = require 'underscore'
Q = require 'bluebird-q'
request = require 'superagent'
cache = require '../../../../lib/cache.coffee'

cacheKey = "venice-2017"

fetchVeniceArtists = ->
  Q.promise (resolve, reject) ->
    cache.get cacheKey, (err, cachedData) ->
      return reject(err) if err
      return resolve(JSON.parse(cachedData)) if cachedData

      request
        .get "http://files.artsy.net/force/venice_2017_artists.json"
        .end (err, res) =>
          if res?.ok
            try
              data = JSON.parse res.text
              cache.set "venice-2017", res.text
              resolve(data)
            catch e
              reject(e)
          else
            reject(res?.error or err.response)

module.exports = (artist, fetch = fetchVeniceArtists) ->
  fetch()
    .then (veniceArtists) ->
      for veniceArtist in veniceArtists
        if veniceArtist.slug == artist.id
          return {
            type: 'eoy',
            href: '/venice-biennale',
            imageUrl: 'http://files.artsy.net/images/venice_2017.jpg',
            heading: if veniceArtist.featured then 'INSIDE THE BIENNALE' else '57TH VENICE BIENNALE PARTICIPANT',
            name: if veniceArtist.featured
                    name = artist.name + (if artist.name.slice(-1) == "s" then "’" else "’s")
                    "See #{name} work in 360 degrees at the 57th Venice Biennale"
                  else
                    "See the world’s most influential art exhibition in 360 degrees"
          }
