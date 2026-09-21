import {
  ActionType,
  type ClickedSocialPost,
  ContextModule,
  type PageOwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Flex,
  Image,
  Shelf,
  Skeleton,
  SkeletonBox,
  Text,
} from "@artsy/palette"
import { ArtistSocialRailEmpty } from "Apps/Artist/Routes/Overview/Components/ArtistSocialRailEmpty"
import { useRailImpressionTracking } from "Components/RailImpression/useRailImpressionTracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSectionReady } from "Utils/Hooks/useSectionReadiness"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import type { ArtistSocialRailQuery } from "__generated__/ArtistSocialRailQuery.graphql"
import type { ArtistSocialRail_artist$data } from "__generated__/ArtistSocialRail_artist.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

const logger = createLogger(
  "Apps/Artist/Routes/Overview/Components/ArtistSocialRail",
)

const TILE_WIDTH = 300
const TILE_HEIGHT = 375

interface ArtistSocialRailProps {
  artist: ArtistSocialRail_artist$data
}

interface SocialRailTile {
  internalID: string
  permalink: string | null | undefined
  caption: string | null | undefined
  src: string
  srcSet?: string
}

const ArtistSocialRail: React.FC<
  React.PropsWithChildren<ArtistSocialRailProps>
> = ({ artist }) => {
  const media: SocialRailTile[] = (artist.instagramMedia ?? [])
    .filter(
      (item): item is NonNullable<typeof item> & { internalID: string } =>
        !!item?.internalID && !!item.image?.cropped,
    )
    .map(item => {
      return {
        internalID: item.internalID,
        permalink: item.permalink,
        caption: item.caption,
        src: item.image?.cropped?.src ?? "",
        srcSet: item.image?.cropped?.srcSet,
      }
    })

  const { railImpressionRef } = useRailImpressionTracking({
    contextModule: ContextModule.socialRail,
    // The empty state isn't a rail; only count an impression once there are posts.
    disabled: media.length === 0,
  })

  return (
    <Box ref={railImpressionRef} data-testid="artist-social-rail">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        position="relative"
      >
        <Text variant="lg-display">Social</Text>
      </Flex>

      {media.length === 0 ? (
        <ArtistSocialRailEmpty />
      ) : (
        <Shelf>
          {media.map(item => {
            return <ArtistSocialRailTile key={item.internalID} tile={item} />
          })}
        </Shelf>
      )}
    </Box>
  )
}

interface ArtistSocialRailTileProps {
  tile: SocialRailTile
}

const ArtistSocialRailTile: React.FC<ArtistSocialRailTileProps> = ({
  tile,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedSocialPost = {
      action: ActionType.clickedSocialPost,
      context_module: ContextModule.socialRail,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_path: tile.permalink ?? undefined,
      service: "instagram",
    }

    trackEvent(payload)
  }

  /**
   * Tiles are cropped from expiring signed source urls, so a broken image is
   * our only signal that a source is no longer fetchable. The reported `src`
   * keeps the cause recoverable.
   */
  const handleError = () => {
    setIsLoaded(true)

    logger.error(
      new ErrorWithMetadata("[ArtistSocialRail] Gemini image failed to load", {
        instagramPostId: tile.internalID,
        src: tile.src,
      }),
    )
  }

  return (
    <a
      href={tile.permalink ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <Box position="relative" width={TILE_WIDTH} height={TILE_HEIGHT}>
        {!isLoaded && (
          <Skeleton position="absolute" top={0} left={0}>
            <SkeletonBox
              data-testid="tile-skeleton"
              width={TILE_WIDTH}
              height={TILE_HEIGHT}
            />
          </Skeleton>
        )}

        <Image
          src={tile.src}
          srcSet={tile.srcSet}
          alt={tile.caption ?? ""}
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          lazyLoad
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          style={{ display: "block" }}
        />
      </Box>
    </a>
  )
}

export const ArtistSocialRailFragmentContainer = createFragmentContainer(
  ArtistSocialRail,
  {
    artist: graphql`
      fragment ArtistSocialRail_artist on Artist {
        instagramMedia(first: 20) {
          internalID
          permalink
          caption
          image {
            cropped(width: 300, height: 375) {
              src
              srcSet
            }
          }
        }
      }
    `,
  },
)

const PLACEHOLDER = (
  <Skeleton>
    <Flex mb={4}>
      <Text variant="lg-display">Social</Text>
    </Flex>

    <Shelf>
      {[...new Array(10)].map((_, i) => {
        return <SkeletonBox key={i} width={TILE_WIDTH} height={TILE_HEIGHT} />
      })}
    </Shelf>
  </Skeleton>
)

interface ArtistSocialRailQueryRendererProps {
  id: string
  lazyLoad?: boolean
  onReady?: () => void
}

export const ArtistSocialRailQueryRenderer: React.FC<
  ArtistSocialRailQueryRendererProps
> = ({ id, lazyLoad = true, onReady }) => {
  const { handleReady } = useSectionReady({ onReady })

  return (
    <SystemQueryRenderer<ArtistSocialRailQuery>
      lazyLoad={lazyLoad}
      variables={{ id }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistSocialRailQuery($id: String!) {
          artist(id: $id) {
            ...ArtistSocialRail_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          handleReady()
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        handleReady()

        if (!props.artist) {
          return null
        }

        return <ArtistSocialRailFragmentContainer artist={props.artist} />
      }}
    />
  )
}
