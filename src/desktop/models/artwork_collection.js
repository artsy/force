/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ArtworkCollection;
const Backbone = require('backbone');
const _ = require('underscore');
const sd = require('sharify').data;
const { Artworks } = require('../collections/artworks');
const { Artwork } = require('./artwork');

//
// Lifecycle for determining if artworks belong to this collection:
//
//  1. When artworks are initialized in groups
//     `CurrentUser.defaultArtworkCollection().syncSavedArtworks` is called.
//  2. Now `@artworkIdsToSync` looks at its models, the contents of
//     `repoArtworkIds`, and an array of artwork slugs that are currently
//     being requested or have already been requested, `@unsavedCache`. The result is
//     an array or artwork slugs to ask the server if they belong in this collection.
//  3. This array result is queued as an array of params, `@pendingRequests`, in groups
//     of `@requestSlugMax` (currently 20). This keeps server response time reasonable.
//  4. Results fire add events for individual artworks and are silently added to the
//     collection in groups until the `@pendingRequets` is empty.
//  5. If `UserFavorites` gets to its footer, it will set `@allFetched`
//     to true, some internal clean up is done, and no more requests are necessary.
//

// Corresponds to the rails model called 'Collection'
export default (_ArtworkCollection = (function() {
  _ArtworkCollection = class ArtworkCollection extends Backbone.Model {
    static initClass() {

      this.prototype.allFetched = false;
      this.prototype.defaultPageSize = 20;
      this.prototype.defaultSortOrder = "-position";

      // This collection keepss around known artworks that were *not* saved
      // to prevent duplicate requests.
      this.prototype.unsavedCache = [];

      // All artwork ids
      this.prototype.repoArtworkIds = [];

      this.prototype.requestSlugMax = 20;
      this.prototype.pendingRequests = [];
      this.prototype.completedRequests = [];

      this.prototype.defaults =
        {id: 'saved-artwork'};
    }

    urlRoot() { return `${sd.API_URL}/api/v1/collection`; }

    initialize() {
      if (!this.get('userId')) { throw "userId is required"; }
      return this.set('artworks', new Artworks);
    }

    addRepoArtworks(artworks) {
      const ids = artworks instanceof Backbone.Collection ? artworks.pluck('id') : _.pluck(artworks, 'id');
      return this.repoArtworkIds = _.union(this.repoArtworkIds, ids);
    }

    // Additional trigger for the specific artwork to reduce tons of
    // bindings that will loop through the collection to see if a specific
    // work was added
    saveArtwork(artworkId, options) {
      const artwork = new Artwork({id: artworkId});
      this._save(artwork, options);
      const model = new Backbone.Model;
      model.url = `${this.url()}/artwork/${artworkId}?user_id=${this.get('userId')}`;
      model.save(null, {
        data: (options != null ? options.data : undefined),
        success: (options != null ? options.success : undefined),
        error: error => {
          if (sd.NODE_ENV !== 'test') {
            this._unsave(artwork, options);
          }
          return __guard__(options != null ? options.error : undefined, x => x.apply(this, arguments));
        }
      }
      );
      return false;
    }

    _save(artwork, options) {
      if (options != null ? options.silent : undefined) {
        this.get('artworks').add(artwork, { silent: true, at: 0 });
      } else {
        this.get('artworks').add(artwork, { at: 0 });
        this.trigger(`add:${artwork.get('id')}`);
      }
      return this.removeFromUnsavedCache(artwork);
    }

    unsaveArtwork(artworkId, options) {
      const artwork = new Artwork({id: artworkId});
      this._unsave(artwork, options);
      const model = new Backbone.Model;
      model.url = `${this.url()}/artwork/${artworkId}?user_id=${this.get('userId')}`;
      model.isNew = () => false;
      return model.destroy({
        success: (options != null ? options.success : undefined),
        error: error => {
          if (sd.NODE_ENV !== 'test') {
            this._save(artwork, options);
          }
          return __guardMethod__(options, 'error', o => o.error(error));
        }
      });
    }

    _unsave(artwork, options) {
      if (((options != null ? options.silent : undefined) != null) && options.silent) {
        this.get('artworks').remove(artwork, { silent: true });
      } else {
        this.get('artworks').remove(artwork);
        this.trigger(`remove:${artwork.get('id')}`);
      }
      this.unsavedCache.push(artwork.get('id'));
      return this.unsavedCache.sort();
    }

    isSaved(artwork) {
      return (this.get('artworks').get(artwork.id) != null);
    }

    broadcastSaved() {
      return this.get('artworks').each(artwork => this.trigger(`add:${artwork.get('id')}`));
    }

    // Returns all ids of the Repository artworks that are not in
    // this collection and are not in this.unsavedCache.
    artworkIdsToSync() {
      // Filter out the current saved favs, and requested non-favs
      let artworkIds = [];
      if (this.repoArtworkIds.length > 0) {
        // Filter out known saves
        artworkIds = _.difference(this.repoArtworkIds, this.get('artworks').pluck('id'));
        // Filter out known unsaves,
        artworkIds = _.difference(artworkIds, this.unsavedCache);
      }

      // These are ids we have not requested before
      return artworkIds;
    }

    removeFromUnsavedCache(artwork) {
      const index = _.indexOf(this.unsavedCache, artwork.get('id'), true);
      if (index !== -1) { return this.unsavedCache.splice(index, 1); }
    }

    // Call this from views after one or more artworks are fetched
    syncSavedArtworks() {
      if (!(sd.CURRENT_USER != null ? sd.CURRENT_USER.id : undefined)) { return false; }

      // After adding a work to the collection for the 1st time, we will have a 'real' collection
      this.collectionExists = true;

      // Re-trigger any existing saves.
      this.broadcastSaved();

      if (this.allFetched) {
        // clean up the internal state
        this.unsavedCache = (this.pendingRequests = (this.completedRequests = []));
        return;
      }

      const artworkIds = this.artworkIdsToSync();
      if (artworkIds.length < 1) { return false; }

      // Assume all of these new ids to check will fail (are not saved)
      if (this.unsavedCache.length === 0) {
        // if this is the first run, assume all of these are not saved
        this.unsavedCache = artworkIds;
      } else {
        _.each(artworkIds, id => this.unsavedCache.push(id));
      }
      this.unsavedCache.sort();
      this.unsavedCache = _.uniq(this.unsavedCache, true);

      // Add URLs to the queue, @requestSlugMax artworkIds at a time
      let artworkIdsCopy = artworkIds.slice();
      let paramIds = artworkIdsCopy.slice(0, +this.requestSlugMax + 1 || undefined);
      while (paramIds.length > 0) {
        artworkIdsCopy = artworkIdsCopy.slice(this.requestSlugMax);
        // Todo: find a jQuery.param substitute
        const params = $.param({ artworks: paramIds });
        if (_.indexOf(this.completedRequests, params, true) === -1) {
          this.pendingRequests.push(params);
        }
        paramIds = artworkIdsCopy.slice(0, +this.requestSlugMax + 1 || undefined);
      }
      this.processRequests();
      return true;
    }

    processRequests() {
      if (!(this.pendingRequests.length > 0)) { return; }
      const params = this.pendingRequests.pop();

      return this.fetchArtworks({
        params,
        success: () => {
          // Keep track of completed requests
          this.completedRequests.push(params);
          this.completedRequests.sort();
          return this.processRequests();
        }
      });
    }

    displayable() { return !this.get('private') && this.collectionExists; }

    ensureFetched(success) {
      if (this.get('fetched')) { return success(); }
      return this.on('change:fetched', success);
    }

    // override fetch
    // - pass in user_id and private params
    // - cope with a non-existant collection (users who have never saved an artwork have no collection)
    fetch(options) {
      const privateCollection = (sd.CURRENT_USER != null ? sd.CURRENT_USER.id : undefined) === this.get('userId');
      const model = new Backbone.Model;
      model.url = this.url();
      return model.fetch({
        data: {
          user_id: this.get('userId'),
          private: privateCollection
        },
        success: response => {
          this.collectionExists = true;
          this.set(response);
          this.set({fetched: true});
          return __guardMethod__(options, 'success', o => o.success(response));
        },
        error: response => {
          this.collectionExists = false;
          this.set({fetched: true});
          return __guardMethod__(options, 'error', o => o.error(response));
        }
      });
    }

    fetchArtworks(options) {
      // ensure that this model is fetched before seeing if artworks are in the collection
      return this.ensureFetched(() => {
        const artworks = new Artworks;
        artworks.url = `${this.url()}/artworks?${options.params}`;
        return artworks.fetch({
          data: {
            user_id: this.get('userId'),
            private: true
          },
          error: response => {
            return __guardMethod__(options, 'error', o => o.error(response));
          },
          success: response => {
            const savedArtworks = [];
            _.each(response.models, savedArtworkJSON => {
              const savedArtwork = new Artwork(savedArtworkJSON);
              savedArtworks.push(savedArtwork);
              this.removeFromUnsavedCache(savedArtwork);
              // We're adding these wholesale, so we need to trigger 'add' for individual listeners
              return _.defer(() => this.trigger(`add:${savedArtworkJSON.id}`));
            });
            this.get('artworks').add(savedArtworks, { silent: true });
            __guardMethod__(options, 'success', o => o.success(savedArtworks));
            return this.trigger('artworksFetched');
          }
        });
      });
    }
  };
  _ArtworkCollection.initClass();
  return _ArtworkCollection;
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
export const ArtworkCollection = _ArtworkCollection
