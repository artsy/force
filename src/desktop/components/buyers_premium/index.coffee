_ = require 'underscore'
{ formatMoney } = require 'accounting'
{ Page } = require '../../models/page'

module.exports = (auction, callback) ->
  round = (number) -> parseFloat(number.toFixed(5))
  page = new Page id: 'buyers-premium'     # TODO: support multiple concurrent buyer's premiums
  page.fetch
    error: callback
    success: ->

      sortedSchedule = _.sortBy(auction.get('buyers_premium').schedule, (sched) -> sched.min_amount_cents)
      symbol = auction.get('buyers_premium').symbol
      if sortedSchedule.length == 1
        buyersPremiumHtml = """
          <div>
            #{round(sortedSchedule[0].percent * 100)}% on the hammer price
          </div>
        """
      else
        schedule = _.map sortedSchedule, (scheduleRow, idx) ->
          if idx == 0
            """
            <li>
              <div class='buyers-premium-pre'>
                On the hammer price up to and including \
                #{formatMoney(sortedSchedule[idx+1].min_amount_cents / 100, symbol, 0)}:
                #{round(sortedSchedule[idx].percent * 100)}%
              </div>
            </li>
            """
          else if idx == sortedSchedule.length - 1
            """
            <li>
              <div class='buyers-premium-pre'>
                On the portion of the hammer price in excess of \
                #{formatMoney(sortedSchedule[idx].min_amount_cents / 100, symbol, 0)}:
                #{round(sortedSchedule[idx].percent * 100)}%
              </div>
            </li>
            """
          else
            """
            <li>
              <div class='buyers-premium-pre'>
                On the hammer price in excess of \
                #{formatMoney(sortedSchedule[idx].min_amount_cents / 100, symbol, 0)} \
                up to and including \
                #{formatMoney(sortedSchedule[idx+1].min_amount_cents / 100, symbol, 0)}: \
                #{round(sortedSchedule[idx].percent * 100)}%
              </div>
            </li>
            """

        buyersPremiumHtml = """
          <ul class='buyers-premium-schedule'>
            #{schedule.join('')}
          </ul>
          """

      fullyRenderedHtml = """
        <div class='buyers-premium'>
          <div class='buyers-premium-page markdown-content'>
            #{page.mdToHtml('content')}
            #{buyersPremiumHtml}
          </div>
        </div>
      """
      callback null, fullyRenderedHtml
