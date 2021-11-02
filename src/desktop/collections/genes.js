/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Genes
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const Gene = require("../models/gene")
const { API_URL } = require("sharify").data
const { Fetch, AToZ } = require("@artsy/backbone-mixins")

export default _Genes = (function () {
  _Genes = class Genes extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Gene

      this.prototype.url = `${sd.API_URL}/api/v1/genes`
    }

    groupByFamily() {
      const grouped = this.groupBy(g => g.familyName())
      return (() => {
        const result = []
        for (let familyName in grouped) {
          const genes = grouped[familyName]
          result.push({
            name: familyName,
            genes: _.sortBy(genes, g => g.get("name")),
          })
        }
        return result
      })()
    }
  }
  _Genes.initClass()
  return _Genes
})()
export const Genes = _Genes
