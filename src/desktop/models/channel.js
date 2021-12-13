/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Channel;
const sd = require('sharify').data;
const Backbone = require('backbone');

export default (_Channel = (function() {
  _Channel = class Channel extends Backbone.Model {
    static initClass() {

      this.prototype.urlRoot = `${sd.POSITRON_URL}/api/channels`;
    }

    isTeam() {
      return this.get('type') === 'team';
    }
  };
  _Channel.initClass();
  return _Channel;
})());
export const Channel = _Channel
