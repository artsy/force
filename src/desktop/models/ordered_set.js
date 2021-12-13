/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _OrderedSet;
const _ = require('underscore');
const Backbone = require('backbone');
const Items = require('../collections/items');
const { LayoutStyle } = require('./mixins/layout_style');

export default (_OrderedSet = (function() {
  _OrderedSet = class OrderedSet extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, LayoutStyle);
    }

    fetchItems(cache, cacheTime) {
      if (cache == null) { cache = false; }
      const items = new Items(null, {id: this.id, item_type: this.get('item_type')});
      this.set({items});
      const fetchPromise = items.fetch({cache, cacheTime}).then(() => items.map(function(item) {
        if (_.isFunction(item.fetchItems)) { return item.fetchItems(cache, cacheTime); } else { return item; }
      }));
      return Promise.allSettled([fetchPromise]);
    }
  };
  _OrderedSet.initClass();
  return _OrderedSet;
})());
export const OrderedSet = _OrderedSet
