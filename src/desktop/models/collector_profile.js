/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _CollectorProfile;
const _ = require('underscore');
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;
const { CollectorProfileRelations } = require('./mixins/relations/collector_profile');

export default (_CollectorProfile = (function() {
  _CollectorProfile = class CollectorProfile extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, CollectorProfileRelations);

      this.prototype.url = `${API_URL}/api/v1/me/collector_profile`;
    }

    isNew() { return false; } // Always use PUT

    isCollector() {
      return this.get('collector_level') >= 3;
    }

    isCommercial() {
      return this.get('collector_level') >= 2;
    }

    isWithProfessionalBuyerApplicationPending() {
      return (this.get('professional_buyer_applied_at') != null);
    }

    isProfessionalBuyer() {
      return (this.get('professional_buyer_at') != null);
    }

    findOrCreate(options) {
      if (options == null) { options = {}; }
      return Promise.resolve(this.save({}, options));
    }
  };
  _CollectorProfile.initClass();
  return _CollectorProfile;
})());
export const CollectorProfile = _CollectorProfile
