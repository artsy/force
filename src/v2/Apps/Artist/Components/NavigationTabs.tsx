import { Flex } from "@artsy/palette"
import { NavigationTabs_artist } from "v2/__generated__/NavigationTabs_artist.graphql"
import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

interface Props extends SystemContextProps {
  artist: NavigationTabs_artist
}

@track({
  context_module: Schema.ContextModule.NavigationTabs,
})
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    subject: tab,
    destination_path,
  }))
  handleClick(tab: string, destination_path: string) {
    // noop
  }

  renderTab(
    text: string,
    to: string,
    options: {
      exact?: boolean
    } = {}
  ) {
    const { exact } = options

    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => {
          this.handleClick(text, to)
        }}
      >
        {text}
      </RouteTab>
    )
  }

  renderTabs() {
    const {
      artist: { slug, statuses, counts },
    } = this.props

    const route = path => `/artist/${slug}${path}`

    const worksForSaleTabName =
      counts.forSaleArtworks > 0
        ? `Works for sale (${counts.forSaleArtworks.toLocaleString()})`
        : "Artworks"

    return (
      <>
        {this.renderTab("Overview", route(""), {
          exact: true,
        })}
        {statuses.artworks &&
          this.renderTab(worksForSaleTabName, route("/works-for-sale"))}
        {statuses.auctionLots &&
          this.renderTab("Auction results", route("/auction-results"))}
      </>
    )
  }

  render() {
    const artist = this.props.artist

    const showArtistInsights =
      showMarketInsights(artist) ||
      (artist.insights && artist.insights.length > 0)
    const hasArtistContent = hasOverviewContent(artist)

    const showTabs = showArtistInsights || hasArtistContent

    return (
      showTabs && (
        <>
          <Flex mx={[-2, 0]} data-test="navigationTabs">
            <RouteTabs>{this.renderTabs()}</RouteTabs>
          </Flex>
        </>
      )
    )
  }
}

export const hasOverviewContent = ({
  statuses,
  related,
  biographyBlurb,
}: {
  statuses: { shows: boolean; cv: boolean; articles: boolean }
  related: { genes?: { edges?: ReadonlyArray<any> } }
  biographyBlurb: { text?: string }
}) => {
  const showArtistBio = biographyBlurb && Boolean(biographyBlurb.text)
  const showRelatedCategories = get(
    related,
    r => r.genes.edges.length > 0,
    false
  )

  return (
    showArtistBio ||
    showRelatedCategories ||
    statuses.articles ||
    statuses.cv ||
    statuses.shows
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  withSystemContext(NavigationTabs),
  {
    artist: graphql`
      fragment NavigationTabs_artist on Artist {
        slug
        statuses {
          shows
          cv(minShowCount: 0)
          articles
          auctionLots
          artworks
        }
        counts {
          forSaleArtworks
        }
        # Only here to determine whether or not we can display the overview tab
        related {
          genes {
            edges {
              node {
                slug
              }
            }
          }
        }
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: ["blue-chip", "top-established", "top-emerging"]
          ) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }
        insights {
          type
        }
        biographyBlurb(format: HTML, partnerBio: true) {
          text
        }
      }
    `,
  }
)
