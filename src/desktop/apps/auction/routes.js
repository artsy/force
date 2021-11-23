import * as actions from "desktop/apps/auction/actions/artworkBrowser"
import App from "desktop/apps/auction/components/App"
import { Articles } from "desktop/collections/articles"
import { meV2Query } from "desktop/apps/auction/queries/v2/me"
import { saleV2Query } from "desktop/apps/auction/queries/v2/sale"
import ArticlesQuery from "desktop/apps/auction/queries/articles"
import { Auction } from "desktop/models/auction"
import MeQuery from "desktop/apps/auction/queries/me"
import SaleQuery from "desktop/apps/auction/queries/sale"
import auctionReducer from "desktop/apps/auction/reducers"
import configureStore from "desktop/components/react/utils/configureStore"
import { get, isEmpty } from "lodash"
import { metaphysics } from "lib/metaphysics"
import metaphysics2 from "lib/metaphysics2.coffee"
import u from "updeep"
import { initialState as appInitialState } from "desktop/apps/auction/reducers/app"
import { initialState as auctionWorksInitialState } from "desktop/apps/auction/reducers/artworkBrowser"
import { getLiveAuctionUrl } from "desktop/apps/auction/utils/urls"
import { stitch } from "@artsy/stitch"

export async function index(req, res, next) {
  const saleId = req.params.id

  try {
    const { sale } = await metaphysics2({
      query: saleV2Query,
      req,
      variables: { saleId },
    })

    // For compatibility for MP V1
    if (!isEmpty(sale?.promoted_sale?.sale_artworks?.edges)) {
      sale.promoted_sale.sale_artworks = sale.promoted_sale.sale_artworks.edges.map(
        ({ node }) => node
      )
    }

    res.locals.sd.AUCTION = sale
    fetchUser(req, res)

    let articles = []

    try {
      ;({ articles } = await metaphysics({
        query: ArticlesQuery(sale._id),
        req,
      }))
    } catch (error) {
      console.error("(apps/auction/routes.js) Error fetching Articles", error)
    }

    // TODO: Refactor out Backbone
    const auctionModel = new Auction(sale)

    /**
     * An e-commerce sale is a collection of artworks that can be sold over a
     * fixed period of time. See https://github.com/artsy/auctions/blob/master/auctions_support_faq.md#how-do-i-create-an-e-commerce-sale
     * for instructions on how to create.
     */
    const isEcommerceSale = !sale.is_auction

    // Only query against actual Auctions. Since an e-commerce sale is not an
    // auction there are no works to bid on and the  `me { ... }` query, which
    // makes a request for lot_standings, 404's with a "Sale not found".
    let me = {}

    if (!isEcommerceSale) {
      try {
        ;({ me } = await metaphysics2({
          query: meV2Query,
          req,
          variables: { saleId: sale._id },
        }))
      } catch (error) {
        console.error(
          "(apps/auction/routes.js) Error fetching LotStandings",
          error
        )
      }
    }

    // If an e-commerce sale, remove all sort options that are Auction related
    let artworkBrowserSortOptions = auctionWorksInitialState.sortMap
    let sort = auctionWorksInitialState.filterParams.sort
    if (isEcommerceSale) {
      artworkBrowserSortOptions = {
        "-searchable_estimate": "Most Expensive",
        searchable_estimate: "Least Expensive",
      }
      sort = "-searchable_estimate"
    }

    const store = configureStore(auctionReducer, {
      app: u(
        {
          articles: new Articles(articles),
          auction: auctionModel,
          isEcommerceSale,
          isLiveOpen: auctionModel.isLiveOpen(),
          isMobile: res.locals.sd.IS_MOBILE,
          liveAuctionUrl: getLiveAuctionUrl(auctionModel.get("id"), {
            isLoggedIn: Boolean(me),
          }),
          me,
        },
        appInitialState
      ),

      artworkBrowser: u(
        {
          // FIXME: This is a temporary fix to update UI
          filterParams: {
            sale_id: saleId,
            sort,
          },
          isClosed: sale.is_closed,
          requestID: req.id,
          sortMap: u.constant(artworkBrowserSortOptions),
          symbol: sale.symbol,
          user: res.locals.sd.CURRENT_USER,
        },
        auctionWorksInitialState
      ),
    })

    // Hydrate store
    await Promise.all([
      req.user && store.dispatch(actions.fetchArtworksByFollowedArtists()),
      store.dispatch(actions.fetchArtworks()),
    ])

    try {
      const layout = await stitch({
        basePath: res.app.get("views"),
        blocks: {
          body: props => <App store={store} {...props} />,
          head: "meta.jade",
        },
        config: {
          styledComponents: true,
        },
        data: {
          app: store.getState().app,
          artworkBrowser: store.getState().artworkBrowser,
          sd: res.locals.sd,
        },
        layout: "../../../../components/main_layout/templates/react_index.jade",
        locals: {
          ...res.locals,
          assetPackage: "auctions",
          bodyClass: "auction-body body-header-fixed body-no-margins",
        },
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
}

export async function redirectLive(req, res, next) {
  try {
    const { sale } = await metaphysics({
      query: SaleQuery(req.params.id),
      req,
    })
    const isLiveOpen = get(sale, "is_live_open")

    if (isLiveOpen) {
      const { me } = await metaphysics({
        query: MeQuery(req.params.id),
        req,
      })

      const qualifiedForBidding = get(me, "bidders.0.qualified_for_bidding")

      if (qualifiedForBidding) {
        res.redirect(
          getLiveAuctionUrl(sale.id, {
            isLoggedIn: Boolean(me),
          })
        )
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
 * See: https://github.com/artsy/force/blob/master/desktop/lib/deprecated_global_client_setup.coffee#L37
 */
async function fetchUser(req, res) {
  if (req.user) {
    try {
      const user = await req.user.fetch({
        headers: {
          "X-Request-Id": req.id,
        },
      })
      res.locals.sd.CURRENT_USER = {
        ...res.locals.sd.CURRENT_USER,
        ...user,
      }
    } catch (error) {
      console.log("(auction/routes.js) Error fetching user: ", error)
    }
  }
}
