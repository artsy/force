import { Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { AuctionResult_auctionResult$data } from "__generated__/AuctionResult_auctionResult.graphql"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { AuctionResultMetaData } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultPrice } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultPrice"
import { AuctionResultTitleInfo } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { TopContextBar } from "Components/TopContextBar"

interface AuctionResultProps {
  auctionResult: AuctionResult_auctionResult$data
}

export const AuctionResult: React.FC<AuctionResultProps> = ({
  auctionResult,
}) => {
  const { comparableAuctionResults, title, artist, internalID } = auctionResult

  const results = extractNodes(comparableAuctionResults)

  if (!artist) return null

  return (
    <>
      <MetaTags
        title={`${title}${
          artist.name ? ` by ${artist.name}` : ""
        } | Auction Results on Artsy`}
        pathname={`/auction-result/${internalID}`}
      />

      <TopContextBar displayBackArrow href={`${artist.href}/auction-results`}>
        {artist.name} Auction Results
      </TopContextBar>

      <GridColumns mt={[0, 2]}>
        <Column span={4}>
          <AuctionResultImage auctionResult={auctionResult} />
        </Column>

        <Column span={8}>
          <Join separator={<Spacer y={[2, 4]} />}>
            <AuctionResultTitleInfo auctionResult={auctionResult} />

            <AuctionResultPrice auctionResult={auctionResult} />

            <AuctionResultMetaData auctionResult={auctionResult} />
          </Join>
        </Column>
      </GridColumns>

      <Spacer y={[4, 6]} />

      {!!results.length && (
        <>
          <Text variant={["sm-display", "md"]}>Comparable Works</Text>

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
        internalID
        artist {
          name
          href
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
        ...AuctionResultImage_auctionResult
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultPrice_auctionResult
        ...AuctionResultTitleInfo_auctionResult
      }
    `,
  }
)
