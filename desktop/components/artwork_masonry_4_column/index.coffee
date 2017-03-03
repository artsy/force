{ min, each } = require 'underscore'

# TODO: Refactor this and artwork_masonry to support a dynamic number of columns
# and then remove this folder.

module.exports = (artworks, heights = [0, 0, 0, 0]) ->
  columns = [
    [], [], [], []
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
