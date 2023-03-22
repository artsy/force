import { Box } from "@artsy/palette"
import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { graphql, useFragment } from "react-relay"
import { AuctionResultMetaData_auctionResult$key } from "__generated__/AuctionResultMetaData_auctionResult.graphql"

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
  } = data

  return (
    <Box>
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
  }
`
