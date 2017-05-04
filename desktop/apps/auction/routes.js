import Articles from '../../collections/articles.coffee'
import ArticlesQuery from './queries/articles'
import Auction from '../../models/auction.coffee'
import MeQuery from './queries/me'
import SaleQuery from './queries/sale'
import footerItems from './footer_items'
import metaphysics from '../../../lib/metaphysics'
import { liveAuctionUrl } from '../../../utils/domain/auctions/urls'

export const index = async (req, res) => {
  const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  const { articles } = await metaphysics({ query: ArticlesQuery(sale._id) })

  res.locals.sd.AUCTION = sale
  const newAuction = new Auction(sale)
  const auctionArticles = new Articles(articles)
  res.render('index', {
    articles: auctionArticles,
    auction: newAuction,
    footerItems: footerItems,
    viewHelpers: { liveAuctionUrl },
    me: me
  })
}

export const redirectLive = async (req, res, next) => {
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  if (sale && sale.is_live_open) {
    const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
    if (me && me.bidders && me.bidders.length > 0 && me.bidders[0].qualified_for_bidding) {
      res.redirect(liveAuctionUrl(sale.id, {isLoggedIn: Boolean(me)}))
    } else {
      next()
    }
  } else {
    next()
  }
}
