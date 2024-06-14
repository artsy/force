import {
  Box,
  Column,
  Flex,
  GridColumns,
  HTML,
  HTMLProps,
  Pill,
  ReadMore,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import {
  ActionType,
  ClickedVerifiedRepresentative,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import {
  ArtistHeaderImage,
  isValidImage,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderImage"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { ArtistCareerHighlightFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlight"
import { FollowButtonInlineCount } from "Components/FollowButton/Button"

interface ArtistHeaderProps {
  artist: ArtistHeader_artist$data
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId } = useAnalyticsContext()

  const image = artist.coverArtwork?.image
  const hasImage = isValidImage(image)
  const hasPartnerSuppliedBio = !!artist.biographyBlurb?.credit
  const hasBio = artist.biographyBlurb?.text && !hasPartnerSuppliedBio
  const hasVerifiedRepresentatives = artist?.verifiedRepresentatives?.length > 0
  const hasInsights = artist.insights.length > 0
  const hasRightDetails = hasVerifiedRepresentatives || hasInsights
  const hasSomething = hasImage || hasBio || hasRightDetails

  return (
    <GridColumns gridRowGap={2} gridColumnGap={[0, 4]} data-test="artistHeader">
      {artist.coverArtwork && hasImage && (
        <Column
          span={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <RouterLink to={artist.coverArtwork.href} display="block">
            <ArtistHeaderImage image={image} />
          </RouterLink>
        </Column>
      )}

      <Column
        span={hasRightDetails ? 5 : 8}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Flex
          alignItems={["flex-start", "center"]}
          flexDirection={["column", "row"]}
          justifyContent={["center", "space-between"]}
          gap={2}
        >
          <Flex flexDirection="column" gap={2} width="100%">
            <Box flex={1}>
              <Text as="h1" variant="xl">
                {artist.name}
              </Text>

              <Text as="h2" variant={["md", "xl"]} color="black60">
                {artist.formattedNationalityAndBirthday}
              </Text>

              {hasSomething && (
                <>
                  <Spacer y={2} />

                  <Flex alignItems="center" gap={1}>
                    <ProgressiveOnboardingFollowArtist>
                      <FollowArtistButtonQueryRenderer
                        id={artist.internalID}
                        contextModule={ContextModule.artistHeader}
                        size={["large", "small"]}
                        width={["100%", "fit-content"]}
                      >
                        {label => (
                          <Stack
                            gap={0.5}
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Box>{label}</Box>

                            {!!artist.counts?.follows && (
                              <FollowButtonInlineCount
                                display={["block", "none"]}
                              >
                                {formatFollowerCount(artist.counts.follows)}
                              </FollowButtonInlineCount>
                            )}
                          </Stack>
                        )}
                      </FollowArtistButtonQueryRenderer>
                    </ProgressiveOnboardingFollowArtist>

                    {!!artist.counts?.follows && (
                      <Text
                        display={["none", "block"]}
                        variant="xs"
                        color="black60"
                        textAlign="center"
                        flexShrink={0}
                      >
                        {formatFollowerCount(artist.counts.follows)} Follower
                        {artist.counts.follows === 1 ? "" : "s"}
                      </Text>
                    )}
                  </Flex>
                </>
              )}
            </Box>

            {!hasSomething && (
              <ProgressiveOnboardingFollowArtist>
                <FollowArtistButtonQueryRenderer
                  id={artist.internalID}
                  contextModule={ContextModule.artistHeader}
                  size="small"
                  width="fit-content"
                />
              </ProgressiveOnboardingFollowArtist>
            )}
          </Flex>
        </Flex>

        {hasBio && (
          <Bio variant="sm">
            <ReadMore maxChars={250} content={artist.biographyBlurb.text} />
          </Bio>
        )}

        <Text variant="xs" display={["none", "block"]}>
          <CV to={`/artist/${artist.slug}/cv`} color="black60">
            See all past shows and fair booths
          </CV>
        </Text>
      </Column>

      {hasRightDetails && (
        <Column span={4} {...(!hasImage && { start: 9 })}>
          {hasVerifiedRepresentatives && (
            <>
              <Text variant={["xs", "sm"]} textColor={["black60", "black100"]}>
                Featured representation
              </Text>

              <Spacer y={1} />

              <Flex flexWrap="wrap" gap={1}>
                {artist.verifiedRepresentatives.map(({ partner }) => {
                  const payload: ClickedVerifiedRepresentative = {
                    action: ActionType.clickedVerifiedRepresentative,
                    context_module: ContextModule.artistHeader,
                    context_page_owner_id: contextPageOwnerId ?? "Unknown",
                    context_page_owner_type: contextPageOwnerType,
                    destination_page_owner_id: partner.internalID,
                    destination_page_owner_type: OwnerType.partner,
                  }

                  return (
                    <Pill
                      key={partner.internalID}
                      as={RouterLink}
                      variant="profile"
                      compact={artist.verifiedRepresentatives.length > 3}
                      {...(partner.profile?.icon &&
                      partner.profile.icon.src1x?.src &&
                      partner.profile.icon.src2x?.src
                        ? {
                            src: [
                              partner.profile.icon.src1x.src,
                              partner.profile.icon.src2x.src,
                            ],
                          }
                        : {})}
                      // @ts-ignore
                      to={partner.href}
                      onClick={() => {
                        trackEvent(payload)
                      }}
                    >
                      {partner.name}
                    </Pill>
                  )
                })}
              </Flex>

              <Spacer y={2} />
            </>
          )}

          <Box display={["none", "block"]}>
            {artist.insights
              .slice(0, ARTIST_HEADER_NUMBER_OF_INSIGHTS)
              .map((insight, index) => {
                return (
                  <ArtistCareerHighlightFragmentContainer
                    key={insight.kind ?? index}
                    insight={insight}
                  />
                )
              })}
          </Box>
        </Column>
      )}
    </GridColumns>
  )
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist {
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
        }
        biographyBlurb(format: HTML, partnerBio: false) {
          text
          credit
        }
        insights {
          kind
          ...ArtistCareerHighlight_insight
        }
        verifiedRepresentatives {
          partner {
            internalID
            name
            href
            profile {
              icon {
                src1x: cropped(width: 30, height: 30) {
                  src
                }
                src2x: cropped(width: 60, height: 60) {
                  src
                }
              }
            }
          }
        }
        coverArtwork {
          title
          href
          image {
            src: url(version: ["larger", "larger"])
            width
            height
          }
        }
      }
    `,
  }
)

const Bio = styled(HTML)<HTMLProps>`
  text-align: left;

  a:hover {
    color: currentColor;
  }
`

const CV = styled(RouterLink)`
  &:hover {
    color: currentColor;
  }
`

export const ARTIST_HEADER_NUMBER_OF_INSIGHTS = 4
