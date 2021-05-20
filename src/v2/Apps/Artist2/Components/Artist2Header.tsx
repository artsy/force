import { Column, GridColumns, HTML, ReadMore, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { Artist2Header_artist } from "v2/__generated__/Artist2Header_artist.graphql"
import { FollowArtist2ButtonFragmentContainer } from "./FollowArtist2Button"

interface Artist2HeaderProps {
  artist: Artist2Header_artist
}

const Artist2Header: React.FC<Artist2HeaderProps> = ({ artist }) => {
  return (
    <GridColumns mt={4}>
      <Column span={6}>
        <Text variant="xl" as="h1">
          {artist.name}
        </Text>

        {artist.formattedNationalityAndBirthday && (
          <Text variant="xl" as="h2" color="black60" mb={2}>
            {artist.formattedNationalityAndBirthday}
          </Text>
        )}

        <GridColumns>
          <Column span={[6, 6, 3]}>
            <FollowArtist2ButtonFragmentContainer artist={artist} />
          </Column>

          <Column span={[6, 6, 9]} display="flex" alignItems="center">
            <Text variant="xs" color="black60">
              {formatFollowerCount(artist.counts?.follows!)} Following
            </Text>
          </Column>
        </GridColumns>
      </Column>

      <Column span={6}>
        <Text variant="xs" textTransform="uppercase" mb={1}>
          Bio
        </Text>

        <Text variant="sm" mb={2}>
          <HTML variant="sm">
            {/* TODO:
                Need to addPartner suppplied bios logic */}
            <ReadMore maxChars={550} content={artist.biographyBlurb!.text!} />
          </HTML>
        </Text>

        <SelectedCareerAchievementsFragmentContainer artist={artist} />
      </Column>
    </GridColumns>
  )
}

export const Artist2HeaderFragmentContainer = createFragmentContainer(
  Artist2Header,
  {
    artist: graphql`
      fragment Artist2Header_artist on Artist
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
