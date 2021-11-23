/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FilterSuggest;
const _s = require('underscore.string');
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export default (_FilterSuggest = class FilterSuggest extends Backbone.Model {
  url() {
    return `${API_URL}/api/v1/search/filtered/${this.get('id')}/suggest`;
  }

  mediumsHash(options) {
    const mediums = {};
    const object = this.get('medium');
    for (let label in object) {
      const count = object[label];
      mediums[_s.titleize(_s.humanize(label))] = label;
    }
    return mediums;
  }
});
export const FilterSuggest = _FilterSuggest
