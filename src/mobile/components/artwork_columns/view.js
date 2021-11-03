/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ArtworkColumns;
const Backbone = require('backbone');
const artworkColumns = function() { return require('./template.jade')(...arguments); };
const artworkItem = function() { return require('./artwork.jade')(...arguments); };

export const ArtworkColumns = (_ArtworkColumns = class ArtworkColumns extends Backbone.View {

  // Build up columns of artworks, then append to each existing column
  renderArtworks(artworkColumns) {
    if (artworkColumns[0].length === 0) { return; }
    return (() => {
      const result = [];
      for (let index = 0; index < artworkColumns.length; index++) {
        const artworkColumn = artworkColumns[index];
        const column = [];
        const size = artworkColumn.length === 1 ? 'large' : 'tall';
        for (let artwork of Array.from(artworkColumn)) {
          column.push(artworkItem({ artwork, size }));
        }
        result.push(this.$(`.artwork-columns-column:nth-of-type(${index + 1})`).append(column.join('')));
      }
      return result;
    })();
  }
});
