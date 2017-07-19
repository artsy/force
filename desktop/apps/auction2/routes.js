import * as actions from 'desktop/apps/auction2/actions/artworkBrowser'
import App from 'desktop/apps/auction2/components/App'
import Articles from 'desktop/collections/articles.coffee'
import ArticlesQuery from 'desktop/apps/auction2/utils/queries/articles'
import Auction from 'desktop/models/auction.coffee'
import MeQuery from 'desktop/apps/auction2/utils/queries/me'
import React from 'react'
import SaleQuery from 'desktop/apps/auction2/utils/queries/sale'
import auctionReducer from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'
import footerItems from 'desktop/apps/auction2/utils/footerItems'
import get from 'lodash.get'
import metaphysics from 'lib/metaphysics.coffee'
import u from 'updeep'
import { initialState as appInitialState } from 'desktop/apps/auction2/reducers/app'
import { initialState as auctionWorksInitialState } from 'desktop/apps/auction2/reducers/artworkBrowser'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'
import { renderReactLayout } from 'desktop/components/react/utils/renderReactLayout'

export async function index (req, res, next) {
  const saleId = req.params.id

  try {
    const { sale } = await metaphysics({
      query: SaleQuery(saleId)
    })

    res.locals.sd.AUCTION = sale
    fetchUser(req, res)

    const [
      { me },
      { articles }
    ] = await Promise.all([
      metaphysics({ query: MeQuery(sale.id), req: req }),
      metaphysics({ query: ArticlesQuery(sale._id) })
    ])

    // TODO: Refactor out Backbone
    const auctionModel = new Auction(sale)

    const store = configureStore(auctionReducer, {
      app: u({
        articles: new Articles(articles),
        auction: auctionModel,
        footerItems: footerItems,
        isLiveOpen: auctionModel.isLiveOpen(),
        isMobile: res.locals.sd.IS_MOBILE,
        liveAuctionUrl: getLiveAuctionUrl(auctionModel.get('id'), {
          isLoggedIn: Boolean(me)
        }),
        me
      }, appInitialState),

      artworkBrowser: u({
        filterParams: {
          sale_id: saleId
        },
        isClosed: sale.is_closed,
        user: res.locals.sd.CURRENT_USER
      }, auctionWorksInitialState)
    })

    // Hydrate store
    await Promise.all([
      req.user && store.dispatch(actions.fetchArtworksByFollowedArtists()),
      store.dispatch(actions.fetchArtworks())
    ])

    try {
      const layout = renderReactLayout({
        basePath: res.app.get('views'),
        blocks: {
          head: 'meta.jade',
          body: (props) => <App store={store} {...props} />
        },
        locals: {
          ...res.locals,
          assetPackage: 'auctions2',
          bodyClass: 'body-header-fixed body-no-margins'
        },
        data: {
          app: store.getState().app,
          artworkBrowser: store.getState().artworkBrowser
        }
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
}

export async function redirectLive (req, res, next) {
  try {
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
  } catch (error) {
    next(error)
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
