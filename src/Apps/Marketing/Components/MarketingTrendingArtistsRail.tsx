import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Skeleton } from "@artsy/palette"
import type { MarketingTrendingArtistsRail_viewer$data } from "__generated__/MarketingTrendingArtistsRail_viewer.graphql"
import type { MarketingTrendingArtistsRailQuery } from "__generated__/MarketingTrendingArtistsRailQuery.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface MarketingTrendingArtistsRailProps {
  viewer: MarketingTrendingArtistsRail_viewer$data
}

const MarketingTrendingArtistsRail: FC<
  React.PropsWithChildren<MarketingTrendingArtistsRailProps>
> = ({ viewer }) => {
  const artists = extractNodes(viewer.curatedTrendingArtists)

  if (artists.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Trending artists"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
      getItems={() => {
        return artists.map(artist => {
          return (
            <CellArtistFragmentContainer
              key={artist.internalID}
              artist={artist}
            />
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Trending artists"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellArtistPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const MarketingTrendingArtistsRailFragmentContainer =
  createFragmentContainer(MarketingTrendingArtistsRail, {
    viewer: graphql`
      fragment MarketingTrendingArtistsRail_viewer on Viewer {
        curatedTrendingArtists(first: 20) {
          edges {
            node {
              ...CellArtist_artist
              internalID
            }
          }
        }
      }
    `,
  })

export const MarketingTrendingArtistsRailQueryRenderer: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <SystemQueryRenderer<MarketingTrendingArtistsRailQuery>
      lazyLoad
      query={graphql`
        query MarketingTrendingArtistsRailQuery {
          viewer {
            ...MarketingTrendingArtistsRail_viewer
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.viewer) {
          return PLACEHOLDER
        }

        return (
          <MarketingTrendingArtistsRailFragmentContainer
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}
