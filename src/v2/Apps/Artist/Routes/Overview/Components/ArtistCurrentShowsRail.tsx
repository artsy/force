import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import {
  Box,
  Image,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Rail } from "v2/Components/Rail"
import {
  AnalyticsSchema,
  useAnalyticsContext,
  useSystemContext,
} from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistCurrentShowsRail_artist$data } from "v2/__generated__/ArtistCurrentShowsRail_artist.graphql"
import { ArtistCurrentShowsRailQuery } from "v2/__generated__/ArtistCurrentShowsRailQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface ArtistCurrentShowsRailProps {
  artist: ArtistCurrentShowsRail_artist$data
}

const ArtistCurrentShowsRail: React.FC<ArtistCurrentShowsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.showsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title={`Shows Featuring ${artist.name}`}
      alignItems="flex-start"
      viewAllLabel="View All Shows"
      viewAllHref={`/artist/${artist.slug}/shows`}
      viewAllOnClick={() => {
        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.currentShowsRail,
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
            <RouterLink
              to={node.href!}
              key={index}
              display="block"
              width={325}
              noUnderline
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  contextModule: ContextModule.currentShowsRail,
                  contextPageOwnerId,
                  contextPageOwnerSlug,
                  contextPageOwnerType,
                  destination_path: node.href,
                  destinationPageOwnerId: node.internalID,
                  destinationPageOwnerSlug: node.slug,
                  destinationPageOwnerType: OwnerType.artwork,
                  horizontalSlidePosition: index + 1,
                  subject: "showCarouselSlide",
                  type: "thumbnail",
                })
              }}
            >
              {node.coverImage?.cropped?.src ? (
                <Image
                  width={node.coverImage.cropped.width}
                  height={node.coverImage.cropped.height}
                  src={node.coverImage.cropped.src}
                  srcSet={node.coverImage.cropped.srcSet}
                  lazyLoad
                  alt=""
                />
              ) : (
                <Box width={325} height={230} bg="black10" />
              )}

              <Spacer my={1} />
              <Text variant="md">{node.name}</Text>
              <Text variant="md" color="black60">
                {node.exhibitionPeriod}
              </Text>
            </RouterLink>
          )
        })
      }}
    />
  )
}

export const ArtistCurrentShowsRailFragmentContainer = createFragmentContainer(
  ArtistCurrentShowsRail,
  {
    artist: graphql`
      fragment ArtistCurrentShowsRail_artist on Artist {
        internalID
        name
        slug
        showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
          edges {
            node {
              coverImage {
                cropped(width: 325, height: 230) {
                  width
                  height
                  srcSet
                  src
                }
              }
              exhibitionPeriod
              href
              internalID
              name
              slug
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Shows"
      viewAllLabel="View All Shows"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="lg">Some Artist</SkeletonText>
              <SkeletonText variant="md">Location</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const ArtistCurrentShowsRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistCurrentShowsRailQueryRenderer">
      <SystemQueryRenderer<ArtistCurrentShowsRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistCurrentShowsRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistCurrentShowsRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return PLACEHOLDER
          }
          if (props.artist) {
            return (
              <ArtistCurrentShowsRailFragmentContainer artist={props.artist} />
            )
          }
        }}
      />
    </Box>
  )
}
