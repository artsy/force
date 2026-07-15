import loadable from "@loadable/component"
import {
  getDailyPuzzle,
  getPuzzleBySlug,
  getTodayDateString,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import type { RouteProps } from "System/Router/Route"
import { HttpError, RedirectException } from "found"
import { graphql } from "react-relay"

const HammerPriceApp = loadable(
  () =>
    import(
      /* webpackChunkName: "gamesBundle" */ "./Routes/HammerPrice/HammerPriceApp"
    ),
  {
    resolveComponent: component => component.HammerPriceAppFragmentContainer,
  },
)

const HammerPriceIndexApp = loadable(
  () =>
    import(
      /* webpackChunkName: "gamesBundle" */ "./Routes/HammerPrice/HammerPriceIndexApp"
    ),
  {
    resolveComponent: component => component.HammerPriceIndexApp,
  },
)

const HAMMER_PRICE_QUERY = graphql`
  query gamesRoutes_HammerPriceQuery($auctionResultId: String!) @cacheable {
    auctionResult(id: $auctionResultId) @principalField {
      ...HammerPriceApp_auctionResult
    }
  }
`

export const gamesRoutes: RouteProps[] = [
  {
    path: "/games",
    render: () => {
      throw new RedirectException("/games/hammer-price", 301)
    },
  },
  {
    // Today’s puzzle
    path: "/games/hammer-price",
    layout: "ContainerOnly",
    getComponent: () => HammerPriceApp,
    onPreloadJS: () => {
      HammerPriceApp.preload()
    },
    prepareVariables: () => {
      const puzzle = getDailyPuzzle({ today: getTodayDateString() })

      return { auctionResultId: puzzle?.auctionResultId ?? "" }
    },
    render: ({ Component, props }) => {
      const puzzle = getDailyPuzzle({ today: getTodayDateString() })

      if (!puzzle) {
        throw new HttpError(404)
      }

      if (!(Component && props)) {
        return undefined
      }

      return <Component {...props} />
    },
    query: HAMMER_PRICE_QUERY,
  },
  {
    // Browse available puzzles
    path: "/games/hammer-price/puzzles",
    layout: "ContainerOnly",
    getComponent: () => HammerPriceIndexApp,
    onPreloadJS: () => {
      HammerPriceIndexApp.preload()
    },
  },
  {
    // A specific puzzle by slug; also how players return to a previously
    // started or completed puzzle
    path: "/games/hammer-price/puzzles/:slug",
    layout: "ContainerOnly",
    getComponent: () => HammerPriceApp,
    onPreloadJS: () => {
      HammerPriceApp.preload()
    },
    prepareVariables: ({ slug }) => {
      const puzzle = getPuzzleBySlug({ slug })

      return { auctionResultId: puzzle?.auctionResultId ?? "" }
    },
    render: ({ Component, props, match }) => {
      const puzzle = getPuzzleBySlug({ slug: match.params.slug })

      if (!puzzle) {
        throw new HttpError(404)
      }

      if (!(Component && props)) {
        return undefined
      }

      return <Component {...props} />
    },
    query: HAMMER_PRICE_QUERY,
  },
]
