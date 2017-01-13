import Auction from '../../models/auction.coffee'
import CurrentUser from '../../models/current_user.coffee'
import ClockView from '../../components/clock/view.coffee'
import { data as sd } from 'sharify'
import _ from 'underscore'
import MyActiveBids from '../../components/my_active_bids/view.coffee'

const myActiveBidsTemplate = require('./templates/my_active_bids.jade')

const auction = new Auction(_.pick(sd.AUCTION, 'start_at', 'live_start_at', 'end_at'))
const user = sd.CURRENT_USER ? new CurrentUser(sd.CURRENT_USER) : null

const clock = new ClockView({modelName: 'Auction', model: auction, el: $('.auction2-clock')})
clock.start()

if (sd.AUCTION && sd.AUCTION.is_live_open == false) {
  const activeBids = new MyActiveBids({
    user: user,
    el: $('.auction2-my-active-bids'),
    template: myActiveBidsTemplate,
    saleId: auction.get('_id')
  })
  activeBids.start()
}
