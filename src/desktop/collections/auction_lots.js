/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AuctionLots
const _ = require("underscore")
const sd = require("sharify").data
const AuctionLot = require("../models/auction_lot")
const PageableCollection = require("../components/pageable_collection/index")

export default _AuctionLots = (function () {
  _AuctionLots = class AuctionLots extends PageableCollection {
    static initClass() {
      this.prototype.model = AuctionLot

      this.prototype.sortCriteria = {
        "-auction_date": "Most Recent",
        "-high_estimate_dollar,-auction_date": "Estimate",
        "-price_realized_dollar,-auction_date": "Sale Price",
      }
    }

    url() {
      return `${sd.API_URL}/api/v1/artist/${this.id}/auction_lots?page=${this.state.currentPage}&size=${this.state.pageSize}&sort=${this.sortBy}&total_count=1`
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      ;({ id: this.id, sortBy: this.sortBy } = _.defaults(options, {
        sortBy: "-price_realized_dollar,-auction_date",
      }))
      return super.initialize(...arguments)
    }

    resultsWithImages() {
      return this.filter(auctionLot => auctionLot.hasImage())
    }
  }
  _AuctionLots.initClass()
  return _AuctionLots
})()
export const AuctionLots = _AuctionLots
