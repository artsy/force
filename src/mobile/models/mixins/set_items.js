/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const Backbone = require('backbone');
const sd = require('sharify').data;
const { FeaturedLinks } = require('../../collections/featured_links');

export const SetItems = function(ownerType) {

  // Fetches all sets and their items for the mixed-in model. Returns an array of hashes containing
  // the set data and the items from the set.
  //
  // [{
  //   set: new Backbone.Model({ item_type: 'foo' })
  //   items: new FeaturedLinks()
  // }]
  //
  // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

  return {
    fetchSetItems(options) {
      if (options == null) { options = {}; }
      const finalHashes = [];
      return new Backbone.Collection().fetch({
        url: `${sd.API_URL}/api/v1/sets?owner_type=${ownerType}&owner_id=${this.get('id')}`,
        data: {
          display_on_martsy: true
        },
        success(sets) {
          const err = null;
          const callback = _.after(sets.length, function() {
            if (err) { return options.error(err); }
            return options.success(_.sortBy(finalHashes, hash => hash.set.get('index')));
          });
          return sets.each(function(set, i) {
            if (set.get('display_on_martsy')) {
              return new Backbone.Collection().fetch({
                url: `${sd.API_URL}/api/v1/set/${set.get('id')}/items`,
                data: {
                  display_on_martsy: true,
                  size: 50
                },
                success(items) {
                  finalHashes.push({
                    set: set.set({index: i}),
                    items: (() => { switch (set.get('item_type')) {
                      case 'FeaturedLink': return new FeaturedLinks(items.toJSON());
                      default: return items;
                    } })()
                  });
                  return callback();
                },
                errors(m, e) { errs.push(e); return callback(); }
              });
            } else {
              return callback();
            }
          });
        }
      });
    }
  };
};
