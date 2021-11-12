import * as React from "react"
import { Box, Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistsArtistCard_artist } from "v2/__generated__/ArtistsArtistCard_artist.graphql"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"

interface ArtistsArtistCardProps {
  artist: ArtistsArtistCard_artist
}

export const ArtistsArtistCard: React.FC<ArtistsArtistCardProps> = ({
  artist,
}) => {
  const { image, counts } = artist

  if (!image) return null

  return (
    <>
      <RouterLink
        to={artist.href}
        noUnderline
        style={{ display: "block" }}
        // Avoid the redundant tab-stop
        tabIndex={-1}
      >
        <ResponsiveBox
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          aspectWidth={image.thumb.width}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          aspectHeight={image.thumb.height}
          maxWidth="100%"
        >
          <Image
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            src={image.thumb.src}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            srcSet={image.thumb.srcSet}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            alt={artist.name}
            width="100%"
            height="100%"
            lazyLoad
          />
        </ResponsiveBox>
      </RouterLink>

      <Flex mt={1} alignItems="center" justifyContent="space-between">
        <Box mr={1}>
          <RouterLink to={artist.href} noUnderline style={{ display: "block" }}>
            <Text variant="md">{artist.name}</Text>

            {artist.formattedNationalityAndBirthday && (
              <Text color="black60">
                {artist.formattedNationalityAndBirthday}
              </Text>
            )}

            {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
            {counts && counts.artworks > 0 && (
              <Text variant="xs" fontWeight="bold">
                {counts.artworks} work
                {counts.artworks === 1 ? "" : "s"}
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                {counts.forSaleArtworks > 0 &&
                  counts.forSaleArtworks !== counts.artworks && (
                    <>, {counts.forSaleArtworks} for sale</>
                  )}
              </Text>
            )}
          </RouterLink>
        </Box>

        <FollowArtistButtonFragmentContainer
          artist={artist}
          contextModule={ContextModule.featuredArtistsRail}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      </Flex>
    </>
  )
}

export const ArtistsArtistCardFragmentContainer = createFragmentContainer(
  ArtistsArtistCard,
  {
    artist: graphql`
      fragment ArtistsArtistCard_artist on Artist {
        ...FollowArtistButton_artist
        name
        href
        formattedNationalityAndBirthday
        counts {
          artworks
          forSaleArtworks
        }
        image {
          thumb: cropped(width: 445, height: 334) {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  }
)
