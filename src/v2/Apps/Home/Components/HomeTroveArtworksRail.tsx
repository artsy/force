import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { Rail } from "v2/Components/Rail/Rail"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { HomeTroveArtworksRail_viewer } from "v2/__generated__/HomeTroveArtworksRail_viewer.graphql"
import { HomeTroveArtworksRailQuery } from "v2/__generated__/HomeTroveArtworksRailQuery.graphql"
import { useTracking } from "react-tracking"

interface HomeTroveArtworksRailProps {
  viewer: HomeTroveArtworksRail_viewer
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
      viewAllHref="/gene/trove"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.troveArtworksRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.gene,
          destination_page_owner_id: "60a6b70fa7025f0012fdf5df",
          destination_page_owner_slug: "trove",
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
        artworksConnection(first: 12, geneIDs: "trove") {
          edges {
            node {
              ...ShelfArtwork_artwork @arguments(width: 210)
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
          return (
            <Box width={200} key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
              <Spacer mt={1} />
              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)
