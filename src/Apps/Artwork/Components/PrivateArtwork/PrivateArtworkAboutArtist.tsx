import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutArtist_artwork$key } from "__generated__/PrivateArtworkAboutArtist_artwork.graphql"
import {
  Box,
  Flex,
  Text,
  ReadMore,
  HTML,
  Spacer,
  Avatar,
  Stack,
} from "@artsy/palette"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { FollowButtonInlineCount } from "Components/FollowButton/Button"
import { formatFollowerCount } from "Utils/formatFollowerCount"

interface PrivateArtworkAboutArtistProps {
  artwork: PrivateArtworkAboutArtist_artwork$key
}

export const PrivateArtworkAboutArtist: React.FC<PrivateArtworkAboutArtistProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutArtist_artwork on Artwork {
        slug
        artist {
          ...FollowArtistButton_artist
          internalID
          href
          slug
          name
          initials
          formattedNationalityAndBirthday
          counts {
            artworks
            forSaleArtworks
            follows
          }
          coverArtwork {
            image {
              cropped(width: 145, height: 145) {
                src
                srcSet
              }
            }
          }
          name
          partnerArtists {
            biography
          }
          partnerBiographyBlurb: biographyBlurb(
            format: HTML
            partnerBio: true
          ) {
            text
          }
          biographyBlurb(format: HTML, partnerBio: false) {
            text
          }
        }
      }
    `,
    artwork
  )

  const followsCount =
    Number(formatFollowerCount(data.artist?.counts?.follows)) ?? 0

  const biographyBlurb =
    data.artist?.partnerBiographyBlurb?.text ??
    data.artist?.biographyBlurb?.text ??
    ""

  return (
    <Box minHeight={275} width="100%" p={6} backgroundColor="black100">
      <Text variant="md" color="white100">
        About the Artist
      </Text>

      <Spacer y={2} />

      {data.artist && (
        <>
          <Flex flexDirection="row" alignItems="center">
            <Box mr={2}>
              <Avatar
                size="md"
                src={data.artist.coverArtwork?.image?.cropped?.src}
              />
            </Box>

            <Box>
              <Text variant="lg-display" color="white100" fontWeight="bold">
                {data.artist.name}
              </Text>

              {data.artist.formattedNationalityAndBirthday && (
                <Text variant="xs" color="white100">
                  {data.artist.formattedNationalityAndBirthday}
                </Text>
              )}

              <Spacer y={1} />

              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FollowArtistButtonQueryRenderer
                  id={data.artist.internalID}
                  size={["large", "small"]}
                  width={["100%", "fit-content"]}
                  variant="secondaryWhite"
                  mr={1}
                >
                  {label => {
                    return (
                      <Stack gap={0.5} flexDirection="row" alignItems="center">
                        <Box color="white100">{label}</Box>

                        {!!data.artist?.counts?.follows && (
                          <FollowButtonInlineCount
                            display={["block", "none"]}
                            color="white100"
                          >
                            {formatFollowerCount(data.artist.counts.follows)}
                          </FollowButtonInlineCount>
                        )}
                      </Stack>
                    )
                  }}
                </FollowArtistButtonQueryRenderer>

                {followsCount > 0 && (
                  <Text variant="xs" color="white100">
                    {followsCount} {followsCount > 1 ? "Followers" : "Follower"}
                  </Text>
                )}
              </Flex>
            </Box>
          </Flex>

          <>
            {biographyBlurb && (
              <>
                <Spacer y={2} />

                <HTML variant="lg" color="white100">
                  <ReadMore
                    maxChars={190}
                    content={`${biographyBlurb}`}
                    inlineReadMoreLink={false}
                  />
                </HTML>
              </>
            )}
          </>
        </>
      )}
    </Box>
  )
}
