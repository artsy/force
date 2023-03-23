import { Box } from "@artsy/palette"
import { AuctionResultMetaData_auctionResult$key } from "__generated__/AuctionResultMetaData_auctionResult.graphql"
import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { graphql, useFragment } from "react-relay"

interface AuctionResultMetaDataProps {
  auctionResult: AuctionResultMetaData_auctionResult$key
}

export const AuctionResultMetaData: React.FC<AuctionResultMetaDataProps> = ({
  auctionResult,
}) => {
  const data = useFragment(auctionResultMetaDataFragment, auctionResult)

  const {
    mediumText,
    dimensionText,
    formattedSaleDate,
    organization,
    location,
    saleTitle,
    lotNumber,
    isUpcoming,
    estimate,
  } = data

  return (
    <Box>
      {!isUpcoming && (
        <MetadataField label="Pre-sale estimate" value={estimate?.display} />
      )}
      <MetadataField label="Medium" value={mediumText} />
      <MetadataField label="Dimensions" value={dimensionText} />
      <MetadataField label="Sale Date" value={formattedSaleDate} />
      <MetadataField label="Auction house" value={organization} />
      <MetadataField label="Sale location" value={location} />
      <MetadataField label="Sale name" value={saleTitle} />
      <MetadataField label="Lot" value={lotNumber} />
    </Box>
  )
}

const auctionResultMetaDataFragment = graphql`
  fragment AuctionResultMetaData_auctionResult on AuctionResult {
    mediumText
    dimensionText
    formattedSaleDate: saleDate(format: "MMM DD, YYYY")
    organization
    location
    saleTitle
    lotNumber
    estimate {
      display
    }
    isUpcoming
  }
`
