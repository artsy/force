import { Column, Flex, Join, Spacer, Text } from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkAuctionResults_artist$data } from "__generated__/MyCollectionArtworkAuctionResults_artist.graphql"

interface MyCollectionArtworkAuctionResultsProps {
  artist: MyCollectionArtworkAuctionResults_artist$data
}

const MyCollectionAuctionResultsContainer: React.FC<MyCollectionArtworkAuctionResultsProps> = ({
  artist,
}) => {
  const { slug, auctionResultsConnection } = artist

  if (!auctionResultsConnection) {
    return null
  }
  const results = extractNodes(auctionResultsConnection)

  if (!results.length) {
    return null
  }

  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Text variant={["sm-display", "md"]} textAlign="left">
          Auction Results
        </Text>
        <RouterLink
          textAlign="right"
          to={`/artist/${slug}/auction-results?scroll_to_market_signals=true`}
        >
          View All
        </RouterLink>
      </Flex>

      <Spacer y={2} />

      <Column span={9}>
        <Spacer y={[2, 0]} />

        <Join separator={<Spacer y={2} />}>
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
    </>
  )
}

export const MyCollectionArtworkAuctionResultsFragmentContainer = createFragmentContainer(
  MyCollectionAuctionResultsContainer,
  {
    artist: graphql`
      fragment MyCollectionArtworkAuctionResults_artist on Artist
        @argumentDefinitions(first: { type: "Int", defaultValue: 6 }) {
        slug
        internalID
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
