{ some } = require 'underscore'

module.exports =
  isWithConsignableArtists: ({ artists }) ->
    some artists, ({ is_consignable }) -> is_consignable
