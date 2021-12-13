/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { API_URL, APP_URL, POSITRON_URL } = require('sharify').data;
const Backbone = require('backbone');

export const ArtistRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { Artist } = require('../../artist');
    const { PartnerShows } = require('../../../collections/partner_shows');
    const { Artworks } = require('../../../collections/artworks');
    const { Articles } = require('../../../collections/articles');

    const artists = new Backbone.Collection([], {model: Artist});
    artists.url = `${API_URL}/api/v1/related/layer/main/artists?artist[]=${this.id}&exclude_artists_without_artworks=true`;

    const contemporary = new Backbone.Collection([], {model: Artist});
    contemporary.url = `${API_URL}/api/v1/related/layer/contemporary/artists?artist[]=${this.id}&exclude_artists_without_artworks=true`;

    const shows = new PartnerShows;
    shows.url = `${API_URL}/api/v1/related/shows?artist_id=${this.id}&sort=-end_at&displayable=true`;
    shows.comparator = function(show) {
      if (show.isFairBooth()) {
        return 1;
      } else if (show.isSolo()) {
        return -1;
      } else {
        return 0;
      }
    };

    const artworks = new Artworks;
    artworks.url = `${this.url()}/artworks?published=true`;

    const articles = new Articles;
    articles.url = () => {
      return `${POSITRON_URL}/api/articles?artist_id=${this.get('_id')}&published=true`;
    };

    return this.__related__ = {
      artists,
      contemporary,
      shows,
      artworks,
      articles
    };
  }
};
