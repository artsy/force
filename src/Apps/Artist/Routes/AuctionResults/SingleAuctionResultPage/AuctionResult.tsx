import {
  Box,
  ChevronIcon,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { AuctionResult_auctionResult$data } from "__generated__/AuctionResult_auctionResult.graphql"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { AuctionResultMetaData } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultPrice } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultPrice"
import { AuctionResultTitleInfo } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"

interface AuctionResultProps {
  auctionResult: AuctionResult_auctionResult$data
}

export const AuctionResult: React.FC<AuctionResultProps> = ({
  auctionResult,
}) => {
  const { artist, comparableAuctionResults } = auctionResult

  const results = extractNodes(comparableAuctionResults)

  return (
    <>
      <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
        <RouterLink
          textDecoration="none"
          to={`/artist/${artist?.slug}/auction-results`}
        >
          <Flex alignItems="center">
            <ChevronIcon height={14} width={14} direction="left" />
            <Media greaterThanOrEqual="sm">
              <Text variant="xs" pl={1}>
                Back to {artist?.name}
              </Text>
            </Media>
          </Flex>
        </RouterLink>
      </Flex>

      <GridColumns gridRowGap={[2, 0]}>
        <Column span={4}>
          <AuctionResultImage auctionResult={auctionResult} />
        </Column>

        <Column span={8}>
          <Box>
            <Join separator={<Spacer y={[2, 4]} />}>
              <AuctionResultTitleInfo auctionResult={auctionResult} />

              <AuctionResultPrice auctionResult={auctionResult} />

              <AuctionResultMetaData auctionResult={auctionResult} />
            </Join>
          </Box>
        </Column>
      </GridColumns>

      <Spacer y={[4, 6]} />

      <Text variant={["sm-display", "md"]} textAlign="left">
        Comparable Works
      </Text>

      <Spacer y={[2, 4]} />
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
    </>
  )
}

export const AuctionResultFragmentContainer = createFragmentContainer(
  AuctionResult,
  {
    auctionResult: graphql`
      fragment AuctionResult_auctionResult on AuctionResult {
        artist {
          name
          slug
        }
        comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultTitleInfo_auctionResult
        ...AuctionResultPrice_auctionResult
        ...AuctionResultImage_auctionResult
      }
    `,
  }
)
