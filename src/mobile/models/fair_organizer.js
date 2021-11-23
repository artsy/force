/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FairOrganizer;
const sd = require('sharify').data;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image, Markdown } = require('@artsy/backbone-mixins');

export default (_FairOrganizer = (function() {
  _FairOrganizer = class FairOrganizer extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/fair_organizer`;
    }
  };
  _FairOrganizer.initClass();
  return _FairOrganizer;
})());
export const FairOrganizer = _FairOrganizer
