/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SavedArtwork;
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export default (_SavedArtwork = (function() {
  _SavedArtwork = class SavedArtwork extends Backbone.Model {
    static initClass() {
      this.prototype.urlRoot = `${API_URL}/api/v1/collection/saved-artwork/artwork`;
    }
  };
  _SavedArtwork.initClass();
  return _SavedArtwork;
})());
export const SavedArtwork = _SavedArtwork
