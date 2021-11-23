/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _OrderedSet;
const _ = require('underscore');
const Backbone = require('backbone');
const { Items } = require('../collections/items');

export default (_OrderedSet = class OrderedSet extends Backbone.Model {

  fetchItems(cache) {
    if (cache == null) { cache = false; }
    const items = new Items(null, {id: this.id, item_type: this.get('item_type')});
    this.set({items});
    const fetchPromise = items.fetch({cache}).then(() => items.map(function(item) {
      if (_.isFunction(item.fetchItems)) { return item.fetchItems(cache); } else { return item; }
    }));
    return Promise.allSettled([fetchPromise]);
  }
});
export const OrderedSet = _OrderedSet
