import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import { ArtistFeaturedWorksRail_artist$data } from "__generated__/ArtistFeaturedWorksRail_artist.graphql"
import { ArtistFeaturedWorksRailQuery } from "__generated__/ArtistFeaturedWorksRailQuery.graphql"
import { Rail } from "Components/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Box, Skeleton } from "@artsy/palette"
import { useJump } from "Utils/Hooks/useJump"
import { useTranslation } from "react-i18next"

interface ArtistFeaturedWorksRailProps {
  artist: ArtistFeaturedWorksRail_artist$data
}

const ArtistFeaturedWorksRail: React.FC<ArtistFeaturedWorksRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const { t } = useTranslation()

  const { jumpTo } = useJump({ offset: 20 })

  const nodes = extractNodes(artist.filterArtworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title={t("rails.artistFeaturedWorks.title")}
      viewAllLabel={t("rails.artistFeaturedWorks.viewAllWorks")}
      viewAllHref={`/artist/${artist.slug}/works-for-sale`}
      viewAllOnClick={() => {
        jumpTo("artistContentArea")

        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.topWorksRail,
            contextPageOwnerId,
            contextPageOwnerSlug,
            contextPageOwnerType: contextPageOwnerType!,
            destinationPageOwnerType: OwnerType.artist,
            destinationPageOwnerId: artist.internalID,
            destinationPageOwnerSlug: artist.slug,
            type: "viewAll",
          })
        )
      }}
      getItems={() => {
        return nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              contextModule={ContextModule.topWorksRail}
              key={index}
              lazyLoad
              onClick={() => {
                tracking.trackEvent(
                  clickedEntityGroup({
                    contextModule: ContextModule.topWorksRail,
                    contextPageOwnerId,
                    contextPageOwnerSlug,
                    contextPageOwnerType: contextPageOwnerType!,
                    destinationPageOwnerType: OwnerType.artwork,
                    destinationPageOwnerId: node.internalID,
                    destinationPageOwnerSlug: node.slug,
                    horizontalSlidePosition: index + 1,
                    type: "thumbnail",
                  })
                )
              }}
            />
          )
        })
      }}
    />
  )
}

export const ArtistFeaturedWorksRailFragmentContainer = createFragmentContainer(
  ArtistFeaturedWorksRail,
  {
    artist: graphql`
      fragment ArtistFeaturedWorksRail_artist on Artist {
        slug
        internalID
        filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
            }
          }
        }
      }
    `,
  }
)

const Placeholder = () => {
  const { t } = useTranslation()

  return (
    <Skeleton>
      <Rail
        title={t("rails.artistFeaturedWorks.title")}
        viewAllLabel={t("rails.artistFeaturedWorks.viewAllWorks")}
        getItems={() => {
          return [...new Array(8)].map((_, i) => {
            return <ShelfArtworkPlaceholder key={i} index={i} />
          })
        }}
      />
    </Skeleton>
  )
}

export const ArtistFeaturedWorksRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistFeaturedWorksRailQueryRenderer">
      <SystemQueryRenderer<ArtistFeaturedWorksRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={<Placeholder />}
        query={graphql`
          query ArtistFeaturedWorksRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistFeaturedWorksRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return <Placeholder />
          }
          if (props.artist) {
            return (
              <ArtistFeaturedWorksRailFragmentContainer artist={props.artist} />
            )
          }
        }}
      />
    </Box>
  )
}
