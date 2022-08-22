import { Column, Flex, Join, Spacer, Text } from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkAuctionResults_artist } from "__generated__/MyCollectionArtworkAuctionResults_artist.graphql"

interface MyColectionArtworkAuctionResultsProps {
  artist: MyCollectionArtworkAuctionResults_artist
}

const AuctionResultsContainer: React.FC<MyColectionArtworkAuctionResultsProps> = ({
  artist,
}) => {
  const { slug, name, auctionResultsConnection } = artist

  if (!auctionResultsConnection) {
    return null
  }
  const results = extractNodes(auctionResultsConnection)

  const titleString = `${name} - Artwork Auction Results on Artsy`

  return (
    <>
      <MetaTags title={titleString} />

      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant={["sm-display", "lg-display"]} textAlign="left">
          Auction Results
        </Text>
        <RouterLink
          textAlign="right"
          to={`/artist/${slug}/auction-results?scroll_to_market_signals`}
        >
          View All
        </RouterLink>
      </Flex>

      <Spacer my={2} />

      <Column span={9}>
        <Spacer mt={[2, 0]} />

        <Join separator={<Spacer mt={2} />}>
          {results.map((result, index) => {
            return (
              <ArtistAuctionResultItemFragmentContainer
                key={index}
                auctionResult={result}
                filtersAtDefault={false}
              />
            )
          })}
        </Join>
      </Column>
      <Spacer pb={6} />
    </>
  )
}

export const MyColectionArtworkAuctionResultsFragmentContainer = createFragmentContainer(
  AuctionResultsContainer,
  {
    artist: graphql`
      fragment MyCollectionArtworkAuctionResults_artist on Artist
        @argumentDefinitions(first: { type: "Int", defaultValue: 6 }) {
        slug
        internalID
        name
        auctionResultsConnection(first: $first) {
          totalCount
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
      }
    `,
  }
)
