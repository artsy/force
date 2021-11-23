/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const { OrderedSet } = require("../models/ordered_set")

class OrderedSetsInner extends Backbone.Collection {
  static initClass() {
    this.prototype.url = `${sd.API_URL}/api/v1/sets`

    this.prototype.model = OrderedSet
  }

  initialize(models, { meta }) {
    this.meta = meta
    return super.initialize(...arguments)
  }

  fetch(options) {
    if (options == null) {
      options = {}
    }
    _.defaults(options, { data: this.meta.attributes })
    return Backbone.Collection.prototype.fetch.call(this, options)
  }

  // This could simply be replaced with:
  // new OrderedSets(owner_type: 'your_owner_type', owner_id: 'your_owner_id', sort: 'key')
  fetchItemsByOwner(ownerType, ownerId, options) {
    if (options == null) {
      options = {}
    }
    options = _.defaults(options, {
      cache: true,
      data: { display_on_desktop: true },
    })

    return new Promise(resolve => {
      const { cache } = options
      const { cacheTime } = options

      return this.fetch({
        url: `${sd.API_URL}/api/v1/sets?owner_type=${ownerType}&owner_id=${ownerId}&sort=key`,
        cache,
        cacheTime,
        data: options.data,
        error: resolve,
        success: () => {
          return this.fetchSets({ cache, cacheTime }).then(resolve)
        },
      })
    })
  }

  fetchSets(options) {
    if (options == null) {
      options = {}
    }
    return Promise.allSettled(
      this.map(model => {
        return model.fetchItems(options.cache, options.cacheTime)
      })
    )
  }

  fetchAll(options) {
    if (options == null) {
      options = {}
    }
    return new Promise(resolve => {
      this.fetch(options).then(() => {
        this.fetchSets(options).then((...args) => {
          this.trigger("sync:complete")
          resolve(...args)
        })
      })
    })
  }
}
OrderedSetsInner.initClass()

class OrderedSetMeta extends Backbone.Model {
  static initClass() {
    this.prototype.defaults = { public: true }
  }
}
OrderedSetMeta.initClass()

export const OrderedSets = class OrderedSetsPrime {
  constructor(options) {
    return new OrderedSetsInner(null, { meta: new OrderedSetMeta(options) })
  }
}
export default OrderedSets
