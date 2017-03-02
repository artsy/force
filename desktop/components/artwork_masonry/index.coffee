{ min, each } = require 'underscore'

# TODO: UPDATE WITH n COLUMNS

module.exports = (artworks, heights = [0, 0, 0]) ->
  columns = [
    [], [], []
  ]

  valid = ({ image }) ->
    image.thumb.height?

  artworks.map (artwork) ->
    if valid artwork
      i = heights.indexOf min heights
      heights[i] += artwork.image.thumb.height
      columns[i].push artwork
    else

  { columns, heights }
