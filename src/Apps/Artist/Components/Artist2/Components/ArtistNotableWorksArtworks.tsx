import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistNotableWorksArtworks_artist$key } from "__generated__/ArtistNotableWorksArtworks_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistNotableWorksArtworksProps {
  artist: ArtistNotableWorksArtworks_artist$key
}

export const ArtistNotableWorksArtworks: React.FC<
  ArtistNotableWorksArtworksProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(fragment, artistRef)

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const coverArtwork = artist.coverArtwork
  const remaining = extractNodes(artist.artworksConnection).filter(
    artwork => artwork.slug !== coverArtwork?.slug,
  )

  // Show the cover artwork first, then the remaining artworks
  const artworks = [
    ...(coverArtwork ? [coverArtwork] : []),
    ...remaining,
  ].slice(0, 3)

  return (
    <>
      {artworks.map((artwork, index) => {
        const image = artwork.image?.resized

        if (!image) return null

        return (
          <Box
            key={artwork.internalID}
            flex={1}
            display="flex"
            flexDirection="column"
            gap={1}
            maxWidth={[200, "initial"]}
            minWidth={[200, 0]}
          >
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ResponsiveBox
                // @ts-ignore
                as={RouterLink}
                to={artwork.href}
                key={artwork.internalID}
                display="block"
                textDecoration="none"
                aspectWidth={image.width ?? 1}
                aspectHeight={image.height ?? 1}
                maxWidth="100%"
                onClick={() => {
                  const trackingEvent: ClickedArtworkGroup = {
                    action: ActionType.clickedArtworkGroup,
                    context_module: ContextModule.topWorksRail,
                    context_page_owner_type: contextPageOwnerType!,
                    context_page_owner_id: contextPageOwnerId,
                    context_page_owner_slug: contextPageOwnerSlug,
                    destination_page_owner_type: OwnerType.artwork,
                    destination_page_owner_id: artwork.internalID,
                    destination_page_owner_slug: artwork.slug,
                    horizontal_slide_position: index,
                    type: "thumbnail",
                  }

                  trackEvent(trackingEvent)
                }}
              >
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  lazyLoad
                  alt=""
                />
              </ResponsiveBox>
            </Box>

            <Text variant="xs" color="mono60" overflowEllipsis>
              <em>{artwork.title}</em>
              {artwork.date && `, ${artwork.date}`}
            </Text>
          </Box>
        )
      })}
    </>
  )
}

const fragment = graphql`
  fragment ArtistNotableWorksArtworks_artist on Artist {
    coverArtwork {
      internalID
      slug
      href
      title
      date
      image {
        resized(width: 420, height: 420) {
          width
          height
          src
          srcSet
        }
      }
    }
    artworksConnection(first: 3, sort: ICONICITY_DESC) {
      edges {
        node {
          internalID
          slug
          href
          title
          date
          image {
            resized(width: 420, height: 420) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
