/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _OrderedSets
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const OrderedSet = require("../models/ordered_set")

class OrderedSets extends Backbone.Collection {
  static initClass() {
    this.prototype.url = `${sd.API_URL}/api/v1/sets`
    this.prototype.model = OrderedSet
  }

  initialize(models, options) {
    ;({ meta: this.meta } = options)
    return super.initialize(...arguments)
  }

  // Tacks on the meta attributes as query string parameters
  // before hitting the endpoint
  fetch(options) {
    if (options == null) {
      options = {}
    }
    const qs = _.map(
      this.meta.attributes,
      (value, key) => `${key}=${value}`
    ).join("&")
    _.defaults(options, { data: qs })
    return Backbone.Collection.prototype.fetch.call(this, options)
  }

  fetchSets(options) {
    if (options == null) {
      options = {}
    }
    return Promise.allSettled(
      this.map(model =>
        model.fetchItems(options != null ? options.cache : undefined)
      )
    )
  }

  fetchAll(options) {
    if (options == null) {
      options = {}
    }
    return new Promise(resolve => {
      return this.fetch(options).then(() => {
        return this.fetchSets(options).then(
          function () {
            this.trigger("sync:complete")
            return resolve(...arguments)
          }.bind(this)
        )
      })
    })
  }
}
OrderedSets.initClass()

class OrderedSetMeta extends Backbone.Model {
  static initClass() {
    this.prototype.defaults = { public: true }
  }
}
OrderedSetMeta.initClass()

module.exports = _OrderedSets = class _OrderedSets {
  constructor(options) {
    return new OrderedSets(null, { meta: new OrderedSetMeta(options) })
  }
}
