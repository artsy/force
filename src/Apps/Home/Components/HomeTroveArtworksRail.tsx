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
import { HomeTroveArtworksRail_viewer$data } from "__generated__/HomeTroveArtworksRail_viewer.graphql"
import { HomeTroveArtworksRailQuery } from "__generated__/HomeTroveArtworksRailQuery.graphql"
import { useTracking } from "react-tracking"

interface HomeTroveArtworksRailProps {
  viewer: HomeTroveArtworksRail_viewer$data
}

export const HomeTroveArtworksRail: React.FC<HomeTroveArtworksRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Trove"
      subTitle="A weekly curated selection of the best works on Artsy by emerging and sought after artists."
      viewAllLabel="View All Works"
      viewAllHref="/collection/trove-editors-picks"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.troveArtworksRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.collection,
          destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
          destination_page_owner_slug: "trove-editors-picks",
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

export const HomeTroveArtworksRailFragmentContainer = createFragmentContainer(
  HomeTroveArtworksRail,
  {
    viewer: graphql`
      fragment HomeTroveArtworksRail_viewer on Viewer {
        artworksConnection(
          first: 12
          marketingCollectionID: "trove-editors-picks"
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

export const HomeTroveArtworksRailQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<HomeTroveArtworksRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      query={graphql`
        query HomeTroveArtworksRailQuery {
          viewer {
            ...HomeTroveArtworksRail_viewer
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

        return <HomeTroveArtworksRailFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Trove"
      subTitle="A weekly curated selection of the best works on Artsy by emerging and sought after artists."
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
