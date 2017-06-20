import Articles from 'desktop/collections/articles.coffee'
import ArticlesQuery from './queries/articles'
import Auction from 'desktop/models/auction.coffee'
import Index from './components/server/index'
import MeQuery from './queries/me'
import SaleQuery from './queries/sale'
import footerItems from './footerItems'
import metaphysics from 'lib/metaphysics.coffee'
import get from 'lodash.get'
import renderLayout from 'desktop/components/react/utils/render_layout'
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

  const auctionModel = new Auction(sale)
  const auctionArticles = new Articles(articles)

  try {
    const layout = renderLayout({
      basePath: res.app.get('views'),
      blocks: {
        head: 'meta.jade',
        body: Index
      },
      locals: {
        ...res.locals,
        articles: auctionArticles,
        assetPackage: 'auctions',
        auction: auctionModel,
        bodyClass: 'body-header-fixed body-no-margins',
        footerItems: footerItems,
        isLiveOpen: auctionModel.isLiveOpen(),
        liveAuctionUrl: getLiveAuctionUrl(auctionModel.get('id'), {
          isLoggedIn: Boolean(me)
        }),
        me: me
      }
    })

    res.send(layout)
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
