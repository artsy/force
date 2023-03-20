import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { HomeEmergingPicksArtworksRail_viewer$data } from "__generated__/HomeEmergingPicksArtworksRail_viewer.graphql"
import { HomeEmergingPicksArtworksRailQuery } from "__generated__/HomeEmergingPicksArtworksRailQuery.graphql"
import { useTracking } from "react-tracking"

interface HomeEmergingPicksArtworksRailProps {
  viewer: HomeEmergingPicksArtworksRail_viewer$data
}

export const HomeEmergingPicksArtworksRail: React.FC<HomeEmergingPicksArtworksRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Curators’ Picks: Emerging"
      subTitle="The best works by rising talents on Artsy, all available now."
      viewAllLabel="View All Works"
      viewAllHref="/collection/curators-picks-emerging"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.troveArtworksRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.collection,
          destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
          destination_page_owner_slug: "curators-picks-emerging",
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            lazyLoad
            // TODO: add troveArtworksRail to the union type of auth context module
            // @ts-ignore
            contextModule={ContextModule.troveArtworksRail}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.troveArtworksRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_type: OwnerType.artwork,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          />
        ))
      }}
    />
  )
}

export const HomeEmergingPicksArtworksRailFragmentContainer = createFragmentContainer(
  HomeEmergingPicksArtworksRail,
  {
    viewer: graphql`
      fragment HomeEmergingPicksArtworksRail_viewer on Viewer {
        artworksConnection(
          first: 20
          marketingCollectionID: "curators-picks-emerging"
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
              href
            }
          }
        }
      }
    `,
  }
)

export const HomeEmergingPicksArtworksRailQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<HomeEmergingPicksArtworksRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      query={graphql`
        query HomeEmergingPicksArtworksRailQuery {
          viewer {
            ...HomeEmergingPicksArtworksRail_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return PLACEHOLDER
        }

        return (
          <HomeEmergingPicksArtworksRailFragmentContainer
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Curators’ Picks: Emerging"
      subTitle="The best works by rising talents on Artsy, all available now."
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
