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
        display="block"
        textDecoration="none"
        tabIndex={-1}
      >
        <ResponsiveBox
          aspectWidth={445}
          aspectHeight={334}
          maxWidth="100%"
          bg="black10"
        >
          {image.thumb && (
            <Image
              width="100%"
              height="100%"
              src={image.thumb.src}
              srcSet={image.thumb.srcSet}
              alt=""
              lazyLoad
            />
          )}
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

            {counts && (counts.artworks ?? 0) > 0 && (
              <Text variant="xs" fontWeight="bold">
                {counts.artworks} work
                {counts.artworks === 1 ? "" : "s"}
                {(counts.forSaleArtworks ?? 0) > 0 &&
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
            src
            srcSet
          }
        }
      }
    `,
  }
)
