import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SingleAuctionResult_auctionResult$data } from "__generated__/SingleAuctionResult_auctionResult.graphql"

interface SingleAuctionResultProps {
  auctionResult: SingleAuctionResult_auctionResult$data
}

export const SingleAuctionResult: React.FC<SingleAuctionResultProps> = ({
  auctionResult,
}) => {
  console.log("[LOGD] auctionResult = ", auctionResult)

  return <Text> Hello </Text>
}

export const SingleAuctionResultFragmentContainer = createFragmentContainer(
  SingleAuctionResult,
  {
    auctionResult: graphql`
      fragment SingleAuctionResult_auctionResult on AuctionResult {
        id
        internalID
        artistID
        boughtIn
        currency
        categoryText
        dateText
        dimensions {
          height
          width
        }
        dimensionText
        estimate {
          display
          high
          low
        }
        images {
          thumbnail {
            url(version: "square140")
            height
            width
            aspectRatio
          }
        }
        location
        mediumText
        organization
        performance {
          mid
        }
        currency
        priceRealized {
          cents
          centsUSD
          display
          displayUSD
        }
        saleDate
        saleTitle
        title
      }
    `,
  }
)
