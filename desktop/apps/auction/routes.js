import Articles from 'desktop/collections/articles.coffee'
import ArticlesQuery from 'desktop/apps/auction/queries/articles'
import Auction from 'desktop/models/auction.coffee'
import MeQuery from 'desktop/apps/auction/queries/me'
import SaleQuery from 'desktop/apps/auction/queries/sale'
import footerItems from 'desktop/apps/auction/footer_items'
import metaphysics from 'lib/metaphysics.coffee'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export const index = async (req, res) => {
  const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  const { articles } = await metaphysics({ query: ArticlesQuery(sale._id) })

  res.locals.sd.AUCTION = sale

  /**
   * Ensure user model is in sync as updates to it during bidder registration
   * route transitions will incidentally trigger a client-side reload.
   * See: https://github.com/artsy/force/blob/master/desktop/lib/global_client_setup.coffee#L37
   */
  if (req.user) {
    try {
      const user = await req.user.fetch()
      res.locals.sd.CURRENT_USER = {
        ...res.locals.sd.CURRENT_USER,
        ...user
      }
    } catch (error) {
      console.log('(auction/routes.js) Error fetching user: ', error)
    }
  }

  const newAuction = new Auction(sale)
  const auctionArticles = new Articles(articles)
  res.render('index', {
    articles: auctionArticles,
    auction: newAuction,
    footerItems: footerItems,
    viewHelpers: { getLiveAuctionUrl },
    me: me
  })
}

export const redirectLive = async (req, res, next) => {
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  if (sale && sale.is_live_open) {
    const { me } = await metaphysics({ query: MeQuery(req.params.id), req: req })
    if (me && me.bidders && me.bidders.length > 0 && me.bidders[0].qualified_for_bidding) {
      res.redirect(getLiveAuctionUrl(sale.id, {isLoggedIn: Boolean(me)}))
    } else {
      next()
    }
  } else {
    next()
  }
}
