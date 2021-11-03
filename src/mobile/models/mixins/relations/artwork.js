/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { API_URL } = require('sharify').data;

export const ArtworkRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { Artist } = require('../../artist');
    const { SaleArtwork } = require('../../sale_artwork');
    const { Partner } = require('../../partner');

    const { Artworks } = require('../../../collections/artworks');
    const { Sales } = require('../../../collections/sales');
    const { Artists } = require('../../../collections/artists');

    const artist = new Artist(this.get('artist'));
    const saleArtwork = new SaleArtwork(this.get('sale_artwork'));
    const partner = new Partner(this.get('partner'));
    const artists = new Artists(this.get('artists'));

    const sales = new Sales;
    sales.url = `${API_URL}/api/v1/related/sales?artwork[]=${this.id}&active=true&cache_bust=${Math.random()}`;

    const artworks = new Artworks;
    artworks.url = `${API_URL}/api/v1/related/layer/synthetic/main/artworks?artwork[]=${this.id}`;

    return this.__related__ = {
      artist,
      saleArtwork,
      partner,
      sales,
      artists,
      artworks
    };
  }
};
