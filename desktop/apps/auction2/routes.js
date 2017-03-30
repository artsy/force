import metaphysics from '../../../lib/metaphysics'
import Auction from '../../models/auction.coffee'
import SaleQuery from './queries/sale'
import MeQuery from './queries/me'
import { PREDICTION_URL } from '../../config'
import upcomingLabel from '../../components/current_auctions/utils/upcoming_label'

export const index = async (req, res) => {
  const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })

  res.locals.sd.AUCTION = sale
  const newAuction = new Auction(sale)
  res.render('index', { auction: newAuction, me: me, auctionUpcomingLabel: upcomingLabel })
}

export const redirectLive = async (req, res, next) => {
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  if (sale && sale.is_live_open) {
    const liveUrl = `${PREDICTION_URL}/${sale.id}/login`
    const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
    if (me && me.bidders && me.bidders.length > 0 && me.bidders[0].qualified_for_bidding) {
      res.redirect(liveUrl)
    } else {
      next()
    }
  } else {
    next()
  }
}
