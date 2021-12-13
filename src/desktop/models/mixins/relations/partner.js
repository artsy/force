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
    const { Profile } = require('../../../models/profile');

    const locations = new PartnerLocations;
    locations.url = `${this.url()}/locations?size=20`;

    const shows = new PartnerShows([], {partnerId: this.id});
    shows.url = `${this.url()}/shows?sort=-featured,-end_at`;

    const profile = new Profile({id: this.get('default_profile_id')});

    return this.__related__ = {
      locations,
      shows,
      profile
    };
  }
};
