/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ArtworkInquiry;
const _ = require('underscore');
const Backbone = require('backbone');
const { API_URL, SESSION_ID } = require('sharify').data;
const Cookies = require('../components/cookies/index');

export default (_ArtworkInquiry = (function() {
  _ArtworkInquiry = class ArtworkInquiry extends Backbone.Model {
    static initClass() {
      this.prototype.urlRoot = `${API_URL}/api/v1/me/artwork_inquiry_request`;

      this.prototype.defaults = {
        session_id: SESSION_ID,
        referring_url: Cookies.get('force-referrer'),
        landing_url: Cookies.get('force-session-start')
      };
    }

    send(attributes, options) {
      if (options == null) { options = {}; }
      return (this.isNew() ? this.save({}, {error: options.error}) : Promise.resolve())
        .then(() => this.save(attributes, _.extend(options, {url: `${this.url()}/send`})));
    }
  };
  _ArtworkInquiry.initClass();
  return _ArtworkInquiry;
})());
export const ArtworkInquiry = _ArtworkInquiry
