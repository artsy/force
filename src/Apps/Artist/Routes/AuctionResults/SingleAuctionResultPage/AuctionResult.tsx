import { Box, Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { AuctionResult_auctionResult$data } from "__generated__/AuctionResult_auctionResult.graphql"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { AuctionResultBackLink } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultBackLink"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { AuctionResultMetaData } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultPrice } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultPrice"
import { AuctionResultTitleInfo } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"

interface AuctionResultProps {
  auctionResult: AuctionResult_auctionResult$data
}

export const AuctionResult: React.FC<AuctionResultProps> = ({
  auctionResult,
}) => {
  const { comparableAuctionResults, title, artist } = auctionResult

  const results = extractNodes(comparableAuctionResults)

  return (
    <>
      <MetaTags
        title={`${title}${artist?.name ? ` by ${artist.name}` : ""} | Artsy`}
      />

      <AuctionResultBackLink auctionResult={auctionResult} />

      <GridColumns mt={[0, 2]}>
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

      {!!results.length && (
        <>
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
      )}
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
        }
        title
        comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
        ...AuctionResultBackLink_auctionResult
        ...AuctionResultImage_auctionResult
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultPrice_auctionResult
        ...AuctionResultTitleInfo_auctionResult
      }
    `,
  }
)
