/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export const UserRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { CollectorProfile } = require('../../collector_profile');
    const { Location } = require('../../location');
    const { CreditCards } = require('../../../collections/credit_cards');
    const { SavedArtworks } = require('../../../collections/saved_artworks');

    const collectorProfile = new CollectorProfile;

    const location = new Location(this.get('location'));

    const account = new Backbone.Model;
    account.url = `${API_URL}/api/v1/user`;
    account.fetch = _.wrap(account.fetch, (fetch, options) => {
      if (options == null) { options = {}; }
      options.data = this.pick('email');
      return fetch.call(account, options);
    });

    const authentications = new Backbone.Collection(this.get('authentications'));
    authentications.url = `${API_URL}/api/v1/me/authentications`;

    const creditCards = new CreditCards;

    const savedArtworks = new SavedArtworks;

    return this.__related__ = {
      collectorProfile,
      account,
      location,
      authentications,
      creditCards,
      savedArtworks
    };
  }
};
