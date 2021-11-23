/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { API_URL, POSITRON_URL } = require('sharify').data;

export const PartnerShowRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    this.on('sync', this.rebuild);

    const { Articles } = require('../../../collections/articles');
    const { Artworks } = require('../../../collections/artworks');
    const { Artists } = require('../../../collections/artists');
    const { InstallShots } = require('../../../collections/install_shots');
    const { PartnerShowEvents } = require('../../../collections/partner_show_events');
    const { Partner } = require('../../partner');
    const { Fair } = require('../../fair');
    const { Profile } = require('../../profile');

    const artworks = new Artworks;
    artworks.url = () => `${this.url()}/artworks?published=true`;

    const artists = new Artists(this.get('artists'));

    const articles = new Articles;
    articles.url = `${POSITRON_URL}/api/articles?show_id=${this.get('_id')}&published=true`;

    const installShots = new InstallShots;
    installShots.url = `${API_URL}/api/v1/partner_show/${this.id}/images`;

    const partner = new Partner(this.get('partner'));

    const fair = new Fair(this.get('fair'));

    const profile = new Profile({id: partner.get('default_profile_id')});

    const showEvents = new PartnerShowEvents(this.get('events'));

    return this.__related__ = {
      artworks,
      artists,
      articles,
      installShots,
      partner,
      fair,
      profile,
      showEvents
    };
  },

  rebuild() {
    const { artists, partner, fair, profile, showEvents } = this.related();
    artists.reset(this.get('artists'), {silent: true});
    partner.set(this.get('partner'), {silent: true});
    fair.set(this.get('fair'), {silent: true});
    profile.set('id', partner.get('default_profile_id'), {silent: true});
    return showEvents.reset(this.get('events'), {silent: true});
  }
};

export default PartnerShowRelations