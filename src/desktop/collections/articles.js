/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Articles
const Backbone = require("backbone")
const sd = require("sharify").data
const { Article } = require("../models/article")

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
      return this.where({ tier: 1 }).slice(0, 1)
    }

    feed() {
      const featured = this.featured()
      return this.reject(a => Array.from(featured).includes(a))
    }

    biography() {
      return __guard__(
        this.select(article => article.get("biography_for_artist_id")),
        x => x[0]
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

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const Articles = _Articles
