Q = require 'bluebird-q'
_ = require 'underscore'
items = require './items.coffee'
Artwork = require '../../models/artwork.coffee'

@index = (req, res, next) ->
  artworkItems = _.map items, (value, key) ->
    {
      type: key,
      artwork: new Artwork id: value
    }

  Q.all(
    _.map(artworkItems, ({artwork}) -> artwork.fetch())
  ).then(->
    console.log('artworkItems', artworkItems)
    res.render 'index', items: artworkItems
  ).catch(next)

