/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerArtist;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image, Markdown } = require('@artsy/backbone-mixins');
const { API_URL } = require('sharify').data;
const { SECURE_IMAGES_URL } = require('sharify').data;

export default (_PartnerArtist = (function() {
  _PartnerArtist = class PartnerArtist extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, Markdown);
    }

    href() { return `/partner/${this.get('partner').id}/artists/${this.get('artist').id}`; }
  };
  _PartnerArtist.initClass();
  return _PartnerArtist;
})());
export const PartnerArtist = _PartnerArtist
