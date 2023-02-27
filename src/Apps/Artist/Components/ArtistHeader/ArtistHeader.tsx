import {
  Box,
  Column,
  Flex,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import { ArtistInsightPillsFragmentContainer } from "Apps/Artist/Components/ArtistInsights"
import { RouterLink } from "System/Router/RouterLink"
import { useTranslation } from "react-i18next"
import { HeaderIcon } from "Components/HeaderIcon"
import { ProgressiveOnboardingFollowArtistQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"

interface ArtistHeaderProps {
  artist: ArtistHeader_artist$data
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  const { t } = useTranslation()

  const hideBioInHeaderIfPartnerSupplied = Boolean(
    artist.biographyBlurb!.credit
  )

  const avatar = artist.image?.url

  return (
    <>
      <Box data-test="artistHeader">
        <GridColumns gridRowGap={2}>
          <Column span={6}>
            <GridColumns>
              {avatar && (
                <Column span={2}>
                  <Flex justifyContent={["center", "left"]}>
                    <HeaderIcon src={avatar} />
                  </Flex>
                </Column>
              )}

              <Column span={10}>
                <Text variant="xl" as="h1" textAlign={["center", "left"]}>
                  {artist.name}
                </Text>

                {artist.formattedNationalityAndBirthday && (
                  <Text
                    variant="xl"
                    as="h2"
                    color="black60"
                    textAlign={["center", "left"]}
                  >
                    {artist.formattedNationalityAndBirthday}
                  </Text>
                )}
              </Column>

              <Column start={avatar ? 3 : undefined} span={4}>
                <ProgressiveOnboardingFollowArtistQueryRenderer>
                  <FollowArtistButtonQueryRenderer
                    id={artist.internalID}
                    contextModule={ContextModule.artistHeader}
                    size="large"
                    width="100%"
                  />
                </ProgressiveOnboardingFollowArtistQueryRenderer>
              </Column>

              {!!artist.counts?.follows && (
                <Column
                  span={6}
                  display={["block", "flex"]}
                  alignItems="center"
                >
                  <Text
                    variant="xs"
                    color="black60"
                    textAlign={["center", "left"]}
                  >
                    {formatFollowerCount(artist.counts.follows)} Followers
                  </Text>
                </Column>
              )}
            </GridColumns>
          </Column>

          <Column span={6}>
            <ArtistInsightPillsFragmentContainer artist={artist} />

            <Spacer y={4} />

            {!hideBioInHeaderIfPartnerSupplied && artist.biographyBlurb?.text && (
              <>
                <Text variant="xs" mt={[2, 0]} mb={1}>
                  Bio
                </Text>
                <Text variant="sm" mb={2}>
                  <HTML variant="sm">
                    <ReadMore
                      maxChars={250}
                      content={artist.biographyBlurb.text}
                    />
                  </HTML>
                </Text>
                <Spacer y={2} />
              </>
            )}
            {!hideBioInHeaderIfPartnerSupplied && (
              <>
                <RouterLink to={`/artist/${artist.slug}/cv`}>
                  {t("artistPage.overview.cvLink")}
                </RouterLink>
              </>
            )}
          </Column>
        </GridColumns>
      </Box>
    </>
  )
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist {
        ...ArtistInsightPills_artist
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              price_realized: priceRealized {
                display(format: "0.0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
        image {
          url(version: ["large", "tall", "square"])
        }
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
          forSaleArtworks
        }
        biographyBlurb(format: HTML, partnerBio: false) {
          credit
          text
        }
      }
    `,
  }
)

const formatFollowerCount = (n: number) => {
  try {
    const formatter = Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })

    return formatter.format(n).toLocaleLowerCase()
  } catch (error) {
    return n
  }
}
