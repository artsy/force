/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const SaleRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { SaleArtworks } = require('../../../collections/sale_artworks');
    const { Artworks } = require('../../../collections/artworks');
    const { Profile } = require('../../profile');
    const { Sale } = require('../../sale');

    const saleArtworks = new SaleArtworks([], {id: this.id});
    const artworks = new Artworks;
    const profile = new Profile(this.get('profile'));
    const sale = new Sale(this.get('associated_sale'));

    return this.__related__ = {
      saleArtworks,
      artworks,
      profile,
      sale
    };
  }
};
