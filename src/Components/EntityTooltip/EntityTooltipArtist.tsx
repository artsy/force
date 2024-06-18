import { FC } from "react"
import {
  Box,
  HorizontalOverflow,
  Image,
  Join,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EntityTooltipArtistQuery } from "__generated__/EntityTooltipArtistQuery.graphql"
import { EntityTooltipArtist_artist$data } from "__generated__/EntityTooltipArtist_artist.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { useTracking } from "react-tracking"
import { ActionType, ClickedTooltip } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface EntityTooltipArtistProps {
  artist: EntityTooltipArtist_artist$data
}

const EntityTooltipArtist: FC<EntityTooltipArtistProps> = ({ artist }) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedTooltip = {
      action: ActionType.clickedTooltip,
      context_owner_id: contextPageOwnerId!,
      context_owner_slug: contextPageOwnerSlug!,
      context_owner_type: contextPageOwnerType!,
      destination_path: artist.href!,
      type: "artist",
    }

    trackEvent(payload)
  }

  const images = artist.carousel?.images ?? []

  return (
    <Box p={2} width={300}>
      {images.length > 0 && (
        <RouterLink to={artist.href} display="block" onClick={handleClick}>
          <HorizontalOverflow mb={2}>
            <Join separator={<Spacer x={1} />}>
              {images.map((image, i) => {
                if (!image || !image.resized) return null
                return (
                  <Image
                    key={i}
                    src={image.resized.src}
                    srcSet={image.resized.srcSet}
                    width={image.resized.width}
                    height={image.resized.height}
                    alt=""
                    lazyLoad
                    style={{ display: "block" }}
                  />
                )
              })}
            </Join>
          </HorizontalOverflow>
        </RouterLink>
      )}

      <EntityHeaderArtistFragmentContainer
        artist={artist}
        displayAvatar={false}
        alignItems="flex-start"
      />

      {artist.blurb && (
        <RouterLink
          to={artist.href}
          display="block"
          mt={1}
          textDecoration="none"
          onClick={handleClick}
        >
          <Text variant="xs" lineClamp={3}>
            {artist.blurb}
          </Text>
        </RouterLink>
      )}
    </Box>
  )
}

const EntityTooltipArtistFragmentContainer = createFragmentContainer(
  EntityTooltipArtist,
  {
    artist: graphql`
      fragment EntityTooltipArtist_artist on Artist {
        ...EntityHeaderArtist_artist
        href
        blurb(format: PLAIN)
        carousel {
          images {
            resized(height: 100) {
              src
              srcSet
              height
              width
            }
          }
        }
      }
    `,
  }
)

const EntityTooltipArtistPlaceholder: FC = () => {
  return (
    <Skeleton p={2} width={300}>
      <HorizontalOverflow mb={2}>
        <Join separator={<Spacer x={1} />}>
          {[...new Array(8)].map((_, i) => {
            return (
              <SkeletonBox
                key={i}
                width={[50, 100, 75, 66][i % 4]}
                height={100}
              />
            )
          })}
        </Join>
      </HorizontalOverflow>

      <SkeletonText variant="sm-display">Artist Name</SkeletonText>

      <SkeletonText variant="xs">American, b 1900</SkeletonText>

      <SkeletonText variant="xs" mt={0.5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </SkeletonText>
    </Skeleton>
  )
}

interface EntityTooltipArtistQueryRendererProps {
  id: string
}

export const EntityTooltipArtistQueryRenderer: FC<EntityTooltipArtistQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<EntityTooltipArtistQuery>
      variables={{ id }}
      query={graphql`
        query EntityTooltipArtistQuery($id: String!) {
          artist(id: $id) {
            ...EntityTooltipArtist_artist
          }
        }
      `}
      placeholder={<EntityTooltipArtistPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.log(error)
          return null
        }

        if (!props?.artist) {
          return <EntityTooltipArtistPlaceholder />
        }

        return <EntityTooltipArtistFragmentContainer artist={props.artist} />
      }}
    />
  )
}
