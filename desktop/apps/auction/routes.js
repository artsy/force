import Articles from 'desktop/collections/articles.coffee'
import ArticlesQuery from './queries/articles'
import Auction from 'desktop/models/auction.coffee'
import MeQuery from './queries/me'
import SaleQuery from './queries/sale'
import footerItems from './footer_items'
import metaphysics from 'lib/metaphysics.coffee'
import get from 'lodash.get'
import templateRenderer from 'desktop/components/react/utils/template_renderer'
import path from 'path'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export async function index (req, res, next) {
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

  try {
    // const [html] = templateRenderer(path.join(__dirname, 'templates/index.jade')).render({
    //   ...res.locals,
    //   articles: auctionArticles,
    //   auction: newAuction,
    //   footerItems: footerItems,
    //   viewHelpers: {
    //     getLiveAuctionUrl
    //   },
    //   me: me
    // })

    res.render('index.jsx')
  } catch (error) {
    next(error)
  }
}

export async function redirectLive (req, res, next) {
  const { sale } = await metaphysics({ query: SaleQuery(req.params.id) })
  const isLiveOpen = get(sale, 'is_live_open')

  if (isLiveOpen) {
    const { me } = await metaphysics({
      query: MeQuery(req.params.id),
      req: req
    })

    const qualifiedForBidding = get(me, 'bidders.0.qualified_for_bidding')

    if (qualifiedForBidding) {
      res.redirect(getLiveAuctionUrl(sale.id, {
        isLoggedIn: Boolean(me)
      }))
    } else {
      next()
    }
  } else {
    next()
  }
}
