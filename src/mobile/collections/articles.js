/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Articles
const Backbone = require("backbone")
const { Article } = require("../models/article")
const sd = require("sharify").data

export default _Articles = (function () {
  _Articles = class Articles extends Backbone.Collection {
    static initClass() {
      this.prototype.url = `${sd.POSITRON_URL}/api/articles`

      this.prototype.model = Article
    }

    parse(data) {
      if (data == null) {
        data = {}
      }
      ;({ total: this.total, count: this.count } = data)
      return data.results
    }

    featured() {
      return this.where({ tier: 1 }).slice(0, 5)
    }

    feed() {
      let needle
      return this.reject(
        a => ((needle = a), Array.from(this.featured()).includes(needle))
      )
    }

    orderByIds(ids) {
      return this.reset(
        ids.map(function (id) {
          return this.get(id)
        }, this)
      )
    }

    sync(method, model, options) {
      options.headers = { "X-Access-Token": "" }
      return super.sync(...arguments)
    }
  }
  _Articles.initClass()
  return _Articles
})()
export const Articles = _Articles
