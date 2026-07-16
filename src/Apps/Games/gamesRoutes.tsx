import loadable from "@loadable/component"
import {
  getDailyPuzzle,
  getTodayDateString,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
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
    // Any auction result plays as a puzzle — configured or ad-hoc. The param
    // maps straight onto $auctionResultId; unknown ids 404 automatically via
    // @principalField error handling.
    path: "/games/hammer-price/puzzles/:auctionResultId",
    layout: "ContainerOnly",
    getComponent: () => HammerPriceApp,
    onPreloadJS: () => {
      HammerPriceApp.preload()
    },
    query: HAMMER_PRICE_QUERY,
  },
]
