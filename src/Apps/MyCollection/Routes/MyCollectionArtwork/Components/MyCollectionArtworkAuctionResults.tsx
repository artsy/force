import { Box, Column, Join, Message, Spacer, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { LoadingArea } from "Components/LoadingArea"
import createLogger from "Utils/logger"
import { MetaTags } from "Components/MetaTags"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { extractNodes } from "Utils/extractNodes"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { MyCollectionArtworkAuctionResults_artist } from "__generated__/MyCollectionArtworkAuctionResults_artist.graphql"

const logger = createLogger("MyColectionArtworkAuctionResults.tsx")

interface MyColectionArtworkAuctionResultsProps {
  relay: RelayRefetchProp
  artist: MyCollectionArtworkAuctionResults_artist
}

const AuctionResultsContainer: React.FC<MyColectionArtworkAuctionResultsProps> = ({
  artist,
  relay,
}) => {
  const { slug, internalID, name, auctionResultsConnection } = artist

  const results = extractNodes(auctionResultsConnection)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const relayRefetchParams = {
      artistID: slug,
      artistInternalID: internalID,
    }

    relay.refetch(relayRefetchParams, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }, [])

  const titleString = `${name} - Artwork Auction Results on Artsy`

  return (
    <>
      <MetaTags title={titleString} />

      <Box id="scrollTo--artistAuctionResultsTop" />

      <Text variant={["sm-display", "lg-display"]}>Auction Results</Text>

      <Spacer my={2} />

      <Column span={9}>
        <Spacer mt={[2, 0]} />

        {results.length > 0 ? (
          <LoadingArea isLoading={isLoading}>
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
          </LoadingArea>
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

export const MyColectionArtworkAuctionResultsRefetchContainer = createRefetchContainer(
  AuctionResultsContainer,
  {
    artist: graphql`
      fragment MyCollectionArtworkAuctionResults_artist on Artist
        @argumentDefinitions(first: { type: "Int", defaultValue: 10 }) {
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
  },
  graphql`
    query MyCollectionArtworkAuctionResultsQuery(
      $first: Int
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...MyCollectionArtworkAuctionResults_artist @arguments(first: $first)
      }
    }
  `
)
