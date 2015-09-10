_ = require 'underscore'
{ formatMoney } = require 'accounting'
Page = require '../../models/page.coffee'

module.exports = (auction, callback) ->
  page = new Page id: 'buyers-premium'
  page.fetch
    error: callback
    success: ->
      maxCents = _.max _.pluck(
        auction.get('buyers_premium').schedule, 'min_amount_cents'
      )
      [hammerPerc, portionPerc] = _.pluck(
        auction.get('buyers_premium').schedule, 'percent'
      )
      symbol = auction.get('buyers_premium').symbol
      callback null, """
        <div class='buyers-premium'>
          <div class='buyers-premium-page markdown-content'>
            #{page.mdToHtml('content')}
            <ul class='buyers-premium-schedule'>
              <li>
                <div class='buyers-premium-pre'>
                  On the hammer price up to and including \
                  #{formatMoney(maxCents / 100, symbol, 0)}
                </div>
                <div class='buyers-premium-dots'></div>
                <div class='buyers-premium-perc'>#{hammerPerc * 100}%</div>
              </li>
              <li>
                <div class='buyers-premium-pre'>
                  On the portion of the hammer price in excess of \
                  #{formatMoney(maxCents / 100, symbol, 0)}
                </div>
                <div class='buyers-premium-dots'></div>
                <div class='buyers-premium-perc'>#{portionPerc * 100}%</div>
              </li>
            </ul>
          </div>
        </div>
      """
