import {
  Avatar,
  Column,
  Flex,
  GridColumns,
  HTML,
  ReadMore,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { ArtistHeader_artist } from "v2/__generated__/ArtistHeader_artist.graphql"
import { FollowArtist2ButtonFragmentContainer } from "./FollowArtist2Button"

interface ArtistHeaderProps {
  artist: ArtistHeader_artist
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  const hideBioInHeaderIfPartnerSupplied = Boolean(
    artist.biographyBlurb!.credit
  )

  return (
    <GridColumns>
      {artist.imageUrl && (
        <Column span={1}>
          <Flex justifyContent={["center", "left"]}>
            <Avatar src={artist.imageUrl} size="md" />
          </Flex>
        </Column>
      )}
      <Column span={5}>
        <Text variant="xl" as="h1" textAlign={["center", "left"]}>
          {artist.name}
        </Text>

        {artist.formattedNationalityAndBirthday && (
          <Text
            variant="xl"
            as="h2"
            color="black60"
            mb={2}
            textAlign={["center", "left"]}
          >
            {artist.formattedNationalityAndBirthday}
          </Text>
        )}

        <GridColumns>
          <Column span={[12, 6, 3]}>
            <FollowArtist2ButtonFragmentContainer artist={artist} />
          </Column>

          <Column
            span={[12, 6, 9]}
            display={["block", "flex"]}
            alignItems="center"
          >
            <Text variant="xs" color="black60" textAlign={["center", "left"]}>
              {formatFollowerCount(artist.counts?.follows!)} Following
            </Text>
          </Column>
        </GridColumns>
      </Column>

      <Column span={6}>
        {!hideBioInHeaderIfPartnerSupplied && artist.biographyBlurb?.text && (
          <>
            <Text variant="xs" textTransform="uppercase" mt={[2, 0]} mb={1}>
              Bio
            </Text>
            <Text variant="sm" mb={2}>
              <HTML variant="sm">
                <ReadMore maxChars={250} content={artist.biographyBlurb.text} />
              </HTML>
            </Text>
          </>
        )}

        <SelectedCareerAchievementsFragmentContainer artist={artist} />
      </Column>
    </GridColumns>
  )
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        ...FollowArtist2Button_artist
        ...SelectedCareerAchievements_artist

        artistHighlights: highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              price_realized: priceRealized {
                display(format: "0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
        imageUrl
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
          forSaleArtworks
        }
        biographyBlurb: biographyBlurb(format: HTML, partnerBio: true) {
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
