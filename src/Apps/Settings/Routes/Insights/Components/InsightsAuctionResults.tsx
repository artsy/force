import { InsightsAuctionResults_me$data } from "__generated__/InsightsAuctionResults_me.graphql"
import { Column, Join, Spacer, Text } from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"

interface InsightsAuctionResultsProps {
  me: InsightsAuctionResults_me$data
}

const InsightsAuctionResults: React.FC<InsightsAuctionResultsProps> = ({
  me,
}) => {
  const auctionResults = extractNodes(me.myCollectionAuctionResults)

  if (!auctionResults.length) {
    return null
  }

  return (
    <>
      <Text variant={["sm-display", "md"]} textAlign="left">
        Recently Sold at Auction
      </Text>

      <Spacer y={2} />

      <Column span={9}>
        <Spacer y={[2, 0]} />

        <Join separator={<Spacer y={2} />}>
          {auctionResults.map((result, index) => {
            return (
              <ArtistAuctionResultItemFragmentContainer
                key={index}
                auctionResult={result}
                filtersAtDefault={false}
                showArtistName
              />
            )
          })}
        </Join>
      </Column>
    </>
  )
}

export const InsightsAuctionResultsFragmentContainer = createFragmentContainer(
  InsightsAuctionResults,
  {
    me: graphql`
      fragment InsightsAuctionResults_me on Me {
        myCollectionAuctionResults(first: 6, state: PAST) {
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
