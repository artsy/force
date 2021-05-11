import React from "react"
import { Box, BoxProps, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistsArtistCard_artist } from "v2/__generated__/ArtistsArtistCard_artist.graphql"

interface ArtistsArtistCardProps extends BoxProps {
  artist: ArtistsArtistCard_artist
}

export const ArtistsArtistCard: React.FC<ArtistsArtistCardProps> = ({
  artist,
  ...rest
}) => {
  const { image, counts } = artist

  if (!image) return null

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      p={1}
      border="1px solid"
      borderColor="black10"
      borderRadius={2}
      flex="1"
      {...rest}
    >
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <RouterLink to={artist.href} noUnderline style={{ display: "block" }}>
        <ResponsiveBox
          // @ts-expect-error STRICT_NULL_CHECK
          aspectWidth={image.thumb.width}
          // @ts-expect-error STRICT_NULL_CHECK
          aspectHeight={image.thumb.height}
          maxWidth="100%"
        >
          <Image
            // @ts-expect-error STRICT_NULL_CHECK
            src={image.thumb.src}
            // @ts-expect-error STRICT_NULL_CHECK
            srcSet={image.thumb.srcSet}
            // @ts-expect-error STRICT_NULL_CHECK
            alt={artist.name}
            width="100%"
            height="100%"
            lazyLoad
          />
        </ResponsiveBox>

        <Box my={1}>
          <Text variant="mediumText">{artist.name}</Text>

          {artist.formattedNationalityAndBirthday && (
            <Text color="black60">
              {artist.formattedNationalityAndBirthday}
            </Text>
          )}

          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {counts && counts.artworks > 0 && (
            <Text color="black60">
              {counts.artworks} work
              {counts.artworks === 1 ? "" : "s"}
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {counts.forSaleArtworks > 0 &&
                counts.forSaleArtworks !== counts.artworks && (
                  <>, {counts.forSaleArtworks} for sale</>
                )}
            </Text>
          )}
        </Box>
      </RouterLink>
      <FollowArtistButtonFragmentContainer
        artist={artist}
        contextModule={ContextModule.featuredArtistsRail}
        buttonProps={{ width: "100%" }}
      />
    </Box>
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
          thumb: cropped(width: 270, height: 200) {
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
