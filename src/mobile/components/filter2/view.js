/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FilterView
const _ = require("underscore")
const _s = require("underscore.string")
const { mediator } = require("../../../lib/mediator")
import bootstrap from "../../components/layout/bootstrap"
const {
  PoliteInfiniteScrollView,
} = require("../../components/polite_infinite_scroll/client/view")
const { DropdownView } = require("./dropdown/view")
const { HeadlineView } = require("./headline/view")
const template = function () {
  return require("./template.jade")(...arguments)
}
const artworkColumnsTemplate = function () {
  return require("../../components/artwork_columns/template.jade")(...arguments)
}

export const FilterView = (_FilterView = (function () {
  _FilterView = class FilterView extends PoliteInfiniteScrollView {
    constructor(...args) {
      super(...args)
    }

    static initClass() {
      this.prototype.labelMap = {
        medium: "Medium",
        price_range: "Price range",
      }

      this.prototype.events = {
        "click .is-show-more-button": "startInfiniteScroll",
      }
    }

    preinitialize() {
      this.onSync = this.onSync.bind(this)
    }

    initialize({ params, stuckFacet, stuckParam, aggregations }) {
      this.params = params
      this.stuckFacet = stuckFacet
      this.stuckParam = stuckParam
      this.aggregations = aggregations
      this.listenTo(this.collection, "initial:fetch", this.render)
      this.listenTo(this.collection, "sync", this.onSync)
      mediator.on("select:changed", this.setParams)

      this.facets = _.keys(this.labelMap)

      return Array.from(this.facets).map(facet =>
        this.listenTo(this.params, `change:${facet}`, this.reset)
      )
    }

    render() {
      this.$el.html(template())
      this.postRender()
      return this
    }

    postRender() {
      this.onInitialFetch()
      this.renderCounts()
      this.renderDropdowns()
      return this.setupHeadline()
    }

    setupHeadline() {
      return new HeadlineView({
        collection: this.collection,
        params: this.params,
        stuckParam: this.stuckParam,
        stuckFacet: this.stuckFacet,
        facets: this.facets,
        el: this.$(".artwork-filter-sentence"),
      })
    }

    reset() {
      this.params.set({ page: 1 }, { silent: true })

      return this.collection.fetch({
        data: this.params.toJSON(),
        reset: true,
        success: () => {
          this.renderCounts()
          return this.onSync()
        },
      })
    }

    setParams({ name, value }) {
      if (value === "all") {
        return this.params.unset(name)
      } else {
        this.params.set(name, value)
        if (name === "price_range" && location.pathname.includes("/collect")) {
          return window.analytics.track("Commercial Filter Price Triggered", {
            price_range: value,
          })
        }
      }
    }

    renderDropdowns() {
      return (() => {
        const result = []
        const object = _.pick(this.collection.counts, _.keys(this.labelMap))
        for (let name in object) {
          const options = object[name]
          const dropdownView = new DropdownView({
            name,
            label: this.labelMap[name],
            filterOptions: options,
            filterParam: name,
            sort: "All",
          })

          result.push(
            this.$(".artwork-filter-dropdowns").append(
              dropdownView.render().$el
            )
          )
        }
        return result
      })()
    }

    onInfiniteScroll() {
      if (this.finishedScrolling) {
        return
      }
      this.params.set("page", this.params.get("page") + 1)
      return this.collection.fetch({
        data: this.params.toJSON(),
        remove: false,
        success: (artworks, res) => {
          if (res.length === 0) {
            return this.onFinishedScrolling()
          }
        },
      })
    }

    totalCount() {
      return _s.numberFormat(this.collection.counts.total.value)
    }

    renderCounts() {
      const work = this.totalCount() === "1" ? "Work" : "Works"
      return this.$(".artwork-filter-counts").text(
        `${this.totalCount()} ${work}`
      )
    }

    onSync() {
      if (this.collection.length > 0) {
        this.$(".artwork-filter-list").html(
          artworkColumnsTemplate({
            artworkColumns: this.collection.groupByColumnsInOrder(),
          })
        )
        return this.$(".artwork-filter-empty-message").hide()
      } else {
        return this.$(".artwork-filter-empty-message").show()
      }
    }
  }
  _FilterView.initClass()
  return _FilterView
})())
