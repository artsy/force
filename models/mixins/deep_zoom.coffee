module.exports =
  canDeepZoom: ->
    @get('tile_base_url')? and
    @get('tile_size')? and
    @get('tile_overlap')? and
    @get('tile_format')? and
    @get('max_tiled_height')? and
    @get('max_tiled_width')?

  deepZoomJson: ->
    if @canDeepZoom()
      # Ensure that tilesUrl has a trailing slash
      tilesUrl = @get('tile_base_url').replace(/\/?$/, '/')
      {
        Image:
          xmlns: 'http://schemas.microsoft.com/deepzoom/2008'
          Url: tilesUrl
          Format: @get('tile_format')
          TileSize: @get('tile_size')
          Overlap: @get('tile_overlap')
          Size:
            Width: @get('max_tiled_width')
            Height: @get('max_tiled_height')
      }
    else
      {}
