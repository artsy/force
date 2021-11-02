/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FilterArtworks
const _ = require("underscore")
const qs = require("qs")
const { Artworks } = require("./artworks")
const { API_URL } = require("sharify").data

export default _FilterArtworks = (function () {
  _FilterArtworks = class FilterArtworks extends Artworks {
    preinitialize() {
      this.sync = this.sync.bind(this)
    }

    static initClass() {
      this.prototype.defaults = {
        mapppedParams: {
          related_gene: "gene_id",
          gallery: "partner_id",
          institution: "partner_id",
        },
      }

      this.prototype.url = `${API_URL}/api/v1/filter/artworks`
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      ;({ mapppedParams: this.mapppedParams } = _.defaults(
        options,
        this.defaults
      ))
      return super.initialize(...arguments)
    }

    sync(method, collection, options) {
      for (let k in this.mapppedParams) {
        let val
        const v = this.mapppedParams[k]
        if ((val = options.data != null ? options.data[k] : undefined)) {
          options.data[v] = val
          delete options.data[k]
        }
      }
      options.data = decodeURIComponent(
        qs.stringify(options.data, { arrayFormat: "brackets" })
      )
      return super.sync(...arguments)
    }

    parse(data) {
      if (data.aggregations) {
        this.counts = this.prepareCounts(data.aggregations)
      }
      return data.hits
    }

    prepareCounts(aggregations) {
      // _.map destroys the keys, hence the iteration
      for (let k in aggregations) {
        const v = aggregations[k]
        aggregations[k] = this.prepareAggregate(v, k)
      }

      // remove this inferior for sale filter now, pls
      if (aggregations["price_range"] != null) {
        delete aggregations["price_range"]["*-*"]
      }

      return aggregations
    }

    prepareAggregate(aggregate, name) {
      // maps the sorted order but keeps the keys
      const mapKeys = function (keys, object) {
        const newMap = {}
        _.each(keys, key => (newMap[key] = object[key]))
        return newMap
      }

      const aggregateMap = {
        // sorts the price_range from lowest to highest
        price_range(aggregate) {
          const keys = _.sortBy(_.keys(aggregate), function (key) {
            const [from, to] = Array.from(key.split("-"))
            if (from === "*") {
              return 0
            }
            return parseInt(from)
          })
          return mapKeys(keys, aggregate)
        },
        dimension_range(aggregate) {
          return aggregate
        },
        // sorts medium alphabetically
        medium(aggregate) {
          const keys = _.sortBy(_.keys(aggregate), key => key)
          return mapKeys(keys, aggregate)
        },
        total(aggregate) {
          return aggregate
        },
        period(aggregate) {
          for (let k in aggregate) {
            const v = aggregate[k]
            aggregate[k].name = `${aggregate[k].name}s`
          }
          return aggregate
        },
        gallery(aggregate) {
          return aggregate
        },
        institution(aggregate) {
          return aggregate
        },
        for_sale(aggregate) {
          return aggregate
        },
      }

      return typeof aggregateMap[name] === "function"
        ? aggregateMap[name](aggregate)
        : undefined
    }
  }
  _FilterArtworks.initClass()
  return _FilterArtworks
})()
export const FilterArtworks = _FilterArtworks
