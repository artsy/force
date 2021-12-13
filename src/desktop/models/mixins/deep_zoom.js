/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const DeepZoom = function(SECURE_IMAGES_URL) {
  return {
    canDeepZoom() {
      return (this.get('tile_base_url') != null) &&
      (this.get('tile_size') != null) &&
      (this.get('tile_overlap') != null) &&
      (this.get('tile_format') != null) &&
      (this.get('max_tiled_height') != null) &&
      (this.get('max_tiled_width') != null);
    },

    deepZoomJson() {
      if (this.canDeepZoom()) {
        // Ensure that tilesUrl has a trailing slash
        let tilesUrl = this.get('tile_base_url').replace(/\/?$/, '/');
        // Serve under SSL if we can
        if (SECURE_IMAGES_URL) {
          tilesUrl = tilesUrl.replace(/http:\/\/([^\/]+)/, SECURE_IMAGES_URL);
        }
        return {
          Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
            Url: tilesUrl,
            Format: this.get('tile_format'),
            TileSize: this.get('tile_size'),
            Overlap: this.get('tile_overlap'),
            Size: {
              Width: this.get('max_tiled_width'),
              Height: this.get('max_tiled_height')
            }
          }
        };
      } else {
        return {};
      }
    }
  };
};
