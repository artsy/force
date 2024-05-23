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
import { formatFollowerCount } from "Utils/formatFollowerCount"
import { useTracking } from "react-tracking"
import { ActionType, ClickedOnReadMore } from "@artsy/cohesion"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface PrivateArtworkAboutArtistProps {
  artwork: PrivateArtworkAboutArtist_artwork$key
}

export const PrivateArtworkAboutArtist: React.FC<PrivateArtworkAboutArtistProps> = ({
  artwork,
}) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutArtist_artwork on Artwork {
        displayArtistBio
        slug
        artists {
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
          biographyBlurb(format: HTML, partnerBio: false) {
            text
          }
        }
      }
    `,
    artwork
  )

  const followCount = (artist): number => {
    return Number(formatFollowerCount(artist.counts?.follows)) ?? 0
  }

  const biographyBlurb = (artist): string => {
    return artist.biographyBlurb?.text ?? ""
  }

  return (
    <Box
      minHeight={275}
      width="100%"
      px={[2, 6]}
      py={[4, 6]}
      backgroundColor="black100"
    >
      <Text variant="md" color="white100">
        About the Artist{data.artists && data.artists?.length > 1 ? "s" : ""}
      </Text>

      <Spacer y={2} />

      {data.artists?.map(
        artist =>
          artist && (
            <>
              <Flex flexDirection="row" alignItems="center" my={4}>
                <Box mr={2}>
                  <Avatar
                    size="md"
                    src={artist.coverArtwork?.image?.cropped?.src}
                  />
                </Box>

                <Box>
                  <Text variant="lg-display" color="white100" fontWeight="bold">
                    {artist.name}
                  </Text>

                  {artist.formattedNationalityAndBirthday && (
                    <Text variant="xs" color="white100">
                      {artist.formattedNationalityAndBirthday}
                    </Text>
                  )}

                  <Spacer y={1} />

                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FollowArtistButtonQueryRenderer
                      id={artist.internalID}
                      size={["large", "small"]}
                      width={["100%", "fit-content"]}
                      variant="secondaryWhite"
                      mr={1}
                    >
                      {label => {
                        return (
                          <Stack
                            gap={0.5}
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Box color="white100">{label}</Box>
                          </Stack>
                        )
                      }}
                    </FollowArtistButtonQueryRenderer>

                    {followCount(artist) > 0 && (
                      <Text
                        variant="xs"
                        color="white100"
                        ml={0.5}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {followCount(artist)}{" "}
                        {followCount(artist) > 1 ? "Followers" : "Follower"}
                      </Text>
                    )}
                  </Flex>
                </Box>
              </Flex>

              <>
                {!!biographyBlurb(artist) && data.displayArtistBio && (
                  <>
                    <Spacer y={4} />

                    <TextWrapper>
                      <HTML variant="md" color="white100">
                        <ReadMore
                          maxChars={190}
                          content={`${biographyBlurb(artist)}`}
                          inlineReadMoreLink={false}
                          onReadMoreClicked={() => {
                            const payload: ClickedOnReadMore = {
                              action: ActionType.clickedOnReadMore,
                              context_module: "About the artist",
                              subject: "Read more",
                              type: "Link",
                            }

                            trackEvent(payload)
                          }}
                        />
                      </HTML>
                    </TextWrapper>
                  </>
                )}
              </>
            </>
          )
      )}
    </Box>
  )
}

const TextWrapper = styled(Text)`
  a:hover {
    color: ${themeGet("colors.white100")};
  }
`
