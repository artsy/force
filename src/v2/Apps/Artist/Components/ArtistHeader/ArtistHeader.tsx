import {
  Box,
  Column,
  Flex,
  GridColumns,
  HTML,
  Image,
  ReadMore,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { Link } from "react-head"
import * as React from "react"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistHeader_artist } from "v2/__generated__/ArtistHeader_artist.graphql"
import { ArtistInsightPillsFragmentContainer } from "v2/Apps/Artist/Components/ArtistInsights"

interface ArtistHeaderProps {
  artist: ArtistHeader_artist
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  const hideBioInHeaderIfPartnerSupplied = Boolean(
    artist.biographyBlurb!.credit
  )

  const avatar = artist.image?.cropped

  return (
    <>
      {avatar && (
        <Link
          rel="preload"
          as="image"
          href={avatar.src}
          imagesrcset={avatar.srcSet}
        />
      )}

      <Box data-test="artistHeader">
        <GridColumns gridRowGap={2}>
          <Column span={6}>
            <GridColumns>
              {avatar && (
                <Column span={2}>
                  <Flex justifyContent={["center", "left"]}>
                    <ResponsiveBox
                      aspectWidth={1}
                      aspectHeight={1}
                      maxWidth={100}
                      borderRadius="50%"
                      overflow="hidden"
                      bg="black10"
                    >
                      <Image
                        src={avatar.src}
                        srcSet={avatar.srcSet}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </ResponsiveBox>
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
                <FollowArtistButtonFragmentContainer
                  artist={artist}
                  buttonProps={{ size: "large", width: "100%" }}
                  contextModule={ContextModule.artistHeader}
                />
              </Column>

              {!!artist.counts?.follows && (
                <Column
                  span={6}
                  display={["block", "none", "none", "flex"]}
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

            <Spacer mb={4} />

            {!hideBioInHeaderIfPartnerSupplied && artist.biographyBlurb?.text && (
              <>
                <Text variant="xs" textTransform="uppercase" mt={[2, 0]} mb={1}>
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
        ...FollowArtistButton_artist
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
          cropped(width: 100, height: 100) {
            src
            srcSet
          }
        }
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
          forSaleArtworks
        }
        biographyBlurb: biographyBlurb(format: HTML, partnerBio: false) {
          credit
          partnerID
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
