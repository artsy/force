/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { POSITRON_URL, API_URL } = require('sharify').data;

export const ShowRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { Articles } = require('../../../collections/articles');
    const { Artists } = require('../../../collections/artists');
    const { ShowEvents } = require('../../../collections/show_events');
    const { InstallShots } = require('../../../collections/install_shots');
    const Fair = require('../../fair.coffee');

    const articles = new Articles;
    articles.url = `${POSITRON_URL}/api/articles?show_id=${this.get('_id')}&published=true`;

    const artists = new Artists(this.get('artists'));

    const showEvents = new ShowEvents(this.get('events'));

    const installShots = new InstallShots;
    installShots.url = `${API_URL}/api/v1/partner_show/${this.id}/images`;

    const fair = new Fair(this.get('fair'));

    return this.__related__ = {
      articles,
      artists,
      showEvents,
      installShots,
      fair
    };
  },

  rebuild() {
    const { showEvents, artists, fair } = this.related();
    showEvents.reset(this.get('events'), {silent: true});
    artists.reset(this.get('artists'), {silent: true});
    return fair.set(this.get('fair'), {silent: true});
  }
};
