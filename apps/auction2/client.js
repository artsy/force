import Auction from '../../models/auction.coffee'
import ClockView from '../../components/clock/view.coffee'
import { data as sd } from 'sharify'
import _ from 'underscore'

const auction = new Auction(_.pick(sd.AUCTION, 'start_at', 'live_start_at', 'end_at'))
const clock = new ClockView({modelName: 'Auction', model: auction, el: $('.auction2-clock')})
clock.start()
