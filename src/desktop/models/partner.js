/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Partner;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Icon } = require('./icon');
const { PartnerRelations } = require('./mixins/relations/partner');

export default (_Partner = (function() {
  _Partner = class Partner extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, PartnerRelations);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/partner`;

      this.types = {
        'Auction': 'Auction House',
        'Demo': 'Demo',
        'Gallery': 'Gallery',
        'Private Collector': 'Private Collector',
        'Private Dealer': 'Gallery'
      };
    }

    displayType() {
      return this.constructor.types[this.get('type')] || 'Gallery';
    }

    icon() {
      return new Icon(this.get('icon'), {profileId: this.get('id')});
    }

    isLinkable() { return this.get('default_profile_id') && this.get('default_profile_public'); }

    alphaSortKey() {
      return this.get('sortable_id');
    }

    href() {
      return `/partner/${this.get('id')}`;
    }

    displayName() {
      return this.get('name');
    }

    defaultIconInitials() {
      let iconInitials = '';
      const reduceFunction = function(result, name) {
        if (!name[0] || !/\w/.test(name[0])) { return result; }
        return result + name[0];
      };
      iconInitials = _.reduce(__guard__(this.displayName(), x => x.split(' ')), reduceFunction, '').slice(0, 2);
      return iconInitials;
    }

    displayNameAndLocation() {
      return _.compact([
        this.displayName(),
        this.displayLocations()
      ]).join(', ');
    }

    // @param {String} preferredCity (optional)
    displayLocations(preferredCity) {
      return this.related().locations.displayLocations(preferredCity);
    }

    getMailTo() {
      if (!this.has('email') || !(this.get('email').length > 0)) { return ""; }
      const subject = encodeURIComponent(`Connecting with ${this.get('name')} via Artsy`);
      return `mailto:${this.get('email')}?subject=${subject}&cc=inquiries@artsy.net`;
    }

    getSimpleWebsite() {
      if (!this.has('website') || !(this.get('website').length > 0)) { return ""; }
      return this.get('website').replace('http://', '').replace(/\/$/g, '');
    }

    typeName() {
      if (this.get('type') === 'Gallery') { return 'Gallery'; } else { return 'Institution'; }
    }

    claimed() { return this.get('claimed'); }
  };
  _Partner.initClass();
  return _Partner;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Partner = _Partner
