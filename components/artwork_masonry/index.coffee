{ min, reduce } = require 'underscore'

module.exports = (artworks) ->
  columns = [
    [], [], []
  ]

  calculate = (column) ->
    reduce column, (memo, { image }) ->
      memo + image.thumb.height
    , 0

  choose = (image) ->
    min columns, calculate

  artworks.map (artwork) ->
    choose artwork.image
      .push artwork

  columns
