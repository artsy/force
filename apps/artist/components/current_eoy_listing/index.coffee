_ = require 'underscore'
fetchEOY2016Lists = require '../../../../components/eoy_artist_list/server.coffee'

module.exports = (artist) ->
  fetchEOY2016Lists()
    .then ({ article_link, headline, image, lists }) ->
      list = _.find(lists, ({ artists }) -> _.any(artists, ({ slug }) -> slug is artist.id))
      if list
        {
          type: 'eoy',
          href: article_link,
          imageUrl: image,
          heading: 'FEATURED IN',
          name: list.headline,
          detail: headline,
        }
      else
        null
