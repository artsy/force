import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionResultMetaData_auctionResult$data } from "__generated__/AuctionResultMetaData_auctionResult.graphql"

interface AuctionResultMetaDataProps {
  auctionResultMetaData: AuctionResultMetaData_auctionResult$data
}

const AuctionResultMetaData: React.FC<AuctionResultMetaDataProps> = ({
  auctionResultMetaData,
}) => {
  const {
    mediumText,
    dimensionText,
    saleDate,
    organization,
    location,
    saleTitle,
    lotNumber,
  } = auctionResultMetaData

  return (
    <>
      <MetadataField label="Medium" value={mediumText} />
      <MetadataField label="Dimensions" value={dimensionText} />
      <MetadataField label="Sale Date" value={saleDate} />
      <MetadataField label="Auction house" value={organization} />
      <MetadataField label="Sale location" value={location} />
      <MetadataField label="Sale name" value={saleTitle} />
      <MetadataField label="Lot" value={lotNumber} />
    </>
  )
}

export const AuctionResultMetaDataFragmentContainer = createFragmentContainer(
  AuctionResultMetaData,
  {
    auctionResult: graphql`
      fragment AuctionResultMetaData_auctionResult on AuctionResult {
        mediumText
        dimensionText
        saleDate(format: "MMM DD, YYYY")
        organization
        location
        saleTitle
        lotNumber
      }
    `,
  }
)
