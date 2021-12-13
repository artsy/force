/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { API_URL } = require('sharify').data;
const Backbone = require('backbone');

export const GeneRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { Artists } = require('../../../collections/artists');
    const { Artworks } = require('../../../collections/artworks');

    const artists = new Artists;
    artists.url = `${API_URL}/api/v1/gene/${this.id}/artists?exclude_artists_without_artworks=true`;

    const artworks = new Artworks;
    artworks.url = `${this.url()}/artworks?published=true`;

    const family = new Backbone.Model(this.get('family'));

    return this.__related__ = {
      artists,
      artworks,
      family
    };
  }
};
