/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// The result of merging the current user models from the old Force and
// Microgravity projects. Because this model wraps the session, which is now
// shared, we need to be careful to co-locate the code and not let methods of
// one override the other.
//
let _CurrentUser, sd;
const _ = require('underscore');
const Backbone = require('backbone');
const request = require('superagent');
const ABM = require('@artsy/backbone-mixins');
const { API_URL, CURRENT_USER } = (sd = require('sharify').data);
const Following = require('../desktop/components/follow_button/collection.coffee');
const { Artists } = require('../desktop/collections/artists');
let { Genes } = require('../desktop/collections/genes');
const { Artworks } = require('../desktop/collections/artworks');
({ Genes } = require('../desktop/collections/genes'));
const { User } = require('../desktop/models/user');
const { ArtworkCollection } = require('../desktop/models/artwork_collection');
const { Location } = require('../mobile/models/location');

export default (_CurrentUser = (function() {
  _CurrentUser = class CurrentUser extends User {
    constructor(...args) {
      super(...args);
      this.savedArtwork = this.savedArtwork.bind(this);
      this.unfollowArtist = this.unfollowArtist.bind(this);
      this.saveArtwork = this.saveArtwork.bind(this);
      this.removeArtwork = this.removeArtwork.bind(this);
    }

    static initClass() {
      // _.extend(this.prototype, User.prototype);
      _.extend(this.prototype, ABM.CurrentUser(sd.API_URL));

      this.prototype.__isLoggedIn__ = true;
      this.prototype.__isRecentlyRegistered__ = false;

      this.prototype.defaults = {
        followArtists: null,
        followGenes: null
      };
    }

    url() {
      return `${sd.API_URL}/api/v1/me`;
    }

    href() { return `/${this.get('default_profile_id')}`; }

    // Should only be run after the user has been fetched and has an id
    initializeDefaultArtworkCollection(options) {
      if (!(__guard__(this.get('artworkCollections'), x => x.length) > 0)) {
        this.set({artworkCollections: [new ArtworkCollection({userId: this.get('id')})]});
      }
      if (!this.defaultArtworkCollection.fetched) { return this.defaultArtworkCollection().fetch(options); }
    }

    defaultArtworkCollection() {
      if (__guard__(this.get('artworkCollections'), x => x[0]) == null) {
        throw Error("Must call CurrentUser#initializeDefaultArtworkCollection " +
              "before accessing the default artwork collection."
        );
        return;
      }
      return this.get('artworkCollections')[0];
    }

    hasLabFeature(featureName) {
      return _.contains(this.get('lab_features'), featureName);
    }

    // Retreive a list of genes the user is following
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    followingGenes(options) {
      const url = `${this.url()}/follow/genes`;
      const data = {access_token: this.get('accessToken')};
      this.set({followGenes: new Genes()});
      return this.get('followGenes').fetchUntilEnd(_.extend({ url, data }, options));
    }

    fetchSuggestedHomepageArtworks(options) {
      if (options == null) { options = {}; }
      return new Artworks().fetch(_.extend(options,
        {url: `${sd.API_URL}/api/v1/me/suggested/artworks/homepage`})
      );
    }

    fetchRegistrations(options) {
      return new Backbone.Collection().fetch(_.extend({}, options, {
        url: `${sd.API_URL}/api/v1/me/bidders`,
        data: { access_token: this.get('accessToken')
      },
        complete: options.complete,
        success: _.wrap(options.success, (success, collection) => success(collection))
      }
      )
      );
    }

    checkRegisteredForAuction(options) {
      return new Backbone.Collection().fetch(_.extend({}, options, {
        url: `${sd.API_URL}/api/v1/me/bidders`,
        data: { sale_id: options.saleId, access_token: this.get('accessToken')
      },
        complete: options.complete,
        success: _.wrap(options.success, (success, collection) => success(collection.length > 0))
      }
      )
      );
    }

    fetchNotificationBundles(options) {
      return new Backbone.Model().fetch({
        url: `${this.url()}/notifications/feed`,
        success: (options != null ? options.success : undefined),
        data: {
          size: 10,
          access_token: this.get('accessToken')
        }
      });
    }

    hasUnviewedNotifications(options) {
      return new Promise(resolve => {
        return request.
          head(`${this.url()}/notifications`).
          query({
            type: 'ArtworkPublished',
            after_status: 'viewed',
            size: 0,
            total_count: 1,
            access_token: this.get('accessToken')
          }).
          end((err, res) => resolve(res.header['x-total-count'] > 0));
      });
    }

    fetchAndMarkNotifications(status, options) {
      if (status == null) { status = 'read'; }
      const url = `${this.url()}/notifications`;
      this.set({unreadNotifications: new Backbone.Collection()});
      return this.get('unreadNotifications').fetch({
        url,
        data: {
          type: 'ArtworkPublished',
          unread: true,
          size: 100,
          access_token: this.get('accessToken')
        },
        success: () => {
          return this.markNotifications('read', options);
        }
      });
    }

    findOrCreate(options) {
      if (options == null) { options = {}; }
      return Promise.resolve(this.fetch(options));
    }

    isLinkedTo(provider) {
      return this.related().authentications.where({provider}).length > 0;
    }

    isChecked(attribute) {
      if (_.isBoolean(this.get(attribute)) && this.get(attribute)) { return true; } else { return undefined; }
    }

    location() {
      if (this.get('location')) { return new Location(this.get('location')); }
    }

    // Creates a bid position using /api/v1/me/bidder_position.
    //
    // @param {Object} params Query params sent to API
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

    placeBid(params, options) {
      if (options == null) { options = {}; }
      return new Backbone.Model(params).save(null, _.extend(options, {
        url: `${API_URL}/api/v1/me/bidder_position` +
          (this.get('accessToken') ? '?access_token=' + this.get('accessToken') : '')
      }
      )
      );
    }

    // Checks whether a user registered for an auction.
    //
    // @param {String} auctionId
    // @param {Object} options Provide `success` and `error` callbacks, successes with true or false

    registeredForAuction(auctionId, options) {
      if (options == null) { options = {}; }
      return new Backbone.Collection().fetch({
        url: `${API_URL}/api/v1/me/bidders`,
        data: { access_token: this.get('accessToken'), sale_id: auctionId
      },
        success(bidders) {
          return (typeof options.success === 'function' ? options.success((bidders != null ? bidders.length : undefined) > 0) : undefined);
        },
        error(m, xhr) {
          if (xhr.responseText != null ? xhr.responseText.match('A user is required') : undefined) { options.success(false); }
          return (typeof options.error === 'function' ? options.error(...arguments) : undefined);
        }
      });
    }

    // Checks whether a user has favorited an artwork.
    //
    // @param {String} artworkId
    // @param {Object} options Provide `success` and `error` callbacks, successes with true or false
    savedArtwork(artworkId, options) {
      if (options == null) { options = {}; }
      return new Backbone.Collection().fetch({
        url: `${API_URL}/api/v1/collection/saved-artwork/artworks?artworks[]=${artworkId}&private=true&user_id=${this.get('id')}`,
        success(artworks) {
          return (typeof options.success === 'function' ? options.success(artworks.length > 0) : undefined);
        },
        error(m, xhr) {
          if ((xhr.responseText != null ? xhr.responseText.match('Collection not found') : undefined)) {
            return options.success(false);
          } else {
            return (typeof options.error === 'function' ? options.error(...arguments) : undefined);
          }
        }
      });
    }

    // Unfollows the artist
    //
    // @params {String} artistId
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    unfollowArtist(artistId, options) {
      if (options == null) { options = {}; }
      const artist = new Backbone.Model();
      artist.isNew = () => false;
      return artist.destroy(_.extend(options,
        {url: `${API_URL}/api/v1/me/follow/artist/${artistId}`})
      );
    }

    fetchQualifiedBidder(auctionId, options) {
      return new Backbone.Collection().fetch({
        url: `${this.url()}/bidders`,
        data: { access_token: this.get('accessToken'), sale_id: auctionId
      },
        error: options.error,
        success(bidders) {
          const bidder = bidders.find(b => b.get('sale').id === auctionId);
          if (!bidder) { return options.success(false); }
          return (typeof options.success === 'function' ? options.success(bidder != null ? bidder.get('qualified_for_bidding') : undefined) : undefined);
        }
      });
    }

    // Creates a bidder associated with a sale
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch and a saleId
    createBidder(options) {
      // For articles and puts, add access_token to model attributes, for gets it goes in the data
      const model = new Backbone.Model({sale_id: options.saleId, access_token: this.get('accessToken')});
      return model.save(null, {
        url: `${API_URL}/api/v1/bidder`,
        success: (options != null ? options.success : undefined),
        error: (options != null ? options.error : undefined)
      }
      );
    }

    fetchBidderForAuction(auction, options) {
      return new Backbone.Collection().fetch({
        url: `${this.url()}/bidders`,
        data: {
          access_token: this.get('accessToken'),
          sale_id: auction.get('id')
        },
        error: options.error,
        success: bidders => {
          const bidder = bidders.find(b => b.get('sale').id === auction.get('id'));
          if (!bidder) { return options.success(null); }
          return bidder.fetch({
            url: `${sd.API_URL}/api/v1/bidder/${bidder.id}`,
            data: {
              access_token: this.get('accessToken')
            },
            error: options.error,
            success: options.success
          });
        }
      });
    }

    fetchCreditCards(options) {
      return new Backbone.Collection().fetch({
        url: `${this.url()}/credit_cards`,
        data: {
          access_token: this.get('accessToken')
        },
        success: (options != null ? options.success : undefined)
      });
    }

    followArtist(id, options) {
      return new Following(null, {kind: 'artist'}).follow(id, _.extend(options,
        {access_token: this.get('accessToken')})
      );
    }

    // Retreive a list of artists the user is following
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    followingArtists(options) {
      const url = `${this.url()}/follow/artists`;
      const data = {access_token: this.get('accessToken')};
      this.set({followArtists: new Artists()});
      return this.get('followArtists').fetchUntilEndInParallel(_.extend({ url, data }, options));
    }

    // TODO: not sure what 'is_slumming' indicates
    isAdmin() {
      return (this.get('type') === 'Admin') && !this.get('is_slumming');
    }

    isTeam() {
      return this.get('roles').includes('team');
    }

    markNotifications(status, options) {
      if (status == null) { status = 'read'; }
      return request.put(`${this.url()}/notifications`)
        .set({'X-ACCESS-TOKEN': this.get('accessToken')})
        .send({status})
        .end((err, res) => __guardMethod__(options, 'success', o => o.success()));
    }

    // Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
    saveArtwork(artworkId, options) {
      if (options == null) { options = {}; }
      return this.defaultArtworkCollection().saveArtwork(artworkId, options);
    }

    // Removes the artwork from the user's saved-artwork collection.
    removeArtwork(artworkId, options) {
      if (options == null) { options = {}; }
      return this.defaultArtworkCollection().unsaveArtwork(artworkId, options);
    }

    // Convenience for getting the bootstrapped user or returning null.
    // This should only be used on the client.
    static orNull() {
      if (sd.CURRENT_USER) { return new (this)(sd.CURRENT_USER); } else { return null; }
    }

    // Follow an entity
    follow(id, kind, options) {
      return new Following(null, {kind}).follow(id, _.extend(options,
        {access_token: this.get('accessToken')})
      );
    }
  };
  _CurrentUser.initClass();
  return _CurrentUser;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}
export const CurrentUser = _CurrentUser