import metaphysics from '../../lib/metaphysics'
import Auction from '../../models/auction.coffee'
import SaleQuery from './queries/sale'
import MeQuery from './queries/me'

export const index = async (req, res) => {
  const {me} = await metaphysics({query: MeQuery(req.params.id), req: req})
  const {sale} = await metaphysics({query: SaleQuery(req.params.id)})

  res.locals.sd.AUCTION = sale
  const newAuction = new Auction(sale)
  res.render('index', {auction: newAuction, me: me})
}
