/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const PartnerRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { PartnerLocations } = require('../../../collections/partner_locations');
    const { PartnerShows } = require('../../../collections/partner_shows');

    const locations = new PartnerLocations([], {partnerId: this.id});
    const shows = new PartnerShows([], {partnerId: this.id});

    return this.__related__ = {
      locations,
      shows
    };
  }
};
