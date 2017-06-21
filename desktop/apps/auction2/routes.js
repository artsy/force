import * as actions from 'desktop/apps/auction2/actions'
import Articles from 'desktop/collections/articles.coffee'
import ArticlesQuery from 'desktop/apps/auction2/utils/queries/articles'
import Auction from 'desktop/models/auction.coffee'
import App from 'desktop/apps/auction2/components/App'
import MeQuery from 'desktop/apps/auction2/utils/queries/me'
import React from 'react'
import SaleQuery from 'desktop/apps/auction2/utils/queries/sale'
import auctionReducer, { initialState } from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'
import footerItems from 'desktop/apps/auction2/utils/footerItems'
import metaphysics from 'lib/metaphysics.coffee'
import get from 'lodash.get'
import renderReactLayout from 'desktop/components/react/utils/render_react_layout'
import u from 'updeep'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export async function index (req, res, next) {
  const saleId = req.params.id

  try {
    const {
      sale
    } = await metaphysics({
      query: SaleQuery(saleId)
    })

    fetchUser(req, res)

    const store = configureStore(auctionReducer, {
      auctionArtworks: u({
        filterParams: {
          sale_id: saleId
        },
        isClosed: sale.is_closed,
        user: res.locals.sd.CURRENT_USER
      }, initialState)
    })

    const [
      { me },
      { articles }
    ] = await Promise.all(
      [
        metaphysics({ query: MeQuery(sale.id), req: req }),
        metaphysics({ query: ArticlesQuery(sale._id) }),

        // Hydrate store
        store.dispatch(actions.fetchArtworksByFollowedArtists()),
        store.dispatch(actions.fetchArtworks())
      ]
    )

    const auctionModel = new Auction(sale)
    const auctionArticles = new Articles(articles)

    try {
      const layout = renderReactLayout({
        basePath: res.app.get('views'),
        blocks: {
          head: 'meta.jade',
          body: (props) => <App store={store} {...props} />
        },
        locals: res.locals,
        data: {
          articles: auctionArticles,
          assetPackage: 'auctions',
          auction: auctionModel,
          auctionArtworks: store.getState().auctionArtworks,
          bodyClass: 'body-header-fixed body-no-margins',
          footerItems: footerItems,
          isLiveOpen: auctionModel.isLiveOpen(),
          liveAuctionUrl: getLiveAuctionUrl(auctionModel.get('id'), {
            isLoggedIn: Boolean(me)
          }),
          me: me
        }
      })

      res.locals.sd.AUCTION = sale

      res.send(layout)
    } catch (error) {
      next(error)
    }
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

/**
 * Ensure user model is in sync as updates to it during bidder registration
 * route transitions will incidentally trigger a client-side reload.
 * See: https://github.com/artsy/force/blob/master/desktop/lib/global_client_setup.coffee#L37
 */
async function fetchUser (req, res) {
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
}
