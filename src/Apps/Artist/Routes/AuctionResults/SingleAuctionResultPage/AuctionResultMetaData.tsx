import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { graphql, useFragment } from "react-relay"
import { AuctionResultMetaData_auctionResult$key } from "__generated__/AuctionResultMetaData_auctionResult.graphql"

interface AuctionResultMetaDataProps {
  auctionResultMetaData: AuctionResultMetaData_auctionResult$key
}

export const AuctionResultMetaData: React.FC<AuctionResultMetaDataProps> = ({
  auctionResultMetaData,
}) => {
  const data = useFragment(auctionResultMetaDataFragment, auctionResultMetaData)

  const {
    mediumText,
    dimensionText,
    saleDate,
    organization,
    location,
    saleTitle,
    lotNumber,
  } = data

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
const auctionResultMetaDataFragment = graphql`
  fragment AuctionResultMetaData_auctionResult on AuctionResult {
    mediumText
    dimensionText
    saleDate
    organization
    location
    saleTitle
    lotNumber
  }
`
