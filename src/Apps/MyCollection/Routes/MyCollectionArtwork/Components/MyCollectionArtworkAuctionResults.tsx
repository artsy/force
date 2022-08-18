import { Box, Column, Flex, Join, Message, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { extractNodes } from "Utils/extractNodes"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { MyCollectionArtworkAuctionResults_artist } from "__generated__/MyCollectionArtworkAuctionResults_artist.graphql"
import { RouterLink } from "System/Router/RouterLink"

interface MyColectionArtworkAuctionResultsProps {
  artist: MyCollectionArtworkAuctionResults_artist
}

const AuctionResultsContainer: React.FC<MyColectionArtworkAuctionResultsProps> = ({
  artist,
}) => {
  const { slug, name, auctionResultsConnection } = artist

  const results = extractNodes(auctionResultsConnection)

  const titleString = `${name} - Artwork Auction Results on Artsy`

  return (
    <>
      <MetaTags title={titleString} />

      <Box id="scrollTo--artistAuctionResultsTop" />

      <Flex
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant={["sm-display", "lg-display"]} textAlign="left">
          Auction Results
        </Text>
        <RouterLink textAlign="right" to={`/artist/${slug}/auction-results`}>
          View All
        </RouterLink>
      </Flex>

      <Spacer my={2} />

      <Column span={9}>
        <Spacer mt={[2, 0]} />

        {results.length > 0 ? (
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
        ) : (
          <Message>
            There aren’t any auction results available by the artist at this
            time.
          </Message>
        )}
      </Column>
    </>
  )
}

export const MyColectionArtworkAuctionResultsRefetchContainer = createFragmentContainer(
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
